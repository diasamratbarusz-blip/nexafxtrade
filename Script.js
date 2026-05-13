/**
 * Nexafxtrade Integrated Logic
 * Handles: Live Socket Graph, System Notifications, and User Chat
 */

// 1. Initialize Socket.io connection to the Node server
const socket = io(); 

const ctx = document.getElementById('tradeChart').getContext('2d');

// Create the green glow gradient to match image_2.png
const greenGradient = ctx.createLinearGradient(0, 0, 0, 400);
greenGradient.addColorStop(0, 'rgba(0, 200, 83, 0.4)');
greenGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

// Initialize with 60 points for the "scrolling" effect
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
            fill: true,
            backgroundColor: greenGradient,
            tension: 0.4, // Smooth wavy appearance
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Essential for high-speed "live" movement
        scales: {
            x: { display: false },
            y: {
                min: -0.12, 
                max: 0.12,
                grid: { color: '#222' },
                ticks: { color: '#666' }
            }
        },
        plugins: { 
            legend: { display: false } 
        }
    }
});

/**
 * 2. REAL-TIME DATA HANDLING
 * Listens for 'market-update' events from server.js
 */
socket.on('market-update', (data) => {
    const newValue = data.rate;

    // Update the "Rate" display overlay
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = newValue.toFixed(4);
    }

    // Shift data for the moving effect
    chartData.shift();
    chartData.push(newValue);
    
    // Efficiently update only the points without full re-render
    tradeChart.update('none');
});

/**
 * 3. SOCIAL PROOF & CHAT SYSTEM
 */
const chatFeed = document.getElementById('chat-feed');
const chatInput = document.getElementById('chat-input-field');
const sendBtn = document.getElementById('send-chat');

// Automated System Notifications (Social Proof)
const systemUsers = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Xy1', '@Lodenyi100'];

function addSystemNotification() {
    if (!chatFeed) return;
    const user = systemUsers[Math.floor(Math.random() * systemUsers.length)];
    const amount = (Math.random() * 400 + 100).toFixed(2);
    
    const div = document.createElement('div');
    div.style.marginBottom = "10px";
    div.style.fontSize = "13px";
    div.innerHTML = `<span style="color:#ffab00; font-weight:bold;">System:</span> CONGRATULATIONS ${user} on your withdrawal of ${amount} 🤑🔥`;
    
    chatFeed.appendChild(div);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Keep the chat clean: remove old messages if list is too long
    if (chatFeed.children.length > 15) chatFeed.removeChild(chatFeed.children[0]);
}

// Generate a system notification every 7 seconds
setInterval(addSystemNotification, 7000);

// Handling User-Sent Messages
if (sendBtn) {
    sendBtn.onclick = () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            socket.emit('send-chat', { user: "Me", message: text });
            chatInput.value = "";
        }
    };
}

// Receiving User Messages from Socket
socket.on('receive-chat', (data) => {
    if (chatFeed) {
        const div = document.createElement('div');
        div.style.marginBottom = "5px";
        div.style.fontSize = "14px";
        div.innerHTML = `<span style="color: #00ff00; font-weight: bold;">${data.user}:</span> ${data.message}`;
        chatFeed.appendChild(div);
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }
});

/**
 * 4. UI INTERACTION HELPERS
 */
function adjustAmount(val) {
    const input = document.getElementById('trade-amount');
    if (!input) return;

    let current = parseInt(input.value) || 0;
    if (val === 'double') {
        input.value = current * 2;
    } else {
        input.value = Math.max(0, current + val);
    }
}

function setSum(val) {
    const input = document.getElementById('trade-amount');
    if (input) input.value = val;
}
