import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 声明更新函数
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", (e) => {
      updatePosition(e);
    });
    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return position;
};

export default useMousePosition;
