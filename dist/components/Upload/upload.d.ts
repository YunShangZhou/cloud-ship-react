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
    /** 文件上传路径 */
    action: string;
    /** 上传前的回调 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 默认文件列表 */
    defaultFileList?: UploadFile[];
    /** 传输时的回调 */
    onProgress?: (percentage: number, file: File) => void;
    /** 成功后的回调 */
    onSuccess?: (data: any, file: File) => void;
    /** 错误后的回调 */
    onError?: (err: any, file: File) => void;
    /** 改变时的回调 */
    onChange?: (file: File) => void;
    /** 移除文件后的回调 */
    onRemove?: (file: UploadFile) => void;
    /** 请求头的配置 */
    headers?: {
        [key: string]: any;
    };
    /** 表格数据的添加 */
    data?: {
        [key: string]: any;
    };
    /** 自定义文件名 */
    name?: string;
    /** 是否支持协议证书 */
    withCredentials?: boolean;
    /** 接收文件的类型 */
    accept?: string;
    /** 是否支持多个上传 */
    multiple?: boolean;
    /** 是否支持拖拽 */
    drag?: boolean;
}
/**
 * ## 介绍
 * - 封装type为file的input。支持拖拽式上传
 * - 上传样式由开发自由定义。如按钮、链接、单向箭头等。
*/
export declare const Upload: FC<UploadProps>;
export default Upload;
