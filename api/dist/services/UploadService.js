"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const r2_1 = require("../config/r2");
const crypto_1 = __importDefault(require("crypto"));
const ALLOWED_MIME = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/svg+xml',
]);
function generateObjectKey(kind, userId, originalName) {
    const ext = originalName.includes('.') ? originalName.split('.').pop() : 'bin';
    const id = crypto_1.default.randomUUID();
    const date = new Date().toISOString().slice(0, 10);
    const prefix = kind === 'property' ? 'properties' : kind === 'user' ? 'users' : 'misc';
    const userPart = userId ? `${userId}/` : '';
    return `${prefix}/${userPart}${date}/${id}.${ext}`;
}
class UploadService {
    static validateMime(mime) {
        if (!ALLOWED_MIME.has(mime)) {
            throw new Error('Tipo de imagem não suportado');
        }
    }
    static publicUrl(key) {
        if (r2_1.r2Config.publicBaseUrl) {
            const base = r2_1.r2Config.publicBaseUrl.replace(/\/$/, '');
            return `${base}/${key}`;
        }
        return `https://${r2_1.r2Config.accountId}.r2.cloudflarestorage.com/${r2_1.r2Config.bucket}/${key}`;
    }
    static async uploadBuffer(opts) {
        this.validateMime(opts.contentType);
        const key = generateObjectKey(opts.kind, opts.userId, opts.originalName);
        await r2_1.r2Client.send(new client_s3_1.PutObjectCommand({
            Bucket: r2_1.r2Config.bucket,
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
    static async deleteObject(key) {
        await r2_1.r2Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: r2_1.r2Config.bucket,
            Key: key,
        }));
    }
}
exports.UploadService = UploadService;
//# sourceMappingURL=UploadService.js.map