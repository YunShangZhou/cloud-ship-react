import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

// 传入点击函数属性
const defaultProps = {
  onClick: jest.fn(), // 创建一个被监控的模拟函数
};

// 传入测试属性
const testProps:ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "kclass",
};

// 传入link属性
const linkProps: ButtonProps = {
  btnType: "link",
  href: "www.baidu.com",
  onClick: jest.fn(),
}

// 传入禁止属性
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const msg = "Nice";

// 测试按钮组件
describe("test Button component", () => {
  // 渲染正确的默认按钮
  it("should render correct result", () => {
    const wrapper = render(<Button {...defaultProps}>{msg}</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeTruthy();
    expect(element.disabled).toBeFalsy();
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element); // 模拟函数执行
    expect(defaultProps.onClick).toHaveBeenCalled(); // 是否已被响应
  });

  // 渲染正确的组件，在不同的属性下
  it("should render correct component based on diffrent props", () => {
    const wrapper = render(<Button {...testProps}>{msg}</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg kclass')
  });

  // 渲染一个link,当btn-type为link时
  it("should render correct link when the btn-type is link", () => {
    const wrapper = render(<Button {...linkProps}>{msg}</Button>)
    const element = wrapper.getByText(msg) as HTMLAnchorElement;

    expect(element).toHaveClass('btn btn-link');
    expect(element).toHaveProperty('href');

    fireEvent.click(element);
    expect(linkProps.onClick).toHaveBeenCalled();
  
  });

  // 渲染一个无法点击的按钮当disabled被设置为true时
  it("should render a disabled button when the disabled is set to true", () => {
    const wrapper = render(<Button {...disabledProps}>{msg}</Button>)
    const element = wrapper.getByText(msg) as HTMLButtonElement;
    
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
