import React from "react";
import { config } from "react-transition-group";
import { fireEvent, render, RenderResult, wait } from "@testing-library/react";
import {
  AutoComplete,
  AutoCompleteProps,
  // DataSourceType,
} from "./autoComplete";
config.disabled = true;

const testArray = [
  { value: "a", number: 11 },
  { value: "ab", number: 3 },
  { value: "b", number: 4 },
  { value: "c", number: 5 },
  { value: "c1", number: 55 },
  { value: "c2", number: 54 },
  { value: "c3", number: 53 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

// const renderOptionProps: AutoCompleteProps = {
//   fetchSuggestions: (query) => {
//     return testArray.filter((item) => item.value.includes(query));
//   },
//   onSelect: jest.fn(),
//   placeholder: "options-complete",
//   //   renderOption: jest.fn(),
// };

let wrapper: RenderResult, inputNode: HTMLInputElement;
// optionsWrapper: RenderResult,
// optionsInputNode: HTMLInputElement;
describe("autoComplete testing", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;

    //   optionsWrapper = render(<AutoComplete {...renderOptionProps} />);
    //   optionsInputNode = optionsWrapper.queryByPlaceholderText(
    //     "options-complete"
    //   ) as HTMLInputElement;
  });

  //   it("test basic AutoComplete behavior", async () => {
  //     expect(inputNode).toBeInTheDocument();
  //     expect(inputNode).toHaveClass("cloud-input");
  //     expect(inputNode.value).toEqual("");

  //     // input change
  //     fireEvent.change(inputNode, { target: { value: "a" } });
  //     await wait(() => {
  //       expect(wrapper.queryByText("ab")).toBeInTheDocument();
  //     });

  //     // should have two suggetion items
  //     expect(
  //       wrapper.container.querySelectorAll(".suggestions-item").length
  //     ).toEqual(2);

  //     // click first item
  //     fireEvent.click(wrapper.getByText("a"));

  //     // onSelect callback
  //     expect(testProps.onSelect).toHaveBeenCalledWith({ value: "a", number: 11 });

  //     // suggestions-item visual should be close
  //     expect(wrapper.queryByText("a")).not.toBeInTheDocument();

  //     // get value
  //     expect(inputNode.value).toEqual("a");
  //   });

  //   it("should provide keyboard support", async () => {
  //     fireEvent.change(inputNode, { target: { value: "a" } });
  //     await wait(() => {
  //       expect(wrapper.queryByText("ab")).toBeInTheDocument();
  //     });
  //     const firstElement = wrapper.queryByText("a");
  //     const secondElement = wrapper.queryByText("ab");

  //     // arrow-down
  //     fireEvent.keyDown(inputNode, { keyCode: 40 });
  //     expect(firstElement).toHaveClass("highlight-item");

  //     // arrow-down
  //     fireEvent.keyDown(inputNode, { keyCode: 40 });
  //     expect(secondElement).toHaveClass("highlight-item");

  //     // arrow-up
  //     fireEvent.keyDown(inputNode, { keyCode: 38 });
  //     expect(firstElement).toHaveClass("highlight-item");

  //     // enter
  //     fireEvent.keyDown(inputNode, { keyCode: 13 });
  //     expect(testProps.onSelect).toHaveBeenCalledWith({
  //       value: "a",
  //       number: 11,
  //     });
  //     expect(firstElement).not.toBeInTheDocument();
  //     expect(inputNode.value).toBe("a");
  //   });

  //   it("click outside should hide the dropdown", async () => {
  //     fireEvent.change(inputNode, { target: { value: "a" } });
  //     await wait(() => {
  //       expect(wrapper.queryByText("ab")).toBeInTheDocument();
  //     });

  //     fireEvent.click(document);
  //     expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  //   });

  //   it("renderOption should generate the right template", async () => {
  //     // fireEvent.change(optionsInputNode, { target: { value: "a" } });
  //     // await wait(() => {
  //     //   expect(optionsWrapper.queryByText("a")).toBeInTheDocument();
  //     // });
  //     // const aItem = optionsWrapper.queryByText("a");
  //     // expect(ele?.querySelectorAll("h2").length).toEqual(2);
  //   });

  it("async fetchSuggestions should works fine", async () => {
    expect(inputNode).toBeInTheDocument();
    expect(inputNode).toHaveClass("cloud-input");
    expect(inputNode.value).toEqual("");

    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });

    // should have two suggetion items
    expect(
      wrapper.container.querySelectorAll(".suggestions-item").length
    ).toEqual(2);

    // click first item
    fireEvent.click(wrapper.getByText("a"));

    // onSelect callback
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "a", number: 11 });

    // suggestions-item visual should be close
    expect(wrapper.queryByText("a")).not.toBeInTheDocument();

    // get value
    expect(inputNode.value).toEqual("a");
  });
});
