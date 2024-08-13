import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RANGO_API_URL,
  headers: { Accept: "*/*" },
});
