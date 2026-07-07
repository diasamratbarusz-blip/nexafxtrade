/**
 * NEXAFX | Unified Workspace Interface Thread Controller
 * File: chat.js
 * Version: 4.1.0 (2026)
 */

const socket = (typeof io !== 'undefined') ? io() : null;

let currentActiveAsset = "EUR/USD";
let decimalPrecision = 5;
let activeOpenPositions = [];

let assetsMatrix = {
    "EUR/USD": { price: 1.08500, digits: 5 },
    "GBP/USD": { price: 1.26440, digits: 5 },
    "USD/JPY": { price: 156.400, digits: 3 }
};

// 1. Charting Pipeline Initialization via TradingView Engine
const container = document.getElementById('chart-container');
let chart, candleSeries;

if (container) {
    chart = LightweightCharts.createChart(container, {
        layout: { background: { color: '#020408' }, textColor: '#707a8a', fontSize: 10 },
        grid: { vertLines: { color: '#0b1017' }, horzLines: { color: '#0b1017' } },
        rightPriceScale: { borderColor: '#161f2b' },
        timeScale: { borderColor: '#161f2b', timeVisible: true }
    });

    candleSeries = chart.addCandlestickSeries({
        upColor: '#00e676', downColor: '#ff1744',
        borderUpColor: '#00e676', borderDownColor: '#ff1744',
        wickUpColor: '#00e676', wickDownColor: '#ff1744'
    });

    // Populate baseline arrays for immediate rendering layout
    let mockTime = Math.floor(new Date(2026, 0, 1).getTime() / 1000);
    let historicalData = Array.from({ length: 60 }, (_, i) => {
        let open = 1.08500 + Math.sin(i * 0.1) * 0.005;
        return {
            time: mockTime + (i * 86400),
            open: open, high: open + 0.001, low: open - 0.001, close: open + 0.0002
        };
    });
    candleSeries.setData(historicalData);
}

let activeCandleTime = Math.floor(new Date(2026, 5, 1).getTime() / 1000);
let candleOpenPrice = 1.08500;
let candleHigh = 1.08500;
let candleLow = 1.08500;

// 2. Real-Time Event Handlers
if (socket) {
    socket.on('market-update', (data) => {
        if (!data) return;
        
        assetsMatrix[data.pair].price = data.currentPrice;
        
        let cleanId = data.pair.replace('/', '');
        let element = document.getElementById(`watch-${cleanId}`);
        if (element) element.innerText = data.currentPrice.toFixed(data.digits);

        if (data.pair !== currentActiveAsset) {
            updateLiveOpenPositionsLedger();
            return;
        }

        document.getElementById('current-rate').innerText = data.currentPrice.toFixed(decimalPrecision);

        // Update active canvas nodes dynamically
        if (candleSeries) {
            candleHigh = Math.max(candleHigh, data.currentPrice);
            candleLow = Math.min(candleLow, data.currentPrice);
            candleSeries.update({
                time: activeCandleTime,
                open: candleOpenPrice,
                high: candleHigh,
                low: candleLow,
                close: data.currentPrice
            });
        }
        updateLiveOpenPositionsLedger();
    });

    socket.on('receive-chat', (data) => {
        appendChatMessageNode(data.user, data.message);
    });

    socket.on('admin-force-balance', (data) => {
        if (data && typeof data.balance === 'number') {
            document.getElementById('user-balance-display').innerText = data.balance.toLocaleString(undefined, { minimumFractionDigits: 2 });
        }
    });

    socket.on('trade-confirmed', (trade) => {
        activeOpenPositions.push(trade);
        renderPortfolioGrid();
    });

    socket.on('contract-liquidated', (data) => {
        activeOpenPositions = activeOpenPositions.filter(p => p.id !== data.id);
        renderPortfolioGrid();
    });
}

// 3. Execution & Settlement Dispatch Calls
function transmitInstantOrder(type) {
    const lotSize = parseFloat(document.getElementById('lot-size-input').value) || 1.00;
    if (socket) {
        socket.emit('execute-trade', { pair: currentActiveAsset, type: type, lots: lotSize });
    }
}

function requestLiquidation(id) {
    if (socket) socket.emit('liquidate-contract', { id: id });
}

// 4. Financial Valuation & Margin Calculation Methods
function updateLiveOpenPositionsLedger() {
    let totalFloatingPnL = 0;
    activeOpenPositions.forEach(pos => {
        let currentPriceNow = assetsMatrix[pos.pair].price;
        let contractSize = pos.pair === "USD/JPY" ? 1000 : 100000;
        let points = pos.type === "BUY" ? (currentPriceNow - pos.entryPrice) : (pos.entryPrice - currentPriceNow);
        
        // Calculate institutional value mapped inside domestic KES margin frameworks
        let positionPnL = points * pos.lots * contractSize * 130.00;
        totalFloatingPnL += positionPnL;

        let el = document.getElementById(`pnl-val-${pos.id}`);
        if (el) {
            el.innerText = `KES ${positionPnL.toFixed(2)}`;
            el.style.color = positionPnL >= 0 ? '#00e676' : '#ff1744';
        }
    });

    let summaryEl = document.getElementById('total-floating-pnl');
    if (summaryEl) {
        summaryEl.innerText = `KES ${totalFloatingPnL.toFixed(2)}`;
        summaryEl.style.color = totalFloatingPnL >= 0 ? '#00e676' : '#ff1744';
    }
}

function renderPortfolioGrid() {
    const container = document.getElementById('open-positions-log');
    if (!container) return;

    if (activeOpenPositions.length === 0) {
        container.innerHTML = `<div class="ledger-empty-state">No active risk vectors open in current runtime workspace.</div>`;
        return;
    }

    container.innerHTML = '';
    activeOpenPositions.forEach(pos => {
        let div = document.createElement('div');
        div.className = 'ledger-item';
        div.innerHTML = `
            <div><strong>${pos.pair}</strong> <span style="color:${pos.type==='BUY'?'#00e676':'#ff1744'}">${pos.type}</span></div>
            <div>Vol: ${pos.lots.toFixed(2)}</div>
            <div style="font-family:monospace; color:var(--text-dim);">${pos.entryPrice}</div>
            <div class="pos-live-pnl" id="pnl-val-${pos.id}">KES 0.00</div>
            <div style="text-align:right;"><button class="close-pos-btn" onclick="requestLiquidation('${pos.id}')">Close</button></div>
        `;
        container.appendChild(div);
    });
}

function appendChatMessageNode(user, message) {
    const feed = document.getElementById('chat-feed');
    if (!feed) return;
    let entry = document.createElement('div');
    entry.style.fontSize = "0.75rem"; entry.style.marginBottom = "6px";
    entry.innerHTML = `<span style="color:${user==='SYSTEM'||user==='System'?'var(--gold-text)':'var(--primary)'}; font-weight:700;">[${user}]:</span> <span style="color:#cfd8dc;">${message}</span>`;
    feed.appendChild(entry);
    feed.scrollTop = feed.scrollHeight;
}

window.registerActiveAssetSwitch = (pairName, baseDigits) => {
    currentActiveAsset = pairName;
    decimalPrecision = baseDigits;
    document.getElementById('active-asset-title').innerText = `${pairName} LIVE FEED`;
    
    document.querySelectorAll('.asset-row').forEach(r => r.classList.remove('active'));
    document.getElementById(`row-${pairName.replace('/','')}`).classList.add('active');

    candleOpenPrice = assetsMatrix[pairName].price;
    candleHigh = candleOpenPrice; candleLow = candleOpenPrice;
    activeCandleTime += 86400; 
};

window.adjustLotSizeValue = (direction) => {
    const el = document.getElementById('lot-size-input');
    let val = parseFloat(el.value) || 1.00;
    el.value = direction === 'add' ? (val + 0.10).toFixed(2) : Math.max(0.01, val - 0.10).toFixed(2);
};

// 5. Utility Layout Synchronization
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        document.getElementById('clock-utc').innerText = new Date().toUTCString().replace('GMT', 'UTC').split(' ')[4];
    }, 1000);

    document.getElementById('send-chat-btn').addEventListener('click', () => {
        let f = document.getElementById('chat-input-field');
        if (f.value.trim() !== '') {
            socket.emit('send-chat', { user: 'Trader', message: f.value.trim() });
            f.value = '';
        }
    });
});
