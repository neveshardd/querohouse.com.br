import { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import { UploadService } from '../services/UploadService';
import { authMiddleware } from '../middleware/auth';

export async function uploadRoutes(fastify: FastifyInstance) {
  if (!fastify.hasContentTypeParser('multipart')) {
    await fastify.register(multipart, {
      limits: {
        fileSize: 10 * 1024 * 1024,
        files: 10,
      },
    });
  }

  fastify.post('/uploads/image', { preHandler: authMiddleware }, async (request, reply) => {
    const user = (request as any).user as { id: string } | undefined;
    // @ts-ignore
    const mp = await request.file();

    if (!mp) {
      return reply.status(400).send({ success: false, error: 'Arquivo não enviado' });
    }

    const kind = (request.headers['x-upload-kind'] as string) || 'misc';

    const chunks: Buffer[] = [];
    for await (const part of mp.file) {
      chunks.push(Buffer.from(part));
    }
    const buffer = Buffer.concat(chunks);

    try {
      const result = await UploadService.uploadBuffer({
        kind: kind === 'property' || kind === 'user' ? (kind as any) : 'misc',
        userId: user?.id,
        buffer,
        contentType: mp.mimetype || 'application/octet-stream',
        originalName: mp.filename || 'upload.bin',
      });

      return reply.status(201).send({ success: true, data: result });
    } catch (e: any) {
      return reply.status(400).send({ success: false, error: e?.message || 'Falha no upload' });
    }
  });
}


