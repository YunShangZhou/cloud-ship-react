import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import className from "classnames";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
type sufferTypeProps = ".com"|".top"| ".cn" | ".org";
type preTypeProps = "http://" | "https://"|"www.";
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
  onChange?: (e: ChangeEvent<HTMLInputElement>)=>void;
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
export const Input: FC<InputProps> = (props) => {
  // 取出各种的属性
  const { disabled, size, icon,preType,sufferType, prepend, append, classNames,style, ...restProps } =
    props;

    if((preType&&prepend)||(sufferType&&append)){
      throw Error("Same direction that shouldn't use double type!");
    }
  // 根据属性计算不同的className
  const classes = className('cloud-input',classNames, {
    [`is-disabled`]: disabled,
    [`size-${size}`]: size,
    [`input-append`]: !! append,
    [`input-prepend`]: !! prepend,
    [`input-preType`]: !! preType,
    [`input-sufferType`]: !! sufferType,
  });

  const iconClasses = className({
    [`icon-class`]: prepend || append,
    [`icon-class-append`]: !! append,
    [`icon-class-prepend`]: !! prepend,
  });


  const fixControlledValue = (value: any) => {
    if (typeof value == "undefined" || value == null){
      return '';
    }
    return value;
  }

  /**
   * 如果说props有传入value
   * 则删除默认值属性
   * 将逻辑处理好的值赋给restProps.value.
  */
  if('value' in props){
      delete restProps.defaultValue;
      restProps.value = fixControlledValue(props.value);
  }


  return (
    // 根据属性判断是否要添加特定的节点
    <div className="cloud-input-container">
      <input className={classes} disabled={disabled} {...restProps} />
      {sufferType && <div className="suffer-class">{sufferType}</div>}
      {preType && <div className="pre-class">{preType}</div>}
      { icon && (prepend || append) && (
        <div className={iconClasses}>
        <Icon  size="1x" icon={icon}></Icon>
        </div>
      )}
    </div>
  );
};

export default Input;
