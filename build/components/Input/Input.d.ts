import { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
declare type InputSize = "lg" | "sm";
declare type sufferTypeProps = ".com" | ".top" | ".cn" | ".org";
declare type preTypeProps = "http://" | "https://" | "www.";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
    /** 设置标签禁用 */
    disabled?: boolean;
    /** 设置标签大小 */
    size?: InputSize;
    icon?: IconProp;
    /** 设置图标前缀 */
    prepend?: string | ReactElement;
    /** 设置图标后缀 */
    append?: string | ReactElement;
    classNames?: String;
    /** 设置前缀类型 */
    preType?: preTypeProps;
    /** 设置后缀类型 */
    sufferType?: sufferTypeProps;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { input } from "vikingship"
 * ~~~
 * 支持 HTMLInput 的所有属性
*/
export declare const Input: FC<InputProps>;
export default Input;
