import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var className = props.className, defaultIndex = props.defaultIndex, children = props.children, style = props.style, mode = props.mode, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("viking-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    function handleClick(index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }
    var passMenuItemValue = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    // 目的:对每个节点进行渲染检查
    var renderChildren = function () {
        // map循环children,获取每个节点的实例及下标。
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName; // 从type中取displayName
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                // 用克隆节点的方法，可以将属性传入克隆属性
                return React.cloneElement(childElement, {
                    index: String(index),
                });
            }
            else {
                console.error("Warning: Menu has a child which is not the MenuItem component!");
            }
        });
    };
    return (React.createElement("ul", { style: style, className: classes, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passMenuItemValue }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: [],
};
export default Menu;
