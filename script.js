<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>NEXAFX | Universal Institutional Trading Terminal</title>
    <!-- Chart.js and FontAwesome Core CDNs -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --high-green: #00e676;
            --low-red: #ff1744;
            --neon-blue: #00b0ff;
            --bg-black: #0a0e12;
            --panel: #121820;
            --panel-light: #1a222d;
            --gold: #ffd600;
            --text-dim: #90a4ae;
            --border-color: #232f3e;
        }

        body, html {
            margin: 0; padding: 0; background: var(--bg-black); color: #ffffff;
            font-family: 'Inter', system-ui, -apple-system, sans-serif; min-height: 100vh;
            user-select: none; box-sizing: border-box;
        }

        .app-container {
            width: 100%; min-height: 100vh; display: flex; flex-direction: column; 
            background: var(--bg-black); overflow-x: hidden;
        }

        header {
            min-height: 65px; background: var(--panel); display: flex; align-items: center;
            justify-content: space-between; padding: 10px 24px; border-bottom: 1px solid var(--border-color);
            flex-wrap: wrap; gap: 15px; box-sizing: border-box;
        }

        .brand { font-size: 1.4rem; font-weight: 900; letter-spacing: 1px; cursor: pointer; }
        .brand span { color: var(--neon-blue); }

        .header-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

        .balance-container {
            background: #000000; border: 1px solid var(--border-color);
            padding: 6px 16px; border-radius: 8px; text-align: right; min-width: 160px;
        }
        .balance-label { font-size: 0.65rem; color: var(--text-dim); display: block; font-weight: 700; letter-spacing: 0.5px; }
        .balance-val { color: var(--high-green); font-family: monospace; font-size: 1.15rem; font-weight: 800; }

        #market-status-bar {
            min-height: 28px; display: flex; align-items: center; justify-content: space-between; padding: 6px 24px;
            font-size: 0.7rem; font-weight: 800; text-transform: uppercase;
            letter-spacing: 1.5px; background: #070a0e; border-bottom: 1px solid var(--border-color);
            flex-wrap: wrap; gap: 10px; box-sizing: border-box;
        }
        .status-high { color: var(--high-green); }

        .main-layout {
            display: grid; grid-template-columns: 310px 1fr; flex: 1;
            background: var(--border-color); gap: 1px;
        }

        .side-activity { background: var(--panel); display: flex; flex-direction: column; max-height: 100%; overflow: hidden; }
        
        .market-watch-header {
            padding: 14px 20px; font-weight: 800; font-size: 0.75rem; color: var(--text-dim);
            letter-spacing: 1px; text-transform: uppercase; border-bottom: 1px solid var(--border-color);
        }

        .market-tabs { display: flex; background: #0b0f14; border-bottom: 1px solid var(--border-color); overflow-x: auto; }
        .m-tab-btn { flex: 1; padding: 12px 8px; font-size: 0.65rem; font-weight: 800; background: transparent; border: none; color: var(--text-dim); cursor: pointer; text-transform: uppercase; white-space: nowrap; }
        .m-tab-btn.active { color: #fff; background: var(--panel-light); border-bottom: 2px solid var(--neon-blue); }

        .pair-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; max-height: 480px; }
        .pair-row {
            display: grid; grid-template-columns: 1fr 85px 60px;
            padding: 12px 20px; border-bottom: 1px solid rgba(35, 47, 62, 0.4);
            cursor: pointer; transition: background 0.2s; align-items: center;
        }
        .pair-row:hover, .pair-row.active { background: var(--panel-light); }
        .pair-name { font-weight: 700; font-size: 0.85rem; }
        .pair-price { font-family: monospace; font-weight: 700; font-size: 0.85rem; text-align: right; }
        .pair-change { font-family: monospace; font-size: 0.75rem; text-align: right; font-weight: bold; }

        .trading-zone { background: var(--bg-black); display: flex; flex-direction: column; overflow: hidden; }

        .price-hero { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 15px; }
        .active-pair-display { font-size: 1.4rem; font-weight: 800; color: #fff; }
        .ticker-val { font-size: 2.6rem; font-weight: 800; font-family: monospace; letter-spacing: -1px; margin-top: 4px; }

        .top-graph-auth-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .graph-auth-btn {
            padding: 8px 16px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            border-radius: 6px; cursor: pointer; border: 1px solid transparent; transition: all 0.2s;
        }
        .btn-graph-login { background: transparent; color: #fff; border-color: var(--border-color); }
        .btn-graph-login:hover { background: var(--panel-light); }
        .btn-graph-register { background: var(--neon-blue); color: #000; }
        .btn-graph-register:hover { filter: brightness(1.1); }

        #chart-container { flex: 1; min-height: 300px; padding: 15px 20px; position: relative; display: flex; flex-direction: column; }
        .chart-toolbar { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; width: 100%; justify-content: flex-end; align-items: center; }
        
        .ct-btn { background: rgba(18, 24, 32, 0.85); border: 1px solid var(--border-color); color: var(--text-dim); padding: 5px 10px; font-size: 0.7rem; font-weight: 700; border-radius: 4px; cursor: pointer; white-space: nowrap; text-transform: uppercase; }
        .ct-btn.active { color: #fff; border-color: var(--neon-blue); background: var(--panel-light); }
        #tradeChart { flex: 1; width: 100% !important; max-height: 380px; }

        .universal-action-bar {
            display: flex; gap: 10px; padding: 10px 24px;
            justify-content: space-between; align-items: center; background: var(--panel);
            border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);
            flex-wrap: wrap;
        }
        .utility-group, .account-mode-group { display: flex; gap: 8px; flex-wrap: wrap; }
        .util-btn {
            padding: 8px 14px; font-size: 0.75rem; font-weight: 700;
            text-transform: uppercase; border-radius: 6px; cursor: pointer;
            border: 1px solid var(--border-color); background: var(--panel-light); color: #fff; transition: 0.2s;
        }
        .util-btn:hover { background: #243142; }
        
        .mode-btn {
            padding: 8px 14px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            border-radius: 6px; cursor: pointer; background: #000; color: #555; border: 1px solid var(--border-color);
        }
        .mode-btn.active-demo { color: var(--neon-blue); border-color: var(--neon-blue); }
        .mode-btn.active-real { color: var(--high-green); border-color: var(--high-green); }

        .workspace-tabs-strip { display: flex; background: #0c1117; border-bottom: 1px solid var(--border-color); }
        .w-tab { padding: 12px 15px; font-size: 0.7rem; font-weight: 800; color: var(--text-dim); background: transparent; border: none; cursor: pointer; text-transform: uppercase; border-right: 1px solid var(--border-color); flex: 1; text-align: center; }
        .w-tab.active { color: #fff; background: var(--panel); border-top: 2px solid var(--neon-blue); }

        .positions-terminal { min-height: 220px; background: var(--panel); display: flex; flex-direction: column; overflow: hidden; }
        .terminal-viewport { width: 100%; overflow-x: auto; font-size: 0.8rem; font-family: monospace; flex: 1; }
        
        .positions-table-wrapper { min-width: 750px; display: flex; flex-direction: column; }
        .ledger-item {
            display: grid; grid-template-columns: 1.5fr 1fr 1.2fr 1.5fr 80px;
            padding: 12px 24px; border-bottom: 1px solid rgba(255,255,255,0.02); align-items: center;
        }

        .chat-feed-wrapper { padding: 15px 24px; display: none; flex-direction: column; box-sizing: border-box; height: 100%; max-height: 220px; overflow-y: auto; }

        .bottom-controls {
            background: var(--panel); padding: 16px 24px; border-top: 1px solid var(--border-color);
            display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; align-items: center;
        }

        .input-param-box {
            background: #000000; border: 1px solid var(--border-color); border-radius: 8px;
            padding: 8px 14px; display: flex; flex-direction: column; gap: 4px;
        }
        .param-label { font-size: 0.65rem; color: var(--text-dim); font-weight: 700; letter-spacing: 0.5px; }
        .param-input-wrapper { display: flex; align-items: center; justify-content: space-between; }
        .param-input-wrapper input {
            background: transparent; border: none; color: white; font-size: 1.2rem;
            font-weight: 800; font-family: monospace; width: 100%; outline: none; text-align: center;
        }
        .step-ctrl { background: transparent; border: none; color: var(--text-dim); font-size: 1.1rem; cursor: pointer; padding: 0 5px; }
        .step-ctrl:hover { color: #fff; }

        .action-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; min-width: 240px; }
        .btn {
            height: 50px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 800;
            cursor: pointer; transition: opacity 0.2s, transform 0.1s; display: flex; align-items: center; justify-content: center;
            gap: 10px; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .btn-buy { background: var(--high-green); color: #000000; }
        .btn-sell { background: var(--low-red); color: #ffffff; }
        .btn:active { transform: scale(0.98); }

        /* Multi-asset view grid responsiveness breakpoints */
        @media (max-width: 1024px) {
            .main-layout { grid-template-columns: 1fr; }
            .side-activity { max-height: 300px; border-bottom: 1px solid var(--border-color); }
            .pair-list { max-height: 200px; }
        }

        @media (max-width: 580px) {
            header { justify-content: center; text-align: center; }
            .ticker-val { font-size: 2.1rem; }
            .bottom-controls { grid-template-columns: 1fr; }
            .action-btns { min-width: 100%; }
        }
    </style>
</head>
<body>

<div class="app-container">
    <header>
        <div class="brand">NEXAFX<span>TRADE</span></div>
        <div class="header-actions">
            <div class="balance-container">
                <span class="balance-label">MARGIN BALANCE (KES)</span>
                <span class="balance-val" id="user-balance-display">1,450,000.00</span>
            </div>
        </div>
    </header>

    <div id="market-status-bar" class="status-high">
        <span><i class="fas fa-server"></i> PLATFORM DOCK: LINKED</span>
        <span id="live-clock" style="font-family: monospace; color: var(--gold);">00:00:00 UTC</span>
    </div>

    <div class="main-layout">
        <!-- Market Catalog Panel Component -->
        <section class="side-activity">
            <div class="market-watch-header">
                <span><i class="fas fa-chart-pie"></i> Liquidity Indexes</span>
            </div>
            <div class="market-tabs">
                <button class="m-tab-btn active" onclick="filterMarketCategory('FOREX')">Forex Markets</button>
                <button class="m-tab-btn" onclick="filterMarketCategory('CRYPTO')">Crypto Matrix</button>
                <button class="m-tab-btn" onclick="filterMarketCategory('COMMODITY')">Commodities</button>
            </div>
            <div class="pair-list" id="forex-pair-list"></div>
        </section>

        <!-- Main Real-Time Operations Section -->
        <section class="trading-zone">
            <div class="price-hero">
                <div>
                    <span class="active-pair-display" id="current-pair-title">EUR/USD</span>
                    <div class="ticker-val" id="mainPrice">1.08500</div>
                </div>
                
                <div>
                    <div id="priceTrend" style="font-weight: 800; font-size: 1rem; color: var(--high-green); text-align: right; margin-bottom: 8px;">
                        <i class="fas fa-caret-up"></i> +0.00000
                    </div>
                    <div class="top-graph-auth-actions">
                        <button class="graph-auth-btn btn-graph-login" onclick="location.href='login.html'">Gateway Login</button>
                        <button class="graph-auth-btn btn-graph-register" onclick="location.href='register.html'">Register Account</button>
                    </div>
                </div>
            </div>

            <!-- Chart Terminal Section -->
            <div id="chart-container">
                <div class="chart-toolbar">
                    <button class="ct-btn active" id="soundBtn" onclick="initAudio()"><i class="fas fa-volume-mute"></i> Audio Off</button>
                    <span style="font-size: 0.65rem; color: var(--text-dim); font-family: monospace;" id="current-rate">1.08500</span>
                </div>
                <canvas id="tradeChart"></canvas>
            </div>

            <div class="universal-action-bar">
                <div class="utility-group">
                    <button class="util-btn" onclick="alert('Forwarding token vectors to backend deposit api paths safely.')">Deposit</button>
                    <button class="util-btn" onclick="alert('Extracting internal balances out securely.')">Withdrawal</button>
                </div>
                <div class="account-mode-group">
                    <button class="mode-btn active-demo" onclick="switchAccountMode('DEMO', this)">Demo Ledger</button>
                    <button class="mode-btn" onclick="switchAccountMode('REAL', this)">Live Server</button>
                </div>
            </div>

            <!-- Workspace Action Desk Tabbing Menu Header -->
            <div class="workspace-tabs-strip">
                <button class="w-tab active" id="btn-tab-pos" onclick="switchWorkspaceView('POSITIONS')">Active Positions (<span id="total-floating-pnl" style="color:inherit">KES 0.00</span>)</button>
                <button class="w-tab" id="btn-tab-chat" onclick="switchWorkspaceView('CHAT')">System Desk Audit</button>
            </div>

            <div class="positions-terminal">
                <!-- Tab View 1: Active Execution Logs -->
                <div class="terminal-viewport" id="open-positions-log">
                    <div class="positions-table-wrapper" id="tradeLogs"></div>
                </div>
                
                <!-- Tab View 2: System Messages -->
                <div class="chat-feed-wrapper" id="chat-feed"></div>
            </div>

            <!-- Universal Multi-Asset Configuration Matrix Footer -->
            <div class="bottom-controls">
                <div class="input-param-box">
                    <span class="param-label">VOLUME (LOTS)</span>
                    <div class="param-input-wrapper">
                        <button class="step-ctrl" onclick="adjustLotSizeValue('subtract')">-</button>
                        <input type="number" id="lot-size-input" value="1.00" step="0.1" min="0.01">
                        <button class="step-ctrl" onclick="adjustLotSizeValue('add')">+</button>
                    </div>
                </div>
                <div class="action-btns">
                    <button class="btn btn-buy" onclick="handleInstantDealPlacement('BUY')">
                        <i class="fas fa-arrow-up"></i> BUY / LONG
                    </button>
                    <button class="btn btn-sell" onclick="handleInstantDealPlacement('SELL')">
                        <i class="fas fa-arrow-down"></i> SELL / SHORT
                    </button>
                </div>
            </div>
        </section>
    </div>
</div>

<script>
    /**
     * Nexafxtrade Integrated Logic
     */
    let socket;
    try {
        socket = io();
    } catch (e) {
        console.warn("[NEXAFX] Socket.io engine offline. Initializing local interbank market emulator.");
    }

    const ctx = document.getElementById('tradeChart').getContext('2d');
    const chartGradient = ctx.createLinearGradient(0, 0, 0, 350);
    chartGradient.addColorStop(0, 'rgba(0, 176, 255, 0.15)');
    chartGradient.addColorStop(1, 'rgba(0, 176, 255, 0)');

    let chartData = Array(60).fill(1.08500); 
    let labels = Array(60).fill('');
    let currentActiveAsset = "EUR/USD";
    let decimalPrecision = 5;
    let currentCategoryFilter = 'FOREX';

    // Matrix mapping definitions across categories matching your ecosystem infrastructure rules
    let forexMarkets = {
        "EUR/USD": { category: "FOREX", price: 1.08520, digits: 5, change: 0.02 },
        "GBP/USD": { category: "FOREX", price: 1.26440, digits: 5, change: -0.05 },
        "USD/JPY": { category: "FOREX", price: 151.420, digits: 3, change: 0.12 },
        "BTC/USD": { category: "CRYPTO", price: 58420.50, digits: 2, change: 1.45 },
        "ETH/USD": { category: "CRYPTO", price: 3145.25, digits: 2, change: -0.82 },
        "XAU/USD": { category: "COMMODITY", price: 2342.10, digits: 2, change: 0.65 }
    };

    const tradeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Live Rate',
                data: chartData,
                borderColor: '#00e676',
                borderWidth: 2,
                pointRadius: 0, 
                fill: true,
                backgroundColor: chartGradient,
                tension: 0.15,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
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

    let currentPrice = 1.08500;
    let marginBalance = 1450000;
    let activeOpenPositions = []; 
    let activeAdminControlTrend = "AUTO";

    window.addEventListener('DOMContentLoaded', () => {
        renderMarketWatch();
        registerActiveAssetSwitch(currentActiveAsset, 5);
        refreshUIBalances();
        renderActivePositionsGrid();
        
        setInterval(() => {
            const clockEl = document.getElementById('live-clock');
            if (clockEl) clockEl.innerText = new Date().toUTCString().replace('GMT', 'UTC');
        }, 1000);
    });

    function filterMarketCategory(cat) {
        currentCategoryFilter = cat;
        document.querySelectorAll('.m-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.innerText.toUpperCase().includes(cat));
        });
        renderMarketWatch();
    }

    function renderMarketWatch() {
        const container = document.getElementById('forex-pair-list');
        if (!container) return;
        container.innerHTML = '';
        Object.keys(forexMarkets).forEach(pair => {
            const data = forexMarkets[pair];
            if(data.category !== currentCategoryFilter) return;

            const div = document.createElement('div');
            div.className = `pair-row ${pair === currentActiveAsset ? 'active' : ''}`;
            div.onclick = () => registerActiveAssetSwitch(pair, data.digits);
            
            const changeColor = data.change >= 0 ? 'var(--high-green)' : 'var(--low-red)';
            div.innerHTML = `
                <span class="pair-name">${pair}</span>
                <span class="pair-price" id="watch-${pair}">${data.price.toFixed(data.digits)}</span>
                <span class="pair-change" style="color: ${changeColor}">${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)}%</span>
            `;
            container.appendChild(div);
        });
    }

    function updateMarketView(rateValue) {
        const previousPrice = currentPrice;
        let modifiedRate = rateValue;
        
        if (activeAdminControlTrend === "HIGH") {
            modifiedRate += Math.random() * (currentActiveAsset === "USD/JPY" ? 0.012 : 0.00012);
        } else if (activeAdminControlTrend === "LOW") {
            modifiedRate -= Math.random() * (currentActiveAsset === "USD/JPY" ? 0.012 : 0.00012);
        }

        currentPrice = modifiedRate;
        if (forexMarkets[currentActiveAsset]) {
            forexMarkets[currentActiveAsset].price = currentPrice;
        }
        
        const watchField = document.getElementById(`watch-${currentActiveAsset}`);
        if(watchField) watchField.innerText = currentPrice.toFixed(decimalPrecision);

        const technicalDelta = currentPrice - previousPrice;

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

        chartData.shift();
        chartData.push(currentPrice);
        tradeChart.update('none');

        processLiveFloatingPortfolioPnL();
        if (Math.abs(technicalDelta) > (currentActiveAsset === "USD/JPY" ? 0.02 : 0.0002)) playSound('tick');
    }

    if (socket) {
        socket.on('market-update', (data) => {
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

    setInterval(() => {
        if (!socket || !socket.connected) {
            const structuralVolatility = (Math.random() - 0.5) * (currentActiveAsset === "USD/JPY" ? 0.015 : 0.00015);
            updateMarketView(currentPrice + structuralVolatility);
        }
    }, 400);

    window.registerActiveAssetSwitch = (pairName, baseDigits) => {
        if (!forexMarkets[pairName]) return;
        currentActiveAsset = pairName;
        decimalPrecision = baseDigits || 5;
        
        currentPrice = forexMarkets[pairName].price;
        chartData = Array(60).fill(currentPrice);
        tradeChart.data.datasets[0].data = chartData;
        tradeChart.options.scales.y.ticks.callback = (value) => value.toFixed(decimalPrecision);
        tradeChart.update('none');

        const titleEl = document.getElementById('current-pair-title');
        if (titleEl) titleEl.innerText = pairName;
        
        renderMarketWatch();
        injectChatMessage("MARKET", `Switched clearing pipeline channel to ${pairName}`, true, "var(--neon-blue)");
    };

    function handleInstantDealPlacement(orderType) {
        const volumeInput = document.getElementById('lot-size-input');
        const assignedLotSize = volumeInput ? parseFloat(volumeInput.value) : 1.00;

        if (isNaN(assignedLotSize) || assignedLotSize <= 0) {
            alert("Invalid transaction contract parameter sizing.");
            return;
        }

        const uniqueOrderId = 'ORD_' + Math.floor(Math.random() * 1000000);
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
        renderActivePositionsGrid();

        if (socket && socket.connected) {
            socket.emit('place-trade', newPositionInstance);
        }
    }

    window.closeForexOrder = (id) => {
        activeOpenPositions = activeOpenPositions.filter(pos => pos.id !== id);
        renderActivePositionsGrid();
    };

    function renderActivePositionsGrid() {
        const ledgerContainer = document.getElementById('tradeLogs');
        if (!ledgerContainer) return;
        
        if (!activeOpenPositions.length) {
            ledgerContainer.innerHTML = `<div style="padding:20px; color:var(--text-dim); text-align:center; font-size:12px;">No active risk vectors open in current runtime workspace.</div>`;
            return;
        }

        ledgerContainer.innerHTML = '';
        activeOpenPositions.forEach(pos => {
            const itemRow = document.createElement('div');
            itemRow.className = 'ledger-item';
            itemRow.id = `pos-row-${pos.id}`;
            ledgerContainer.appendChild(itemRow);
        });
        processLiveFloatingPortfolioPnL();
    }

    function processLiveFloatingPortfolioPnL() {
        let globalFloatingPnL = 0;

        activeOpenPositions.forEach(pos => {
            if (!forexMarkets[pos.pair]) return;
            let currentAssetPrice = forexMarkets[pos.pair].price;
            let contractSizeUnitMultiplier = (pos.pair === "USD/JPY" || pos.pair.includes("JPY")) ? 1000 : 100000;
            if(pos.pair.includes("BTC") || pos.pair.includes("ETH")) contractSizeUnitMultiplier = 10;
            
            let priceDeltaPoints = pos.type === "BUY" ? (currentAssetPrice - pos.entryPrice) : (pos.entryPrice - currentAssetPrice);
            let grossOrderPnL = priceDeltaPoints * pos.lots * contractSizeUnitMultiplier;
            let localizedPnlConverted = grossOrderPnL * 130.00; 
            globalFloatingPnL += localizedPnlConverted;

            const dynamicTargetRow = document.getElementById(`pos-row-${pos.id}`);
            if (dynamicTargetRow) {
                dynamicTargetRow.innerHTML = `
                    <div><strong>${pos.pair}</strong> <span style="color:${pos.type === 'BUY' ? '#00e676' : '#ff1744'}; font-weight:bold;">${pos.type}</span></div>
                    <div>Vol: ${pos.lots.toFixed(2)}</div>
                    <div style="font-family:monospace; color:var(--text-dim);">${pos.entryPrice.toFixed(forexMarkets[pos.pair].digits)}</div>
                    <div class="pos-live-pnl" style="font-family:monospace; text-align:right; font-weight:700; color:${localizedPnlConverted >= 0 ? '#00e676' : '#ff1744'}">KES ${localizedPnlConverted.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</div>
                    <button style="background:var(--low-red); border:none; color:white; border-radius:4px; padding:3px 8px; cursor:pointer; font-size:10px; font-weight:bold; text-transform:uppercase;" onclick="closeForexOrder('${pos.id}')">Close</button>
                `;
            }
        });

        const globalSummaryHeaderField = document.getElementById('total-floating-pnl');
        if (globalSummaryHeaderField) {
            globalSummaryHeaderField.innerText = `KES ${globalFloatingPnL.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`;
            globalSummaryHeaderField.style.color = globalFloatingPnL >= 0 ? "#00e676" : "#ff1744";
        }
    }

    let audioCtx;
    let soundEnabled = false;

    window.initAudio = () => {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        soundEnabled = !soundEnabled;
        const btn = document.getElementById('soundBtn');
        if (btn) btn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i> Audio On' : '<i class="fas fa-volume-mute"></i> Audio Off';
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

    const chatFeed = document.getElementById('chat-feed');

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
        const balEl = document.getElementById('user-balance-display');
        if (balEl) balEl.innerText = marginBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    window.adjustLotSizeValue = (direction) => {
        const input = document.getElementById('lot-size-input');
        if (!input) return;
        let currentLots = parseFloat(input.value);
        if (isNaN(currentLots)) currentLots = 1.00;
        
        if (direction === 'add') {
            input.value = (currentLots + 0.1).toFixed(2);
        } else if (direction === 'subtract') {
            input.value = Math.max(0.01, currentLots - 0.1).toFixed(2);
        }
    };

    function switchWorkspaceView(viewMode) {
        const tabPos = document.getElementById('btn-tab-pos');
        const tabChat = document.getElementById('btn-tab-chat');
        const posLog = document.getElementById('open-positions-log');
        const feedView = document.getElementById('chat-feed');

        if (tabPos) tabPos.classList.toggle('active', viewMode === 'POSITIONS');
        if (tabChat) tabChat.classList.toggle('active', viewMode === 'CHAT');

        if (posLog) posLog.style.display = viewMode === 'POSITIONS' ? 'block' : 'none';
        if (feedView) feedView.style.display = viewMode === 'CHAT' ? 'flex' : 'none';
    }

    function switchAccountMode(mode, btn) {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active-demo', 'active-real'));
        if (btn) btn.classList.add(mode === 'DEMO' ? 'active-demo' : 'active-real');
    }
</script>
</body>
</html>
