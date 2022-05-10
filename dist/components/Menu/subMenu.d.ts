import React from "react";
export interface SubMenuProps {
    index?: string;
    /** 标题 */
    title: string;
    className?: string;
}
/**
 * ## 说明
 * 作为导航栏的子项，接收的children也是MenuItem
*/
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
