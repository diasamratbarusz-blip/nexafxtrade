import axios from "axios"

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
      console.error(`[API Error ${error.response.status}]:`, error.response.data)
    } else if (error.request) {
      console.error("[API Network Error]: No response received from server node.")
    } else {
      console.error("[API Configuration Error]:", error.message)
    }
    return Promise.reject(error)
  }
)

export default API
