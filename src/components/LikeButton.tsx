import React, { useState, useEffect } from "react";
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);

  useEffect(() => {
      document.title = `点击了${like}次`;
  }, [like]);

  return (
    <button
      onClick={() => {
        setLike(like + 1);
      }}
    >
      点赞👍 {like}
    </button>
  );
};

export default LikeButton;
