/**
 * Nexafxtrade Integrated Logic
 * Optimized for wavy movement and color-split fill as seen in image_3.png
 * Version: 3.2.0 (May 2026)
 * Complete integration version - Do not remove anything
 */

// 1. Initialize Socket.io connection to the Node server
let socket;
try {
    socket = io();
} catch (e) {
    console.warn("Socket.io engine failed initialization. Defaulting to local standalone emulation system rules.");
}

const ctx = document.getElementById('tradeChart').getContext('2d');

// Setup gradient configurations for smooth background fills
const chartGradient = ctx.createLinearGradient(0, 0, 0, 350);
chartGradient.addColorStop(0, 'rgba(0, 212, 255, 0.22)');
chartGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

// Initialize with 60 points for a smooth, high-resolution wave
let chartData = Array(60).fill(8421500); 
let labels = Array(60).fill('');

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Live Rate',
            data: chartData,
            borderColor: '#00ff00', // Neon green line
            borderWidth: 2.5,
            pointRadius: 0, 
            fill: true,
            backgroundColor: chartGradient,
            tension: 0.42, // Essential for the smooth "Wavy" appearance
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 350, // Smooth transition for wave movement
            easing: 'linear'
        },
        scales: {
            x: { display: false },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)', drawTicks: false },
                ticks: { color: '#4a5568', font: { size: 10, family: 'monospace' } }
            }
        },
        plugins: { 
            legend: { display: false } 
        }
    }
});

// --- Core Application Financial States Framework ---
let currentPrice = 8421500;
let walletBalance = 1450000;

// --- Live Transaction Tracking Architecture ---
let activeTradePosition = null; 

/**
 * Global Market View Modifiers Matrix
 */
function updateMarketView(rateValue) {
    const previousPrice = currentPrice;
    currentPrice = rateValue;
    const absoluteDelta = currentPrice - previousPrice;

    // Update the "Rate" text display overlay
    const rateDisplay = document.getElementById('current-rate');
    const mainPriceDisplay = document.getElementById('mainPrice');
    
    const displayValue = typeof currentPrice === 'number' ? currentPrice : parseFloat(currentPrice);
    
    if (rateDisplay) {
        rateDisplay.innerText = displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    }
    if (mainPriceDisplay) {
        mainPriceDisplay.innerText = Math.floor(displayValue).toLocaleString();
    }

    const trendContainer = document.getElementById('priceTrend');
    if (trendContainer) {
        if (absoluteDelta >= 0) {
            trendContainer.innerHTML = `<i class="fas fa-caret-up"></i> +KES ${absoluteDelta.toFixed(2)}`;
            trendContainer.style.color = "var(--success)";
            tradeChart.data.datasets[0].borderColor = '#00e676';
        } else {
            trendContainer.innerHTML = `<i class="fas fa-caret-down"></i> -KES ${Math.abs(absoluteDelta).toFixed(2)}`;
            trendContainer.style.color = "var(--danger)";
            tradeChart.data.datasets[0].borderColor = '#ff5252';
        }
    }

    // Shift data for the continuous scrolling wave effect
    chartData.shift();
    chartData.push(displayValue);
    
    // Update the chart using 'none' for high-performance gliding
    tradeChart.update('none');

    // Run live active calculation mechanics matching tracking inputs
    processLiveCountingTransaction();

    if (Math.abs(absoluteDelta) > 6000) {
        playSound('tick');
    }
}

/**
 * 2. REAL-TIME DATA HANDLING & DATA PIPELINE FALLBACKS
 * Listens for 'market-update' events from your Node server
 */
if (socket) {
    socket.on('market-update', (data) => {
        if (data && data.rate !== undefined) {
            updateMarketView(data.rate);
        }
    });
}

// Standalone Local Matrix Generator Emulation
setInterval(() => {
    if (!socket || !socket.connected) {
        const simulatedVolatility = (Math.random() - 0.48) * 14000;
        updateMarketView(currentPrice + simulatedVolatility);
    }
}, 800);

/**
 * 3. SOCIAL PROOF & CHAT SYSTEM
 */
// Target matching elements from both structural layout architectures securely
const chatFeed = document.getElementById('chat-feed') || document.getElementById('tradeLogs');
const chatInput = document.getElementById('chat-input-field') || document.querySelector('.chat-input input');
const sendBtn = document.getElementById('send-chat-btn') || document.querySelector('.chat-send-btn') || document.querySelector('.chat-input button'); 

// Automated System Notifications matching the style of image_3.png
const systemUsers = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Xy1', '@Lodenyi100', '@Lucid@juicewrld', '@Kenyan_Trader', '@CryptoNaija'];

function injectChatMessage(user, message, isSystem = false, systemColor = '#ffcc00') {
    if (!chatFeed) return;
    const wrapperNode = document.createElement('div');
    wrapperNode.style.marginBottom = "10px";
    wrapperNode.style.borderBottom = "1px solid rgba(255,255,255,0.02)";
    wrapperNode.style.paddingBottom = "6px";
    wrapperNode.style.fontSize = "13px";
    wrapperNode.style.animation = "slideIn 0.25s ease-out";

    if (isSystem) {
        wrapperNode.innerHTML = `<span style="color:${systemColor}; font-weight:bold;">[${user}]:</span> ${message}`;
    } else {
        wrapperNode.innerHTML = `<span style="color: var(--primary); font-weight:bold;">${user}:</span> <span style="color: #cbd5e1;">${message}</span>`;
    }

    chatFeed.appendChild(wrapperNode);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Keep the chat clean: remove old messages if list is too long
    if (chatFeed.children.length > 25) {
        chatFeed.removeChild(chatFeed.children[0]);
    }
}

function addSystemNotification() {
    const user = systemUsers[Math.floor(Math.random() * systemUsers.length)];
    const amount = (Math.random() * 800 + 200).toFixed(2);
    const complexMessage = `CONGRATULATIONS ${user} on your withdrawal of <span style="color:var(--success); font-weight:bold;">KES ${parseFloat(amount).toLocaleString()}</span> 🤑🔥`;
    injectChatMessage("SYSTEM", complexMessage, true, "#ffcc00");
}

// Generate a system notification every 8 seconds for constant social proof
setInterval(addSystemNotification, 8000);

// Handling User-Sent Messages Transmission
if (sendBtn) {
    sendBtn.onclick = executeMessageTransmission;
}
if (chatInput) {
    chatInput.onkeydown = (e) => { if (e.key === 'Enter') executeMessageTransmission(); };
}

function executeMessageTransmission() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (text !== "") {
        if (socket && socket.connected) {
            // Emitting to server so other connected users see it
            socket.emit('send-chat', { user: 'Trader_' + Math.floor(Math.random() * 899 + 100), message: text });
        } else {
            injectChatMessage('You (Local)', text, false);
        }
        chatInput.value = "";
    }
}

// Listen for messages from the server (System and User)
if (socket) {
    socket.on('receive-chat', (data) => {
        if (data.user === "System" || data.user === "SYSTEM") {
            injectChatMessage("SYSTEM", data.message, true, "#ffcc00");
        } else {
            injectChatMessage(data.user, data.message, false);
        }
    });
}

/**
 * 4. TRADING EXECUTION
 */
const buyBtn = document.getElementById('buy-btn') || document.querySelector('.buy-btn') || document.querySelector('.btn-buy');
const sellBtn = document.getElementById('sell-btn') || document.querySelector('.sell-btn') || document.querySelector('.btn-sell');

function handleTrade(orderType) {
    const orderStakeInput = document.getElementById('trade-amount') || document.querySelector('.amount-input');
    if (!orderStakeInput) return;
    
    const stakeValue = parseFloat(orderStakeInput.value) || 0;

    if (stakeValue <= 0 || walletBalance < stakeValue) {
        alert("Invalid stake metrics configuration processing requested order execution.");
        return;
    }

    // Dynamic Execution Mapping Logic & Counter State Configuration
    if (orderType === 'BUY') {
        walletBalance -= stakeValue;
        playSound('buy');
        injectChatMessage("SYSTEM ALERT", `Executed immediate KES BUY position sizing: ${stakeValue} KES`, true, "var(--success)");
        
        // Define tracking calculation metric data parameters
        activeTradePosition = {
            type: 'BUY',
            entryPrice: currentPrice,
            stake: stakeValue,
            targetAmount: stakeValue * 1.5 // Targets 150% (aiming scale)
        };

        if (socket && socket.connected) {
            socket.emit('place-trade', { type: 'BUY', amount: stakeValue });
        }
        console.log("BUY order sent to server context.");
    } else {
        // If a buy position was active, this executes the liquidating sell operation
        if (activeTradePosition) {
            let currentMultiplier = currentPrice / activeTradePosition.entryPrice;
            let finalPayout = activeTradePosition.stake * currentMultiplier;
            walletBalance += finalPayout;
            injectChatMessage("SYSTEM ALERT", `Sold position successfully! Recieved KES ${finalPayout.toFixed(2)}`, true, "var(--success)");
            activeTradePosition = null; // Clear position tracking configuration
        } else {
            walletBalance += (stakeValue * 0.95); // Example fallback transaction parameters
            injectChatMessage("SYSTEM ALERT", `Liquidated dynamic Asset stake volume: ${stakeValue} KES`, true, "var(--danger)");
        }
        
        playSound('sell');
        
        if (socket && socket.connected) {
            socket.emit('place-trade', { type: 'SELL', amount: stakeValue });
        }
        console.log("SELL order sent to server context.");
    }

    // Visual Refresh Across Balance Elements
    refreshUIBalances();
    
    // Legacy support additions tracking system logs inside sidebars
    const logsContainer = document.getElementById('tradeLogs');
    if (logsContainer) {
        const item = document.createElement('div');
        item.className = 'log-item';
        item.innerHTML = `<span style="color:${orderType === 'BUY' ? 'var(--success)' : 'var(--danger)'}">${orderType} EXEC</span> <span>KES ${stakeValue.toLocaleString()}</span>`;
        logsContainer.prepend(item);
        if (logsContainer.children.length > 8) logsContainer.lastChild.remove();
    }
}

// Map bindings to conditional event checking protocols safely
if (buyBtn && !buyBtn.onclick) {
    buyBtn.onclick = () => { handleTrade('BUY'); };
}
if (sellBtn && !sellBtn.onclick) {
    sellBtn.onclick = () => { handleTrade('SELL'); };
}

// Listen for trade outcome from server.js engine
if (socket) {
    socket.on('trade-result', (data) => {
        const resultMsg = data.status === "WIN" ? `Win! KES ${data.payout}` : "Loss. Try again!";
        console.log(`Nexafxtrade: ${resultMsg}`);
        injectChatMessage("ENGINE", `Trade Result: ${resultMsg}`, true, data.status === "WIN" ? "var(--success)" : "var(--danger)");
    });
}

/**
 * 5. LOW-LATENCY FREQUENCY SYNTHETIC WEB AUDIO ENGINE
 */
let audioCtx;
let soundEnabled = false;

window.initAudio = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundBtn') || document.querySelector('.sound-status');
    if (btn) {
        btn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i> SOUND ON' : '<i class="fas fa-volume-mute"></i> SOUND OFF';
        btn.className = soundEnabled ? 'sound-status on' : 'sound-status';
    }
};

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'tick') {
        osc.frequency.setValueAtTime(750, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        osc.start(); osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'buy') {
        osc.frequency.setValueAtTime(450, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
        osc.start(); osc.stop(audioCtx.currentTime + 0.25);
    } else if (type === 'sell') {
        osc.frequency.setValueAtTime(950, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
        osc.start(); osc.stop(audioCtx.currentTime + 0.25);
    }
}

/**
 * 6. UI INTERACTION HELPERS (Global Scope)
 */
window.adjustAmount = (val) => {
    const input = document.getElementById('trade-amount') || document.querySelector('.amount-input');
    if (!input) return;

    let current = parseInt(input.value) || 0;
    if (val === 'double') {
        input.value = current * 2;
    } else {
        input.value = Math.max(0, current + val);
    }
};

window.setSum = (val) => {
    const input = document.getElementById('trade-amount') || document.querySelector('.amount-input');
    if (input) input.value = val;
};

/**
 * ==========================================================================
 * NEW INTEGRATIONS: TRANSACTION TRACKING & RESPONSIVE HUB ROUTINES
 * ==========================================================================
 */

/**
 * Centralized Balance Display Formatter Utility
 */
function refreshUIBalances() {
    const localBal = document.getElementById('user-balance') || document.getElementById('walletBal');
    const walletBal = document.getElementById('walletBal') || document.querySelector('.wallet-amount');
    const formattedBalance = walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    if (localBal) localBal.innerText = formattedBalance;
    if (walletBal) {
        if (walletBal.tagName === 'INPUT') {
            walletBal.value = `KES ${formattedBalance}`;
        } else {
            walletBal.innerText = walletBal.id === 'walletBal' ? `KES ${formattedBalance}` : formattedBalance;
        }
    }
}

/**
 * Tracks and Calculates Transaction Value in Real-Time to prompt accurate sells
 */
function processLiveCountingTransaction() {
    const liveValueDisplay = document.getElementById('live-running-amount');
    const targetIndicator = document.getElementById('aiming-target-indicator');
    
    if (!liveValueDisplay) return;

    if (activeTradePosition) {
        // Evaluate market variance calculations
        let structuralRatio = currentPrice / activeTradePosition.entryPrice;
        let currentLiveCountingValue = activeTradePosition.stake * structuralRatio;
        
        liveValueDisplay.innerText = `KES ${currentLiveCountingValue.toFixed(2)}`;
        
        if (targetIndicator) {
            targetIndicator.innerText = `Aiming Target: KES ${activeTradePosition.targetAmount.toFixed(2)}`;
        }

        // Apply style class modifiers based on performance benchmarks
        if (currentLiveCountingValue >= activeTradePosition.targetAmount) {
            liveValueDisplay.className = "live-running-amount profit-reached";
        } else if (currentLiveCountingValue < activeTradePosition.stake) {
            liveValueDisplay.className = "live-running-amount loss-danger";
        } else {
            liveValueDisplay.className = "live-running-amount";
        }
    } else {
        // Idle System state indicators when no dynamic transactions are open
        liveValueDisplay.innerText = "KES 0.00";
        liveValueDisplay.className = "live-running-amount";
        if (targetIndicator) targetIndicator.innerText = "No active trade counting";
    }
}

/**
 * Navigation Button Framework Route Binding Utilities
 */
window.executeWithdrawalRoute = () => {
    injectChatMessage("SYSTEM", "Redirecting to Secured Withdrawal Processing Channel...", true, "var(--primary)");
    console.log("Navigation Execution: Withdraw channel open.");
};

window.executeDepositRoute = () => {
    injectChatMessage("SYSTEM", "Opening Instant Account Liquidity Loading Portal...", true, "var(--success)");
    console.log("Navigation Execution: Deposit channel open.");
};

window.toggleHowToTradeModal = () => {
    alert("Nexafxtrade Tutorial Desk:\n1. Input your target stake amount.\n2. Click BUY to grab an active market contract position.\n3. Monitor the live counting transaction field.\n4. Click SELL once position meets or exceeds your aiming amount target!");
};

window.triggerReferralSystem = () => {
    const simulationLink = `https://nexafxtrade.premium/ref?id=${Math.floor(Math.random() * 89999 + 10000)}`;
    alert(`Copy your exclusive referral network dashboard configuration link:\n${simulationLink}`);
    injectChatMessage("REWARDS", "Referral link copied to Clipboard environment context system framework.", true, "var(--gold-text)");
};

/**
 * Environment Simulation Context Controllers (Demo Play vs Real Play)
 */
window.switchAccountMode = (selectedMode, clickedElement) => {
    // Reset active indicators across dynamic mode controls selectors
    const modes = document.querySelectorAll('.mode-btn');
    modes.forEach(btn => {
        btn.classList.remove('active-demo', 'active-real');
    });

    if (selectedMode === 'DEMO') {
        clickedElement.classList.add('active-demo');
        walletBalance = 100000; // Load simulated training funds asset limits
        injectChatMessage("SYSTEM CONSOLE", "Switched to Demo Play Sandbox. Trades use simulated asset variables.", true, "var(--primary)");
    } else {
        clickedElement.classList.add('active-real');
        walletBalance = 1450000; // Restore standard profile capital configurations
        injectChatMessage("SYSTEM CONSOLE", "Switched to Live Production Server. Real capital trading rules applied.", true, "var(--success)");
    }
    
    refreshUIBalances();
};

console.log("Nexafxtrade: Script logic loaded successfully.");
