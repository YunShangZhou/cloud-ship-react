import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    className?: string;
    /** 默认选中值 */
    defaultIndex?: string;
    style?: React.CSSProperties;
    /** 模式:横向/纵向 */
    mode?: MenuMode;
    children?: React.ReactNode;
    /** 选择回调 */
    onSelect?: SelectCallback;
    /** 子菜单默认打开下标 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: string;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * 拥有横向纵向，可设置默认选中值以及子菜单的导航栏。
*/
export declare const Menu: React.FC<MenuProps>;
export default Menu;
