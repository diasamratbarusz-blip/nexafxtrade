export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>Balance: $0</p>
      <p>Profit: $0</p>

      <br />

      <a href="/deposit">Deposit</a> |{" "}
      <a href="/withdraw">Withdraw</a>
    </div>
  )
}
