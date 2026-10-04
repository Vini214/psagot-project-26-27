const canvas = document.getElementById("pixelCanvas");
const colorPicker = document.getElementById("colorPicker");
const eraserButton = document.getElementById("eraserButton");
const clearButton = document.getElementById("clearButton");

const gridSize = 16;

let selectedColor = colorPicker.value;
let isDrawing = false;
let eraserMode = false;


// Generate the 16x16 pixel grid
for (let i = 0; i < gridSize * gridSize; i++) {

    const pixel = document.createElement("div");

    pixel.classList.add("pixel");

    // Start drawing when the mouse button is pressed
    pixel.addEventListener("mousedown", function () {
        isDrawing = true;
        paintPixel(pixel);
    });

    // Paint while dragging over pixels
    pixel.addEventListener("mouseenter", function () {
        if (isDrawing) {
            paintPixel(pixel);
        }
    });

    // Add the pixel to the canvas
    canvas.appendChild(pixel);
}


// Stop drawing when the mouse button is released
document.addEventListener("mouseup", function () {
    isDrawing = false;
});


// Update the selected color
colorPicker.addEventListener("input", function () {
    selectedColor = colorPicker.value;
    eraserMode = false;
    eraserButton.classList.remove("is-active");
    eraserButton.setAttribute("aria-pressed", "false");
});


// Turn eraser mode on or off
eraserButton.addEventListener("click", function () {

    eraserMode = !eraserMode;
    eraserButton.classList.toggle("is-active", eraserMode);
    eraserButton.setAttribute("aria-pressed", String(eraserMode));
});


// Clear all pixels
clearButton.addEventListener("click", function () {

    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach(function (pixel) {
        pixel.style.backgroundColor = "white";
    });
});


// Paint or erase a pixel
function paintPixel(pixel) {

    if (eraserMode) {
        pixel.style.backgroundColor = "white";
    } else {
        pixel.style.backgroundColor = selectedColor;
    }
}


// Prevent unwanted dragging behavior
canvas.addEventListener("dragstart", function (event) {
    event.preventDefault();
});