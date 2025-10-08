"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = uploadRoutes;
const multipart_1 = __importDefault(require("@fastify/multipart"));
const UploadService_1 = require("../services/UploadService");
const auth_1 = require("../middleware/auth");
async function uploadRoutes(fastify) {
    if (!fastify.hasContentTypeParser('multipart')) {
        await fastify.register(multipart_1.default, {
            limits: {
                fileSize: 10 * 1024 * 1024,
                files: 10,
            },
        });
    }
    fastify.post('/uploads/image', { preHandler: auth_1.authMiddleware }, async (request, reply) => {
        const user = request.user;
        const mp = await request.file();
        if (!mp) {
            return reply.status(400).send({ success: false, error: 'Arquivo não enviado' });
        }
        const kind = request.headers['x-upload-kind'] || 'misc';
        const chunks = [];
        for await (const part of mp.file) {
            chunks.push(Buffer.from(part));
        }
        const buffer = Buffer.concat(chunks);
        try {
            const result = await UploadService_1.UploadService.uploadBuffer({
                kind: kind === 'property' || kind === 'user' ? kind : 'misc',
                userId: user?.id,
                buffer,
                contentType: mp.mimetype || 'application/octet-stream',
                originalName: mp.filename || 'upload.bin',
            });
            return reply.status(201).send({ success: true, data: result });
        }
        catch (e) {
            return reply.status(400).send({ success: false, error: e?.message || 'Falha no upload' });
        }
    });
}
//# sourceMappingURL=uploads.js.map