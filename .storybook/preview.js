import "!style-loader!css-loader!sass-loader!../src/styles/index.scss";
import { addDecorator ,addParameters} from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

// .storybook/preview.js
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const containerPadding = {
  padding: "20px 40px",
};

// 装饰器,形参为函数式组件
// storyFn参数为整个 xx.stories.tsx上下文内容。
const CenterDecorator = (storyFn) => <div style={containerPadding}>
  <h3>组件演示</h3>
  {storyFn()}</div>;
addDecorator(CenterDecorator);

// 显示showInfo按钮，可查看组件源码 parameters属性列表。
addDecorator(withInfo)
addParameters({
  info:{
    inline: true,// 是否显示
    header: false,// 不显示头部
  }
})