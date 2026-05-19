<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Login | NEXAFX Premium Architecture</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        /**
         * Nexafxtrade Premium Login System
         * Optimized for the "image_3.png" aesthetic & fluid viewport layouts
         * Version: 3.3.0 (May 2026)
         */

        :root {
            --bg-deep: #06090f;
            --bg-card: #11171f;
            --primary: #00d4ff;
            --success: #00e676;
            --danger: #ff5252;
            --text-dim: #707a8a;
            --text-light: #ffffff;
            --border-color: #222222;
        }

        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body, html {
            background-color: var(--bg-deep);
            color: var(--text-light);
            font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            min-height: -webkit-fill-available;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
        }

        /* Full Screen Form Container Matrix */
        .auth-container {
            width: 100%;
            max-width: 420px;
            padding: 25px;
            z-index: 10;
            position: relative;
        }

        .auth-card {
            background-color: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 30px 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .auth-card:hover {
            border-color: rgba(0, 212, 255, 0.15);
            box-shadow: 0 4px 25px rgba(0, 212, 255, 0.05);
        }

        /* Branding Segment Headers */
        .auth-header {
            text-align: center;
            margin-bottom: 25px;
        }

        .brand-title {
            color: #00ff00; /* Legacy Neon Green accent tracking */
            font-weight: 900;
            font-size: 1.6rem;
            letter-spacing: -1px;
            text-transform: uppercase;
            margin: 0;
        }

        .brand-title span {
            color: var(--primary);
        }

        .auth-subtitle {
            color: var(--text-dim);
            font-size: 0.85rem;
            margin-top: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Form Input Field Frameworks */
        .form-group {
            position: relative;
            margin-bottom: 18px;
            width: 100%;
        }

        .form-group i {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-dim);
            font-size: 0.95rem;
            transition: color 0.2s ease;
        }

        .auth-input {
            width: 100%;
            background-color: var(--bg-deep);
            border: 1px solid var(--border-color);
            color: var(--text-light);
            padding: 12px 14px 12px 42px;
            font-size: 0.9rem;
            border-radius: 8px;
            outline: none;
            font-family: inherit;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .auth-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 8px rgba(0, 212, 255, 0.15);
        }

        .auth-input:focus + i {
            color: var(--primary);
        }

        /* Primary Action Buttons Desk execution */
        .btn-auth-submit {
            width: 100%;
            background: var(--primary);
            color: #000000;
            border: none;
            padding: 14px;
            font-size: 1rem;
            font-weight: 800;
            text-transform: uppercase;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 25px;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .btn-auth-submit:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
            box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        }

        .btn-auth-submit:active {
            transform: translateY(0);
        }

        /* Feedback Notifications */
        .status-message {
            margin-top: 15px;
            font-size: 0.85rem;
            font-weight: 700;
            text-align: center;
            min-height: 20px;
            font-family: monospace;
            letter-spacing: 0.5px;
        }
        
        .msg-error {
            color: var(--danger);
            animation: shake 0.3s ease-in-out;
        }
        
        .msg-success {
            color: var(--success);
        }

        /* Routing Redirection Links layout elements */
        .auth-routing-footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8rem;
            color: var(--text-dim);
        }

        .auth-routing-footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 700;
        }

        .auth-routing-footer a:hover {
            text-decoration: underline;
        }

        /* --- Geometric Background Animation --- */
        .wave-bg {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 15vh;
            z-index: 1;
            pointer-events: none;
            opacity: 0.2;
        }

        .parallax > use {
            animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
        .parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
        .parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }

        @keyframes move-forever {
            0% { transform: translate3d(-90px,0,0); }
            100% { transform: translate3d(85px,0,0); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }

        /* Responsive Constraints Configuration override metrics */
        @media (max-width: 480px) {
            .auth-container {
                padding: 15px;
            }
            .auth-card {
                padding: 25px 15px;
                border-radius: 12px;
            }
        }
    </style>
</head>
<body>

<div class="auth-container">
    <div class="auth-card">
        <!-- System Core Headers -->
        <div class="auth-header">
            <h1 class="brand-title">NEXAFX<span>TRADE</span></h1>
            <div class="auth-subtitle">Secure Access Portal Node</div>
        </div>

        <!-- Credentials Submission Desk Forms -->
        <div class="form-group">
            <input type="email" id="email" class="auth-input" placeholder="Registered Email Address" required autocomplete="email">
            <i class="fas fa-envelope"></i>
        </div>

        <div class="form-group">
            <input type="password" id="password" class="auth-input" placeholder="Account Password" required autocomplete="current-password">
            <i class="fas fa-lock"></i>
        </div>

        <!-- Secure submit command node -->
        <button class="btn-auth-submit" onclick="login()">
            <i class="fas fa-sign-in-alt"></i> Access Vault
        </button>

        <!-- System state runtime notifications -->
        <p id="msg" class="status-message"></p>

        <!-- Dynamic router redirection paths -->
        <div class="auth-routing-footer">
            Don't have an operating terminal node? <a href="register.html">Register Terminal</a>
        </div>
    </div>
</div>

<!-- Geometric Background Waves SVG -->
<svg class="wave-bg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
    </defs>
    <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(0,212,255,0.06)" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(0,230,118,0.04)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(6,9,15,0.1)" />
    </g>
</svg>

<script>
    // System core endpoint API variable architecture setup mapping 
    const API = "https://nexapayfx-backend.onrender.com/api";

    async function login(){
        const msgNode = document.getElementById("msg");
        
        // Resetting local UI notification state channels cleanly
        msgNode.innerText = "Connecting to network node...";
        msgNode.className = "status-message msg-success";

        const emailValue = document.getElementById("email").value.trim();
        const passwordValue = document.getElementById("password").value;

        if(!emailValue || !passwordValue) {
            msgNode.innerText = "⚠️ Credentials inputs cannot be blank.";
            msgNode.className = "status-message msg-error";
            return;
        }

        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });

            const data = await res.json();

            if(res.ok){
                msgNode.innerText = "Authorization granted! Syncing data modules...";
                msgNode.className = "status-message msg-success";
                
                // Safe transmission synchronization down into client local matrices
                localStorage.setItem("token", data.token);
                
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 800);
            } else {
                msgNode.innerText = "❌ Login failed: " + (data.message || "Invalid account matching credentials.");
                msgNode.className = "status-message msg-error";
            }
        } catch(error) {
            console.error("Network interface channel mapping failure: ", error);
            msgNode.innerText = "🌐 Connection error. Verify your network matrix node.";
            msgNode.className = "status-message msg-error";
        }
    }
</script>

</body>
</html>
