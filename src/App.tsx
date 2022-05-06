import React, { useState,useEffect } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Transiton from "./components/Transition/transition";
import Input from "./components/Input/Input";
import axios from "axios";

const App: React.FC = () => {
  const [isShow, setShow] = useState(false);
  const [title,setTitle] = useState("");
  const postData = {
    title: "my title",
    body: "hello"
  }
  function toggleHello() {
    setShow(!isShow);
  }
  
  useEffect(()=>{
    // get请求
    axios.get("http://jsonplaceholder.typicode.com/posts/1",{
      headers: {
        'X-Requested-With':"XMLHttpRequest",
        "abc":"1234",
      },
      responseType:"json"
    }).then(res=>{
      console.log("res",res);
      setTitle(res.data.title);
    })

    // post请求
    axios.post("http://jsonplaceholder.typicode.com/posts",postData).then(res=>{
      console.log("post response",res);
    })

  })

  return (
    <div className="App">
      <header className="App-header">
        <div>{title}</div>
        <Menu
          defaultIndex={"0"}
          mode="vertical"
          onSelect={(index) => {
            console.log(index);
          }}
          defaultOpenSubMenus={["3"]}
        >
          <MenuItem>render li-1</MenuItem>
          <MenuItem disabled>render li-2</MenuItem>
          <MenuItem>render li-3</MenuItem>

          <SubMenu title="测试sub">
            <MenuItem>render li-1</MenuItem>
            <MenuItem disabled>render li-2</MenuItem>
            <MenuItem>render li-3</MenuItem>
          </SubMenu>
          <MenuItem>render li-4</MenuItem>
        </Menu>
        <Icon theme="primary" icon="coffee" size="3x"></Icon>
        <Icon theme="primary" icon="arrow-down" size="1x"></Icon>

        <Transiton in={isShow} timeout={300} wrapper={true} animation="zoom-in-left">
          <div>
            <h1>Hello World</h1>
            <h2>Hello World</h2>
            <h3>Hello World</h3>
            <h4>Hello World</h4>
          </div>
          <Button btnType="link" href="https://www.baidu.com">百度一下</Button>
        </Transiton>
        <Button btnType="primary" size="lg">
          primary button
        </Button>
        <Button btnType="danger" size="sm" disabled>
          dagner button
        </Button>
        <Button
          btnType="default"
          onClick={() => {
            toggleHello();
          }}
        >
          toggle button
        </Button>
        
        {/* Input组件测试 */}
        <Input size="lg" icon="coffee" disabled sufferType=".com" prepend="true"/>
        <br/><br/><br/>
        <Input size="lg" icon="coffee" preType="www."  append="true"/>
        <code>const a = "b"</code>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
