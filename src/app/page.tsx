// src/app/page.tsx

import React from 'react';
import FileUpload from '@/components/FileUpload';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Upload to S3 with Uppy</h1>
      <FileUpload />
    </div>
  );
};

export default Home;
