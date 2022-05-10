import { FC } from "react";
import { MenuProps } from './menu';
import { SubMenuProps } from "./subMenu";
import { MenuItemProps } from "./menuItem";
export declare type IMenuCompoent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuCompoent;
export default TransMenu;
