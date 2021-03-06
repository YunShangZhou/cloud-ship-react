import "@testing-library/jest-dom/extend-expect";
import React from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
  queryByLabelText,
} from "@testing-library/react";

import { Upload, UploadProps } from "./upload";
import { create } from "domain";

jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }: any) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    console.log("wrapper--------", wrapper);
    fileInput = wrapper.container.querySelector(
      ".viking-file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Click to upload") as HTMLInputElement;
  });
  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // expect(queryByText("spinner")).toBeInTheDocument();
    await wait(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    // expect(queryByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //remove the uploaded file
    expect(queryByText("times")).toBeInTheDocument();
    const timesEle = queryByText("times") as HTMLElement;
    fireEvent.click(timesEle);
    expect(queryByText("text.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      // ???????????????file????????????????????????????????????expect.objectContaing?????????????????????????????????????????????file?????????
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });

  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");

    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    
    // ??????????????????createEvent.drop???????????????drop???????????????fireEvent?????????????????????
    fireEvent(uploadArea,mockDropEvent);

    // ?????????????????????
    // fireEvent.drop(uploadArea, {
    //   dataTransfer: {
    //     files: [testFile],
    //   },
    // });

    await wait(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool',testFile);
  });


});
