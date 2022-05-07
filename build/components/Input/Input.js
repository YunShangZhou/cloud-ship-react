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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import className from "classnames";
import Icon from "../Icon/icon";
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { input } from "vikingship"
 * ~~~
 * 支持 HTMLInput 的所有属性
*/
export var Input = function (props) {
    var _a, _b;
    // 取出各种的属性
    var disabled = props.disabled, size = props.size, icon = props.icon, preType = props.preType, sufferType = props.sufferType, prepend = props.prepend, append = props.append, classNames = props.classNames, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "preType", "sufferType", "prepend", "append", "classNames", "style"]);
    if ((preType && prepend) || (sufferType && append)) {
        throw Error("Same direction that shouldn't use double type!");
    }
    // 根据属性计算不同的className
    var classes = className('cloud-input', classNames, (_a = {},
        _a["is-disabled"] = disabled,
        _a["size-".concat(size)] = size,
        _a["input-append"] = !!append,
        _a["input-prepend"] = !!prepend,
        _a["input-preType"] = !!preType,
        _a["input-sufferType"] = !!sufferType,
        _a));
    var iconClasses = className((_b = {},
        _b["icon-class"] = prepend || append,
        _b["icon-class-append"] = !!append,
        _b["icon-class-prepend"] = !!prepend,
        _b));
    var fixControlledValue = function (value) {
        if (typeof value == "undefined" || value == null) {
            return '';
        }
        return value;
    };
    /**
     * 如果说props有传入value
     * 则删除默认值属性
     * 将逻辑处理好的值赋给restProps.value.
    */
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (
    // 根据属性判断是否要添加特定的节点
    React.createElement("div", { className: "cloud-input-container" },
        React.createElement("input", __assign({ className: classes, disabled: disabled }, restProps)),
        sufferType && React.createElement("div", { className: "suffer-class" }, sufferType),
        preType && React.createElement("div", { className: "pre-class" }, preType),
        icon && (prepend || append) && (React.createElement("div", { className: iconClasses },
            React.createElement(Icon, { size: "1x", icon: icon })))));
};
export default Input;
