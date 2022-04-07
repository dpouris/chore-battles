import axios from "axios";

const BASE_URL = "/api/v1/";

// Axios base instance

const baseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Refresh token

const refreshInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const refreshToken = async () => {
  const response = await refreshInstance.post("auth/refresh/");
  return response;
};

// Interceptors

baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.dir(error);
    if (error.response.status === 500 || error.response.status === 401) {
      const response = await refreshToken();

      if (response.log_out) {
        await baseAxios("auth/logout");
        localStorage.removeItem("lgi");
        window.location.href = "/login";

        return Promise.reject(error);
      }
      return await axios(error.config);
    }
    if (error.status === 403) {
      return { ...error, unauthorized: true };
    }
    return Promise.reject(error);
  }
);

refreshInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.dir(error);
    if (error.response.status === 401) {
      return { ...error, log_out: true };
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
