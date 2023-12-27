/* eslint-disable @typescript-eslint/no-unused-vars */
/** @format */

import * as React from "react";
import Cropper, { type ReactCropperElement } from "react-cropper";
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-hot-toast";

import "cropperjs/dist/cropper.css";

import { cn, formatBytes, getImageKey } from "@/lib/utils";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { Icons } from "@/assets/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageCus } from "@/components/ui/ImageCus";
import { postRequest } from "@/lib/fetch";

// FIXME Your proposed upload exceeds the maximum allowed size, this should trigger toast.error too
type FileWithPreview = FileWithPath & {
  preview: string;
};

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName;
  setValue?: UseFormSetValue<TFieldValues>;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  isUploading?: boolean;
  disabled?: boolean;
  setDeletedImage?: React.Dispatch<React.SetStateAction<[]>>;
}

export function FileDialog<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  setDeletedImage,
  ...props
}: FileDialogProps<TFieldValues>) {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length + (files?.length ?? 0) > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files`);
        return;
      } else {
        acceptedFiles.forEach((file) => {
          const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          setFiles((prev) => [...(prev ?? []), fileWithPreview]);
        });
        if (rejectedFiles.length > 0) {
          rejectedFiles.forEach(({ errors }) => {
            if (errors[0]?.code === "file-too-large") {
              toast.error(
                `File is too large. Max size is ${formatBytes(maxSize)}`
              );
              return;
            }
            errors[0]?.message && toast.error(errors[0].message);
          });
        }
      }
    },

    [maxSize, setFiles, files]
  );

  // Register files to react-hook-form
  React.useEffect(() => {
    setValue?.(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
  }, [files]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => URL.revokeObjectURL(file?.preview || file?.url));
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant="outline" disabled={disabled}>
          Tải ảnh lên
          <span className="sr-only">Tải ảnh lên</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
          Tải ảnh của bạn lên
        </p>

        {(files && files?.length < maxFiles) || !files ? (
          <div>
            {" "}
            <div
              {...getRootProps()}
              className={cn(
                "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDragActive && "border-muted-foreground/50",
                disabled && "pointer-events-none opacity-60",
                
              )}
              {...props}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="group grid w-full place-items-center gap-1 sm:px-10">
                  <Icons.upload className="h-9 w-9 animate-pulse text-muted-foreground" />
                </div>
              ) : isDragActive ? (
                <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
                  <Icons.upload
                    className={cn("h-8 w-8", isDragActive && "animate-bounce")}
                  />
                  <p className="text-base font-medium">Drop the file here</p>
                </div>
              ) : (
                <div className="grid place-items-center gap-1 sm:px-5">
                  <Icons.upload className="h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-base font-medium text-muted-foreground">
                    Kéo và thả ảnh vào đây hoặc click để tải ảnh lên
                  </p>
                  <p className="text-sm text-slate-500">
                    Vui lòng chọn file có kích thước nhỏ hơn{" "}
                    {formatBytes(maxSize)}
                  </p>
                </div>
              )}
            </div>
            <p className="text-center text-sm font-medium text-muted-foreground">
              Bạn có thể tải lên {maxFiles} {maxFiles === 1 ? "file" : "files"}
            </p>
          </div>
        ) : null}
        <ScrollArea className="h-[300px] mt-10 px-3">
          {files?.length ? (
            <div className="grid gap-5">
              {files?.map((file, i) => (
                <FileCard
                  setDeletedImage={setDeletedImage}
                  key={i}
                  i={i}
                  files={files}
                  setFiles={setFiles}
                  file={file}
                />
              ))}
            </div>
          ) : null}
        </ScrollArea>
        {files?.length ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2.5 w-full"
            onClick={() => setFiles([])}
          >
            <Icons.trash className="mr-2 h-4 w-4 text-primary" />
            Xóa tất cả
            <span className="sr-only">Xóa tất cả</span>
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface FileCardProps {
  i: number;
  file: FileWithPreview;
  files: FileWithPreview[] | null;
  setDeletedImage?: React.Dispatch<React.SetStateAction<[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
}

function FileCard({
  i,
  file,
  files,
  setFiles,
  setDeletedImage,
}: FileCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cropData, setCropData] = React.useState<string | null>(null);
  const cropperRef = React.useRef<ReactCropperElement>(null);

  const onCrop = React.useCallback(() => {
    if (!files || !cropperRef.current) return;

    const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
    setCropData(croppedCanvas.toDataURL());

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.error("Blob creation failed");
        return;
      }
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: file.name,
      }) satisfies FileWithPreview;

      const newFiles = files.map((file, j) =>
        j === i ? croppedFileWithPathAndPreview : file
      );
      setFiles(newFiles);
    });
  }, [file.name, file.type, files, i, setFiles]);

  React.useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        onCrop();
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onCrop]);
  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <ImageCus
          src={cropData ? cropData : file.preview || file.url}
          alt={file.name}
          className="h-12 w-12 shrink-0 rounded-md"
        />
        <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name.length > 30 ? file.name.slice(0, 30) + "..." : file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file !== null && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <Icons.crop
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                <span className="sr-only"> Cắt ảnh</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
                Cắt ảnh
              </p>
              <div className="mt-8 grid place-items-center space-y-5">
                <Cropper
                  ref={cropperRef}
                  className="h-[450px] w-[450px] object-cover"
                  zoomTo={0.5}
                  initialAspectRatio={1 / 1}
                  preview=".img-preview"
                  src={file.preview || file.url}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    aria-label="Crop image"
                    type="button"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      onCrop();
                      setIsOpen(false);
                    }}
                  >
                    <Icons.crop className="mr-2 h-3.5 w-3.5 text-secondary-50" />
                    Cắt ảnh
                  </Button>
                  <Button
                    aria-label="Reset crop"
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      cropperRef.current?.cropper.reset();
                      setCropData(null);
                    }}
                  >
                    <Icons.reset
                      className="mr-2 h-3.5 w-3.5 text-primary"
                      aria-hidden="true"
                    />
                    Bỏ thay đổi
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={async () => {
            if (!files) return;
            // if (file.url) {
            //   const imageKey = getImageKey(file.url);
            //   const res = await postRequest({
            //     endPoint: '/api/bai-viet/deleteImage',
            //     formData: { imageKey },
            //     isFormData: false,
            //   });
            //   console.log(
            //     '🚀 ~ file: FileDialog.tsx:362 ~ onClick={ ~ res:',
            //     res
            //   );
            // }
            setFiles(files.filter((_, j) => j !== i));
            if (setDeletedImage && file.url) {
              setDeletedImage((prev) => [...(prev ?? []), file]);
            }
          }}
        >
          <Icons.close className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}
