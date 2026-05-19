"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

/**
 * NEXAFX TRADE - MAIN TERMINAL INDEX
 * Dashboard/Landing Entry Point
 */
export default function Home() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // Ensure hydration synchronization
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div style={styles.pageWrapper}>
      {/* Navigation Header */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <h1 style={styles.brandTitle}>NEXAFX<span>TRADE</span></h1>
          <div style={styles.navLinks}>
            <Link href="/login" style={styles.navLinkItem}>LOGIN</Link>
            <Link href="/register" style={styles.navBtn}>GET STARTED</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.heroContainer}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>v3.3.0 SECURE CORE</div>
          <h2 style={styles.mainHeading}>
            NEXT-GEN <br />
            <span style={styles.gradientText}>ASSET ARCHITECTURE</span>
          </h2>
          <p style={styles.subText}>
            Access the world's most advanced decentralized trading terminal. 
            Secure, encrypted, and optimized for high-frequency execution.
          </p>

          <div style={styles.buttonGroup}>
            <button 
              onClick={() => router.push("/register")} 
              style={styles.primaryBtn}
            >
              INITIALIZE TERMINAL
            </button>
            <button 
              onClick={() => router.push("/about")} 
              style={styles.secondaryBtn}
            >
              PROTOCOL INFO
            </button>
          </div>
        </div>

        {/* Live Market Pulse (Visual Component) */}
        <div style={styles.marketGrid}>
          {[
            { pair: "BTC/USDT", price: "$64,231.00", trend: "+2.4%" },
            { pair: "ETH/USDT", price: "$3,452.12", trend: "+1.8%" },
            { pair: "SOL/USDT", price: "$145.04", trend: "-0.5%" }
          ].map((coin, i) => (
            <div key={i} style={styles.marketCard}>
              <span style={styles.coinPair}>{coin.pair}</span>
              <span style={styles.coinPrice}>{coin.price}</span>
              <span style={{...styles.coinTrend, color: coin.trend.includes('+') ? '#00e676' : '#ff5252'}}>
                {coin.trend}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Animated Background Elements */}
      <div style={styles.bgGlow}></div>
    </div>
  )
}

// Nexafxtrade Premium Design Framework
const styles = {
  pageWrapper: {
    backgroundColor: "#06090f",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  navbar: {
    padding: "20px 5%",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    backgroundColor: "rgba(6, 9, 15, 0.8)",
    backdropFilter: "blur(10px)",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 100,
  },
  navContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  brandTitle: {
    fontSize: "1.4rem",
    fontWeight: "900",
    letterSpacing: "-1px",
    margin: 0,
    color: "#00ff00",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  navLinkItem: {
    color: "#707a8a",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: "700",
    transition: "color 0.2s",
  },
  navBtn: {
    backgroundColor: "#00d4ff",
    color: "#000",
    padding: "8px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: "800",
  },
  heroContainer: {
    padding: "160px 5% 60px 5%",
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "800px",
    zIndex: 2,
  },
  badge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    border: "1px solid #00d4ff",
    color: "#00d4ff",
    fontSize: "0.7rem",
    fontWeight: "800",
    marginBottom: "20px",
    letterSpacing: "1px",
  },
  mainHeading: {
    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
    fontWeight: "900",
    lineHeight: 1.1,
    margin: "0 0 25px 0",
    letterSpacing: "-2px",
  },
  gradientText: {
    background: "linear-gradient(90deg, #00d4ff, #00ff00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subText: {
    color: "#707a8a",
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "16px 32px",
    backgroundColor: "#00d4ff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "transform 0.2s",
  },
  secondaryBtn: {
    padding: "16px 32px",
    backgroundColor: "transparent",
    border: "1px solid #222222",
    color: "#ffffff",
    borderRadius: "8px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "1rem",
  },
  marketGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "100%",
    marginTop: "80px",
    zIndex: 2,
  },
  marketCard: {
    backgroundColor: "#11171f",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  coinPair: { color: "#707a8a", fontSize: "0.8rem", marginBottom: "8px" },
  coinPrice: { fontSize: "1.2rem", fontWeight: "700", marginBottom: "4px" },
  coinTrend: { fontSize: "0.85rem", fontWeight: "800" },
  bgGlow: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, rgba(0,0,0,0) 70%)",
    zIndex: 1,
    pointerEvents: "none",
  }
}
