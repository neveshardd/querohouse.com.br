export interface UploadResult {
    key: string;
    url: string;
    contentType: string;
    size: number;
}
export declare class UploadService {
    static validateMime(mime: string): void;
    static publicUrl(key: string): string;
    static uploadBuffer(opts: {
        kind: 'property' | 'user' | 'misc';
        userId?: string;
        buffer: Buffer;
        contentType: string;
        originalName: string;
        aclPublic?: boolean;
    }): Promise<UploadResult>;
    static deleteObject(key: string): Promise<void>;
}
//# sourceMappingURL=UploadService.d.ts.map