export default function Features() {
  const features = [
    'Live Forex Signals',
    'M-Pesa Deposits',
    'Fast Withdrawals',
    'AI Trading Tools',
    'Copy Trading',
    'Global Market Access'
  ]

  return (
    <section className="p-10 grid md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div key={i} className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-green-400 font-bold">{f}</h3>
        </div>
      ))}
    </section>
  )
}
