import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { festivalDataReducer } from "../reducers/festivalDataReducer";

export default function useIntersectionObserver(page: number) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const sendQuery = useCallback(async () => {
    const URL = `api/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&type=json&numOfRows=30&pageNo=${page}`;
    try {
      setLoading(true);
      const response = await axios.get(URL);
      setLoading(false);
      const items = response.data.response.body.items;
      if (!items) {
        // 에러 처리
        return;
      }
      await dispatch(festivalDataReducer.actions.getFestivalData(items));
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading };
}
