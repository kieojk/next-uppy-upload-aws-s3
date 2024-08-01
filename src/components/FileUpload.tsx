// src/components/FileUpload.tsx
// 有两个版本，一个是<Dashboard />，一个是new Uppy().use(Dashboard,{})
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


// // components/FileUpload.tsx
// "use client"
// import React, { useEffect } from 'react';
// import Uppy, { type UppyFile } from '@uppy/core';
// import Dashboard from '@uppy/dashboard';
// import AwsS3, { type AwsS3UploadParameters} from '@uppy/aws-s3';
// import '@uppy/core/dist/style.css';
// import '@uppy/dashboard/dist/style.css';

// const FileUpload: React.FC = () => {
//   useEffect(() => {
//     const uppy = new Uppy()
//       .use(Dashboard, {
//         inline: true,
//         target: '#drag-drop-area',
//         trigger: '#drag-drop-area',
//         showProgressDetails: true,
//         proudlyDisplayPoweredByUppy: false,
//         // showLinkToFileUploadResult:true
//       })
//       .use(AwsS3, {
//         async getUploadParameters(file: UppyFile): Promise<AwsS3UploadParameters> {
//             const response = await fetch('/api/upload', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name: file.name,
//                     type: file.type,
//                 }),
//                 });

//             const data = await response.json();

//             return {
//                 method: 'PUT',
//                 url: data.url,
//                 fields: {},
//                 headers: {
//                 'Content-Type': 'application/json',
//             },
//           };
//         },
//       });

//     uppy.on('complete', (result) => {
//       console.log('Upload complete! We’ve uploaded these files:', result.successful);
//     });

//     return () => uppy.close();
//   }, []);

//   return <div id="drag-drop-area"></div>;
// };

// export default FileUpload;


