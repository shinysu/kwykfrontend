import { useState, useEffect } from "react";

function usePost(url, dataText, defaultResponse) {
  console.log("usePost=",dataText);
  const [data, setData] = useState(defaultResponse);
  const referrer = window.location.href;
  const  requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'custom_referrer':referrer},
    body: JSON.stringify(dataText)
  };
  async function postDataToAPI() {
    try {
      const res = await fetch(url, requestOptions);
      const result = await res.json();
      setData({
        isLoading: false,
        data: result
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
