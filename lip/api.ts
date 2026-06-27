import axios from "axios"

/**
 * NEXAFX API CONFIGURATION MODULE
 * Logic: Auto-switches between local development and Vercel production backend.
 */

// ✅ Auto-switch between local and production backend
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nexapayfx-backend.vercel.app/api" // UPDATED: Changed from Render to Vercel
    : "http://localhost:5000/api"

// ✅ Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// ✅ Request interceptor (Automatically adds the login token to every request)
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

// ✅ Response interceptor (Better error handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response) {
      // The server responded with an error (like 401 or 500)
      console.error(`[API Error ${error.response.status}]:`, error.response.data)
    } else if (error.request) {
      // The request was made but no response was received (Server is down)
      console.error("[API Network Error]: No response received from server node.")
    } else {
      // Something happened in setting up the request
      console.error("[API Configuration Error]:", error.message)
    }
    return Promise.reject(error)
  }
)

export default API
