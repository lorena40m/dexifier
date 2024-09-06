import axios from "axios";

export const axiosBrowserClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RANGO_API_URL,
  headers: {
    Accept: "*/*",
    'Access-Control-Allow-Origin': '*'
  },
});

export const axiosNoWalletClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXOLIX_API_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': process.env.NEXT_PUBLIC_EXOLIX_API_KEY_BASIC
  },
})
