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
import React, { useEffect, useState, useRef, } from "react";
import Input from "../Input/Input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from '../Transition/transition';
import classNames from "classnames";
/**
 * ## 介绍
 * Input的进一步扩展，自动适配索引值,列出相关项。
*/
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOption", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showList = _d[0], setShowList = _d[1];
    var isSearch = useRef(false);
    var componentRef = useRef(null);
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var debounceValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, function () {
        setShowList(false);
    });
    console.log("suggestions", suggestions);
    useEffect(function () {
        if (debounceValue && !isSearch.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                console.log("trigger");
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    setShowList(true);
                });
            }
            else {
                setSuggestions(results);
                setShowList(true);
            }
        }
        else {
            setShowList(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        isSearch.current = false;
    };
    var hanldeHighlight = function (index) {
        if (index < 0) {
            setHighlightIndex(0);
            return;
        }
        if (index > suggestions.length - 1)
            return;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                handleSelect(suggestions[highlightIndex]);
                break;
            case 38:
                hanldeHighlight(highlightIndex - 1);
                break;
            case 40:
                hanldeHighlight(highlightIndex + 1);
                break;
            case 27:
                setShowList(false);
                break;
            default:
                break;
        }
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowList(false);
        isSearch.current = true;
        if (onSelect) {
            console.log("存在且使用onSELECT");
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: loading || showList, onExited: function () { setSuggestions([]); }, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: "drop-down" }, loading ? (React.createElement("div", { className: "loading-container" }, loading && React.createElement(Icon, { icon: "spinner", spin: true, size: "2x" }))) : (suggestions.map(function (item, index) {
                var cnames = classNames("suggestions-item", {
                    "highlight-item": index === highlightIndex,
                });
                return (React.createElement("li", { key: index, className: cnames, onClick: function () {
                        handleSelect(item);
                    } }, renderTemplate(item)));
            })))));
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onKeyDown: handleKeyDown, onChange: handleChange }, restProps)),
        suggestions.length > 0 && generateDropdown()));
};
