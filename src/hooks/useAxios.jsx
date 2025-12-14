import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://clubsphere-server-three.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
