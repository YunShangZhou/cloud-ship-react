import { ReactNode, AnchorHTMLAttributes, FC, ButtonHTMLAttributes } from "react";
export declare type ButtonSize = "lg" | "sm";
export declare type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用*/
    disabled?: boolean;
    /**设置 Button 的尺寸*/
    size?: ButtonSize;
    /**规定 Button 的类型*/
    btnType?: ButtonType;
    children: ReactNode;
    /**规定 Button 为Link时的跳转链接*/
    href?: string;
}
/**
 * 做一个交叉类型，使组件可以兼容原生方法
 * 做类型别名，交叉上buttonProps与React原生 button、a方法
 */
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AhchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AhchorButtonProps>;
/**
 * 基于原生button，进行外观上的属性适配。
 */
export declare const Button: FC<ButtonProps>;
export default Button;
