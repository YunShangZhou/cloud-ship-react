import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {Button} from "./button";

const defaultButton = () => {
  return <Button onClick={action("clicked")}>default button</Button>;
};

const buttonWithSize = () => {
  return( <Fragment>
    <Button size="lg">large button </Button>
    <Button size="sm">small button </Button>
  </Fragment>)
};

const buttonWithType = () => (

    <Button btnType="primary">primary button</Button>
  
);

storiesOf("Button Component", module)

  .add("Button", defaultButton)
  .add("Large Button", buttonWithSize,{info: { inline: false}})
  .add("Large2 Button", buttonWithSize)
  .add("不同类型 Button", buttonWithType);
