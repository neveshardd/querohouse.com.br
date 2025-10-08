import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, r2Config } from '../config/r2';
import crypto from 'crypto';

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

export interface UploadResult {
  key: string;
  url: string;
  contentType: string;
  size: number;
}

function generateObjectKey(kind: 'property' | 'user' | 'misc', userId: string | undefined, originalName: string): string {
  const ext = originalName.includes('.') ? originalName.split('.').pop() : 'bin';
  const id = crypto.randomUUID();
  const date = new Date().toISOString().slice(0, 10);
  const prefix = kind === 'property' ? 'properties' : kind === 'user' ? 'users' : 'misc';
  const userPart = userId ? `${userId}/` : '';
  return `${prefix}/${userPart}${date}/${id}.${ext}`;
}

export class UploadService {
  static validateMime(mime: string) {
    if (!ALLOWED_MIME.has(mime)) {
      throw new Error('Tipo de imagem não suportado');
    }
  }

  static publicUrl(key: string): string {
    if (r2Config.publicBaseUrl) {
      const base = r2Config.publicBaseUrl.replace(/\/$/, '');
      return `${base}/${key}`;
    }
    return `https://${r2Config.accountId}.r2.cloudflarestorage.com/${r2Config.bucket}/${key}`;
  }

  static async uploadBuffer(opts: {
    kind: 'property' | 'user' | 'misc';
    userId?: string;
    buffer: Buffer;
    contentType: string;
    originalName: string;
    aclPublic?: boolean;
  }): Promise<UploadResult> {
    this.validateMime(opts.contentType);

    const key = generateObjectKey(opts.kind, opts.userId, opts.originalName);

    await r2Client.send(new PutObjectCommand({
      Bucket: r2Config.bucket,
      Key: key,
      Body: opts.buffer,
      ContentType: opts.contentType,
      ACL: 'private',
    }));

    return {
      key,
      url: this.publicUrl(key),
      contentType: opts.contentType,
      size: opts.buffer.length,
    };
  }

  static async deleteObject(key: string): Promise<void> {
    await r2Client.send(new DeleteObjectCommand({
      Bucket: r2Config.bucket,
      Key: key,
    }));
  }
}


