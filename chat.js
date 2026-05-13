<!DOCTYPE html>
<html>
<head>
    <title>Live Trading Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { background-color: #000; display: flex; justify-content: center; padding: 20px; }
        .chart-container { width: 600px; height: 300px; background: #0a0a0a; border-radius: 8px; padding: 10px; }
    </style>
</head>
<body>

<div class="chart-container">
    <canvas id="tradeChart"></canvas>
</div>

<script>
    const ctx = document.getElementById('tradeChart').getContext('2d');
    
    // Initial data: 20 points set to 0
    const labels = Array.from({length: 20}, (_, i) => "");
    const dataPoints = Array.from({length: 20}, () => 0.03);

    const tradeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rate',
                data: dataPoints,
                borderColor: '#00ff00', // Neon green like image.png
                backgroundColor: 'rgba(0, 255, 0, 0.2)', // Transparent fill
                fill: true,
                borderWidth: 2,
                pointRadius: 0, // Hides the dots for a smooth line
                tension: 0.4 // Curves the line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 300 }, // Smooth transition
            scales: {
                y: { min: -0.12, max: 0.12, grid: { color: '#222' } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });

    // Simulate live data movement
    setInterval(() => {
        // Remove oldest point
        tradeChart.data.labels.shift();
        tradeChart.data.datasets[0].data.shift();

        // Add newest point (Randomized for demo)
        const nextValue = (Math.random() * 0.1) - 0.02; 
        tradeChart.data.labels.push("");
        tradeChart.data.datasets[0].data.push(nextValue);

        tradeChart.update('none'); // Update without full re-render for speed
    }, 500); // Updates every 500ms
</script>

</body>
</html>
