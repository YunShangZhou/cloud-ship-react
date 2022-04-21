import React from "react";
import {Column} from './Column';
import { storiesOf } from "@storybook/react";
import {withInfo} from "@storybook/addon-info"
const defaultColumn = ()=>{
    return (
        <Column />
    )
} 


storiesOf("Column Test",module)
//@ts-ignore
.addDecorator(withInfo)
.addParameters({
    info:{
        text:`
          this is a famous document for column.
          ## show a script
          ~~~js
            console.log("the column")
          ~~~
        `,
        inline:true,
    }
})
.add("default Column",defaultColumn)