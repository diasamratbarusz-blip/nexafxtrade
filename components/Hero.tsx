export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-white">
        Trade Forex Smarter
      </h1>

      <p className="text-gray-400 mt-4 max-w-xl">
        Kenya’s most advanced forex trading platform built for global traders.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="bg-green-500 px-6 py-3 rounded-xl">
          Start Trading
        </button>
        <button className="border px-6 py-3 rounded-xl">
          Join WhatsApp
        </button>
      </div>
    </section>
  )
}
