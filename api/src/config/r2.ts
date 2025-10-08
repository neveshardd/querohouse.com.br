import { S3Client } from '@aws-sdk/client-s3';

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicBaseUrl?: string;
}

const required = (name: string, value: string | undefined): string => {
  if (!value) throw new Error(`Env ${name} não configurada`);
  return value;
};

export const r2Config: R2Config = {
  accountId: required('R2_ACCOUNT_ID', process.env.R2_ACCOUNT_ID),
  accessKeyId: required('R2_ACCESS_KEY_ID', process.env.R2_ACCESS_KEY_ID),
  secretAccessKey: required('R2_SECRET_ACCESS_KEY', process.env.R2_SECRET_ACCESS_KEY),
  bucket: required('R2_BUCKET', process.env.R2_BUCKET),
  publicBaseUrl: process.env.R2_PUBLIC_BASE_URL,
};

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${r2Config.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: r2Config.accessKeyId,
    secretAccessKey: r2Config.secretAccessKey,
  },
});


