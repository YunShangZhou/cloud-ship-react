import React from "react";
export interface MenuItemProps {
    /** 默认下标 */
    index?: string;
    /** 是否禁用 */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
