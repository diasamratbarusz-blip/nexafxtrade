<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>NEXAFX TRADE | Professional Trader Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --high-green: #00e676;
            --low-red: #ff1744;
            --neon-blue: #00b0ff;
            --bg-black: #06090f;
            --panel: #0b111a;
            --panel-light: #121b26;
            --gold: #ffd600;
            --text-dim: #647c9c;
            --border-color: #1a2636;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body, html {
            background: var(--bg-black); color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            height: 100vh; overflow: hidden; font-size: 13px;
        }

        .app-container { display: flex; flex-direction: column; height: 100vh; width: 100%; filter: blur(0px); transition: filter 0.4s ease; }

        /* --- ADVANCED FOREX PRELOADER SYSTEM --- */
        #nexafx-preloader {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #030508;
            z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
            padding: 20px;
        }
        .preloader-layout-wrapper {
            width: 900px; max-width: 100%; display: flex; flex-direction: column; align-items: center; gap: 24px;
        }
        .brand-text-style { font-size: 2.5rem; font-weight: 900; letter-spacing: 2px; text-align: center; animation: pulseGlow 2s infinite ease-in-out; }
        .brand-text-style span { color: var(--neon-blue); font-weight: 300; }
        
        /* Interactive Forex Loading Visual Matrix */
        .loader-forex-visuals {
            width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 10px 0;
        }
        .visual-widget {
            background: rgba(11, 17, 26, 0.7); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;
            display: flex; flex-direction: column; gap: 8px; font-family: monospace;
        }
        .visual-widget-title { font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: flex; justify-content: space-between; }
        .visual-ticker-grid { display: flex; flex-direction: column; gap: 4px; }
        .visual-ticker-row { display: flex; justify-content: space-between; font-size: 0.75rem; }
        
        /* Simulated Sparkline Candles Container */
        .visual-sparkline-box { height: 40px; display: flex; align-items: flex-end; gap: 3px; border-bottom: 1px dashed rgba(100, 124, 156, 0.3); padding-bottom: 2px; }
        .spark-candle { flex: 1; background: var(--high-green); min-height: 5px; border-radius: 1px; transition: height 0.3s ease; }
        .spark-candle.down { background: var(--low-red); }

        /* Order Book Depth Bars */
        .depth-bar-wrapper { display: flex; flex-direction: column; gap: 3px; }
        .depth-row { display: flex; align-items: center; font-size: 0.7rem; gap: 6px; }
        .depth-fill { height: 6px; border-radius: 2px; background: rgba(0, 230, 118, 0.25); }
        .depth-fill.ask { background: rgba(255, 23, 68, 0.25); }

        .loader-track { width: 320px; max-width: 100%; height: 4px; background: #111823; border-radius: 4px; overflow: hidden; position: relative; }
        .loader-bar { width: 0%; height: 100%; background: linear-gradient(90deg, var(--neon-blue), var(--high-green)); border-radius: 4px; transition: width 0.1s linear; }
        .loader-status { font-family: monospace; font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; min-height: 15px; text-align: center; }

        @keyframes pulseGlow {
            0%, 100% { opacity: 0.8; transform: scale(0.99); }
            50% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 12px rgba(0, 176, 255, 0.3)); }
        }

        /* --- AUTHENTICATION INTERFACE MAPPING --- */
        #nexafx-auth-screen {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(3, 5, 8, 0.95);
            z-index: 9999; display: none; align-items: center; justify-content: center; padding: 20px;
            transition: all 0.5s ease;
        }
        .auth-card {
            width: 900px; max-width: 100%; height: 550px; background: var(--panel); border: 1px solid var(--border-color);
            border-radius: 12px; display: flex; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .auth-sidebar {
            flex: 1; background: linear-gradient(135deg, #070e17 0%, #03060a 100%);
            padding: 40px; display: flex; flex-direction: column; justify-content: space-between;
            border-right: 1px solid var(--border-color);
        }
        .auth-sidebar-stats { background: rgba(26,38,54,0.2); padding: 15px; border-radius: 6px; border: 1px solid rgba(26,38,54,0.4); }
        .auth-sidebar-stat-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.75rem; font-family: monospace; }
        .auth-main-form { flex: 1.2; padding: 45px; display: flex; flex-direction: column; justify-content: center; background: var(--panel); }
        
        /* Central Gateway Internal Navigation */
        #auth-gateway-dashboard { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; flex: 1.2; }
        .gateway-icon-cluster { font-size: 3.5rem; color: var(--neon-blue); margin-bottom: 20px; display: flex; gap: 15px; }
        .gateway-nav-buttons { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px; margin-top: 15px; }
        .gateway-btn { width: 100%; height: 44px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid var(--border-color); transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .gateway-btn.primary { background: var(--neon-blue); color: #fff; border: none; }
        .gateway-btn.secondary { background: var(--panel-light); color: #fff; }
        .gateway-btn:hover { transform: translateY(-2px); opacity: 0.95; box-shadow: 0 4px 12px rgba(0, 176, 255, 0.2); }

        .auth-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 5px; color: #fff; }
        .auth-subtitle { color: var(--text-dim); font-size: 0.8rem; margin-bottom: 25px; }
        .auth-form-group { margin-bottom: 16px; }
        .auth-form-group label { display: block; font-size: 0.65rem; font-weight: 700; color: var(--text-dim); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        .auth-input-wrapper { position: relative; display: flex; align-items: center; }
        .auth-input-wrapper i { position: absolute; left: 12px; color: var(--text-dim); font-size: 0.85rem; }
        .auth-input { width: 100%; background: #020406; border: 1px solid var(--border-color); padding: 10px 12px 10px 35px; color: #fff; font-size: 0.9rem; border-radius: 6px; outline: none; transition: border-color 0.3s; }
        .auth-input:focus { border-color: var(--neon-blue); }
        .auth-submit-btn { width: 100%; height: 42px; background: var(--neon-blue); color: #fff; border: none; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 10px; transition: opacity 0.2s; }
        .auth-submit-btn:hover { opacity: 0.9; }
        .auth-switch-mode { text-align: center; margin-top: 20px; font-size: 0.75rem; color: var(--text-dim); }
        .auth-switch-mode span { color: var(--neon-blue); cursor: pointer; font-weight: 600; }

        /* --- Institutional Main Top Ribbon Header --- */
        header {
            background: var(--panel); display: flex; align-items: center; justify-content: space-between;
            padding: 8px 16px; border-bottom: 1px solid var(--border-color); flex-shrink: 0; height: auto; min-height: 55px; flex-wrap: wrap; gap: 8px;
        }
        .brand { font-size: 1.2rem; font-weight: 900; letter-spacing: 0.5px; }
        .brand span { color: var(--neon-blue); font-weight: 400; }

        .account-meta-strip { display: flex; gap: 8px; align-items: center; overflow-x: auto; max-width: 100%; padding-bottom: 4px; }
        .meta-stat-node {
            background: rgba(0,0,0,0.2); border: 1px solid var(--border-color);
            padding: 4px 10px; border-radius: 4px; text-align: right; min-width: 110px; flex-shrink: 0;
        }
        .meta-stat-node .m-lbl { font-size: 0.55rem; color: var(--text-dim); display: block; font-weight: 700; text-transform: uppercase; }
        .meta-stat-node .m-val { font-family: monospace; font-size: 0.85rem; font-weight: 700; }

        /* --- Operational Live Status Sub-Bar --- */
        .status-sub-bar {
            background: #030508; border-bottom: 1px solid var(--border-color); height: auto; min-height: 26px;
            display: flex; align-items: center; justify-content: space-between; padding: 6px 16px;
            font-size: 0.65rem; font-weight: 700; color: var(--text-dim); flex-shrink: 0; flex-wrap: wrap; gap: 8px;
        }

        /* --- Core Master Workspace Layout --- */
        .master-workspace-grid {
            display: grid; grid-template-columns: 310px 1fr 320px; flex: 1; overflow: hidden; background: #020305;
        }

        .column-pane { display: flex; flex-direction: column; background: var(--panel); border-right: 1px solid var(--border-color); overflow: hidden; }
        .column-pane.right-pane { border-right: none; border-left: 1px solid var(--border-color); }

        .pane-section-header {
            background: rgba(26, 38, 54, 0.2); padding: 8px 12px; font-weight: 700; font-size: 0.7rem;
            color: var(--text-dim); border-bottom: 1px solid var(--border-color); text-transform: uppercase;
            display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
        }

        /* --- Multi-Asset Watchlist Engine Component --- */
        .sub-tab-strip { display: flex; background: #04060a; border-bottom: 1px solid var(--border-color); flex-shrink: 0; overflow-x: auto; }
        .sub-tab-btn { flex: 1; padding: 8px 4px; font-size: 0.6rem; font-weight: 700; border: none; background: transparent; color: var(--text-dim); cursor: pointer; text-transform: uppercase; text-align: center; white-space: nowrap; }
        .sub-tab-btn.active { color: #fff; background: var(--panel-light); border-bottom: 2px solid var(--neon-blue); }

        .scrolling-list-area { flex: 1; overflow-y: auto; }
        .market-watch-row {
            display: grid; grid-template-columns: 1.2fr 1fr 0.8fr; padding: 8px 12px;
            border-bottom: 1px solid rgba(26,38,54,0.3); cursor: pointer; align-items: center;
        }
        .market-watch-row:hover, .market-watch-row.active { background: var(--panel-light); }
        .market-watch-row.active { border-left: 3px solid var(--neon-blue); }

        /* --- Center Visualization Deck Layout --- */
        .center-display-deck { display: flex; flex-direction: column; overflow: hidden; background: #04070a; }
        .hero-ticker-ribbon { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); flex-shrink: 0; }
        
        .chart-canvas-frame { flex: 1; position: relative; padding: 12px; display: flex; flex-direction: column; overflow: hidden; }
        .canvas-toolbar { display: flex; justify-content: space-between; margin-bottom: 8px; gap: 4px; flex-shrink: 0; flex-wrap: wrap; }
        .tool-cluster { display: flex; gap: 4px; }
        .t-btn { background: var(--panel-light); border: 1px solid var(--border-color); color: var(--text-dim); padding: 4px 8px; font-size: 0.65rem; font-weight: 700; border-radius: 3px; cursor: pointer; text-transform: uppercase; }
        .t-btn.active { color: #fff; border-color: var(--neon-blue); background: rgba(0,176,255,0.1); }

        .chart-wrapper-box { flex: 1; width: 100%; position: relative; background: #010204; border: 1px solid var(--border-color); border-radius: 6px; }

        /* --- Horizontal Tabular Processing Terminal Ledger --- */
        .bottom-ledger-terminal { height: 240px; border-top: 1px solid var(--border-color); background: var(--panel); display: flex; flex-direction: column; flex-shrink: 0; }
        .ledger-table-canvas { flex: 1; overflow: auto; font-family: monospace; font-size: 0.75rem; width: 100%; overflow-x: auto; overflow-y: auto; }
        
        .ledger-grid-header {
            display: grid; grid-template-columns: 1fr 0.6fr 1fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr 1.2fr;
            background: #04060a; padding: 8px 12px; font-weight: 700; color: var(--text-dim); font-size: 0.65rem; text-transform: uppercase; border-bottom: 1px solid var(--border-color); min-width: 950px;
        }
        .ledger-grid-row {
            display: grid; grid-template-columns: 1fr 0.6fr 1fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr 1.2fr;
            padding: 8px 12px; border-bottom: 1px solid rgba(26,38,54,0.3); align-items: center; min-width: 950px;
        }

        /* --- Right Hand Deal Execution Control Ticket Area --- */
        .execution-ticket-panel { display: flex; flex-direction: column; gap: 10px; padding: 12px; flex: 1; overflow-y: auto; }
        .ticket-input-container { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .form-element-node { background: #020406; border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 6px; }
        .form-element-node label { font-size: 0.6rem; font-weight: 700; color: var(--text-dim); display: block; margin-bottom: 2px; text-transform: uppercase; }
        .form-element-node input, .form-element-node select { background: transparent; border: none; color: #fff; font-size: 1rem; font-weight: 700; width: 100%; outline: none; font-family: monospace; }

        .dual-action-triggers { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }
        .exec-btn { height: 40px; border: none; border-radius: 6px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; text-transform: uppercase; }
        .exec-btn.b-buy { background: var(--high-green); color: #000; }
        .exec-btn.b-sell { background: var(--low-red); color: #fff; }

        .macro-news-card { padding: 8px 12px; border-bottom: 1px solid rgba(26,38,54,0.3); font-size: 0.75rem; }
        .impact-badge { font-size: 0.55rem; font-weight: 900; padding: 2px 4px; border-radius: 3px; text-transform: uppercase; margin-right: 4px; display: inline-block; }
        .impact-high { background: rgba(255,23,68,0.15); color: var(--low-red); }
        .impact-med { background: rgba(255,214,0,0.15); color: var(--gold); }

        .analytics-grid-box { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px; }
        .analytics-card-node { background: #030508; border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 4px; }

        /* --- Footer Base Block --- */
        footer { background: var(--panel); border-top: 1px solid var(--border-color); height: auto; min-height: 24px; display: flex; align-items: center; justify-content: space-between; padding: 6px 16px; font-size: 0.6rem; color: var(--text-dim); flex-shrink: 0; flex-wrap: wrap; gap: 6px; }

        @media (max-width: 1200px) {
            .master-workspace-grid { grid-template-columns: 1fr; overflow-y: auto; height: auto; }
            body, html { overflow-y: auto; height: auto; }
            .column-pane { height: 380px; }
            .center-display-deck { height: 550px; }
            .bottom-ledger-terminal { height: 300px; }
            .auth-card { height: auto; flex-direction: column; }
            .auth-sidebar { display: none; }
            .loader-forex-visuals { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

<div id="nexafx-preloader">
    <div class="preloader-layout-wrapper">
        <div class="brand-text-style">NEXAFX<span>TRADE</span></div>
        
        <div class="loader-forex-visuals">
            <div class="visual-widget">
                <div class="visual-widget-title"><span>Live Tick Matrix</span><span style="color:var(--high-green)">ONLINE</span></div>
                <div class="visual-ticker-grid">
                    <div class="visual-ticker-row"><span>EUR/USD</span><span id="load-tick-eur" style="color:var(--high-green)">1.08520</span></div>
                    <div class="visual-ticker-row"><span>GBP/USD</span><span id="load-tick-gbp" style="color:var(--high-green)">1.26440</span></div>
                    <div class="visual-ticker-row"><span>XAU/USD</span><span id="load-tick-xau" style="color:var(--gold)">2342.10</span></div>
                </div>
            </div>
            <div class="visual-widget">
                <div class="visual-widget-title"><span>Interbank Candle Stream</span><span style="color:var(--neon-blue)">HFT-FEED</span></div>
                <div class="visual-sparkline-box" id="preloader-sparkline"></div>
            </div>
            <div class="visual-widget">
                <div class="visual-widget-title"><span>ECN Order Depth</span><span style="color:var(--neon-blue)">MAPPED</span></div>
                <div class="depth-bar-wrapper">
                    <div class="depth-row"><span>Bids</span><div class="depth-fill" style="width: 75%;"></div></div>
                    <div class="depth-row"><span>Asks</span><div class="depth-fill ask" style="width: 62%;"></div></div>
                </div>
            </div>
        </div>

        <div class="loader-track">
            <div class="loader-bar" id="preloader-bar"></div>
        </div>
        <div class="loader-status" id="preloader-status">Initializing Live Trading Workspace...</div>
    </div>
</div>

<div id="nexafx-auth-screen">
    <div class="auth-card">
        <div class="auth-sidebar">
            <div>
                <h3 style="font-weight:900; font-size:1.3rem; letter-spacing:0.5px;">NEXAFX<span>TRADE</span></h3>
                <p style="color:var(--text-dim); font-size:0.7rem; margin-top:4px; text-transform:uppercase;">Secure Liquidity Gateway</p>
            </div>
            <div class="auth-sidebar-stats">
                <div class="auth-sidebar-stat-row">
                    <span style="color:var(--text-dim)">ECN CONNECTION</span>
                    <span style="color:var(--high-green)">ACTIVE // SECURE</span>
                </div>
                <div class="auth-sidebar-stat-row">
                    <span style="color:var(--text-dim)">LIVE SPREADS</span>
                    <span style="color:#fff">FROM 0.0 PIPS</span>
                </div>
                <div class="auth-sidebar-stat-row">
                    <span style="color:var(--text-dim)">TRADING HUB</span>
                    <span style="color:var(--gold)">NAIROBI OFFICE</span>
                </div>
            </div>
            <p style="font-size:0.6rem; color:var(--text-dim); line-height:1.3;">Warning: Access restricted to authorized traders. Forex operations contain financial leverage risk profiles.</p>
        </div>
        
        <div class="auth-main-form" id="auth-gateway-dashboard">
            <div class="gateway-icon-cluster">
                <i class="fas fa-chart-line" style="color: var(--high-green);"></i>
                <i class="fas fa-shield-alt"></i>
                <i class="fas fa-wallet" style="color: var(--gold);"></i>
            </div>
            <h2 class="auth-title">Trader Gateway Dashboard</h2>
            <p class="auth-subtitle" style="max-width: 400px; margin-left: auto; margin-right: auto;">Welcome to Nexafxtrade Secure Terminal Hub. Choose an option below to enter your account portal.</p>
            <div class="gateway-nav-buttons">
                <button class="gateway-btn primary" onclick="switchAuthMode('LOGIN')">
                    <i class="fas fa-sign-in-alt"></i> Already Registered? Login
                </button>
                <button class="gateway-btn secondary" onclick="switchAuthMode('REGISTER')">
                    <i class="fas fa-user-plus"></i> New Trader? Create Account
                </button>
            </div>
        </div>
        
        <div class="auth-main-form" id="auth-form-login" style="display:none;">
            <h2 class="auth-title">Trader Login</h2>
            <p class="auth-subtitle">Enter your credentials to access your live terminal dashboard.</p>
            <div class="auth-form-group">
                <label>Email Address</label>
                <div class="auth-input-wrapper">
                    <i class="fas fa-user-shield"></i>
                    <input type="email" id="login-email" class="auth-input" placeholder="trader@nexafxtrade.com">
                </div>
            </div>
            <div class="auth-form-group">
                <label>Password</label>
                <div class="auth-input-wrapper">
                    <i class="fas fa-key"></i>
                    <input type="password" id="login-password" class="auth-input" placeholder="••••••••••••">
                </div>
            </div>
            <button class="auth-submit-btn" id="login-submit-btn" onclick="executeBackendLogin()">Sign In to Dashboard</button>
            <p class="auth-switch-mode">Need to return? <span onclick="switchAuthMode('DASHBOARD')">Back to Gateway</span></p>
        </div>

        <div class="auth-main-form" id="auth-form-register" style="display:none;">
            <h2 class="auth-title">Register Trading Account</h2>
            <p class="auth-subtitle">Create a dedicated market balance account inside the execution platform.</p>
            <div class="auth-form-group">
                <label>Full Name</label>
                <div class="auth-input-wrapper">
                    <i class="fas fa-id-badge"></i>
                    <input type="text" id="register-name" class="auth-input" placeholder="John Doe">
                </div>
            </div>
            <div class="auth-form-group">
                <label>Email Address</label>
                <div class="auth-input-wrapper">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="register-email" class="auth-input" placeholder="trader@nexafxtrade.com">
                </div>
            </div>
            <div class="auth-form-group">
                <label>Secure Password</label>
                <div class="auth-input-wrapper">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="register-password" class="auth-input" placeholder="••••••••••••">
                </div>
            </div>
            <button class="auth-submit-btn" id="register-submit-btn" onclick="executeBackendRegistration()">Create My Account</button>
            <p class="auth-switch-mode">Need to return? <span onclick="switchAuthMode('DASHBOARD')">Back to Gateway</span></p>
        </div>
    </div>
</div>

<div class="app-container" id="main-terminal-layout" style="display:none;">
    <header>
        <div class="brand">NEXAFX<span>TRADE</span></div>
        <div class="account-meta-strip">
            <div class="meta-stat-node"><span class="m-lbl">Live Balance</span><span class="m-val" id="top-balance" style="color:var(--gold)">1,500,000.00</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Equity</span><span class="m-val" id="top-equity">1,500,000.00</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Free Margin</span><span class="m-val" id="top-freemargin">1,500,000.00</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Used Margin</span><span class="m-val" id="top-usedmargin">0.00</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Margin Level</span><span class="m-val" id="top-marginlevel" style="color:var(--high-green)">100.00%</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Floating P&L</span><span class="m-val" id="top-floatingpnl">0.00</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Today's Net</span><span class="m-val" id="top-dailypnl" style="color:var(--high-green)">+1,420.00</span></div>
            <div class="meta-stat-node"><span class="m-lbl">Max Daily Limit</span><span class="m-val" id="top-maxloss" style="color:var(--low-red)">75,000.00</span></div>
        </div>
        <div style="display: flex; align-items: center; padding-left: 10px;">
            <button class="t-btn" style="border-color: var(--low-red); color: var(--low-red); font-size: 0.7rem;" onclick="clearActiveTerminalSession()"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>
    </header>

    <div class="status-sub-bar">
        <div>
            <span><i class="fas fa-server" style="color:var(--high-green)"></i> LIVE SERVER: <b>NEXA-PRO-LIVE_4</b></span> &nbsp;|&nbsp;
            <span>TRADER ID: <b style="color:#fff;">8942105</b></span> &nbsp;|&nbsp;
            <span>LEVERAGE: <b style="color:var(--neon-blue);">1:500</b></span> &nbsp;|&nbsp;
            <span>TYPE: <b style="color:var(--gold);">RAW ECN</b></span> &nbsp;|&nbsp;
            <span>PROFILE: <b style="color:var(--neon-blue);">VIP LOW SPREAD</b></span>
        </div>
        <div>
            <span>SESSION: <b style="color:#fff;" id="lbl-market-session">LONDON / NEW YORK OVERLAP</b></span> &nbsp;|&nbsp;
            <span id="live-utc-clock" style="color:var(--gold); font-family:monospace;">00:00:00 UTC</span>
        </div>
    </div>

    <main class="master-workspace-grid">
        <section class="column-pane">
            <div class="pane-section-header"><span><i class="fas fa-chart-line"></i> Market Watchlist</span></div>
            <div class="sub-tab-strip">
                <button class="sub-tab-btn active" id="m-tab-forex" onclick="switchMarketCatalog('FOREX')">Forex</button>
                <button class="sub-tab-btn" id="m-tab-crypto" onclick="switchMarketCatalog('CRYPTO')">Crypto</button>
                <button class="sub-tab-btn" id="m-tab-commods" onclick="switchMarketCatalog('COMMODITY')">Commodities</button>
                <button class="sub-tab-btn" id="m-tab-indices" onclick="switchMarketCatalog('INDICES')">Indices</button>
            </div>
            <div class="scrolling-list-area" id="market-watch-container"></div>

            <div class="pane-section-header" style="border-top: 1px solid var(--border-color)"><span><i class="fas fa-newspaper"></i> Economic Market Calendar</span></div>
            <div class="scrolling-list-area" id="macro-news-feed" style="background: rgba(0,0,0,0.15);"></div>
        </section>

        <section class="center-display-deck">
            <div class="hero-ticker-ribbon">
                <div>
                    <h2 id="active-ticker-name" style="font-size:1.3rem; font-weight:800;">EUR/USD</h2>
                    <span style="font-size:0.65rem; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Interbank Data Pricing Feed</span>
                </div>
                <div style="text-align:right;">
                    <div style="font-family:monospace; font-size:1.8rem; font-weight:900;" id="hero-live-bid">1.08524</div>
                    <span style="font-size:0.65rem; color:var(--text-dim);">SPREAD: <b id="hero-live-spread" style="color:#fff; font-family:monospace;">0.4 Pips</b></span>
                </div>
            </div>

            <div class="chart-canvas-frame">
                <div class="canvas-toolbar">
                    <div class="tool-cluster">
                        <button class="t-btn active" id="chart-t-candle" onclick="changeChartRenderProfile('CANDLE')">Candlestick</button>
                        <button class="t-btn" id="chart-t-line" onclick="changeChartRenderProfile('LINE')">Line</button>
                        <button class="t-btn" id="chart-t-bar" onclick="changeChartRenderProfile('BAR')">Bar</button>
                    </div>
                    <div class="tool-cluster">
                        <button class="t-btn active" onclick="setChartTimeframe('M1')">M1</button>
                        <button class="t-btn" onclick="setChartTimeframe('M5')">M5</button>
                        <button class="t-btn" onclick="setChartTimeframe('H1')">H1</button>
                        <button class="t-btn" onclick="setChartTimeframe('D1')">D1</button>
                    </div>
                    <div class="tool-cluster">
                        <button class="t-btn" id="tech-t-ma" onclick="toggleOverlayTechnicalIndicator('MA')">SMA</button>
                        <button class="t-btn" id="tech-t-ema" onclick="toggleOverlayTechnicalIndicator('EMA')">EMA</button>
                        <button class="t-btn" id="tech-t-bb" onclick="toggleOverlayTechnicalIndicator('BB')">BBands</button>
                    </div>
                </div>
                <div class="chart-wrapper-box">
                    <canvas id="primaryTerminalCanvas"></canvas>
                </div>
            </div>

            <div class="bottom-ledger-terminal">
                <div class="sub-tab-strip" style="background: #070b12;">
                    <button class="sub-tab-btn active" id="led-tab-pos" onclick="alterTerminalLedgerFocus('POSITIONS')">Open Trades (<span id="count-pos-lbl">0</span>)</button>
                    <button class="sub-tab-btn" id="led-tab-ord" onclick="alterTerminalLedgerFocus('ORDERS')">Pending Orders (<span id="count-ord-lbl">0</span>)</button>
                    <button class="sub-tab-btn" id="led-tab-anl" onclick="alterTerminalLedgerFocus('ANALYTICS')">Analytics</button>
                    <button class="sub-tab-btn" id="led-tab-jrn" onclick="alterTerminalLedgerFocus('JOURNAL')">History Logs</button>
                </div>
                <div class="ledger-table-canvas" id="terminal-ledger-display-engine"></div>
            </div>
        </section>

        <section class="column-pane right-pane">
            <div class="pane-section-header"><span><i class="fas fa-ticket-alt"></i> Order Ticket</span></div>
            <div class="execution-ticket-panel">
                <div class="ticket-input-container">
                    <div class="form-element-node">
                        <label>Execution Mode</label>
                        <select id="ticket-order-type" onchange="adjustOrderFormFields()">
                            <option value="MARKET">Instant Market Execution</option>
                            <option value="BUY_LIMIT">Buy Limit</option>
                            <option value="SELL_LIMIT">Sell Limit</option>
                            <option value="BUY_STOP">Buy Stop</option>
                            <option value="SELL_STOP">Sell Stop</option>
                        </select>
                    </div>
                    <div class="form-element-node" id="box-execution-price" style="display:none;">
                        <label>Target Entry Price</label>
                        <input type="number" id="ticket-trigger-price" value="1.08500" step="0.00001">
                    </div>
                    <div class="form-element-node">
                        <label>Lot Volume Size</label>
                        <input type="number" id="ticket-volume-lots" value="1.00" step="0.1" min="0.01" oninput="calculateRiskTelemetryMatrices()">
                    </div>
                    <div class="form-element-node">
                        <label>Risk Allocation Profile</label>
                        <select id="ticket-risk-percent" onchange="applyRiskPercentageCalculation()">
                            <option value="CUSTOM">Manual Custom Sizing</option>
                            <option value="0.01">Risk 1% Capital</option>
                            <option value="0.02">Risk 2% Capital</option>
                            <option value="0.05">Risk 5% Capital</option>
                        </select>
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                        <div class="form-element-node">
                            <label>Stop Loss (SL)</label>
                            <input type="number" id="ticket-sl" placeholder="No Limit" step="0.00001" oninput="calculateRiskTelemetryMatrices()">
                        </div>
                        <div class="form-element-node">
                            <label>Take Profit (TP)</label>
                            <input type="number" id="ticket-tp" placeholder="No Target" step="0.00001">
                        </div>
                    </div>
                </div>

                <div style="background:#030508; border:1px solid var(--border-color); padding:8px; border-radius:6px; font-size:0.7rem; display:flex; flex-direction:column; gap:4px;">
                    <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-dim)">Calculated Exposure Risk:</span><span id="calc-risk-kes" style="font-family:monospace; font-weight:700;">KES 0.00</span></div>
                    <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-dim)">Required Trade Margin:</span><span id="calc-margin-req" style="font-family:monospace; font-weight:700;">KES 0.00</span></div>
                </div>

                <div class="dual-action-triggers">
                    <button class="exec-btn b-buy" onclick="commitOrderRoutingTicket('BUY')"><i class="fas fa-arrow-trend-up"></i> Buy / Long</button>
                    <button class="exec-btn b-sell" onclick="commitOrderRoutingTicket('SELL')"><i class="fas fa-arrow-trend-down"></i> Sell / Short</button>
                </div>
            </div>

            <div class="pane-section-header" style="border-top:1px solid var(--border-color)"><span><i class="fas fa-brain"></i> AI Trading Analyst Signals</span></div>
            <div class="execution-ticket-panel" style="flex: 0.8; background:rgba(0,0,0,0.1);">
                <div style="background:rgba(0,176,255,0.03); border:1px solid rgba(0,176,255,0.15); border-radius:6px; padding:8px; font-size:0.75rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span style="color:var(--neon-blue); font-weight:800;"><i class="fas fa-robot"></i> NEXA-AI SYSTEM</span>
                        <span style="background:var(--high-green); color:#000; font-size:0.55rem; padding:1px 4px; font-weight:900; border-radius:2px;">92.4% ACCURACY</span>
                    </div>
                    <p style="color:var(--text-dim); font-size:0.7rem; line-height:1.2;">Structural trend divergence maps high buyer pooling volume safely above institutional support bands.</p>
                    <div style="margin-top:4px; font-weight:700; color:#fff;">BIAS: <span style="color:var(--high-green)">BUY LIMIT ACCUMULATION</span></div>
                </div>
            </div>

            <div class="pane-section-header" style="border-top:1px solid var(--border-color)"><span><i class="fas fa-wallet"></i> Wallet Funding Accounts</span></div>
            <div style="padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px; background:var(--panel);">
                <button class="t-btn" style="background:rgba(0,230,118,0.05); border-color:var(--high-green); color:#fff; padding:6px;" onclick="navigateToPage('deposit.html')"><i class="fas fa-plus-circle" style="color:var(--high-green)"></i> Secure Deposit</button>
                <button class="t-btn" style="background:rgba(255,23,68,0.05); border-color:var(--low-red); color:#fff; padding:6px;" onclick="navigateToPage('withdraw.html')"><i class="fas fa-minus-circle" style="color:var(--low-red)"></i> Secure Withdrawal</button>
            </div>
        </section>
    </main>

    <footer>
        <div><span>Clearing Partner: <b>PROSPORT AFRICA LTD</b></span> &nbsp;|&nbsp; <span>Regulated Secure Financial Trading Workspace Platform</span></div>
        <div><span>Offices: Binaa Mall, 2nd Floor, Langata Rd, Nairobi, Kenya</span></div>
    </footer>
</div>

<script>
    let activeCatalogFilter = 'FOREX';
    let currentLedgerTab = 'POSITIONS';
    let chartVisualizationProfile = 'CANDLE';
    let chartTimeframeScope = 'M1';
    let activeOverlayIndicators = { MA: false, EMA: false, BB: false };

    let accountCapitalState = {
        balance: 1500000.00,
        equity: 1500000.00,
        freeMargin: 1500000.00,
        usedMargin: 0.00,
        marginLevel: 100.00,
        floatingPnL: 0.00,
        dailyPnL: 1420.00,
        currency: 'KES',
        maxDailyLossBound: 75000.00,
        maxDrawdownCap: 150000.00
    };

    let liquidityCatalog = {
        "EUR/USD": { category: "FOREX", price: 1.08520, digits: 5, spreadPips: 0.4, changePct: 0.04, multiplier: 100000 },
        "GBP/USD": { category: "FOREX", price: 1.26440, digits: 5, spreadPips: 0.6, changePct: -0.12, multiplier: 100000 },
        "USD/JPY": { category: "FOREX", price: 156.420, digits: 3, spreadPips: 0.8, changePct: 0.24, multiplier: 1000 },
        "BTC/USD": { category: "CRYPTO", price: 61240.50, digits: 2, spreadPips: 30.0, changePct: 3.45, multiplier: 1 },
        "ETH/USD": { category: "CRYPTO", price: 3342.25, digits: 2, spreadPips: 5.0, changePct: -1.15, multiplier: 1 },
        "XAU/USD": { category: "COMMODITY", price: 2342.10, digits: 2, spreadPips: 3.0, changePct: 0.85, multiplier: 100 },
        "USOIL": { category: "COMMODITY", price: 78.45, digits: 2, spreadPips: 4.0, changePct: 0.32, multiplier: 100 },
        "NAS100": { category: "INDICES", price: 19450.20, digits: 2, spreadPips: 1.5, changePct: 0.65, multiplier: 10 },
        "SPX500": { category: "INDICES", price: 5420.50, digits: 2, spreadPips: 1.0, changePct: 0.42, multiplier: 10 }
    };

    let macroCalendarEvents = [
        { time: "15:30", asset: "USD", event: "Core Retail Sales m/m", impact: "high" },
        { time: "16:45", asset: "EUR", event: "ECB President Speech", impact: "high" },
        { time: "21:30", asset: "USD", event: "FOMC Meeting Minutes", impact: "high" }
    ];

    let systemJournalRegistry = [
        { date: "2026-07-06", note: "Retest of structural resistance levels.", status: "Compliant" },
        { date: "2026-07-07", note: "Scaled exposure Parameters downward ahead of data news.", status: "Defensive" }
    ];

    let activeSelectedPair = "EUR/USD";
    let openPositionsRegister = [];
    let pendingOrdersRegister = [];
    let simulationTickArray = [];
    let canvasContext;
    
    window.addEventListener('DOMContentLoaded', () => {
        initPreloaderVisualSimulations();
        runInstitutionalPreloader();
        setInterval(() => { document.getElementById('live-utc-clock').innerText = new Date().toUTCString().replace('GMT', 'UTC'); }, 1000);
        setInterval(() => { simulateHighFrequencyLiquidityStream(); }, 400);
    });

    function navigateToPage(endpointRoute) { window.location.href = endpointRoute; }

    function initPreloaderVisualSimulations() {
        const sparkline = document.getElementById('preloader-sparkline');
        if (!sparkline) return;
        for(let i=0; i<16; i++) {
            const candle = document.createElement('div');
            candle.className = `spark-candle ${Math.random() > 0.4 ? '' : 'down'}`;
            candle.style.height = `${Math.floor(Math.random() * 30) + 8}px`;
            sparkline.appendChild(candle);
        }
    }

    function runInstitutionalPreloader() {
        let currentStep = 0;
        const bar = document.getElementById("preloader-bar");
        const label = document.getElementById("preloader-status");
        const interval = setInterval(() => {
            currentStep += 1;
            if (bar) bar.style.width = `${currentStep}%`;
            if (currentStep >= 100) {
                clearInterval(interval);
                document.getElementById("nexafx-preloader").style.opacity = "0";
                setTimeout(() => {
                    document.getElementById("nexafx-preloader").style.display = "none";
                    const token = localStorage.getItem('nexafx_auth_token');
                    if (token) bypassAuthSequence(); else document.getElementById("nexafx-auth-screen").style.display = "flex";
                }, 600);
            }
        }, 15);
    }

    function switchAuthMode(mode) {
        document.getElementById("auth-gateway-dashboard").style.display = "none";
        document.getElementById("auth-form-login").style.display = "none";
        document.getElementById("auth-form-register").style.display = "none";
        if (mode === 'REGISTER') document.getElementById("auth-form-register").style.display = "flex";
        else if (mode === 'LOGIN') document.getElementById("auth-form-login").style.display = "flex";
        else document.getElementById("auth-gateway-dashboard").style.display = "flex";
    }

    function executeBackendLogin() {
        localStorage.setItem('nexafx_auth_token', 'simulated_secure_bearer_token_node');
        bypassAuthSequence();
    }

    function executeBackendRegistration() {
        localStorage.setItem('nexafx_auth_token', 'simulated_secure_bearer_token_node');
        bypassAuthSequence();
    }

    function clearActiveTerminalSession() {
        localStorage.removeItem('nexafx_auth_token');
        location.reload();
    }

    function bypassAuthSequence() {
        document.getElementById("nexafx-auth-screen").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("nexafx-auth-screen").style.display = "none";
            document.getElementById("main-terminal-layout").style.display = "flex";
            canvasContext = document.getElementById('primaryTerminalCanvas').getContext('2d');
            populateStructuralAssetWatch();
            populateMacroIntelligenceFeed();
            applyAssetSelectionModel(activeSelectedPair);
        }, 500);
    }

    function switchMarketCatalog(category) {
        activeCatalogFilter = category;
        populateStructuralAssetWatch();
    }

    function populateStructuralAssetWatch() {
        const container = document.getElementById('market-watch-container');
        if (!container) return; container.innerHTML = '';
        Object.keys(liquidityCatalog).forEach(symbol => {
            const node = liquidityCatalog[symbol];
            if (node.category !== activeCatalogFilter) return;
            const row = document.createElement('div');
            row.className = `market-watch-row ${symbol === activeSelectedPair ? 'active' : ''}`;
            row.onclick = () => applyAssetSelectionModel(symbol);
            row.innerHTML = `<div><b>${symbol}</b></div><div id="watch-val-${symbol.replace('/','-')}">${node.price.toFixed(node.digits)}</div><div style="color:${node.changePct >= 0 ? 'var(--high-green)' : 'var(--low-red)'}">${node.changePct}%</div>`;
            container.appendChild(row);
        });
    }

    function populateMacroIntelligenceFeed() {
        const container = document.getElementById('macro-news-feed');
        if(!container) return; container.innerHTML = '';
        macroCalendarEvents.forEach(evt => {
            const el = document.createElement('div'); el.className = 'macro-news-card';
            el.innerHTML = `<div><b>${evt.asset}</b> - ${evt.time}</div><p style="color:var(--text-dim)">${evt.event}</p>`;
            container.appendChild(el);
        });
    }

    function applyAssetSelectionModel(symbol) {
        activeSelectedPair = symbol;
        document.getElementById('active-ticker-name').innerText = symbol;
        simulationTickArray = [];
        let baseVal = liquidityCatalog[symbol].price;
        for (let i = 0; i < 50; i++) {
            simulationTickArray.push({ open: baseVal, high: baseVal * 1.002, low: baseVal * 0.998, close: baseVal });
        }
        populateStructuralAssetWatch();
        forceChartRedrawPipeline();
    }

    function adjustOrderFormFields() {
        const type = document.getElementById('ticket-order-type').value;
        document.getElementById('box-execution-price').style.display = type === 'MARKET' ? 'none' : 'block';
    }

    function applyRiskPercentageCalculation() {
        const val = document.getElementById('ticket-risk-percent').value;
        if(val === 'CUSTOM') return;
        document.getElementById('ticket-volume-lots').value = (1.5 * parseFloat(val) * 10).toFixed(2);
        calculateRiskTelemetryMatrices();
    }

    function calculateRiskTelemetryMatrices() {
        const lots = parseFloat(document.getElementById('ticket-volume-lots').value) || 0;
        let margin = lots * 1250;
        document.getElementById('calc-margin-req').innerText = `KES ${margin.toLocaleString()}`;
        document.getElementById('calc-risk-kes').innerText = `KES ${(lots * 450).toLocaleString()}`;
    }

    function commitOrderRoutingTicket(side) {
        const mechanism = document.getElementById('ticket-order-type').value;
        const lots = parseFloat(document.getElementById('ticket-volume-lots').value);
        if(!lots || lots <= 0) return;
        
        if (mechanism === 'MARKET') {
            openPositionsRegister.push({
                id: Math.floor(Math.random() * 900000), pair: activeSelectedPair, type: side, lots: lots,
                entry: liquidityCatalog[activeSelectedPair].price, commission: -250, swap: 0
            });
        } else {
            pendingOrdersRegister.push({ id: Math.floor(Math.random() * 900000), pair: activeSelectedPair, type: mechanism, lots: lots });
        }
        rebuildTerminalLedgerView();
        evaluateBalanceLiquidationEquations();
    }

    function terminateActiveRiskVector(id) {
        openPositionsRegister = openPositionsRegister.filter(p => p.id !== id);
        rebuildTerminalLedgerView();
        evaluateBalanceLiquidationEquations();
    }

    function alterTerminalLedgerFocus(tabId) {
        currentLedgerTab = tabId;
        rebuildTerminalLedgerView();
    }

    function rebuildTerminalLedgerView() {
        document.getElementById('count-pos-lbl').innerText = openPositionsRegister.length;
        document.getElementById('count-ord-lbl').innerText = pendingOrdersRegister.length;
        const vp = document.getElementById('terminal-ledger-display-engine');
        if(!vp) return; vp.innerHTML = '';

        if(currentLedgerTab === 'POSITIONS') {
            openPositionsRegister.forEach(p => {
                const el = document.createElement('div'); el.className = 'ledger-grid-row';
                el.innerHTML = `<div><b>${p.pair}</b></div><div style="color:var(--high-green)">${p.type}</div><div>${p.lots}</div><div>${p.entry}</div><div>${liquidityCatalog[p.pair].price.toFixed(4)}</div><div>--</div><div>--</div><div>${p.commission}</div><div>0</div><div><button style="background:var(--low-red); border:none; padding:2px 6px; color:white; cursor:pointer;" onclick="terminateActiveRiskVector(${p.id})">Close</button></div>`;
                vp.appendChild(el);
            });
        }
    }

    function changeChartRenderProfile(p) { chartVisualizationProfile = p; forceChartRedrawPipeline(); }
    function setChartTimeframe(tf) { chartTimeframeScope = tf; }
    function toggleOverlayTechnicalIndicator(ind) { activeOverlayIndicators[ind] = !activeOverlayIndicators[ind]; forceChartRedrawPipeline(); }

    function forceChartRedrawPipeline() {
        if (!canvasContext) return;
        const w = canvasContext.canvas.width = canvasContext.canvas.clientWidth;
        const h = canvasContext.canvas.height = canvasContext.canvas.clientHeight;
        canvasContext.clearRect(0,0,w,h);
        canvasContext.fillStyle = "var(--high-green)";
        simulationTickArray.forEach((t, i) => {
            canvasContext.fillRect((i * (w/50)), h/2 + (Math.sin(i)*20), 8, 15);
        });
    }

    function simulateHighFrequencyLiquidityStream() {
        Object.keys(liquidityCatalog).forEach(sym => {
            liquidityCatalog[sym].price += (Math.random() - 0.5) * 0.0002;
            let el = document.getElementById(`watch-val-${sym.replace('/','-')}`);
            if(el) el.innerText = liquidityCatalog[sym].price.toFixed(liquidityCatalog[sym].digits);
        });
        evaluateBalanceLiquidationEquations();
    }

    function evaluateBalanceLiquidationEquations() {
        let pnl = 0;
        openPositionsRegister.forEach(p => {
            let diff = p.type === 'BUY' ? (liquidityCatalog[p.pair].price - p.entry) : (p.entry - liquidityCatalog[p.pair].price);
            pnl += diff * p.lots * liquidityCatalog[p.pair].multiplier * 132;
        });
        accountCapitalState.floatingPnL = pnl;
        accountCapitalState.equity = accountCapitalState.balance + pnl;
        document.getElementById('top-balance').innerText = accountCapitalState.balance.toLocaleString();
        document.getElementById('top-equity').innerText = accountCapitalState.equity.toLocaleString();
        let pnlBox = document.getElementById('top-floatingpnl');
        if(pnlBox) {
            pnlBox.innerText = pnl.toLocaleString();
            pnlBox.style.color = pnl >= 0 ? "var(--high-green)" : "var(--low-red)";
        }
    }
</script>
</body>
</html>
