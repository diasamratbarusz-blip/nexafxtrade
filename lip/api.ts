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
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
    // You can expand this later for global error handling
    return Promise.reject(error)
  }
)

export default API
