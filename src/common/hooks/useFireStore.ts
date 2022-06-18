/* eslint-disable no-unused-vars */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { festivalDataReducer } from "../reducers/festivalDataReducer";
import { db } from "../service/firebase";

export const useFireStore = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const getData = async () => {
    setLoading(true);
    const docRef = doc(db, "data","festival");
    const docSnap = await getDoc(docRef);
    setLoading(false);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return [...data[0], ...data[1]];
  }
  }

  useEffect(() => {
    getData().then((data) => {
      dispatch((festivalDataReducer.actions.storeFestivalData(data!)));
    });
  }, []);

  return loading;
}
