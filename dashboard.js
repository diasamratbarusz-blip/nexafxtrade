/**
 * NEXAFX Trade Platform - Core Dashboard Logic
 * Handles: Real-time charts, Trade execution, Balance management, and Socket events.
 */

// --- Global State ---
let balance = 1450000.00;
let currentPrice = 8421500;
let activeTrade = null;
let tradeTicksElapsed = 0;
let targetTicksLimit = 50;
let chartInstance = null;

// --- Configuration ---
const CONFIG = {
    minStake: 100,
    maxStake: 500000,
    updateInterval: 150, // ms
    lockDuration: 3000,   // 3s cooldown for Sell button
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateUIBalance();
    startMarketSimulation();
    
    // Check if user is in "Real" or "Demo" mode from local storage
    const savedMode = localStorage.getItem('tradeMode') || 'REAL';
    setAccountMode(savedMode);
});

// --- Chart.js Setup ---
function initChart() {
    const ctx = document.getElementById('liveGraph').getContext('2d');
    const initialData = Array(50).fill(currentPrice);
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialData.map(() => ''),
            datasets: [{
                data: initialData,
                borderColor: '#00ff88',
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { position: 'right', grid: { color: '#1a1a1a' }, ticks: { color: '#555' } }
            }
        }
    });
}

// --- Market Engine ---
function startMarketSimulation() {
    setInterval(() => {
        // Random price movement (Volatility)
        let change = (Math.random() - 0.48) * 4500;

        if (activeTrade) {
            tradeTicksElapsed++;
            
            // Simulation Logic: Force upward trend during active trade
            // but trigger a crash if the user stays in too long.
            if (tradeTicksElapsed > activeTrade.crashAtTick) {
                change = -15000; // The "Crash" drop
                handleMarketCrash();
            } else {
                change = Math.abs(change) + 2500; // Guaranteed rise while safe
            }
            
            updateLivePositionUI();
        }

        currentPrice += change;
        if (currentPrice < 8000000) currentPrice = 8000000; // Floor price

        updateTickerUI(change);
        updateChart(currentPrice);
    }, CONFIG.updateInterval);
}

// --- Trading Logic ---
function executeBuy() {
    const stakeInput = document.getElementById('stake-amount');
    const stake = parseFloat(stakeInput.value);

    // Validation
    if (stake < CONFIG.minStake) return alert(`Minimum stake is KES ${CONFIG.minStake}`);
    if (stake > balance) return alert("Insufficient funds in wallet.");
    if (activeTrade) return alert("You already have an active position.");

    // Deduct Balance
    balance -= stake;
    updateUIBalance();

    // Create Trade Object
    // lossAt: Random tick between 15 and 60 where the market will "crash"
    activeTrade = {
        stake: stake,
        entryPrice: currentPrice,
        crashAtTick: Math.floor(Math.random() * 45) + 15,
        status: 'OPEN'
    };

    tradeTicksElapsed = 0;
    toggleTradeButtons(true); // Lock buttons
    
    // Cooldown timer for the Sell button
    const bar = document.getElementById('sell-timer-bar');
    bar.style.transition = `width ${CONFIG.lockDuration}ms linear`;
    bar.style.width = "100%";

    setTimeout(() => {
        document.getElementById('sell-btn').disabled = false;
        bar.style.width = "0%";
    }, CONFIG.lockDuration);
}

function executeSell() {
    if (!activeTrade || activeTrade.status !== 'OPEN') return;

    const multiplier = 1 + (tradeTicksElapsed / targetTicksLimit) * 4;
    const winAmount = activeTrade.stake * multiplier;

    balance += winAmount;
    updateUIBalance();
    
    alert(`🎉 Success! You cashed out KES ${winAmount.toFixed(2)}`);
    
    resetTradeState();
}

function handleMarketCrash() {
    activeTrade = null;
    alert("❌ Market Crashed! Position lost.");
    resetTradeState();
}

// --- UI Helper Functions ---
function updateUIBalance() {
    const el = document.getElementById('balance');
    if (el) el.innerText = balance.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function updateTickerUI(change) {
    const priceEl = document.getElementById('ticker-price');
    const trendEl = document.getElementById('market-trend');
    
    priceEl.innerText = Math.floor(currentPrice).toLocaleString();
    trendEl.innerText = `${change > 0 ? '+' : ''}${(change/1000).toFixed(2)}%`;
    trendEl.style.color = change > 0 ? '#00ff88' : '#ff3366';
}

function updateLivePositionUI() {
    const el = document.getElementById('live-running-amount');
    const multiplier = 1 + (tradeTicksElapsed / targetTicksLimit) * 4;
    const currentVal = activeTrade.stake * multiplier;
    
    el.innerText = `KES ${currentVal.toFixed(2)}`;
    el.style.color = '#00ff88';
}

function updateChart(price) {
    chartInstance.data.datasets[0].data.push(price);
    chartInstance.data.datasets[0].data.shift();
    chartInstance.update('none');
}

function toggleTradeButtons(isTrading) {
    document.getElementById('buy-btn').disabled = isTrading;
    if (!isTrading) {
        document.getElementById('sell-btn').disabled = true;
        document.getElementById('live-running-amount').innerText = "KES 0.00";
    }
}

function resetTradeState() {
    activeTrade = null;
    tradeTicksElapsed = 0;
    toggleTradeButtons(false);
}

function setAccountMode(mode) {
    localStorage.setItem('tradeMode', mode);
    // Add logic here to switch between real and demo balance APIs
}
