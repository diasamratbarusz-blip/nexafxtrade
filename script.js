/**
 * Nexafxtrade Integrated Logic
 * Optimized for wavy movement and color-split fill as seen in image_3.png
 * Version: 3.2.0 (May 2026)
 */

// 1. Initialize Socket.io connection to the Node server
const socket = io(); 

const ctx = document.getElementById('tradeChart').getContext('2d');

// Initialize with 60 points for a smooth, high-resolution wave
let chartData = Array(60).fill(0.00); 
let labels = Array(60).fill('');

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Live Rate',
            data: chartData,
            borderColor: '#00ff00', // Neon green line
            borderWidth: 2,
            pointRadius: 0, 
            fill: {
                target: 'origin',
                above: 'rgba(0, 255, 0, 0.2)',   // Green when above 0.00
                below: 'rgba(255, 0, 0, 0.2)'    // Red when below 0.00
            },
            tension: 0.4, // Essential for the smooth "Wavy" appearance
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 400, // Smooth transition for wave movement
            easing: 'linear'
        },
        scales: {
            x: { display: false },
            y: {
                min: -0.15, // Adjusted to match server.js scale
                max: 0.15,
                grid: { color: '#222' },
                ticks: { color: '#666', font: { size: 10 } }
            }
        },
        plugins: { 
            legend: { display: false } 
        }
    }
});

/**
 * 2. REAL-TIME DATA HANDLING
 * Listens for 'market-update' events from your Node server
 */
socket.on('market-update', (data) => {
    const newValue = data.rate;

    // Update the "Rate" text display overlay
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = newValue.toFixed(4);
    }

    // Shift data for the continuous scrolling wave effect
    chartData.shift();
    chartData.push(newValue);
    
    // Dynamic color shifting for the line itself
    tradeChart.data.datasets[0].borderColor = newValue >= 0 ? '#00ff00' : '#ff0000';
    
    // Update the chart using 'none' for high-performance gliding
    tradeChart.update('none');
});

/**
 * 3. SOCIAL PROOF & CHAT SYSTEM
 */
const chatFeed = document.getElementById('chat-feed');
const chatInput = document.getElementById('chat-input-field');
const sendBtn = document.getElementById('send-chat-btn'); // Matched to HTML ID

// Automated System Notifications matching the style of image_3.png
const systemUsers = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Xy1', '@Lodenyi100', '@Lucid@juicewrld', '@Kenyan_Trader'];

function addSystemNotification() {
    if (!chatFeed) return;
    const user = systemUsers[Math.floor(Math.random() * systemUsers.length)];
    const amount = (Math.random() * 800 + 200).toFixed(2);
    
    const div = document.createElement('div');
    div.style.marginBottom = "10px";
    div.style.fontSize = "13px";
    div.style.borderBottom = "1px solid #111";
    div.style.paddingBottom = "5px";
    div.innerHTML = `<span style="color:#ffcc00; font-weight:bold;">[SYSTEM]:</span> CONGRATULATIONS ${user} on your withdrawal of <span style="color:#00ff00;">KES ${amount}</span> 🤑🔥`;
    
    chatFeed.appendChild(div);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Keep the chat clean: remove old messages if list is too long
    if (chatFeed.children.length > 20) chatFeed.removeChild(chatFeed.children[0]);
}

// Generate a system notification every 8 seconds for constant social proof
setInterval(addSystemNotification, 8000);

// Handling User-Sent Messages
if (sendBtn) {
    sendBtn.onclick = () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            // Emitting to server so other connected users see it
            socket.emit('send-chat', { user: "Me", message: text });
            chatInput.value = "";
        }
    };
}

// Listen for messages from the server (System and User)
socket.on('receive-chat', (data) => {
    if (chatFeed) {
        const div = document.createElement('div');
        div.style.marginBottom = "8px";
        div.style.fontSize = "14px";
        
        if(data.user === "System") {
            div.innerHTML = `<span style="color:#ffcc00; font-weight:bold;">[SYSTEM]:</span> ${data.message}`;
        } else {
            div.innerHTML = `<span style="color: #00ff00; font-weight: bold;">${data.user}:</span> ${data.message}`;
        }
        
        chatFeed.appendChild(div);
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }
});

/**
 * 4. TRADING EXECUTION
 */
const buyBtn = document.getElementById('buy-btn');
const sellBtn = document.getElementById('sell-btn');

if (buyBtn) {
    buyBtn.onclick = () => {
        const amount = document.getElementById('trade-amount').value;
        socket.emit('place-trade', { type: 'BUY', amount: amount });
        console.log("BUY order sent to server.");
    };
}

if (sellBtn) {
    sellBtn.onclick = () => {
        const amount = document.getElementById('trade-amount').value;
        socket.emit('place-trade', { type: 'SELL', amount: amount });
        console.log("SELL order sent to server.");
    };
}

// Listen for trade outcome from server.js engine
socket.on('trade-result', (data) => {
    // Alert the user of their win or loss
    const resultMsg = data.status === "WIN" ? `Win! KES ${data.payout}` : "Loss. Try again!";
    console.log(`Nexafxtrade: ${resultMsg}`);
});

/**
 * 5. UI INTERACTION HELPERS (Global Scope)
 */
window.adjustAmount = (val) => {
    const input = document.getElementById('trade-amount');
    if (!input) return;

    let current = parseInt(input.value) || 0;
    if (val === 'double') {
        input.value = current * 2;
    } else {
        input.value = Math.max(0, current + val);
    }
};

window.setSum = (val) => {
    const input = document.getElementById('trade-amount');
    if (input) input.value = val;
};

console.log("Nexafxtrade: Script logic loaded successfully.");
