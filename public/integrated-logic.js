/**
 * NEXAFX Trade Platform - Integrated Logic Engine
 * Handles: Authentication, Trading, Charts, Sound, and UI Management
 * Version: 4.0.0 (Production Ready)
 */

// ==========================================
// API CONFIGURATION
// ==========================================
const getApiBase = () => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const VERCEL_BACKEND_URL = "https://nexapayfx-backend.vercel.app/api"; 
    return isLocal ? "http://localhost:5000/api" : VERCEL_BACKEND_URL;
};

// ==========================================
// GLOBAL STATE MANAGEMENT
// ==========================================
window.USER_IS_AUTHENTICATED = false;
window.CURRENT_ACCOUNT_MODE = "REAL";
window.USER_TOKEN = localStorage.getItem("token");
window.USER_DATA = null;

// Admin Configuration (Can be updated remotely)
window.NEXAFX_ADMIN_CONFIG = {
    forcedTrend: "DYNAMIC",
    customVolatility: null,
    minimumTicketPrice: 100,       
    maximumTicketPrice: 500000,
    profitMultiplierHigh: 1.95,
    profitMultiplierLow: 0.40,
    customTargetRatio: 1.85       
};

// Trading Engine State
let balance = 0;
let price = 8421500;
let isLocked = false;
let audioCtx = null;
let masterGainNode = null;
let isMarketHigh = false;
let activeTradePosition = null;
let tradeTicksElapsed = 0;
let currentHighTicksLimit = 45;
let chartInstance = null;

// ==========================================
// INITIALIZATION
// ==========================================
async function initApp() {
    console.log("🔍 Initializing dashboard... Token exists:", !!window.USER_TOKEN);
    
    if (window.USER_TOKEN) {
        try {
            const response = await fetch(`${getApiBase()}/user/profile`, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${window.USER_TOKEN}` 
                }
            });

            console.log("📡 Profile response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("✅ Profile data received:", data);
                
                if (data.success && data.user) {
                    window.USER_IS_AUTHENTICATED = true;
                    window.USER_DATA = data.user;
                    balance = data.user.balance || 0;
                    
                    console.log("💰 User balance:", balance);
                    console.log("👤 User name:", data.user.name);
                    
                    updateBalance();
                    updateAuthUI(true, data.user);
                } else {
                    throw new Error("Invalid response format");
                }
            } else {
                console.warn("❌ Token invalid, clearing storage");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.USER_TOKEN = null;
                updateAuthUI(false, null);
            }
        } catch (error) {
            console.error("🚫 Failed to fetch profile:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.USER_TOKEN = null;
            updateAuthUI(false, null);
        }
    } else {
        console.log("⚠️ No token found, showing guest mode");
        balance = 0;
        updateBalance();
        updateAuthUI(false, null);
    }
}

// ==========================================
// AUTHENTICATION UI MANAGEMENT
// ==========================================
function updateAuthUI(isLoggedIn, userData) {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const userInfoDisplay = document.getElementById('user-info-display');
    const userNameDisplay = document.getElementById('user-name-display');

    if (isLoggedIn && userData) {
        loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
        loginBtn.className = 'graph-auth-btn btn-graph-logout';
        loginBtn.onclick = handleLoginLogout;
        
        registerBtn.style.display = 'none';
        
        userInfoDisplay.classList.add('show');
        userNameDisplay.textContent = userData.name || 'User';
        
        console.log("✅ UI updated to logged-in state");
    } else {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        loginBtn.className = 'graph-auth-btn btn-graph-login';
        loginBtn.onclick = handleLoginLogout;
        
        registerBtn.style.display = 'block';
        
        userInfoDisplay.classList.remove('show');
        
        console.log("✅ UI updated to guest state");
    }
}

function handleLoginLogout() {
    if (window.USER_IS_AUTHENTICATED) {
        logoutUser();
    } else {
        window.location.href = '/login';
    }
}

function logoutUser() {
    console.log("🚪 Logging out user...");
    localStorage.removeItem("token");
    localStorage.removeItem("operatorName");
    localStorage.removeItem("user");
    window.USER_TOKEN = null;
    window.USER_IS_AUTHENTICATED = false;
    window.USER_DATA = null;
    balance = 0;
    updateBalance();
    updateAuthUI(false, null);
    alert("You have been logged out successfully.");
}

function updateBalance() {
    const balanceEl = document.getElementById('balance');
    if (balanceEl) {
        balanceEl.innerText = balance.toLocaleString(undefined, {minimumFractionDigits: 2});
        console.log("💵 Balance updated to:", balance);
    }
}

// ==========================================
// SOUND ENGINE
// ==========================================
function initBeats() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.setValueAtTime(1.0, audioCtx.currentTime); 
    masterGainNode.connect(audioCtx.destination);
    
    const audioBtn = document.getElementById('audio-btn');
    if (audioBtn) {
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i> BEATS ACTIVE';
        audioBtn.style.background = "var(--high-green)";
    }
    
    startAfroLoop();
}

function playSynth(freq, type, dur, vol) {
    if(!audioCtx || !masterGainNode) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const subOsc = audioCtx.createOscillator(); 
    const gain = audioCtx.createGain();
    osc.type = type; 
    subOsc.type = 'sine'; 
    osc.connect(gain); 
    subOsc.connect(gain); 
    gain.connect(masterGainNode);
    
    let targetedFreq = freq < 90 ? 100 : freq;
    let targetedSubFreq = targetedFreq / 2;
    
    osc.frequency.setValueAtTime(targetedFreq, audioCtx.currentTime);
    subOsc.frequency.setValueAtTime(targetedSubFreq, audioCtx.currentTime); 
    
    if (targetedFreq > 100) {
        osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
        subOsc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
    } else {
        osc.frequency.linearRampToValueAtTime(0.01, audioCtx.currentTime + dur);
        subOsc.frequency.linearRampToValueAtTime(0.01, audioCtx.currentTime + dur);
    }
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(vol * 2.0, audioCtx.currentTime + 0.005); 
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    
    osc.start(); 
    subOsc.start();
    osc.stop(audioCtx.currentTime + dur); 
    subOsc.stop(audioCtx.currentTime + dur);
}

function startAfroLoop() {
    setInterval(() => {
        if (isMarketHigh) {
            playSynth(110, 'triangle', 0.25, 0.85); 
            setTimeout(() => { 
                if (isMarketHigh) playSynth(120, 'triangle', 0.18, 0.75); 
            }, 250); 
        } else {
            playSynth(95, 'sine', 0.60, 0.80); 
        }
    }, 1000);
}

// ==========================================
// CHART ENGINE
// ==========================================
function initChart() {
    const ctx = document.getElementById('liveGraph');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    let dataPoints = Array(50).fill(price);
    
    chartInstance = new Chart(context, {
        type: 'line',
        data: {
            labels: dataPoints.map(() => ''),
            datasets: [{
                data: dataPoints, 
                borderColor: '#00ff88', 
                borderWidth: 4, 
                pointRadius: 0,
                fill: true, 
                backgroundColor: 'rgba(0, 255, 136, 0.05)', 
                tension: 0.3
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false, 
            animation: { duration: 0 },
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false }, 
                y: { 
                    position: 'right', 
                    grid: { color: '#222' }, 
                    ticks: { color: '#555' } 
                } 
            }
        }
    });
}

function updateChart() {
    if (!chartInstance) return;
    
    chartInstance.data.datasets[0].data.push(price);
    chartInstance.data.datasets[0].data.shift();
    chartInstance.update('none');
}

// ==========================================
// MARKET SIMULATION ENGINE
// ==========================================
function startMarketSimulation() {
    setInterval(() => {
        let admin = window.NEXAFX_ADMIN_CONFIG || {};
        let baseVol = isMarketHigh ? 85000 : 45000;
        const volatility = admin.customVolatility !== null && admin.customVolatility !== undefined 
            ? admin.customVolatility 
            : baseVol;
        const BUSINESS_GLOBAL_RISK_LIMIT = 8350000;
        let change = (Math.random() - 0.46) * (volatility / 12);
        
        // Active trade logic
        if (activeTradePosition) {
            tradeTicksElapsed++;
            let currentProgressPercent = Math.min(tradeTicksElapsed / currentHighTicksLimit, 1);
            let currentMultiplierScale = 1 + (currentProgressPercent * 5.2);
            activeTradePosition.lastKnownValue = activeTradePosition.stake * currentMultiplierScale;

            if (tradeTicksElapsed <= activeTradePosition.lossTickThreshold) {
                change = Math.abs(change) + (Math.random() * 2600 + 1200);
            } else {
                change = -Math.abs(change) - (Math.random() * 5200 + 3200);
                handleTradeExpirationLoss();
                return;
            }
        }

        // Admin forced trends
        if (admin.forcedTrend === "BULLISH") {
            change = Math.abs(change) + (Math.random() * 1500); 
        } else if (admin.forcedTrend === "BEARISH") {
            change = -Math.abs(change) - (Math.random() * 1500);
        } 

        let oldPrice = price;
        price += change;

        // Price floor
        if (price < BUSINESS_GLOBAL_RISK_LIMIT) {
            price = BUSINESS_GLOBAL_RISK_LIMIT + Math.floor(Math.random() * 5000 + 1000);
            change = price - oldPrice;
        }

        // Update UI
        isMarketHigh = change > 0;
        const status = document.getElementById('market-status-bar');
        const glow = document.getElementById('market-glow');
        
        if (isMarketHigh) {
            if (status) {
                status.innerText = "🔥 HIGH MARKET VOLATILITY - BULLISH MOMENTUM 🔥";
                status.className = "status-high";
            }
            if (glow) {
                glow.style.background = "var(--high-green)";
                glow.style.opacity = "0.15";
            }
            if (chartInstance) {
                chartInstance.data.datasets[0].borderColor = "var(--high-green)";
            }
            playSynth(520, 'sawtooth', 0.04, 0.08); 
        } else {
            if (status) {
                status.innerText = "❄️ LOW MARKET STRENGTH - BEARISH MOMENTUM ❄️";
                status.className = "status-low";
            }
            if (glow) {
                glow.style.background = "var(--low-red)";
                glow.style.opacity = "0.15";
            }
            if (chartInstance) {
                chartInstance.data.datasets[0].borderColor = "var(--low-red)";
            }
        }

        const tickerPrice = document.getElementById('ticker-price');
        const marketTrend = document.getElementById('market-trend');
        
        if (tickerPrice) {
            tickerPrice.innerText = Math.floor(price).toLocaleString();
        }
        
        if (marketTrend) {
            marketTrend.innerText = (change > 0 ? '+' : '') + (change/1000).toFixed(2) + '%';
            marketTrend.style.color = change > 0 ? 'var(--high-green)' : 'var(--low-red)';
        }

        updateChart();
        processLiveCountingTransaction();
    }, 150);
}

// ==========================================
// TRADING LOGIC
// ==========================================
async function executeBuy() {
    if (window.CURRENT_ACCOUNT_MODE === "REAL" && !window.USER_IS_AUTHENTICATED) {
        alert("🔐 Authentication Required: Please login or register to place bets in Real Trade.");
        window.location.href = "/login";
        return;
    }

    let admin = window.NEXAFX_ADMIN_CONFIG || {};
    const amt = parseFloat(document.getElementById('stake-amount').value);
    
    if (amt < (admin.minimumTicketPrice || 100)) {
        return alert("Minimum permitted ticket placement is KES " + (admin.minimumTicketPrice || 100));
    }
    if (amt > (admin.maximumTicketPrice || 500000)) {
        return alert("Maximum ticket exceeded. Cap: KES " + (admin.maximumTicketPrice || 500000));
    }
    if (amt > balance) {
        return alert("Insufficient Balance");
    }

    // Backend deduction for real mode
    if (window.CURRENT_ACCOUNT_MODE === "REAL") {
        try {
            const response = await fetch(`${getApiBase()}/user/balance`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${window.USER_TOKEN}` 
                },
                body: JSON.stringify({ amount: amt, action: "subtract" })
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                return alert(data.message || "Failed to deduct balance.");
            }
            balance = data.newBalance;
            updateBalance();
        } catch (error) {
            return alert("Network error while placing trade.");
        }
    } else {
        balance -= amt;
        updateBalance();
    }

    playSynth(180, 'sawtooth', 0.45, 0.95); 

    // Calculate trade duration
    let chosenHighSeconds;
    let rollWeight = Math.random();
    if (rollWeight < 0.75) {
        chosenHighSeconds = Math.random() * (10 - 5) + 5;
    } else {
        chosenHighSeconds = Math.random() * (30 - 10.01) + 10.01;
    }
    
    currentHighTicksLimit = Math.floor((chosenHighSeconds * 1000) / 150);
    let randomLossPercentage = Math.random() * (0.95 - 0.20) + 0.20;
    let chosenLossTickThreshold = Math.floor(currentHighTicksLimit * randomLossPercentage);

    let targetedRatio = admin.customTargetRatio || 1.85;
    tradeTicksElapsed = 0;
    activeTradePosition = {
        stake: amt, 
        entryPrice: price, 
        targetAmount: amt * targetedRatio,
        hasSold: false, 
        soldAmount: 0, 
        lastKnownValue: amt, 
        lossTickThreshold: chosenLossTickThreshold
    };

    const ribbonContent = document.getElementById('live-history-ribbon-content');
    if (ribbonContent) {
        ribbonContent.innerHTML = `<span style="color: var(--neon-blue); font-size: 0.75rem; font-weight: bold;"><i class="fas fa-spinner fa-spin"></i> Stream tracking live...</span>`;
    }

    isLocked = true;
    const buyBtn = document.getElementById('buy-btn');
    const sellBtn = document.getElementById('sell-btn');
    const bar = document.getElementById('sell-timer-bar');
    const label = document.getElementById('sell-label');

    if (buyBtn) buyBtn.disabled = true;
    if (sellBtn) sellBtn.disabled = true;
    if (bar) {
        bar.style.width = "100%";
        bar.style.transition = "width 3s linear";
    }
    
    let count = 3;
    const countdown = setInterval(() => {
        count--;
        if (label) {
            label.innerHTML = `<i class="fas fa-lock"></i> WAIT ${count}s`;
        }
        if (count <= 0) {
            clearInterval(countdown);
            isLocked = false;
            if (buyBtn) buyBtn.disabled = false;
            if (sellBtn) sellBtn.disabled = false;
            if (label) {
                label.innerHTML = `<i class="fas fa-hand-holding-usd"></i> SELL`;
            }
            if (bar) {
                bar.style.transition = "none";
                bar.style.width = "0%";
            }
            playSynth(980, 'sine', 0.15, 0.85); 
        }
    }, 1000);
    
    setTimeout(() => {
        if (bar) bar.style.width = "0%";
    }, 50);
}

async function executeSell() {
    if (window.CURRENT_ACCOUNT_MODE === "REAL" && !window.USER_IS_AUTHENTICATED) {
        alert("Authentication Required.");
        window.location.href = "/login";
        return;
    }
    if (isLocked || !activeTradePosition || activeTradePosition.hasSold) return;
    
    let progressPercent = tradeTicksElapsed / currentHighTicksLimit;
    let multiplierScale = 1 + (progressPercent * 5.2); 
    let finalProfit = activeTradePosition.stake * multiplierScale;
    
    activeTradePosition.hasSold = true;
    activeTradePosition.soldAmount = finalProfit;

    // Backend addition for real mode
    if (window.CURRENT_ACCOUNT_MODE === "REAL") {
        try {
            const response = await fetch(`${getApiBase()}/user/balance`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${window.USER_TOKEN}` 
                },
                body: JSON.stringify({ amount: finalProfit, action: "add" })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                balance = data.newBalance;
            } else {
                balance += finalProfit;
            }
        } catch (error) {
            balance += finalProfit;
        }
    } else {
        balance += finalProfit;
    }
    
    updateBalance();
    alert(`🎉 Congratulations! You won KES ${finalProfit.toFixed(2)}.`);
    addPayoutLog("User Cashout: KES " + finalProfit.toFixed(2));
    
    const sellBtn = document.getElementById('sell-btn');
    if (sellBtn) sellBtn.disabled = true;
    
    const ribbonContent = document.getElementById('live-history-ribbon-content');
    if (ribbonContent) {
        ribbonContent.innerHTML = `
            <span class="badge-won">WON: KES ${finalProfit.toFixed(2)}</span>
            <span class="history-arrow-divider"><i class="fas fa-chevron-right"></i></span>
            <span style="color: #888; font-size: 0.75rem; font-weight: bold;"><i class="fas fa-chart-line"></i> Tracking upper limits...</span>
        `;
    }
    
    playSynth(1100, 'sine', 0.25, 0.95);
    setTimeout(() => { playSynth(1550, 'sine', 0.35, 1.0); }, 60);
    setTimeout(() => { playSynth(2100, 'sine', 0.45, 1.0); }, 120);
}

function handleTradeExpirationLoss() {
    if (!activeTradePosition) return;
    let crashValue = activeTradePosition.lastKnownValue || activeTradePosition.stake;
    const liveAmountText = document.getElementById('live-running-amount');
    const targetText = document.getElementById('aiming-target-indicator');
    const ribbonContent = document.getElementById('live-history-ribbon-content');

    if (activeTradePosition.hasSold) {
        if (ribbonContent) {
            ribbonContent.innerHTML = `
                <span class="badge-won">WON: KES ${activeTradePosition.soldAmount.toFixed(2)}</span>
                <span class="history-arrow-divider"><i class="fas fa-chevron-right"></i></span>
                <span class="badge-lost-target">CRASHED AT: KES ${crashValue.toFixed(2)}</span>
            `;
        }
    } else {
        if (ribbonContent) {
            ribbonContent.innerHTML = `
                <span class="badge-lost-target">LOST: KES ${activeTradePosition.stake.toFixed(2)}</span>
                <span class="history-arrow-divider"><i class="fas fa-chevron-right"></i></span>
                <span class="badge-lost-target">CRASHED AT: KES ${crashValue.toFixed(2)}</span>
            `;
        }
        if (liveAmountText) {
            liveAmountText.innerText = "KES 0.00";
            liveAmountText.className = "live-running-amount loss-danger";
        }
        alert("❌ Market Crashed. You lost, try next chance!");
    }
    
    activeTradePosition = null;
    tradeTicksElapsed = 0;
    if (targetText) targetText.innerText = "No active trade counting";
    playSynth(180, 'sawtooth', 0.80, 1.0); 
}

// ==========================================
// UI HELPER FUNCTIONS
// ==========================================
function addPayoutLog(msg) {
    const feed = document.getElementById('payout-feed');
    if (!feed) return;
    const div = document.createElement('div');
    div.style.color = "var(--neon-blue)";
    div.innerHTML = `• ${msg}`;
    feed.prepend(div);
    if (feed.children.length > 15) feed.lastChild.remove();
}

function processLiveCountingTransaction() {
    const liveAmountText = document.getElementById('live-running-amount');
    const targetText = document.getElementById('aiming-target-indicator');
    const ribbonContent = document.getElementById('live-history-ribbon-content');
    if (!liveAmountText) return;

    if (activeTradePosition) {
        let progressPercent = Math.min(tradeTicksElapsed / currentHighTicksLimit, 1);
        let multiplierScale = 1 + (progressPercent * 5.2);
        let dynamicCountingValue = activeTradePosition.stake * multiplierScale;
        liveAmountText.innerText = `KES ${dynamicCountingValue.toFixed(2)}`;
        
        if (targetText) {
            targetText.innerHTML = `<span style="color: var(--high-green);"><i class="fas fa-shield-alt"></i> ⚡ MARKET POSITION SECURED</span>`;
        }

        if (!activeTradePosition.hasSold) {
            if (ribbonContent) {
                ribbonContent.innerHTML = `
                    <span style="color: #fff; font-size: 0.75rem; font-weight: bold;">CURRENT VALUE:</span>
                    <span class="badge-won" style="background: rgba(0,212,255,0.1); border-color: var(--neon-blue); color: var(--neon-blue);">KES ${dynamicCountingValue.toFixed(2)}</span>
                `;
            }
        } else {
            if (ribbonContent) {
                ribbonContent.innerHTML = `
                    <span class="badge-won">WON: KES ${activeTradePosition.soldAmount.toFixed(2)}</span>
                    <span class="history-arrow-divider"><i class="fas fa-chevron-right"></i></span>
                    <span class="badge-lost-target">CRASHED AT: KES ${dynamicCountingValue.toFixed(2)}</span>
                `;
            }
        }
        liveAmountText.className = dynamicCountingValue >= activeTradePosition.stake * 2 
            ? "live-running-amount profit-reached" 
            : "live-running-amount";
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function executeWithdrawalRoute() { 
    if (!window.USER_IS_AUTHENTICATED) {
        alert("Please login to access withdrawal.");
        window.location.href = "/login";
        return;
    }
    addPayoutLog("Initiating Secure Withdrawal Channel Sequence..."); 
    alert("Secure Gateway Redirect:\nOpening local mobile payout ledger interface console."); 
}

function executeDepositRoute() { 
    if (!window.USER_IS_AUTHENTICATED) {
        alert("Please login to access deposit.");
        window.location.href = "/login";
        return;
    }
    addPayoutLog("Generating Liquidity Loading Node Credentials..."); 
    alert("Instant Account Loading via Automated Native Node Terminals Access Granted."); 
}

function toggleHowToTradeModal() { 
    alert("Quick-Start Tutorial Guide:\n1. Input your custom stake.\n2. Tap BUY to open a position.\n3. Watch the Live Counter increase.\n4. Tap SELL before the crash!"); 
}

function triggerReferralSystem() {
    const simulatedRefLink = "https://nexafxtrade.vercel.app/invite?code=" + Math.floor(Math.random() * 90000 + 10000);
    alert("Your Exclusive Referral Network URL Token:\n" + simulatedRefLink);
    addPayoutLog("Referral metadata sequence exported.");
}

function switchAccountMode(mode, currentBtn) {
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active-demo', 'active-real');
    });
    
    if (mode === 'DEMO') {
        currentBtn.classList.add('active-demo');
        window.CURRENT_ACCOUNT_MODE = "DEMO";
        balance = 100000.00;
        addPayoutLog("Switched to Training Simulator (Demo Play).");
    } else {
        currentBtn.classList.add('active-real');
        window.CURRENT_ACCOUNT_MODE = "REAL";
        balance = window.USER_IS_AUTHENTICATED ? balance : 0.00;
        addPayoutLog("Switched to Production Vault (Real Play).");
    }
    updateBalance();
}

// ==========================================
// FAKE WITHDRAWAL FEED (Social Proof)
// ==========================================
function startFakeWithdrawalFeed() {
    const names = ["Amani", "Kenyatta_254", "User_77", "Trader_Leo", "Boss_Lady"];
    setInterval(() => {
        const n = names[Math.floor(Math.random() * names.length)];
        const amt = (Math.random() * 10000 + 100).toLocaleString();
        addPayoutLog(`<span style="color:#666">${n}</span> withdrew KES ${amt}`);
    }, 8000);
}

// ==========================================
// INITIALIZE EVERYTHING ON PAGE LOAD
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 NEXAFX Dashboard Loading...");
    initChart();
    initApp();
    startMarketSimulation();
    startFakeWithdrawalFeed();
});
