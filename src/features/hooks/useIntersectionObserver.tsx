import { useCallback, useEffect, useState } from "react";
import axios from 'axios';

export default function useIntersectionObserver(page: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(false);
  const [list, setList] = useState<any>([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const response = await axios.get("http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=0&numOfRows=300&type=json")
      // return response.data.response;
      const data = response.data.response.body.items;
      await setList((prev: any) => [...prev, ...data]);
      setLoading(false);
    } catch(error) {
      setError(error);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, error, list };
}