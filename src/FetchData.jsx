import { useEffect, useState } from 'react';

function useFetch({ apiUrl }) {
  const [data, setData] = useState([]);

  const fetchData = async (apiUrl) => {
    const response = await fetch(apiUrl);
    try {
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(apiUrl);
  }, [apiUrl]);

  return data;
}

export default useFetch;
