const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const startPainting = () => (painting = true);

const stopPainting = () => (painting = false);

const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    console.log("hi");
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    console.log("bye");
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

/*======================================================*/

const handleColorClick = e => {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

/*======================================================*/

const handleRangeChange = e => {
  const size = e.target.value;
  ctx.lineWidth = size;
};

if (range) {
  range.addEventListener("input", handleRangeChange);
}

/*======================================================*/

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
/*======================================================*/

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
