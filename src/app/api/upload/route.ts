// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fromEnv } from "@aws-sdk/credential-providers"

const credentials = fromEnv(); 

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials,
  });

export async function POST(req: NextRequest) {
  try {
    const { name, type } = await req.json();

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      ContentType: type,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}