const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('.color-button'); // Select all color buttons
const colorPicker = document.getElementById('colorPicker');
const lineWidthSelect = document.getElementById('lineWidth');
const eraser = document.getElementById('eraser');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');
const shareButton = document.getElementById('share');

// Initialize canvas size and background
canvas.width = 800;
canvas.height = 400;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;
let currentColor = 'black'; // Default color
let currentLineWidth = lineWidthSelect.value;
let erasing = false;

// Handle color button clicks
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentColor = button.getAttribute('data-color'); // Update current color
        erasing = false; // Disable eraser if active
    });
});

// Handle drawing on canvas
canvas.addEventListener('mousedown', () => (drawing = true));
canvas.addEventListener('mouseup', () => (drawing = false, ctx.beginPath()));
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? 'white' : currentColor;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

// Change color via color picker
colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    erasing = false;
});

// Update line width
lineWidthSelect.addEventListener('change', () => {
    currentLineWidth = lineWidthSelect.value;
});

// Eraser
eraser.addEventListener('click', () => {
    erasing = true;
    currentColor = 'white'; // Erase with white
});

// Clear canvas
clearButton.addEventListener('click', () => {
    ctx.fillStyle = 'white'; // Reset to white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});

// Save canvas
saveButton.addEventListener('click', () => {
    const imageName = prompt('Enter the name for your image:', 'my_drawing');
    if (imageName) {
        const link = document.createElement('a');
        link.download = `${imageName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
});

// Share functionality
shareButton.addEventListener('click', () => {
    const imageDataURL = canvas.toDataURL('image/png');
    const emailLink = `mailto:?subject=Check out my drawing!&body=Here's my drawing: ${imageDataURL}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageDataURL)}`;
    const whatsappLink = `https://wa.me/?text=Check out my drawing: ${encodeURIComponent(imageDataURL)}`;

    const shareOptions = `
        <div>
            <p>Share your drawing:</p>
            <a href="${emailLink}" target="_blank">Share via Email</a><br>
            <a href="${facebookLink}" target="_blank">Share on Facebook</a><br>
            <a href="${whatsappLink}" target="_blank">Share on WhatsApp</a>
        </div>
    `;
    document.getElementById('back').addEventListener('click', () => {
        document.body.style.backgroundColor = ''; // Reset to default background
    });
    const shareWindow = window.open('', '_blank', 'width=400,height=300');
    shareWindow.document.write(shareOptions);
});
