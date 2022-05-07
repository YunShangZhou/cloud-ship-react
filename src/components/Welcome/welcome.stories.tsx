import React from "react";
import { storiesOf } from "@storybook/react";

const defaultProps = () => {
return (

<div>
  <h1>Welcome use cloudship</h1>
  <p>cloudship 为个人开发的组件库</p>
  <h3>
    安装命令
    <span role="img" aria-label="向下看">
      👇
    </span>
  </h3>
  <code>npm install cloudship --save</code>
</div>
); };

storiesOf("welcomePage", module).add("defaultProps", defaultProps, {
info: { disabled: false },
});
