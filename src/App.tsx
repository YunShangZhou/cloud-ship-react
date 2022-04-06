import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello'
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import useURLLoader from './hooks/useURLLoader';

interface response{
  message: string;
  status: string;
}

const App: React.FC = function() {

  const [show,setShow] = useState(true);
  const [data,loading] = useURLLoader("https://dog.ceo/api/breeds/image/random",[show]);
  const res = data as response ; // 类型断言


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <Hello message="no Hello"></Hello> */}
        <button onClick={()=>{
          setShow(!show)
        } }>refresh the photo</button>
        {loading ? `🐕狗狗加载中...` : (<img style={{width:'50px'}} src={res && res.message} />)}
        <MouseTracker />
        <LikeButton />
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
}

export default App;
