import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export declare type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IconProps extends FontAwesomeIconProps {
    /** 颜色主题 */
    theme?: ThemeProps;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
