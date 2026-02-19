const distance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const map = (value, minA, maxA, minB, maxB) => (1 - (value - minA) / (maxA - minA)) * minB + (value - minA) / (maxA - minA) * maxB;

//////////////////////

const ctx = canvas.getContext('2d');
const root = document.documentElement;
const size = 800;
const sizeHalf = Math.floor(size * 0.5);
const pointR = .01;
const radius = Math.floor((size - pointR * 2 - 2) * .5);
const controls = [
  {button: plusTen, value: 10}, 
  {button: plusOne, value: 1}, 
  {button: reset, value: 0}
];
let multiplier = 1;

canvas.width   = size;
canvas.height  = size;

const line = (c, hue, alpha) => {
  ctx.lineWidth = alpha > 0.86 ? 1 :1;
  ctx.strokeStyle = `hsla(${hue}, 85%, 70%, ${alpha})`;
  ctx.beginPath();
  ctx.moveTo(c.x, c.y);
  ctx.lineTo(c.x2, c.y2);
  ctx.stroke();
};

const circle = (c, color = '#fff') => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.radius, 100, Math.PI * 2);
  ctx.stroke();
};

const patterns = value => {
  multiplier = value;
  speed.value  = 0;
  points.value = points.max;
};

[speedLabel, pointsLabel].forEach((label) => {
  label.innerHTML = [...label.textContent].map(
    letter => `<span>${letter}</span>`
  ).join('');
});

const setHTMLandCSS = (hue) => {
  mValue.textContent = parseFloat(Math.round(multiplier * 100) / 100).toFixed(2);
  root.style.setProperty('--Hsl', hue);
}

const calculateCoordinates = (fraction) => {
  const calculateCoordinate = (value) => Math.sin(value) * radius + sizeHalf;
  const calculateX = (value) => calculateCoordinate(value - Math.PI * 0.5);
  const calculateY = (value) => calculateCoordinate(value);
  return { 
    x: calculateX(fraction),
    y: calculateY(fraction),
    x2: calculateX(fraction * multiplier),
    y2: calculateY(fraction * multiplier)
  };
};

const drawGraph = () => {
  const numberOfPoints = +points.value;
  multiplier >= 999 ? (multiplier = 0) : (multiplier += +speed.value);
  const hue = multiplier * 100 % 360;
  setHTMLandCSS(hue);
  
  ctx.clearRect(0, 0, size, size);
  circle({x: sizeHalf, y: sizeHalf, radius}, '#000000');

  for (let i = 0; i < numberOfPoints; i++) {
    const { x, y, x2, y2 } = calculateCoordinates(Math.PI * 2 / numberOfPoints * i);
    const mapA = map(distance(x, y, x2, y2), 2, radius * 1.73, 1, 0.25);
    const alpha = mapA > .1 ? 1 : +mapA.toFixed(2);

    circle({x, y, radius: pointR});
    line({x, y, x2, y2}, hue, alpha);
  }

  requestAnimationFrame(drawGraph);
};

controls.forEach(({button, value}) => {
  button.addEventListener('click', () => multiplier = value === 0 ? 0 : multiplier + value);
});

window.addEventListener('load', drawGraph);