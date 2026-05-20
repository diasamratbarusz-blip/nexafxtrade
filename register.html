"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import API from "../../lib/api"

export default function Register() {
  const router = useRouter()
  
  // State elements
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  
  // Feedback UI states
  const [statusMsg, setStatusMsg] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    // Resetting local UI notification state channels cleanly
    setStatusMsg("Establishing connection to terminal node...")
    setIsError(false)
    setLoading(true)

    if (!name || !email || !phone || !password) {
      setStatusMsg("⚠️ All credential modules must be filled.")
      setIsError(true)
      setLoading(false)
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        phone,
        password
      })

      setStatusMsg("Registration authorized! Generating secure token...")
      setIsError(false)

      // Safe transmission synchronization down into client local matrices
      localStorage.setItem("token", res.data.token)

      setTimeout(() => {
        router.push("/dashboard") // Adjust route path destination as needed
      }, 1000)

    } catch (error: any) {
      console.log(error)
      setIsError(true)
      setStatusMsg(
        error.response?.data?.message || 
        "❌ Terminal initialization failed. Check network matrix node."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.authContainer}>
        <div style={styles.authCard}>
          
          {/* System Core Headers */}
          <div style={styles.authHeader}>
            <h1 style={styles.brandTitle}>NEXAFX<span style={styles.brandSpan}>TRADE</span></h1>
            <div style={styles.authSubtitle}>Initialize Account Terminal</div>
          </div>

          {/* Credentials Submission Forms */}
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Full Operator Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.authInput}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Registered Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.authInput}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="tel"
              placeholder="Phone Number (e.g., +254...)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.authInput}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Secure Access Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.authInput}
            />
          </div>

          {/* Secure submit command node */}
          <button 
            onClick={handleRegister} 
            disabled={loading}
            style={{
              ...styles.btnAuthSubmit,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "INITIALIZING..." : "REGISTER TERMINAL"}
          </button>

          {/* System state runtime notifications */}
          {statusMsg && (
            <p style={{
              ...styles.statusMessage,
              color: isError ? "#ff5252" : "#00e676"
            }}>
              {statusMsg}
            </p>
          )}

          {/* Dynamic router redirection paths */}
          <div style={styles.authRoutingFooter}>
            Already have an active node?{" "}
            <span 
              onClick={() => router.push("/login")} 
              style={styles.linkText}
            >
              Access Vault
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

// Inline styles mirroring the Nexafxtrade Premium design framework
const styles: { [key: string]: React.CSSProperties } = {
  bodyWrapper: {
    backgroundColor: "#06090f",
    color: "#ffffff",
    fontFamily: "'Inter', sans-serif",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "100%",
    maxWidth: "420px",
    padding: "25px",
    zIndex: 10,
  },
  authCard: {
    backgroundColor: "#11171f",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "30px 25px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
  },
  authHeader: {
    textAlign: "center",
    marginBottom: "25px",
  },
  brandTitle: {
    color: "#00ff00",
    fontWeight: 900,
    fontSize: "1.6rem",
    letterSpacing: "-1px",
    textTransform: "uppercase",
    margin: 0,
  },
  brandSpan: {
    color: "#00d4ff",
  },
  authSubtitle: {
    color: "#707a8a",
    fontSize: "0.85rem",
    marginTop: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  formGroup: {
    marginBottom: "18px",
    width: "100%",
  },
  authInput: {
    width: "100%",
    backgroundColor: "#06090f",
    border: "1px solid #222222",
    color: "#ffffff",
    padding: "12px 14px",
    fontSize: "0.9rem",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },
  btnAuthSubmit: {
    width: "100%",
    background: "#00d4ff",
    color: "#000000",
    border: "none",
    padding: "14px",
    fontSize: "1rem",
    fontWeight: 800,
    textTransform: "uppercase",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    marginTop: "10px",
  },
  statusMessage: {
    marginTop: "15px",
    fontSize: "0.85rem",
    fontWeight: 700,
    textAlign: "center",
    minHeight: "20px",
    fontFamily: "monospace",
    letterSpacing: "0.5px",
    margin: "15px 0 0 0",
  },
  authRoutingFooter: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#707a8a",
  },
  linkText: {
    color: "#00d4ff",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "underline",
  }
}
