import { useState, useEffect } from "react";

function useFetch(url, defaultResponse) {
  const [data, setData] = useState(defaultResponse);
  console.log("url=",url);
  async function getDataFromAPI() {
    try {
      const res = await fetch(url);
      const result = await res.json();
      let dataList = result;
      setData({
        isLoading: false,
        data: dataList
      });
    } catch (e) {
      console.error(e);
      setData({
        isLoading: false,
        data: e
      });
    }
  }

  useEffect(() => {
    getDataFromAPI()
  }, [url]);

  return data;
}

export default useFetch;
