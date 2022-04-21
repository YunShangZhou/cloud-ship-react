import "!style-loader!css-loader!sass-loader!../src/styles/index.scss";
import { addDecorator ,addParameters} from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
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
const CenterDecorator = (storyFn) => <div style={containerPadding}>
  <h3>组件演示</h3>
  {storyFn()}</div>;
addDecorator(CenterDecorator);


addDecorator(withInfo)
addParameters({
  info:{
    inline: true,// 是否显示
    header: false,// 不显示头部
  }
})