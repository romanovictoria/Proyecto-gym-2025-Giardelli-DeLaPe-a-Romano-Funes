import { useState, useCallback, useEffect } from "react";

export function useApiRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setData(null);
    setError(null);

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();

      setData(json);
    } catch (err) {
      setError(err);
    }
  }, []);

  return { data, error, request };
}
