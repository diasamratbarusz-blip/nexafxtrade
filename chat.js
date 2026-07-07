/**
 * Nexafxtrade Real-Time Interface Logic
 * File: chat.js
 * Handles: Live Forex Market Data Streams, Real-Time Positions Ledger, and Chat Core
 */

// 1. Initialize Socket.io connection
const socket = io();

// Institutional Configuration Matrix for multi-asset mapping
let currentActiveAsset = "EUR/USD";
let decimalPrecision = 5;

// Global runtime holders for chart boundary constraints
let customMinY = null;
let customMaxY = null;

// --- DYNAMIC CONTROL STATE FOR REAL-TIME FOREX EXCHANGES ---
let activeOpenPositions = []; // Tracks multiple real active trades [{ id, pair, type, lots, entryPrice }]

// 2. Setup the Live Technical Moving Graph (Chart.js)
const ctx = document.getElementById('tradeChart').getContext('2d');

// Start with 40 empty points to create a true professional rolling tick window
const labels = Array.from({ length: 40 }, () => "");
const dataPoints = Array.from({ length: 40 }, () => null);

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            data: dataPoints,
            borderColor: '#00e676', // Premium bright high-green
            backgroundColor: 'transparent',
            fill: false,
            borderWidth: 2,
            pointRadius: 0, 
            tension: 0.15 // Tight microsecond latency smoothing look
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 }, // Instant re-draws for high-speed live tick accuracy
        scales: {
            y: { 
                position: 'right',
                grid: { color: '#161f2b' },
                ticks: { color: '#556a85', font: { family: 'monospace' } }
            },
            x: { display: false }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

/**
 * 3. LISTEN FOR LIVE UPDATES & INSTITUTIONAL MATCHING CHANNELS
 */

// Listen for institutional asset adjustments pushed straight from the server backend
let activeAdminControlTrend = "AUTO";
socket.on('admin-force-market-trend', (data) => {
    if (data && data.trend) {
        activeAdminControlTrend = data.trend;
        localStorage.setItem('admin_market_control', data.trend);
    }
});

// Intercept graph boundary parameters from administrative liquidity streams
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
    }
});

// Handle Automated Multi-Asset Interbank Forex Streaming Updates
socket.on('market-update', (data) => {
    // Expected structure: { pair: "EUR/USD", currentPrice: 1.08524, digits: 5, driftDirection: "HIGH"/"LOW"/"AUTO" }
    if (!data || data.pair !== currentActiveAsset) return;

    let finalRate = data.currentPrice;
    decimalPrecision = data.digits || 5;

    const localControl = localStorage.getItem('admin_market_control');
    if (localControl) activeAdminControlTrend = localControl;

    // Execute server trend adjustments cleanly under professional compliance filters
    if (activeAdminControlTrend === "HIGH") {
        finalRate += Math.random() * (currentActiveAsset === "USD/JPY" ? 0.015 : 0.00015);
    } else if (activeAdminControlTrend === "LOW") {
        finalRate -= Math.random() * (currentActiveAsset === "USD/JPY" ? 0.015 : 0.00015);
    }

    // Dynamic scale adjustments matching calculated price targets
    if (customMaxY === null) {
        let pad = currentActiveAsset === "USD/JPY" ? 0.05 : 0.0005;
        tradeChart.options.scales.y.max = finalRate + pad;
    }
    if (customMinY === null) {
        let pad = currentActiveAsset === "USD/JPY" ? 0.05 : 0.0005;
        tradeChart.options.scales.y.min = finalRate - pad;
    }

    // Sync numerical outputs across terminal heads
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = finalRate.toFixed(decimalPrecision);
    }

    // Process portfolio configurations for open contract parameters
    updateLiveOpenPositionsLedger(finalRate);

    // Roll tick array allocations
    tradeChart.data.datasets[0].data.shift();
    tradeChart.data.datasets[0].data.push(finalRate);
    
    // Change graph color trends seamlessly based on asset vectors
    let historicalData = tradeChart.data.datasets[0].data;
    let prevRate = historicalData[historicalData.length - 2] || finalRate;
    tradeChart.data.datasets[0].borderColor = finalRate >= prevRate ? '#00e676' : '#ff1744';

    tradeChart.update('none');
});

/**
 * REAL-TIME OPEN PORTFOLIO CALCULATIONS (Floating PnL Matrix)
 */
function updateLiveOpenPositionsLedger(currentRate) {
    const logContainer = document.getElementById('open-positions-log');
    if (!logContainer || !activeOpenPositions.length) return;

    let totalFloatingPnL = 0;
    activeOpenPositions.forEach(pos => {
        if (pos.pair !== currentActiveAsset) return;

        // Standard Institutional Contract Sizes (1 Lot = 100,000 units / JPY = 1,000 units)
        let contractSizeMultiplier = pos.pair === "USD/JPY" ? 1000 : 100000;
        let pnlPoints = 0;

        if (pos.type === "BUY") {
            pnlPoints = currentRate - pos.entryPrice;
        } else {
            pnlPoints = pos.entryPrice - currentRate;
        }

        // Calculate institutional value mapped inside domestic KES margin frameworks
        let openPositionPnL = pnlPoints * pos.lots * contractSizeMultiplier;
        let pnlConvertedToKes = openPositionPnL * 130.00; // Reference stable standard localized cross rate
        totalFloatingPnL += pnlConvertedToKes;

        // Render localized updates directly into matching DOM list targets if bound
        const positionRow = document.getElementById(`pos-row-${pos.id}`);
        if (positionRow) {
            const pnlValueText = positionRow.querySelector('.pos-live-pnl');
            if (pnlValueText) {
                pnlValueText.innerText = `KES ${pnlConvertedToKes.toFixed(2)}`;
                pnlValueText.style.color = pnlConvertedToKes >= 0 ? '#00e676' : '#ff1744';
            }
        }
    });

    const globalPnLSummary = document.getElementById('total-floating-pnl');
    if (globalPnLSummary) {
        globalPnLSummary.innerText = `KES ${totalFloatingPnL.toFixed(2)}`;
        globalPnLSummary.style.color = totalFloatingPnL >= 0 ? '#00e676' : '#ff1744';
    }
}

// Handle Live Institutional Chat Engine Events
const chatFeed = document.getElementById('chat-feed');
const chatInput = document.getElementById('chat-input-field');
const sendBtn = document.getElementById('send-chat-btn');

socket.on('receive-chat', (data) => {
    if (chatFeed) {
        const messageElement = document.createElement('div');
        messageElement.style.padding = "6px 0";
        messageElement.style.fontSize = "0.85rem";
        messageElement.style.borderBottom = "1px solid rgba(255,255,255,0.02)"; 
        
        if (data.user === "System") {
            messageElement.innerHTML = `<span style="color: #ffd600; font-weight: 700;"><i class="fas fa-shield-alt"></i> SYSTEM:</span> <span style="color: #ffffff;">${data.message}</span>`;
        } else {
            messageElement.innerHTML = `<span style="color: #00b0ff; font-weight: 700;">${data.user}:</span> <span style="color: #cfd8dc;">${data.message}</span>`;
        }

        chatFeed.appendChild(messageElement);
        chatFeed.scrollTop = chatFeed.scrollHeight;

        if (chatFeed.children.length > 35) {
            chatFeed.removeChild(chatFeed.children[0]);
        }
    }
});

// Handle Core Broadcast Alerts from Institutional Clearing Channels
socket.on('admin-global-broadcast', (data) => {
    if (data && data.msg) {
        alert("NEXAFX INTERBANK BROADCAST: \n\n" + data.msg);
    }
});

socket.on('admin-force-balance', (data) => {
    const currentBalanceContainer = document.getElementById('user-balance-display');
    if (currentBalanceContainer && data && typeof data.balance === 'number') {
        currentBalanceContainer.innerText = "KES " + data.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
});

/**
 * 4. INTERACTION EVENT WIRE ROUTINES
 */
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            socket.emit('send-chat', { user: "Trader", message: text });
            chatInput.value = "";
        }
    });
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
}

/**
 * EXPORT METHODS SYSTEM (Interface Layer Hook Attachments)
 */
window.registerActiveAssetSwitch = (pairName, baseDigits) => {
    currentActiveAsset = pairName;
    decimalPrecision = baseDigits || 5;
    
    // Clear graph variables matching historical constraints securely
    for (let i = 0; i < dataPoints.length; i++) dataPoints[i] = null;
    tradeChart.update('none');
};

window.injectNewOrderIntoTracker = (orderId, pair, type, lotSize, entryRate) => {
    activeOpenPositions.push({
        id: orderId,
        pair: pair,
        type: type,
        lots: parseFloat(lotSize),
        entryPrice: parseFloat(entryRate)
    });
    updateLiveOpenPositionsLedger(entryRate);
};

window.removeOrderFromTracker = (orderId) => {
    activeOpenPositions = activeOpenPositions.filter(pos => pos.id !== orderId);
    updateLiveOpenPositionsLedger(0);
};

window.adjustLotSizeValue = (direction) => {
    const lotInput = document.getElementById('lot-size-input');
    if (!lotInput) return;

    let currentLots = parseFloat(lotInput.value) || 1.00;
    if (direction === 'add') {
        lotInput.value = (currentLots + 0.1).toFixed(2);
    } else if (direction === 'subtract') {
        lotInput.value = Math.max(0.01, currentLots - 0.1).toFixed(2);
    }
};
