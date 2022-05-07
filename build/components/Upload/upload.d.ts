import React, { FC } from "react";
export declare type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
    children?: React.ReactElement;
}
export interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    defaultFileList?: UploadFile[];
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    data?: {
        [key: string]: any;
    };
    name?: string;
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
