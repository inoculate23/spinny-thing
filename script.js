const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 600;
canvas.height = 600;

// Animation variables
let angle = 0;
let radius = 0;
let isRunning = false;
let animationId = null;
let speed = 5;
let density = 10;

// Color palette for the spiral
const colors = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#4facfe',
    '#00f2fe',
    '#43e97b',
    '#38f9d7'
];

// Initialize
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Get controls
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const speedSlider = document.getElementById('speedSlider');
const densitySlider = document.getElementById('densitySlider');

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
speedSlider.addEventListener('input', (e) => {
    speed = parseInt(e.target.value);
});
densitySlider.addEventListener('input', (e) => {
    density = parseInt(e.target.value);
});

function drawSpiral() {
    if (!isRunning) return;

    // Calculate position
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Choose color based on angle
    const colorIndex = Math.floor((angle / (Math.PI * 2)) % colors.length);
    ctx.fillStyle = colors[colorIndex];
    
    // Draw circle at position
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();

    // Update angle and radius
    angle += 0.1 * (speed / 5);
    radius += 0.05 * (density / 10);

    // Reset if spiral gets too big
    if (radius > Math.min(centerX, centerY)) {
        radius = 0;
        angle = 0;
        // Create a fade effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    animationId = requestAnimationFrame(drawSpiral);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        drawSpiral();
    }
}

function pause() {
    isRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function reset() {
    pause();
    angle = 0;
    radius = 0;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Initialize canvas with white background
reset();
