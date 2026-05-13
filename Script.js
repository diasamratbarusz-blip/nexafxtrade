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

// Function to simulate or fetch live market movement
function updateLiveGraph() {
    // Generate a random fluctuation similar to the image
    const lastValue = chartData[chartData.length - 1];
    const fluctuation = (Math.random() - 0.5) * 0.05;
    let newValue = lastValue + fluctuation;

    // Keep it within the bounds of the chart (-0.12 to 0.12)
    newValue = Math.max(-0.12, Math.min(0.12, newValue));

    // Update UI Rate Display
    document.getElementById('current-rate').innerText = newValue.toFixed(4);

    // Shift data to create movement
    chartData.shift();
    chartData.push(newValue);
    
    tradeChart.update();
}

// Update every 500ms for a fast, "active" trading feel
setInterval(updateLiveGraph, 500);
