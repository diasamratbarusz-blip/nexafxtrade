"use client"

import { useEffect } from "react"

export default function Dashboard() {

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      window.location.href = "/login"
    }

  }, [])

  return (
    <div style={{ padding: 40 }}>

      <h1>Dashboard</h1>

      <p>Wallet Balance: $0</p>

      <br />

      <a href="/deposit">Deposit</a>

      <br /><br />

      <a href="/withdraw">Withdraw</a>

    </div>
  )
}
