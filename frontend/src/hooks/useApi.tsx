import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useApi = () => {
  const resetAuthStore = useAuthStore((store) => store.reset);
  const accessToken = useAuthStore((store) => store.accessToken);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_API_DEVELOPMENT
        : import.meta.env.VITE_API_PRODUCTION,

    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: false,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        resetAuthStore();
        navigate("/login");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return { api };
};
