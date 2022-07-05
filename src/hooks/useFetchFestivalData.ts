import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

export default function useFetchFestivalData(page: number) {
  const { items } = useSelector((state: RootState) => state.festivalData);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>([]);

  const sendQuery = useCallback(() => {
    const arrayInRange = items.slice(page, page + 30);
    try {
      setLoading(true);
      setList([...list, ...arrayInRange]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, list };
}
