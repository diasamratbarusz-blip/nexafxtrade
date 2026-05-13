/**
 * Nexafxtrade Real-Time Interface Logic
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
            borderColor: '#00ff00', // Neon green matching image.png
            backgroundColor: 'rgba(0, 255, 0, 0.1)', // Semi-transparent fill
            fill: true,
            borderWidth: 2,
            pointRadius: 0, // Hides dots for a clean line
            tension: 0.4 // Creates the smooth curves seen in image_2.png
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
 * These events must match the 'io.emit' names in your server.js
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
        
        // Highlight system messages in yellow/gold like image.png
        if (data.user === "System") {
            messageElement.innerHTML = `<span style="color: #ffcc00; font-weight: bold;">System:</span> ${data.message}`;
        } else {
            messageElement.innerHTML = `<span style="color: #00ff00;">${data.user}:</span> ${data.message}`;
        }

        chatFeed.appendChild(messageElement);
        
        // Auto-scroll to the bottom of the chat
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }
});

// 4. Interaction Handlers
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text !== "") {
            socket.emit('send-chat', { user: "User", message: text });
            chatInput.value = "";
        }
    });
}

/**
 * Helper Functions for Trade Controls
 */
function adjustAmount(val) {
    const input = document.getElementById('trade-amount');
    if (!input) return;

    let current = parseInt(input.value) || 0;
    if (val === 'double') {
        input.value = current * 2;
    } else {
        input.value = Math.max(0, current + val); // Prevent negative amounts
    }
}

function setSum(val) {
    const input = document.getElementById('trade-amount');
    if (input) input.value = val;
}
