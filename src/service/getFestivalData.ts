import axios from "axios";
import { ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../util/firebase";

export default function GetFestivalData() {
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
  const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=PsnPqBdiFYqwLlJF6wAm8TjrIHmfHqIpRoH0Pch%2B8%2FYdNtxltESW1eKpCM1RvH3nbTXwl7JFWQE8bdKNnuPtag%3D%3D&pageNo=0&numOfRows=1000&type=json`;
  try {
    setLoading(true);
    const response = await axios.get(URL);
    const items = response.data.response.body.items;
    set(ref(database, 'festivalData/'), {
      ...items
    })
    setLoading(false);
  } catch(error) {
    console.log(error);
  }

  };
  useEffect(() => {
    fetchData();
  }, []);
}
