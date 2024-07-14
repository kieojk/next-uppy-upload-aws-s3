// src/components/FileUpload.tsx
'use client'
import React from 'react';
import Uppy, { type UploadResult, UppyFile } from "@uppy/core";
import { Dashboard } from '@uppy/react';
import AwsS3, { type AwsS3UploadParameters } from "@uppy/aws-s3";

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const FileUpload: React.FC = () => {
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
  debug: true
  }).use(AwsS3, {
      async getUploadParameters(file: UppyFile): Promise<AwsS3UploadParameters> {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: file.name,
            type: file.type,
          }),
        });

        const data = await response.json();

        return {
          method: 'PUT',
          url: data.url,
          fields: {},
          headers: {
              'Content-Type': file.type || 'application/octet-stream',},
        };
      },
    }
  );

  return <Dashboard width={1000} uppy={uppy} />;
};

export default FileUpload;
