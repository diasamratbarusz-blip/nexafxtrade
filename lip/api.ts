import axios from "axios"

/**
 * NEXAFX API CONFIGURATION MODULE
 * Logic: Auto-switches between local development and Render production backend.
 */

// ✅ Auto-switch between local and production backend
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nexapayfx-backend.onrender.com/api"
    : "http://localhost:5000/api"

// ✅ Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// ✅ Optional: Request interceptor (useful for tokens later)
API.interceptors.request.use(
  (config) => {
    // Check if window is defined to avoid Next.js Server-Side Rendering (SSR) reference errors
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ✅ Optional: Response interceptor (better error handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling matrix hook
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error(`[API Error ${error.response.status}]:`, error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("[API Network Error]: No response received from server node.")
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("[API Configuration Error]:", error.message)
    }
    return Promise.reject(error)
  }
)

export default API
