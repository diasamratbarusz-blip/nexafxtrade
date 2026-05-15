"use client"

import { useState } from "react"
import API from "../../lib/api"

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    try {

      const res = await API.post("/auth/register", {
        name,
        email,
        password
      })

      alert("Registered Successfully")

      localStorage.setItem("token", res.data.token)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Create Account</h1>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

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

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  )
}
