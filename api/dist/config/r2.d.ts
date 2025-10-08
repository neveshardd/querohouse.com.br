import { S3Client } from '@aws-sdk/client-s3';
export interface R2Config {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
    publicBaseUrl?: string;
}
export declare const r2Config: R2Config;
export declare const r2Client: S3Client;
//# sourceMappingURL=r2.d.ts.map