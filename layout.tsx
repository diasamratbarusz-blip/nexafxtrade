/**
 * NEXAFX TRADE - ROOT LAYOUT TERMINAL
 * Path: src/app/layout.js
 * Description: The primary HTML wrapper for the entire Nexapay Platform architecture.
 */

export const metadata = {
  title: "NexaPayTradeFX | Professional Trading Terminal",
  description: "Advanced Forex & Digital Wallet Platform optimized for high-frequency execution and secure asset management.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in your /public folder
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Basic Meta Tags for Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#06090f" />
      </head>
      <body 
        style={{ 
          background: "#050505", 
          color: "white",
          margin: 0,
          padding: 0,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          minHeight: "100vh",
          overflowX: "hidden"
        }}
      >
        {/* Main Content Node Injection */}
        {children}

        {/* Global CSS Overrides for scrollbars and text selection */}
        <style dangerouslySetInnerHTML={{ __html: `
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #06090f;
          }
          ::-webkit-scrollbar-thumb {
            background: #1a1a1a;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #00d4ff;
          }
          ::selection {
            background: rgba(0, 212, 255, 0.3);
            color: #ffffff;
          }
        `}} />
      </body>
    </html>
  )
}
