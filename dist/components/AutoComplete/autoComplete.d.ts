import { FC, ReactElement } from "react";
import { InputProps } from "../Input/Input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
/**
 * Omit忽略原生回调onSelect
 * */
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /** 抓取索引值，返回结果列表 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选择回调 */
    onSelect?: (item: DataSourceType) => void;
    /** 渲染回调 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * ## 介绍
 * Input的进一步扩展，自动适配索引值,列出相关项。
*/
export declare const AutoComplete: FC<AutoCompleteProps>;
export {};
