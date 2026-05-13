// Initialize Chart
const ctx = document.getElementById('tradeChart').getContext('2d');
let chartData = Array(50).fill(0).map(() => Math.random() * 0.1);

const tradeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array(50).fill(''),
        datasets: [{
            data: chartData,
            borderColor: '#00ff00',
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: 'rgba(0, 200, 83, 0.1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { display: false }, y: { grid: { color: '#222' }, ticks: { color: '#666' } } },
        animation: false
    }
});

// Update Chart & Rate every second
setInterval(() => {
    const newRate = (Math.random() * 0.12).toFixed(4);
    document.getElementById('current-rate').innerText = newRate;
    
    chartData.shift();
    chartData.push(parseFloat(newRate));
    tradeChart.update();
}, 1000);

// Set Quick Sums
function setSum(val) {
    document.getElementById('trade-amount').value = val;
}

// Simulated Live Notifications
const users = ['@Vokkeh', '@Leonheart', '@Rose404', '@Pati', '@Xy1'];
const feed = document.getElementById('chat-feed');

function addNotification() {
    const user = users[Math.floor(Math.random() * users.length)];
    const amount = (Math.random() * 500 + 100).toFixed(2);
    const div = document.createElement('div');
    div.style.marginBottom = "8px";
    div.innerHTML = `<span style="color:white">System:</span> CONGRATULATIONS ${user} on your withdrawal of ${amount} 🤑🔥`;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
}

// Add a notification every 5 seconds for social proof
setInterval(addNotification, 5000);
