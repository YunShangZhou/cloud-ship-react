import React, {
  ReactNode,
  AnchorHTMLAttributes,
  FC,
  ButtonHTMLAttributes,
} from "react";
import classNames from "classnames";

// 注明size、type类型
export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link"

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
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AhchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// 但这样写交叉类型，在a链接上无法写上button属性，反之亦然。则应该使用Partial让他们都成为可选属性。
export type ButtonProps = Partial<NativeButtonProps & AhchorButtonProps>;

/**
 * 这是我们的第一个Button组件
 * ## Button header
 * ~~~js
 * import {Button} from "cloudship"
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const { className, btnType, disabled, size, children, href, ...restProps } =
    props;

  // 如果属性没有传，那么undefined将不会当作class被添加上去
  // btn, btn-lg, btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType, // 冒号后面的值将自动转化为true
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a {...restProps} className={classes} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button {...restProps} className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
