<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexafxtrade | Pro Trading Terminal</title>
    
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body onload="refreshUIBalances()">
    <div class="app-container">
        <header class="main-header">
            <div class="brand">NEXAFX<span>TRADE</span></div>
            
            <div class="nav-controls">
                <div class="account-mode-selector">
                    <button class="mode-btn active-real" onclick="switchAccountMode('REAL', this)">REAL</button>
                    <button class="mode-btn" onclick="switchAccountMode('DEMO', this)">DEMO</button>
                </div>

                <div class="balance-box">
                    <span class="label">KES</span>
                    <span id="user-balance" class="value">0.00</span>
                </div>
                
                <div class="action-shortcuts">
                    <button class="btn-deposit" onclick="executeDepositRoute()">
                        <i class="fas fa-plus-circle"></i> Deposit
                    </button>
                    <button class="btn-withdraw" onclick="executeWithdrawalRoute()">
                        <i class="fas fa-wallet"></i> Withdraw
                    </button>
                </div>
                
                <div class="menu-icon" onclick="toggleSettings()"><i class="fas fa-bars"></i></div>
            </div>
        </header>

        <main class="content-grid">
            <aside class="chat-section">
                <div class="chat-header">
                    <span><i class="fas fa-comments"></i> LIVE TRADING CHAT</span>
                    <span class="online-indicator">Online: 4,821</span>
                </div>
                
                <div id="chat-feed" class="chat-body">
                    </div>

                <div class="chat-input-area">
                    <input type="text" id="chat-input-field" placeholder="Share your trade signal...">
                    <button id="send-chat-btn"><i class="fas fa-paper-plane"></i></button>
                </div>
            </aside>

            <section class="trade-section">
                <div class="price-stats-bar">
                    <div class="stat-item">
                        <span class="stat-label">Market Pulse:</span>
                        <span id="current-rate" class="stat-value">8,421,500.00</span>
                    </div>
                    <div id="priceTrend" class="stat-trend">
                        <i class="fas fa-caret-up"></i> +KES 120.45
                    </div>
                </div>

                <div class="chart-wrapper">
                    <canvas id="tradeChart"></canvas>
                    
                    <div class="live-counter-overlay">
                        <div class="counting-label">LIVE PROFIT ESTIMATE</div>
                        <div id="live-running-amount" class="live-running-amount">KES 0.00</div>
                        <div id="aiming-target-indicator" class="target-hint">No active trade counting</div>
                    </div>
                </div>

                <div class="trade-controls-panel">
                    <div class="input-management">
                        <div class="control-label">Investment Amount (KES)</div>
                        <div class="amount-input-row">
                            <button class="adj-btn" onclick="adjustAmount(-100)">-</button>
                            <input type="number" id="trade-amount" value="500">
                            <button class="adj-btn" onclick="adjustAmount(100)">+</button>
                            <button class="x2-btn" onclick="adjustAmount('double')">x2</button>
                        </div>
                        
                        <div class="quick-select-sums">
                            <button onclick="setSum(500)">500</button>
                            <button onclick="setSum(1000)">1,000</button>
                            <button onclick="setSum(5000)">5,000</button>
                            <button class="help-btn" onclick="toggleHowToTradeModal()"><i class="fas fa-question-circle"></i></button>
                        </div>
                    </div>

                    <div class="action-gate">
                        <button id="buy-btn" class="buy-btn">
                            <span class="btn-main">BUY</span>
                            <span class="btn-sub">Bullish Entry</span>
                        </button>
                        <button id="sell-btn" class="sell-btn">
                            <span class="btn-main">SELL</span>
                            <span class="btn-sub">Liquidate</span>
                        </button>
                    </div>
                </div>
            </section>
        </main>

        <footer class="terminal-footer">
            <div class="footer-content">
                <div class="office-info">
                    <strong>NEXAFX HQ:</strong> Binaa Mall, 2nd Floor, Langata Rd, Nairobi, Kenya.
                </div>
                <div class="support-info">
                    <strong>Support:</strong> support@unasemeje.com | <strong>Ref ID:</strong> <span id="ref-display" onclick="triggerReferralSystem()">GET LINK</span>
                </div>
                <div class="copyright">
                    &copy; 2026 Nexafxtrade. Licensed & Powered by Prosport Africa Ltd.
                </div>
            </div>
            <div class="risk-disclaimer">
                *High-frequency trading involves risk. Referral bonus of 10% applied instantly to wallet balance upon friend's first deposit.
            </div>
        </footer>
    </div>

    <div id="soundBtn" class="sound-status" onclick="initAudio()">
        <i class="fas fa-volume-mute"></i> SOUND OFF
    </div>

    <script src="integrated-logic.js"></script>
</body>
</html>
