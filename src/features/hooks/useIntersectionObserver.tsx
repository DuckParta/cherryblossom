import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import { fetchFestivalData } from "../async/fetchFestivalData";
import { festivalDataReducer } from "../reducers/festivalDataReducer";

export default function useIntersectionObserver(page: any) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(false);
  const [list, setList] = useState<any>([]);

  const sendQuery = useCallback(async () => {
    const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=${page}&numOfRows=20&type=json`;
    try {
      await setLoading(true);
      await dispatch(fetchFestivalData());
      const response = await axios.get(URL);
      await setLoading(false);
      const items = response.data.response.body.items;
      if(items) {
        await setList((prev: any) => [...new Set([...prev, ...items])]);
        await dispatch(festivalDataReducer.actions.getFestivalData(items));
      }
      
    } catch(error) {
      setError(error);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, list };
}