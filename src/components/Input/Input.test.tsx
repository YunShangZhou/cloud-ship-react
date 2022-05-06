import Input, { InputProps } from "./Input";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas);
// 默认属性测试
const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "default",
};

// 字号大小测试
const lgProps: InputProps = {
  size: "lg",
  placeholder: "lgProps",
};

// 禁用测试
const disabledProps: InputProps = {
  disabled: true,
  placeholder: "disabledProps",
};

// 前后缀测试
const PreSufferProps: InputProps = {
  preType: "http://",
  append: "coffee",
  placeholder: "preSufferProps",
  onChange: jest.fn(),
};

// 生成Input
const GenerateInput = () => {
  return (
    <div>
      <Input {...defaultProps} />
      <Input {...lgProps} />
      <Input {...PreSufferProps} />
      <Input {...disabledProps} />
    </div>
  );
};

let wrapper: RenderResult;
let defaultEle: HTMLInputElement | HTMLElement;
let lgEle: HTMLInputElement | HTMLElement;
let disabledEle: HTMLInputElement | HTMLElement;
describe("做一个基本功能的测试", () => {
  beforeEach(() => {
    wrapper = render(<GenerateInput></GenerateInput>);
    defaultEle = wrapper.getByPlaceholderText("default");
    lgEle = wrapper.getByPlaceholderText("lgProps");
    disabledEle = wrapper.getByPlaceholderText("disabledProps");
  });

  it("默认Input测试", () => {
    expect(defaultEle).toHaveClass("cloud-input");
    expect(defaultEle).toBeInTheDocument();
  });

  it("字号Input测试", () => {
    expect(lgEle).toHaveClass("cloud-input size-lg");
    expect(lgEle).toBeInTheDocument();
  });

  it("禁用Input测试", () => {
    expect(disabledEle).toHaveClass("cloud-input is-disabled");
    fireEvent.click(disabledEle);
    expect(disabledEle).not.toHaveFocus();
  });

  it("前后缀Input测试", () => {
    const PreSufferElement = wrapper.getByPlaceholderText("preSufferProps") as HTMLInputElement;
    expect(PreSufferElement).toHaveClass(
      "cloud-input input-append input-preType"
    );
    expect(PreSufferElement).toBeInTheDocument();

    fireEvent.change(PreSufferElement, { target: { value: "123" } });
    expect(PreSufferProps.onChange).toHaveBeenCalled();
    expect(PreSufferElement.value).toEqual("123");
  });
});
