import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

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

export const MenuContext = createContext<IMenuContext>({ index: "0" });
const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, children, style, mode, onSelect , defaultOpenSubMenus} = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  function handleClick(index: string) {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const passMenuItemValue = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  // 目的:对每个节点进行渲染检查
  const renderChildren = () => {
    // map循环children,获取每个节点的实例及下标。
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type; // 从type中取displayName
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 用克隆节点的方法，可以将属性传入克隆属性
        return React.cloneElement(childElement, {
          index: String(index),
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not the MenuItem component!"
        );
      }
    });
  };

  return (
    <ul style={style} className={classes} data-testid="test-menu">
      <MenuContext.Provider value={passMenuItemValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus:[],
};

export default Menu;
