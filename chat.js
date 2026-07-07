/**
 * Nexafxtrade Real-Time Interface Logic
 * File: chat.js
 * Handles: Live Forex Market Data Streams, Real-Time Positions Ledger, and Chat Core
 * Version: 4.1.0 (2026)
 */

// 1. Initialize Socket.io connection safely
const socket = (typeof io !== 'undefined') ? io() : null;

// Institutional Configuration Matrix for multi-asset mapping
let currentActiveAsset = "EUR/USD";
let decimalPrecision = 5;

// Global runtime holders for chart boundary constraints
let customMinY = null;
let customMaxY = null;

// --- DYNAMIC CONTROL STATE FOR REAL-TIME FOREX EXCHANGES ---
let activeOpenPositions = []; // Tracks multiple real active trades [{ id, pair, type, lots, entryPrice }]

// 2. Setup the Live Technical Moving Graph (Chart.js)
const ctx = document.getElementById('tradeChart')?.getContext('2d');
const labels = Array.from({ length: 40 }, () => "");
const dataPoints = Array.from({ length: 40 }, () => null);
let tradeChart = null;

if (ctx) {
    // Generate styling fill matrix mirroring workspace styles
    const visualGradient = ctx.createLinearGradient(0, 0, 0, 300);
    visualGradient.addColorStop(0, 'rgba(0, 176, 255, 0.12)');
    visualGradient.addColorStop(1, 'rgba(0, 176, 255, 0)');

    tradeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: dataPoints,
                borderColor: '#00e676', // Premium bright high-green
                backgroundColor: visualGradient,
                fill: true,
                borderWidth: 2,
                pointRadius: 0, 
                tension: 0.15 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 }, // Instant re-draws for high-speed live tick accuracy
            scales: {
                y: { 
                    position: 'right',
                    grid: { color: '#161f2b', drawTicks: false },
                    ticks: { color: '#556a85', font: { family: 'monospace', size: 10 } }
                },
                x: { display: false }
            },
            plugins: { legend: { display: false } }
        }
    });
}

/**
 * 3. LISTEN FOR LIVE UPDATES & INSTITUTIONAL MATCHING CHANNELS
 */
let activeAdminControlTrend = "AUTO";

if (socket) {
    // Listen for institutional asset adjustments pushed straight from the server backend
    socket.on('admin-force-market-trend', (data) => {
        if (data && data.trend) {
            activeAdminControlTrend = data.trend;
            localStorage.setItem('admin_market_control', data.trend);
        }
    });

    // Intercept graph boundary parameters from administrative liquidity streams
    socket.on('admin-update-graph-limits', (data) => {
        if (data && tradeChart) {
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
        if (!data) return;

        // Sync cross-pair ticks quietly to fallback memory matrix if available locally
        if (window.assetsMatrix && window.assetsMatrix[data.pair]) {
            window.assetsMatrix[data.pair].price = data.currentPrice;
        }

        // Drop out execution cycle early if incoming tick belongs to hidden asset asset
        if (data.pair !== currentActiveAsset) {
            // Recalculate background position floating values silently anyway
            updateLiveOpenPositionsLedger();
            return;
        }

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

        // Sync numerical outputs across terminal heads
        const rateDisplay = document.getElementById('current-rate');
        if (rateDisplay) {
            rateDisplay.innerText = finalRate.toFixed(decimalPrecision);
        }

        // Dynamically shift bounding boxes if limits are unassigned
        if (tradeChart) {
            if (customMaxY === null) {
                let pad = currentActiveAsset === "USD/JPY" ? 0.05 : 0.0005;
                tradeChart.options.scales.y.max = finalRate + pad;
            }
            if (customMinY === null) {
                let pad = currentActiveAsset === "USD/JPY" ? 0.05 : 0.0005;
                tradeChart.options.scales.y.min = finalRate - pad;
            }

            // Roll tick array allocations
            tradeChart.data.datasets[0].data.shift();
            tradeChart.data.datasets[0].data.push(finalRate);
            
            // Change graph color trends seamlessly based on asset vectors
            let historicalData = tradeChart.data.datasets[0].data;
            let prevRate = historicalData[historicalData.length - 2] || finalRate;
            tradeChart.data.datasets[0].borderColor = finalRate >= prevRate ? '#00e676' : '#ff1744';

            tradeChart.update('none');
        }

        // Process portfolio configurations for open contract parameters
        updateLiveOpenPositionsLedger();
    });

    // Handle Live Institutional Chat Engine Events
    socket.on('receive-chat', (data) => {
        appendChatMessageNode(data.user, data.message);
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
            currentBalanceContainer.innerText = data.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    });
}

/**
 * REAL-TIME OPEN PORTFOLIO CALCULATIONS (Floating PnL Matrix)
 */
function updateLiveOpenPositionsLedger() {
    const logContainer = document.getElementById('open-positions-log');
    if (!logContainer) return;

    let totalFloatingPnL = 0;

    activeOpenPositions.forEach(pos => {
        // Fall back gracefully to current-rate UI rendering values if assetsMatrix is out of bounds
        let currentTargetRate = (window.assetsMatrix && window.assetsMatrix[pos.pair]) 
            ? window.assetsMatrix[pos.pair].price 
            : parseFloat(document.getElementById('current-rate')?.innerText) || pos.entryPrice;

        // Standard Institutional Contract Sizes (1 Lot = 100,000 units / JPY = 1,000 units)
        let contractSizeMultiplier = pos.pair === "USD/JPY" ? 1000 : 100000;
        let pnlPoints = (pos.type === "BUY") ? (currentTargetRate - pos.entryPrice) : (pos.entryPrice - currentTargetRate);

        // Calculate institutional value mapped inside domestic KES margin frameworks
        let openPositionPnL = pnlPoints * pos.lots * contractSizeMultiplier;
        let pnlConvertedToKes = openPositionPnL * 130.00; // Reference stable standard cross rate
        totalFloatingPnL += pnlConvertedToKes;

        // Render localized updates directly into matching DOM list targets if bound
        const pnlValueText = document.getElementById(`pnl-val-${pos.id}`);
        if (pnlValueText) {
            pnlValueText.innerText = `KES ${pnlConvertedToKes.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            pnlValueText.style.color = pnlConvertedToKes >= 0 ? '#00e676' : '#ff1744';
        }
    });

    const globalPnLSummary = document.getElementById('total-floating-pnl');
    if (globalPnLSummary) {
        globalPnLSummary.innerText = `KES ${totalFloatingPnL.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        globalPnLSummary.style.color = totalFloatingPnL >= 0 ? '#00e676' : '#ff1744';
    }
}

function appendChatMessageNode(user, message) {
    const chatFeed = document.getElementById('chat-feed');
    if (!chatFeed) return;

    const messageElement = document.createElement('div');
    messageElement.style.fontSize = "0.75rem";
    messageElement.style.marginBottom = "6px";
    messageElement.style.lineHeight = "1.35";
    
    if (user === "System" || user === "SYSTEM") {
        messageElement.innerHTML = `<span style="color: var(--gold-text); font-weight: 700;">[SYSTEM]:</span> <span style="color: #ffffff;">${message}</span>`;
    } else {
        messageElement.innerHTML = `<span style="color: var(--primary); font-weight: 700;">${user}:</span> <span style="color: #cfd8dc;">${message}</span>`;
    }

    chatFeed.appendChild(messageElement);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    while (chatFeed.children.length > 45) {
        chatFeed.removeChild(chatFeed.children[0]);
    }
}

/**
 * 4. INTERACTION EVENT WIRE ROUTINES
 */
document.addEventListener('DOMContentLoaded', () => {
    const chatFeed = document.getElementById('chat-feed');
    const chatInput = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('send-chat-btn');

    if (sendBtn && chatInput) {
        const dispatchMessage = () => {
            const text = chatInput.value.trim();
            if (text !== "") {
                if (socket && socket.connected) {
                    socket.emit('send-chat', { user: "Trader", message: text });
                } else {
                    // Failover layout for unlinked networks
                    appendChatMessageNode("Trader", text);
                }
                chatInput.value = "";
            }
        };

        sendBtn.addEventListener('click', dispatchMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') dispatchMessage();
        });
    }
});

/**
 * EXPORT METHODS SYSTEM (Interface Layer Hook Attachments)
 */
window.registerActiveAssetSwitch = (pairName, baseDigits) => {
    currentActiveAsset = pairName;
    decimalPrecision = baseDigits || 5;
    
    if (tradeChart) {
        let replacementPrice = (window.assetsMatrix && window.assetsMatrix[pairName]) ? window.assetsMatrix[pairName].price : 1.0000;
        let freshPoints = Array(40).fill(replacementPrice);
        tradeChart.data.datasets[0].data = freshPoints;
        tradeChart.update('none');
    }
};

window.injectNewOrderIntoTracker = (orderId, pair, type, lotSize, entryRate) => {
    // Sync array storage instances safely
    const tradeObject = {
        id: orderId,
        pair: pair,
        type: type,
        lots: parseFloat(lotSize),
        entryPrice: parseFloat(entryRate),
        digits: pair === 'USD/JPY' ? 3 : 5
    };
    
    activeOpenPositions.push(tradeObject);
    
    // Map object arrays uniformly to alternate workspace dependencies if applicable
    if (window.portfolioPositions && !window.portfolioPositions.some(p => p.id === orderId)) {
        window.portfolioPositions.push(tradeObject);
    }
    updateLiveOpenPositionsLedger();
};

window.removeOrderFromTracker = (orderId) => {
    activeOpenPositions = activeOpenPositions.filter(pos => pos.id !== orderId);
    if (window.portfolioPositions) {
        window.portfolioPositions = window.portfolioPositions.filter(pos => pos.id !== orderId);
    }
    updateLiveOpenPositionsLedger();
};

window.adjustLotSizeValueBackend = (direction) => {
    // Hook target placeholder mapping cleanly into core UI operations
    console.log(`[NEXAFX Core] Volume configuration adjusted via state tree: ${direction}`);
};
