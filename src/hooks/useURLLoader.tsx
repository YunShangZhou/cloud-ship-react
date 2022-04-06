import { useState, useEffect } from "react";
import axios from "axios";

const useURLLoader = (url: string, deps: any[] = []) => {
  // 若不加泛型，则data会被判断成null类型
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((result: any) => {
      setData(result.data);
      setLoading(false);
    });
  }, deps);
  return [data, loading];
};

export default useURLLoader;
