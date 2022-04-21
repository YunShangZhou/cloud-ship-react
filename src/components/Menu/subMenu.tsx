import React, { useContext, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  //   children?: React.ReactNode;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  const ulClasses = classNames("viking-submenu", {
    "menu-opened": menuOpen,
    "menu-closed": !menuOpen,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  function handleClick(e: React.MouseEvent) {
    // e.preventDefault();
    setOpen(!menuOpen);
    if (context.onSelect && index !== undefined && index !== null) {
      context.onSelect(index);
    }
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean, delay: number) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, delay);
  };

  const mouseEvent =
    context.mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => {
            handleClick(e);
          },
        }
      : {};

  const hoverEvent =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true, 300);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false, 300);
          },
        }
      : {};

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning:SubMenu has a child which is not MenuItem component."
        );
      }
    });

    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={ulClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title" {...mouseEvent} {...hoverEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};
SubMenu.displayName = "SubMenu";

export default SubMenu;
