/**
 * Nexafxtrade Live Graph Logic
 * Specifically designed for image_2.png aesthetics
 */

const ctx = document.getElementById('tradeChart').getContext('2d');

// Create the green glow gradient to match image_2.png
const greenGradient = ctx.createLinearGradient(0, 0, 0, 400);
greenGradient.addColorStop(0, 'rgba(0, 200, 83, 0.4)');
greenGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

// Initialize with 60 points (1 minute of data if updated every second)
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
        animation: false, // Set to false for instant "live" movement
        scales: {
            x: { display: false },
            y: {
                min: -0.12, // Matches the Y-axis scale in image_2.png
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
 * Update Function: Moves the graph every 500ms
 */
function updateLiveGraph() {
    const lastValue = chartData[chartData.length - 1];
    
    // Simulate market fluctuation
    const fluctuation = (Math.random() - 0.5) * 0.04;
    let newValue = lastValue + fluctuation;

    // Constrain within the visual bounds of the chart
    newValue = Math.max(-0.12, Math.min(0.12, newValue));

    // Update the "Rate" display overlay
    const rateDisplay = document.getElementById('current-rate');
    if (rateDisplay) {
        rateDisplay.innerText = newValue.toFixed(4);
    }

    // Shift the data to create the moving effect
    chartData.shift();
    chartData.push(newValue);
    
    tradeChart.update();
}

// Set the movement speed to half a second
setInterval(updateLiveGraph, 500);

/**
 * Social Proof: Automated Live Withdrawal Notifications
 */
const chatFeed = document.getElementById('chat-feed');
const users = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Xy1', '@Lodenyi100'];

function addNotification() {
    if (!chatFeed) return;
    const user = users[Math.floor(Math.random() * users.length)];
    const amount = (Math.random() * 400 + 100).toFixed(2);
    
    const div = document.createElement('div');
    div.style.marginBottom = "10px";
    div.innerHTML = `<span style="color:#ffab00; font-weight:bold;">System:</span> CONGRATULATIONS ${user} on your withdrawal of ${amount} 🤑🔥`;
    
    chatFeed.appendChild(div);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    if (chatFeed.children.length > 10) chatFeed.removeChild(chatFeed.children[0]);
}

// Generate a fake withdrawal every 6 seconds
setInterval(addNotification, 6000);
