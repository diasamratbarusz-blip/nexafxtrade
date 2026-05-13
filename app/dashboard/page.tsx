<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexafxtrade | Dashboard</title>
    <!-- Links to your established assets -->
    <link rel="stylesheet" href="style.css">
    <!-- Essential for the live moving graph -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="app-container">
        <!-- Top Navigation Bar -->
        <header class="main-header">
            <div class="brand">Nexafxtrade</div>
            <div class="nav-controls">
                <div class="balance-box">
                    <span class="label">KES</span>
                    <!-- User balance displayed in KSh as per business requirements -->
                    <span id="user-balance" class="value">0.00</span>
                </div>
                <!-- Automated deposit and withdrawal controls -->
                <button class="btn-deposit" onclick="handleDeposit()">Deposit</button>
                <button class="btn-withdraw" onclick="handleWithdraw()">Withdraw</button>
                <div class="menu-icon">☰</div>
            </div>
        </header>

        <main class="content-grid">
            <!-- Live Activity Sidebar (Chat Feed) -->
            <section class="chat-section">
                <!-- Header color matches the dark green in image_2.png -->
                <div class="chat-header">Chat</div>
                <!-- Live feed for social proof and withdrawal notifications -->
                <div id="chat-feed" class="chat-body">
                    <!-- Notifications are pushed here by script.js -->
                </div>
                <div class="chat-input">
                    <input type="text" id="chat-message" placeholder="Write your message!">
                    <button id="send-btn">SEND</button>
                </div>
            </section>

            <!-- Trading Center with Real-Time Graph -->
            <section class="trade-section">
                <!-- Floating rate overlay matching image_2.png -->
                <div class="rate-overlay">Rate: <span id="current-rate">0.0331</span></div>
                
                <div class="chart-container">
                    <!-- Target for the moving graph animation -->
                    <canvas id="tradeChart"></canvas>
                </div>

                <div class="trade-controls">
                    <!-- Amount Input and Adjustments -->
                    <div class="amount-input-row">
                        <button class="adj-btn" onclick="updateAmount(-10)">-</button>
                        <input type="number" id="trade-amount" value="100">
                        <button class="adj-btn" onclick="updateAmount(10)">+</button>
                        <button class="x2-btn" onclick="updateAmount('double')">x2</button>
                    </div>
                    
                    <div class="quick-sums">
                        <!-- Standard amounts based on Kenyan user preferences -->
                        <button onclick="setSum(100)">100</button>
                        <button onclick="setSum(200)">200</button>
                        <button onclick="setSum(500)">500</button>
                        <button class="undo-btn">↺</button>
                    </div>

                    <!-- High-contrast Action Buttons -->
                    <div class="action-buttons">
                        <button id="buy-btn" class="buy-btn">BUY</button>
                        <button id="sell-btn" class="sell-btn">SELL</button>
                    </div>
                </div>
            </section>
        </main>

        <!-- Professional Footer with your business credentials -->
        <footer class="legal-footer">
            <p>Nexafxtrade is a registered entity. Physical Presence: Binaa Mall, 2nd Floor, Langata Rd, Nairobi.</p>
            <p>Contact Support: support@unasemeje.com | &copy; 2026 Nexafxtrade. Powered by Prosport Africa Ltd.</p>
            <p style="font-size: 0.65rem; margin-top: 5px;">*Earn a 10% referral bonus by inviting your friends! Terms & Conditions apply.</p>
        </footer>
    </div>

    <!-- Core Logic File -->
    <script src="script.js"></script>

    <!-- UI Helper Logic -->
    <script>
        function updateAmount(action) {
            const input = document.getElementById('trade-amount');
            let current = parseInt(input.value);
            if (action === 'double') {
                input.value = current * 2;
            } else {
                input.value = Math.max(10, current + action);
            }
        }

        function setSum(val) {
            document.getElementById('trade-amount').value = val;
        }

        function handleDeposit() {
            // Logic to trigger automated M-Pesa STK Push
            console.log("Initiating automated deposit...");
        }
    </script>
</body>
</html>
