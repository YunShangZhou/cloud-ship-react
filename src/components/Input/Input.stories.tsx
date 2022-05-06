import React, {  useState } from "react";
import { storiesOf } from "@storybook/react";
import Input from "./Input";
const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      defaultValue="123"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

// import { within } from "@testing-library/react";

// 默认Input
const defaultInput = () => {
  return (
    <>
      <Input />
      <ControlledInput />
    </>
  );
};

// 禁用Input
const disabledInput = () => {
  return <Input disabled />;
};

// 小字号
const smInput = () => {
  return <Input  size="sm" />;
};

// 大字号
const lgInput = () => {
  return <Input  size="lg" />;
};

// 咖啡图标前缀，.com后缀
const coffeePreAndcomSufferInput = () => {
  return <Input prepend="true" icon="coffee" sufferType=".com" />;
};

// 下箭头图标后缀，www.前缀
const arrowdownSufferAndwwwPreInput = () => {
  return <Input append="true" icon="arrow-down" preType="www." />;
};

storiesOf("Input组件展示", module)
  .add("Input", defaultInput)
  .add("禁用 Input", disabledInput)
  .add("小字号Input", smInput)
  .add("大字号Input", lgInput)
  .add("前后缀咖啡 .com Input", coffeePreAndcomSufferInput)
  .add("前后缀www. 下箭头 Input", arrowdownSufferAndwwwPreInput);
