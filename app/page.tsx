import Link from "next/link"

export default function Home() {
  const styles = {
    container: {
      backgroundColor: "#06090f",
      color: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
      textAlign: "center",
    },
    brand: {
      fontSize: "clamp(2rem, 8vw, 3.5rem)",
      fontWeight: "900",
      color: "#00ff00",
      textTransform: "uppercase",
      letterSpacing: "-2px",
      marginBottom: "10px",
    },
    accent: {
      color: "#ffffff",
    },
    subtext: {
      fontSize: "1.2rem",
      color: "#707a8a",
      marginBottom: "30px",
      maxWidth: "600px",
    },
    navBox: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    linkBtn: {
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "0.9rem",
      fontWeight: "700",
      textDecoration: "none",
      textTransform: "uppercase",
      transition: "0.3s",
    },
    primaryBtn: {
      backgroundColor: "#00d4ff",
      color: "#000000",
    },
    secondaryBtn: {
      border: "1px solid #333",
      color: "#ffffff",
      backgroundColor: "rgba(255,255,255,0.05)",
    },
    footer: {
      position: "absolute",
      bottom: "20px",
      fontSize: "0.7rem",
      color: "#444",
      width: "100%",
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.brand}>
        NEXAFX<span style={styles.accent}>TRADE</span>
      </div>
      
      <p style={styles.subtext}>
        Kenya's Premier High-Frequency Trading Terminal & Digital Wallet. 
        Execute BTC/KES trades with 30-second liquidity loops.
      </p>

      <div style={styles.navBox}>
        <Link href="/login" style={{...styles.linkBtn, ...styles.secondaryBtn}}>
          Login
        </Link>
        <Link href="/register" style={{...styles.linkBtn, ...styles.primaryBtn}}>
          Get Started
        </Link>
        <Link href="/dashboard" style={{...styles.linkBtn, ...styles.secondaryBtn}}>
          Terminal
        </Link>
      </div>

      <footer style={styles.footer}>
        <p>Nexafxtrade | Registered Entity: Binaa Mall, 2nd Floor, Langata Rd, Nairobi.</p>
        <p>Powered by Prosport Africa Ltd. | Invite friends to earn a 10% referral bonus.</p>
      </footer>
    </main>
  );
}
