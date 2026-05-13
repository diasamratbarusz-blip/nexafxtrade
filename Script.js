/**
 * Nexafxtrade Core Logic
 * Handles Real-time Graphing, Live Chat Feed, and Automated Balance UI
 */

const ctx = document.getElementById('tradeChart').getContext('2d');

// Gradient for the "Green" area seen in image_2.png
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

let chartData = Array(60).fill(0.00); // 60 data points for 1 minute of movement
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
            pointRadius: 0, // Hides the dots for a clean line
            fill: true,
            backgroundColor: gradient,
            tension: 0.4, // Creates the smooth wave look from image_2.png
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // Set to 0 for instant, "live" feeling movement
        },
        scales: {
            x: { display: false },
            y: {
                min: -0.12, // Matches the scale in image_2.png
                max: 0.12,
                grid: { color: '#222' },
                ticks: { color: '#666' }
            }
        },
        plugins: { legend: { display: false } }
    }
});

/**
 * LIVE GRAPH LOGIC
 */
function updateLiveGraph() {
    const lastValue = chartData[chartData.length - 1];
    const fluctuation = (Math.random() - 0.5) * 0.05;
    let newValue = lastValue + fluctuation;

    // Keep it within the bounds of the chart (-0.12 to 0.12)
    newValue = Math.max(-0.12, Math.min(0.12, newValue));

    // Update UI Rate Display
    const rateElement = document.getElementById('current-rate');
    if(rateElement) rateElement.innerText = newValue.toFixed(4);

    // Shift data to create movement
    chartData.shift();
    chartData.push(newValue);
    
    tradeChart.update();
}

// Update every 500ms for a fast, "active" trading feel
setInterval(updateLiveGraph, 500);

/**
 * LIVE CHAT & SOCIAL PROOF LOGIC
 * Mimics the withdrawal notifications in image_2.png
 */
const chatFeed = document.getElementById('chat-feed');
const kenyanUsers = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Xy1', '@Lodenyi100', '@Lucid', '@Evarist'];

function addSystemNotification() {
    if (!chatFeed) return;

    const user = kenyanUsers[Math.floor(Math.random() * kenyanUsers.length)];
    const amount = (Math.random() * (500 - 100) + 100).toFixed(2);
    
    const notification = document.createElement('div');
    notification.className = 'user-msg';
    notification.innerHTML = `
        <span class="system-msg">System:</span> 
        CONGRATULATIONS ${user} on your withdrawal of ${amount} 🤑🔥
    `;

    chatFeed.appendChild(notification);
    
    // Auto-scroll to bottom
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Remove old messages to keep performance high
    if (chatFeed.children.length > 15) {
        chatFeed.removeChild(chatFeed.children[0]);
    }
}

// Add a new "withdrawal" every 4-7 seconds
setInterval(addSystemNotification, Math.random() * (7000 - 4000) + 4000);

/**
 * UI CONTROL LOGIC
 */
function setSum(amount) {
    const input = document.getElementById('trade-amount');
    if (input) input.value = amount;
}

// Placeholder for Buy/Sell Actions
document.getElementById('buy-btn')?.addEventListener('click', () => {
    console.log("Buy order placed at: " + document.getElementById('current-rate').innerText);
});

document.getElementById('sell-btn')?.addEventListener('click', () => {
    console.log("Sell order placed at: " + document.getElementById('current-rate').innerText);
});
