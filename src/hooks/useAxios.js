import { useState, useEffect } from "react";
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
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {}, []);

  return { loading, error, data, makeRequest };
};

export default useAxios;
