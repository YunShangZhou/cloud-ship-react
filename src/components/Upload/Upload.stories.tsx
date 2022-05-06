import React from "react";
import Upload from "./upload";
// import  { UploadFile } from "./upload";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Icon from "../Icon/icon";
// const defaultFileList: UploadFile[] = [
//   {
//     uid: "123",
//     size: 1234,
//     name: "hello.md",
//     status: "uploading",
//     percent: 22,
//   },
//   { uid: "345", size: 2222, name: "xxxx.md", status: "success", percent: 44 },
//   { uid: "678", size: 3333, name: "zzzz.md", status: "error", percent: 66 },
//   { uid: "910", size: 444, name: "cccc.md", status: "ready", percent: 88 },
// ];

// const checkFileSize = (file: File) => {
//   // 对文件的大小做判断,单位为 kb
//   // file.size的单位是B，所以要除以1024，以kb为单位。
//   if (Math.round(file.size / 1024) > 50) {
//     alert("file too big");
//     return false;
//   }
//   return true;
// };

// const filePromise = (file: File) => {
//   // 创建一个File类型,参数按次序为，数组（存入文件），名字，配置（对象形式，type)
//   const newFile = new File([file], "new_name.docx", { type: file.type });
//   return Promise.resolve(newFile);
// };

const defaultUpload = () => {
  return (
    <>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        onProgress={action("onProgress")}
        onSuccess={action("onSuccess")}
        onError={action("onError")}
        onChange={action("changed")}
        // beforeUpload={filePromise}
        // defaultFileList={defaultFileList}
        name="fileName"
        data={{ key: "value" }}
        headers={{ "X-Powered-By": "vikingship" }}
        // accept=".png"
        
        multiple
        drag
      >

        <Icon icon="upload" size="5x" theme={"secondary"} />
        <br />
        <p>Drag file over to upload</p>
      </Upload>
    </>
  );
};

storiesOf("Upload Component Show", module).add("Upload", defaultUpload);
