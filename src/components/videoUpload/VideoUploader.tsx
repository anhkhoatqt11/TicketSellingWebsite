'use client';

import ReactPlayer from 'react-player';

import { Button } from '@/components/ui/button';
import { VideoUploadInput } from '@/components/videoUpload/VideoUploadInput';
import { postRequest } from '@/lib/fetch';

interface ChapterVideoFormProps {
  // initialData: Chapter & { muxData?: MuxData | null };
  initialData?: { videoUrl: string; muxData?: any };
  courseId?: string;
  chapterId?: string;
  videoUrl: string;
  setVideoUrl: any;
  videoKey: any;
  setVideoKey: any;
}

export const VideoUploader = ({
  videoUrl,
  setVideoUrl,
}: ChapterVideoFormProps) => {
  const parts = videoUrl?.split('/');

  // Get the last part of the URL, which contains the key
  const keyPart = parts?.[parts.length - 1];

  // If you want to remove any query parameters, you can split by '?' and take the first part
  const videoKey = keyPart?.split('?')[0];
  const onDelete = async () => {
    const res = await postRequest({
      endPoint: '/api/bai-viet/deleteVideo',
      formData: { videoKey },
      isFormData: false,
    });
    console.log(res);
    setVideoUrl(null);
  };

  return (
    <div className="mt-6 relative ">
      {/* {!isEditing &&
        (!initialData?.videoUrl ? null : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ''} />
          </div>
        ))} */}
      {videoUrl && (
        <div className=" mb-3 lg:mb-9 ">
          <Button
            onClick={onDelete}
            variant={'destructive'}
            className="absolute right-0 "
          >
            Xóa
          </Button>
        </div>
      )}
      {videoUrl && (
        <div className=" mt-2 px-2 ">
          <ReactPlayer
            width={window.innerWidth > 768 ? 600 : 290}
            url={videoUrl}
            controls={true}
          />
        </div>
      )}
      {!videoUrl && (
        <div>
          <VideoUploadInput
            endpoint="chapterVideo"
            onChange={(video) => {
              setVideoUrl(video.url);
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Video có thể mất một khoảng thời gian để được xử lý. Xin vui lòng
            chờ đợi
          </div>
        </div>
      )}
    </div>
  );
};
