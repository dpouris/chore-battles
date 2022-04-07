import { useState } from "react";
import baseAxios from "../helpers/axios";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const makeRequest = async (method, url, body = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await baseAxios[method](url, body);
      setData(response.data);
    } catch (err) {
      setError(err.response.data);
    }
    setLoading(false);
  };

  return { loading, error, data, makeRequest };
};

export default useAxios;
