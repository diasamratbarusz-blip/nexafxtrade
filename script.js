/**
 * Nexafxtrade Integrated Logic
 * Path: ./public/js/script.js
 * Version: 4.0.0 (July 2026)
 * Description: High-performance multi-asset live graph visualization, professional order logging, and audio layer.
 */

// 1. Initialize Socket.io connection safely
let socket;
try {
    socket = io();
} catch (e) {
    console.warn("[NEXAFX] Socket.io engine offline. Initializing local interbank market emulator.");
}

const ctx = document.getElementById('tradeChart').getContext('2d');

// Setup premium gradient configurations for institutional chart styling
const chartGradient = ctx.createLinearGradient(0, 0, 0, 350);
chartGradient.addColorStop(0, 'rgba(0, 176, 255, 0.15)');
chartGradient.addColorStop(1, 'rgba(0, 176, 255, 0)');

// Initialize high-resolution rolling timeline (60 data frames)
let chartData = Array(60).fill(1.08500); 
let labels = Array(60).fill('');
let currentActiveAsset = "EUR/USD";
let decimalPrecision = 5;

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Live Rate',
            data: chartData,
            borderColor: '#00e676', // High-performance Bright Green
            borderWidth: 2,
            pointRadius: 0, 
            fill: true,
            backgroundColor: chartGradient,
            tension: 0.15, // Tight micro-movement technical spacing
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 }, // Instant drawing updates for real-time streaming ticks
        scales: {
            x: { display: false },
            y: {
                position: 'right',
                grid: { color: '#161f2b', drawTicks: false },
                ticks: { 
                    color: '#556a85', 
                    font: { size: 10, family: 'monospace' },
                    callback: (value) => value.toFixed(decimalPrecision)
                }
            }
        },
        plugins: { legend: { display: false } }
    }
});

// --- Core Institutional Financial States ---
let currentPrice = 1.08500;
let marginBalance = 1450000;
let activeOpenPositions = []; // Collection matrix for active contracts [{ id, pair, type, lots, entryPrice }]
let activeAdminControlTrend = "AUTO";

/**
 * 2. LIVE LIQUIDITY MARKET UPDATE ENGINE
 */
function updateMarketView(rateValue) {
    const previousPrice = currentPrice;
    let modifiedRate = rateValue;
    
    // Process institutional admin trend direction constraints safely if injected via sockets
    if (activeAdminControlTrend === "HIGH") {
        modifiedRate += Math.random() * (currentActiveAsset === "USD/JPY" ? 0.012 : 0.00012);
    } else if (activeAdminControlTrend === "LOW") {
        modifiedRate -= Math.random() * (currentActiveAsset === "USD/JPY" ? 0.012 : 0.00012);
    }

    currentPrice = modifiedRate;
    const technicalDelta = currentPrice - previousPrice;

    // Synchronize UI Display Elements across matching interface components
    const rateDisplay = document.getElementById('current-rate');
    const mainPriceDisplay = document.getElementById('mainPrice');
    const trendContainer = document.getElementById('priceTrend');
    
    if (rateDisplay) rateDisplay.innerText = currentPrice.toFixed(decimalPrecision);
    if (mainPriceDisplay) mainPriceDisplay.innerText = currentPrice.toFixed(decimalPrecision);

    if (trendContainer) {
        if (technicalDelta >= 0) {
            trendContainer.innerHTML = `<i class="fas fa-caret-up"></i> +${technicalDelta.toFixed(decimalPrecision)}`;
            trendContainer.style.color = "#00e676";
            tradeChart.data.datasets[0].borderColor = '#00e676';
        } else {
            trendContainer.innerHTML = `<i class="fas fa-caret-down"></i> -${Math.abs(technicalDelta).toFixed(decimalPrecision)}`;
            trendContainer.style.color = "#ff1744";
            tradeChart.data.datasets[0].borderColor = '#ff1744';
        }
    }

    // Shift data window horizontally to maintain 60-tick timeline framework
    chartData.shift();
    chartData.push(currentPrice);
    tradeChart.update('none');

    // recalculate current exposure matrix values
    processLiveFloatingPortfolioPnL();
    if (Math.abs(technicalDelta) > (currentActiveAsset === "USD/JPY" ? 0.02 : 0.0002)) playSound('tick');
}

/**
 * 3. SOCKET PIPELINE INTERCONNECTIONS
 */
if (socket) {
    socket.on('market-update', (data) => {
        // Safe channel filtering for multi-asset distribution
        if (data && data.pair === currentActiveAsset && data.currentPrice !== undefined) {
            activeAdminControlTrend = data.driftDirection || "AUTO";
            updateMarketView(data.currentPrice);
        }
    });

    socket.on('admin-force-balance', (data) => {
        if (data && typeof data.balance === 'number') {
            marginBalance = data.balance;
            refreshUIBalances();
        }
    });
}

// Low-Latency Client-Side Emulation Fallback Trigger
setInterval(() => {
    if (!socket || !socket.connected) {
        const structuralVolatility = (Math.random() - 0.5) * (currentActiveAsset === "USD/JPY" ? 0.015 : 0.00015);
        updateMarketView(currentPrice + structuralVolatility);
    }
}, 400);

/**
 * 4. REAL-TIME MULTI-ASSET CONTROL ROUTINES
 */
window.registerActiveAssetSwitch = (pairName, baseDigits) => {
    currentActiveAsset = pairName;
    decimalPrecision = baseDigits || 5;
    
    // Repopulate safe default visual coordinates for selected asset pair context
    currentPrice = pairName === "USD/JPY" ? 156.40 : 1.0850;
    chartData = Array(60).fill(currentPrice);
    tradeChart.data.datasets[0].data = chartData;
    tradeChart.update('none');

    injectChatMessage("MARKET", `Switched clearing pipeline channel to ${pairName}`, true, "var(--primary)");
};

/**
 * 5. INSTITUTIONAL POSITION PLACEMENT LOGIC
 */
function handleInstantDealPlacement(orderType) {
    const volumeInput = document.getElementById('lot-size-input') || document.querySelector('.amount-input');
    const assignedLotSize = parseFloat(volumeInput.value) || 0.1;

    if (assignedLotSize <= 0) {
        alert("Invalid transaction contract parameter sizing.");
        return;
    }

    const uniqueOrderId = 'ORD_' + Math.floor(Math.random() * 1000000);
    
    // Structuring standardized position data mapping parameters
    const newPositionInstance = {
        id: uniqueOrderId,
        pair: currentActiveAsset,
        type: orderType,
        lots: assignedLotSize,
        entryPrice: currentPrice
    };

    activeOpenPositions.push(newPositionInstance);
    playSound('buy');
    
    injectChatMessage("ORDER", `${orderType} Position Synchronized: ${assignedLotSize} Lots at ${currentPrice.toFixed(decimalPrecision)}`, true, orderType === 'BUY' ? '#00e676' : '#ff1744');

    // Build template element layers safely to log container target viewports
    const ledgerContainer = document.getElementById('open-positions-log') || document.getElementById('tradeLogs');
    if (ledgerContainer) {
        const itemRow = document.createElement('div');
        itemRow.className = 'ledger-item';
        itemRow.id = `pos-row-${uniqueOrderId}`;
        itemRow.style.cssText = "display: grid; grid-template-columns: 2fr 1fr 1fr 2fr; padding: 8px; border-bottom: 1px solid #161f2b; font-size: 12px; align-items:center;";
        itemRow.innerHTML = `
            <div><strong>${currentActiveAsset}</strong> <span style="color:${orderType === 'BUY' ? '#00e676' : '#ff1744'}; font-weight:bold;">${orderType}</span></div>
            <div>Vol: ${assignedLotSize}</div>
            <div style="font-family:monospace; color:#556a85;">${currentPrice.toFixed(decimalPrecision)}</div>
            <div class="pos-live-pnl" style="font-family:monospace; text-align:right; font-weight:700;">KES 0.00</div>
        `;
        ledgerContainer.appendChild(itemRow);
    }

    if (socket && socket.connected) {
        socket.emit('place-trade', newPositionInstance);
    }
}

// Universal context binding layer for structural execution UI interfaces
document.querySelectorAll('.buy-btn, .btn-buy').forEach(b => b.onclick = () => handleInstantDealPlacement('BUY'));
document.querySelectorAll('.sell-btn, .btn-sell').forEach(b => b.onclick = () => handleInstantDealPlacement('SELL'));

/**
 * 6. REAL-TIME CONTINUOUS FLOATING P&L TRACKING
 */
function processLiveFloatingPortfolioPnL() {
    let globalFloatingPnL = 0;

    activeOpenPositions.forEach(pos => {
        if (pos.pair !== currentActiveAsset) return;

        // Standard Contract Unit Sizes (1 Standard Lot = 100,000 units / JPY = 1,000 units)
        let contractSizeUnitMultiplier = pos.pair === "USD/JPY" ? 1000 : 100000;
        let priceDeltaPoints = 0;

        if (pos.type === "BUY") {
            priceDeltaPoints = currentPrice - pos.entryPrice;
        } else {
            priceDeltaPoints = pos.entryPrice - currentPrice;
        }

        // Convert calculated asset valuation parameters directly to localized KES balances
        let grossOrderPnL = priceDeltaPoints * pos.lots * contractSizeUnitMultiplier;
        let localizedPnlConverted = grossOrderPnL * 130.00; // Local KES settlement conversion multiplier
        globalFloatingPnL += localizedPnlConverted;

        const dynamicTargetRow = document.getElementById(`pos-row-${pos.id}`);
        if (dynamicTargetRow) {
            const rowValueField = dynamicTargetRow.querySelector('.pos-live-pnl');
            if (rowValueField) {
                rowValueField.innerText = `KES ${localizedPnlConverted.toFixed(2)}`;
                rowValueField.style.color = localizedPnlConverted >= 0 ? "#00e676" : "#ff1744";
            }
        }
    });

    const globalSummaryHeaderField = document.getElementById('total-floating-pnl');
    if (globalSummaryHeaderField) {
        globalSummaryHeaderField.innerText = `KES ${globalFloatingPnL.toFixed(2)}`;
        globalSummaryHeaderField.style.color = globalFloatingPnL >= 0 ? "#00e676" : "#ff1744";
    }
}

/**
 * 7. CLIENT-SIDE WEB AUDIO SIGNAL SUBSYSTEM
 */
let audioCtx;
let soundEnabled = false;

window.initAudio = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundBtn');
    if (btn) btn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i> AUDIO ON' : '<i class="fas fa-volume-mute"></i> AUDIO OFF';
};

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillatorNode.connect(gainNode); 
    gainNode.connect(audioCtx.destination);

    if (type === 'tick') {
        oscillatorNode.frequency.setValueAtTime(650, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.005, audioCtx.currentTime);
        oscillatorNode.start(); 
        oscillatorNode.stop(audioCtx.currentTime + 0.03);
    } else if (type === 'buy') {
        oscillatorNode.frequency.exponentialRampToValueAtTime(1050, audioCtx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
        oscillatorNode.start(); 
        oscillatorNode.stop(audioCtx.currentTime + 0.15);
    }
}

/**
 * 8. INTERFACE SOCIAL DESK & UTILS
 */
const chatFeed = document.getElementById('chat-feed') || document.getElementById('tradeLogs');

function injectChatMessage(user, message, isSystem = false, systemColor = '#ffd600') {
    if (!chatFeed) return;
    const msgNode = document.createElement('div');
    msgNode.style.cssText = "margin-bottom: 6px; font-size: 12px; font-family: sans-serif; line-height: 1.4;";

    if (isSystem) {
        msgNode.innerHTML = `<span style="color:${systemColor}; font-weight:700;">[${user}]:</span> <span style="color:#ffffff;">${message}</span>`;
    } else {
        msgNode.innerHTML = `<span style="color: #00b0ff; font-weight:700;">${user}:</span> <span style="color: #cfd8dc;">${message}</span>`;
    }

    chatFeed.appendChild(msgNode);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    if (chatFeed.children.length > 25) chatFeed.removeChild(chatFeed.children[0]);
}

function refreshUIBalances() {
    const balEl = document.getElementById('user-balance-display') || document.getElementById('walletBal');
    if (balEl) balEl.innerText = marginBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.adjustLotSizeValue = (direction) => {
    const input = document.getElementById('lot-size-input');
    if (!input) return;
    let currentLots = parseFloat(input.value) || 1.00;
    if (direction === 'add') {
        input.value = (currentLots + 0.1).toFixed(2);
    } else if (direction === 'subtract') {
        input.value = Math.max(0.01, currentLots - 0.1).toFixed(2);
    }
};

console.log("[NEXAFX] Workspace Terminal Operations Engine Initialized Successfully.");
