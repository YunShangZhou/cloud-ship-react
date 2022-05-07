import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    className?: string;
    defaultIndex?: string;
    style?: React.CSSProperties;
    mode?: MenuMode;
    children?: React.ReactNode;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: string;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
