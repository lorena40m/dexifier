import axios from "axios"

// Create axios client for Rango
const axiosRango = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RANGO_API_URL,
  headers: {
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
  },
})

// Attach Rango API Key for every request
axiosRango.interceptors.request.use((config) => {
  config.params = config.params || {}

  config.params['apiKey'] = process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC

  return config
}, (error) => {
  return Promise.reject(error)
})

// Create axios client for Exolix
const axiosExolix = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXOLIX_API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': process.env.NEXT_PUBLIC_EXOLIX_API_KEY_BASIC,
  },
})

export { axiosRango, axiosExolix }