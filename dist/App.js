import React, { useState, useEffect } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Transiton from "./components/Transition/transition";
import Input from "./components/Input/Input";
import axios from "axios";
var App = function () {
    var _a = useState(false), isShow = _a[0], setShow = _a[1];
    var _b = useState(""), title = _b[0], setTitle = _b[1];
    var postData = {
        title: "my title",
        body: "hello"
    };
    function toggleHello() {
        setShow(!isShow);
    }
    useEffect(function () {
        // get请求
        axios.get("http://jsonplaceholder.typicode.com/posts/1", {
            headers: {
                'X-Requested-With': "XMLHttpRequest",
                "abc": "1234",
            },
            responseType: "json"
        }).then(function (res) {
            console.log("res", res);
            setTitle(res.data.title);
        });
        // post请求
        axios.post("http://jsonplaceholder.typicode.com/posts", postData).then(function (res) {
            console.log("post response", res);
        });
    });
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("div", null, title),
            React.createElement(Menu, { defaultIndex: "0", mode: "vertical", onSelect: function (index) {
                    console.log(index);
                }, defaultOpenSubMenus: ["3"] },
                React.createElement(MenuItem, null, "render li-1"),
                React.createElement(MenuItem, { disabled: true }, "render li-2"),
                React.createElement(MenuItem, null, "render li-3"),
                React.createElement(SubMenu, { title: "\u6D4B\u8BD5sub" },
                    React.createElement(MenuItem, null, "render li-1"),
                    React.createElement(MenuItem, { disabled: true }, "render li-2"),
                    React.createElement(MenuItem, null, "render li-3")),
                React.createElement(MenuItem, null, "render li-4")),
            React.createElement(Icon, { theme: "primary", icon: "coffee", size: "3x" }),
            React.createElement(Icon, { theme: "primary", icon: "arrow-down", size: "1x" }),
            React.createElement(Transiton, { in: isShow, timeout: 300, wrapper: true, animation: "zoom-in-left" },
                React.createElement("div", null,
                    React.createElement("h1", null, "Hello World"),
                    React.createElement("h2", null, "Hello World"),
                    React.createElement("h3", null, "Hello World"),
                    React.createElement("h4", null, "Hello World")),
                React.createElement(Button, { btnType: "link", href: "https://www.baidu.com" }, "\u767E\u5EA6\u4E00\u4E0B")),
            React.createElement(Button, { btnType: "primary", size: "lg" }, "primary button"),
            React.createElement(Button, { btnType: "danger", size: "sm", disabled: true }, "dagner button"),
            React.createElement(Button, { btnType: "default", onClick: function () {
                    toggleHello();
                } }, "toggle button"),
            React.createElement(Input, { size: "lg", icon: "coffee", disabled: true, sufferType: ".com", prepend: "true" }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(Input, { size: "lg", icon: "coffee", preType: "www.", append: "true" }),
            React.createElement("code", null, "const a = \"b\""),
            React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
};
export default App;
