import React from 'react';


interface IHelloProps {
    message?: string;
}

// React.FuncitonComponent类型，支持传入一个泛型
const Hello: React.FC<IHelloProps> = (props) => {
    return <h2>{props.message}</h2>
}


// 定义默认属性值
Hello.defaultProps = {
    message: "Hello World"
}
export default Hello;