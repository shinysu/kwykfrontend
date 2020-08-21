import { useState, useEffect } from "react";
import * as constant from './constants'

function usePost(url, dataText, defaultResponse) {
  console.log("usePost=",dataText);
  const [data, setData] = useState(defaultResponse);
  const  requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dataText)
  };
  async function postDataToAPI() {
    try {
      const res = await fetch(url, requestOptions);
      const result = await res.json();
      let dataList = result.text;
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
    postDataToAPI()
  }, [url]);

  return data;
}

export default usePost;
