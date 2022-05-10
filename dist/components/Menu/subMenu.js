var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
/**
 * ## 说明
 * 作为导航栏的子项，接收的children也是MenuItem
*/
export var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpened = index && context.mode === "vertical"
        ? openedSubMenus.includes(index)
        : false;
    var _b = useState(isOpened), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    var ulClasses = classNames("viking-submenu", {
        "menu-opened": menuOpen,
        "menu-closed": !menuOpen,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    function handleClick(e) {
        // e.preventDefault();
        setOpen(!menuOpen);
        if (context.onSelect && index !== undefined && index !== null) {
            context.onSelect(index);
        }
    }
    var timer;
    var handleMouse = function (e, toggle, delay) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, delay);
    };
    var mouseEvent = context.mode === "vertical"
        ? {
            onClick: function (e) {
                handleClick(e);
            },
        }
        : {};
    var hoverEvent = context.mode === "horizontal"
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true, 300);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false, 300);
            },
        }
        : {};
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error("Warning:SubMenu has a child which is not MenuItem component.");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: ulClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvent),
        React.createElement("div", __assign({ className: "submenu-title" }, mouseEvent),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
