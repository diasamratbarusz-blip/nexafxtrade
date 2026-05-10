import Link from "next/link"

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: 40 }}>
      <h1>NexaPayTradeFX</h1>
      <p>Forex Trading + Wallet System</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/login">Login</Link> |{" "}
        <Link href="/register">Register</Link> |{" "}
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  )
}
