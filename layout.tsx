export const metadata = {
  title: "NexaPayTradeFX",
  description: "Forex & Wallet Platform"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#050505", color: "white" }}>
        {children}
      </body>
    </html>
  )
}
