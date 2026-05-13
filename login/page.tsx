"use client"

import { useState } from "react"
import API from "../../lib/api"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem(
        "token",
        res.data.token
      )

      alert("Login Successful")

      window.location.href = "/dashboard"

    } catch (error) {
      console.log(error)
      alert("Login Failed")
    }
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  )
}
