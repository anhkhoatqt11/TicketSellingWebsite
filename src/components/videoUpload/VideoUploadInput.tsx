'use client';

import toast from 'react-hot-toast';

import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';
// import { ourFileRouter } from '@/app/api/uploadthing/core';

interface VideoUploadProps {
  onChange: any;
  endpoint: keyof typeof ourFileRouter;
}

export const VideoUploadInput = ({ onChange, endpoint }: VideoUploadProps) => {
  return (
    <UploadDropzone
      // onUploadProgress={(progress) => {
      //   console.log(
      //     '🚀 ~ file: VideoUploadInput.tsx:18 ~ VideoUploadInput ~ progress:',
      //     progress
      //   );
      // }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
