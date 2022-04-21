import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

jest.setTimeout(30000);

const testHorProps: MenuProps = {
  onSelect: jest.fn(),
  className: "test",
  defaultIndex: "0",
};

const testVerProps: MenuProps = {
  onSelect: jest.fn(),
  mode: "vertical",
  defaultIndex: "0",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
        <MenuItem>drop2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `.viking-submenu {
  display: none;
}
  .viking-sumenu.menu-opened {
    display: block;
  }
`;

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  testProps: MenuProps,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  // 通用函数，在每个函数调用之前都会跑。
  beforeEach(() => {
    testProps = testHorProps;
    wrapper = render(generateMenu(testProps));

    wrapper.container.append(createStyleFile());

    // 相当于 wrapper.container.getElementByClassName("xxx")
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu  test");
    expect(menuElement.querySelectorAll(":scope >li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    const activeElement = wrapper.getByText("active");
    expect(menuElement).toHaveClass("menu-vertical");

    fireEvent.click(activeElement);
    expect(activeElement).toHaveClass("is-active menu-item");
    expect(testVerProps.onSelect).toHaveBeenCalledWith("0");
  });

  // it("shoulder render dropdown items when hover on submenu component", async () => {
  //     expect(wrapper.queryByText("drop1")).not.toBeVisible();
  //     const dropdownElement = wrapper.getByText("dropdown");
  //     fireEvent.mouseEnter(dropdownElement);

  //     await wait(()=>{
  //       expect(wrapper.getByText("drop1")).toBeVisible();
  //     })

  //     fireEvent.click(wrapper.getByText("drop1"));
  //     expect(testProps.onSelect).toBeCalledWith("3-0");
  // });
});
