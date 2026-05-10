import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5 bg-black border-b border-gray-800">
      <h1 className="text-green-400 font-bold text-xl">
        NexaFX Trade
      </h1>

      <div className="flex gap-5 text-white">
        <Link href="/">Home</Link>
        <Link href="/signals">Signals</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  )
}
