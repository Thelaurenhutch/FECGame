const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Sounds (same as before)
const jumpSound = new Audio('jump.mp3');
const collisionSound = new Audio('collision.mp3');
const powerUpSound = new Audio('powerup.mp3');

// Set canvas to iPhone screen dimensions or responsive dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Define player and other variables (same as before)
let player = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  color: 'red',
  speed: 5,
  dy: 0,
  gravity: 0.5,
  jumpPower: -10,
  isJumping: false,
  isPoweredUp: false
};

let obstacles = [];
let powerUps = [];
let score = 0;
let level = 1;
let gameOver = false;

let obstacleFrequency = 100;
let obstacleSpeed = 3;
let powerUpFrequency = 500;
let powerUpDuration = 5000;

let isGameStarted = false; // Tracks if the game has started
let frameCount = 0;

// Function to draw the instructions screen
function drawInstructions() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Display title
  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Platformer Game', canvas.width / 2, canvas.height / 3);
  
  // Display instructions
  ctx.font = '20px Arial';
  ctx.fillText('Instructions:', canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText('1. Click or Tap to jump.', canvas.width / 2, canvas.height / 2);
  ctx.fillText('2. Dodge obstacles.', canvas.width / 2, canvas.height / 2 + 30);
  ctx.fillText('3. Collect power-ups.', canvas.width / 2, canvas.height / 2 + 60);

  // Display "Click or Tap to Start"
  ctx.fillText('Click or Tap to Start', canvas.width / 2, canvas.height / 2 + 150);
}

// Function to start the game
function startGame() {
  isGameStarted = true;
  gameLoop();
}

// Display the instructions screen initially
drawInstructions();

// Event listeners for both touch and click
function startOnInput() {
  if (!isGameStarted) {
    canvas.removeEventListener('touchstart', startOnInput); // Remove touch listener
    canvas.removeEventListener('click', startOnInput); // Remove click listener
    startGame();
  }
}

// Add both touch and click event listeners
canvas.addEventListener('touchstart', startOnInput);
canvas.addEventListener('click', startOnInput);

// Game logic (same as before, including game loop function)
function gameLoop() {
  if (gameOver) {
    // Display game over screen (same as before)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.fillText(`Final Score: ${Math.floor(score / 100)}`, canvas.width / 2 - 90, canvas.height / 2 + 40);
    return;
  }

  // The rest of the game logic here, updating player, obstacles, power-ups
  // Same game loop logic as before
  requestAnimationFrame(gameLoop);
}
