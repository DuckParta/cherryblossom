/* eslint-disable no-unused-vars */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { festivalDataReducer } from "../reducers/festivalDataReducer";

export default function useIntersectionObserver(page: number) {
  // const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.festivalDataReducer);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>([]);

  const sendQuery = useCallback(() => {
    // const getArrayInRange = (start: number, end: number) => {
    //   return Array.from(currentFestival(end - start).keys()).map((v: any)=>v+start).map((v: any)=>v);
    // }
    const arrayInRange = items.slice(page, page + 30);
    // const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=${page}&numOfRows=30&type=json`;
    try {
      setLoading(true);
      setList([...list, ...arrayInRange]);
      // const response = await axios.get(URL);
      setLoading(false);
      // const items = response.data.response.body.items;
      // if (!items) {
      //   // 에러 처리
      //   return;
      // }
      // await dispatch(festivalDataReducer.actions.getFestivalData(items));
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, list };
}
