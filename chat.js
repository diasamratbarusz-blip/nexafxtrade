/**
 * Nexafxtrade Real-Time Interface Logic
 * File: chat.js
 * Handles: Live Moving Graph, Live Chat, and Amount Adjustments
 */

// 1. Initialize Socket.io connection
const socket = io();

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
                min: -0.12, 
                max: 0.12, 
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
 * 3. LISTEN FOR LIVE UPDATES
 */

// Handle Market Rate Updates
socket.on('market-update', (data) => {
    // Update the numerical display above the graph
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = data.rate.toFixed(4);
    }

    // Shift the graph to the left
    tradeChart.data.datasets[0].data.shift();
    tradeChart.data.datasets[0].data.push(data.rate);
    
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
        messageElement.style.borderBottom = "1px solid #111"; // Cleaner look
        
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

/**
 * 4. INTERACTION HANDLERS
 */

// Handle Sending Chat
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            // For now, we use "Me" or a random ID until Auth is finished
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
    // You can trigger a popup or sound here
    console.log(`Trade Result: ${data.status} | Payout: KES ${data.payout}`);
});

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
