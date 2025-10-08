"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r2Client = exports.r2Config = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const required = (name, value) => {
    if (!value)
        throw new Error(`Env ${name} não configurada`);
    return value;
};
exports.r2Config = {
    accountId: required('R2_ACCOUNT_ID', process.env.R2_ACCOUNT_ID),
    accessKeyId: required('R2_ACCESS_KEY_ID', process.env.R2_ACCESS_KEY_ID),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY', process.env.R2_SECRET_ACCESS_KEY),
    bucket: required('R2_BUCKET', process.env.R2_BUCKET),
    publicBaseUrl: process.env.R2_PUBLIC_BASE_URL,
};
exports.r2Client = new client_s3_1.S3Client({
    region: 'auto',
    endpoint: `https://${exports.r2Config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: exports.r2Config.accessKeyId,
        secretAccessKey: exports.r2Config.secretAccessKey,
    },
});
//# sourceMappingURL=r2.js.map