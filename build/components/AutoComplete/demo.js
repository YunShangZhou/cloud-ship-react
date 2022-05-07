var a = ['1', 'abc', ''];
// in component
var handleChange = function (keyword) {
    // 开发者自己去做多种不同情况的 逻辑处理 props.data.filter();
    // string.prototype上的includes方法
    return a.filter(function (item) { return item.includes(keyword); });
    // 异步请求
    return fetch("url?keyword=".concat(keyword));
};
// 选择回调
var handleSelect = function (item) {
    console.log(item);
};
{ /* <AutoComplete data={a} onSelect={handleSelect} fetchSuggestions={handleChange} /> */ }
export {};
// custom option 用户可以去选择使用
// keyborad support 支持键盘响应
// debounce 防抖提高性能
// click outside 收起下拉菜单
