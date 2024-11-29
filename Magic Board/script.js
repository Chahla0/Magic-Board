const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawingColor = 'black';
let penSize = 2;  // Default pen size
let penType = 'small';  // Default pen type

// Set a white background and brown border
function setWhiteBackground() {
  // Fill the background with white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw a brown border around the canvas
  ctx.lineWidth = 5;  // Border thickness
  ctx.strokeStyle = 'brown';  // Brown border color
  ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Draw the border
}

// Call this function to set the background color to white
setWhiteBackground();

function changeColor(color) {
  drawingColor = color;
}

function drawShape(shape) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  ctx.fillStyle = drawingColor;

  if (shape === 'circle') {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();
  } else if (shape === 'square') {
    ctx.fillRect(x, y, 60, 60);
  }
}

function clearCanvas() {
  // Clear only the drawing area (i.e., content drawn with the pen)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // After clearing the content, redraw the background and the border to preserve them
  setWhiteBackground();
}

function exitBoard() {
  if (confirm("Are you sure you want to exit the board?")) {
    window.close();
  }
}

function saveDrawing() {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
}

function changePenSize(size) {
  penSize = size;
}

function changePenType(type) {
  penType = type;
}

canvas.addEventListener('mousedown', (e) => {
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  canvas.addEventListener('mousemove', onDraw);
});

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', onDraw);
});

function onDraw(e) {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = drawingColor;
  ctx.lineWidth = penSize;  // Use the dynamic pen size
  
  if (penType === 'small') {
    ctx.lineWidth = 2;  // Small pen
  } else if (penType === 'big') {
    ctx.lineWidth = 6;  // Big pen
  } else if (penType === 'circle') {
    drawCirclePen(e.offsetX, e.offsetY);
    return;  // Skip normal line drawing for circle pen
  } else if (penType === 'star') {
    drawStarPen(e.offsetX, e.offsetY);
    return;  // Skip normal line drawing for star pen
  }

  ctx.stroke();
}

// Circle Pen Drawing Logic
function drawCirclePen(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI); // Draw a circle instead of a line
  ctx.fillStyle = drawingColor;
  ctx.fill();
}

// Star Pen Drawing Logic
function drawStarPen(x, y) {
  const radius = 10;  // Size of the star
  const spikes = 5;   // Number of points in the star
  const step = Math.PI / spikes;  // Step to make the star shape

  ctx.beginPath();
  ctx.moveTo(x, y - radius); // Start at the top of the star

  // Draw the star points
  for (let i = 0; i < 2 * spikes; i++) {
    const angle = i * step;
    const xOffset = Math.cos(angle) * radius;
    const yOffset = Math.sin(angle) * radius;
    ctx.lineTo(x + xOffset, y + yOffset);
  }

  ctx.closePath();
  ctx.fillStyle = drawingColor;
  ctx.fill();  // Fill the star with the selected color
}
