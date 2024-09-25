const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Sounds (assume the audio files are in the same directory)
const jumpSound = new Audio('jump.wav');
const collisionSound = new Audio('crash.wav');
const powerUpSound = new Audio('powerrup.wav');

// Set canvas to iPhone screen dimensions or responsive dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Define player and other variables
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
  ctx.fillText('RAD: The Game', canvas.width / 2, canvas.height / 3);

  // Display instructions
  ctx.font = '20px Arial';
  ctx.fillText('Instructions:', canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText('1. Click or Tap to jump.', canvas.width / 2, canvas.height / 2);
  ctx.fillText('2. Dodge Referrals.', canvas.width / 2, canvas.height / 2 + 30);
  ctx.fillText('3. Collect your Pay.', canvas.width / 2, canvas.height / 2 + 60);

  // Display "Click or Tap to Start"
  ctx.fillText('Click or Tap to Start', canvas.width / 2, canvas.height / 2 + 150);
}

// Function to start the game
function startGame() {
  isGameStarted = true; // Set flag so the game only starts once
  gameLoop(); // Start the game loop
}

// Event listeners for both touch and click to start the game
function startOnInput() {
  if (!isGameStarted) {
    canvas.removeEventListener('touchstart', startOnInput); // Remove touch listener
    canvas.removeEventListener('click', startOnInput); // Remove click listener
    startGame(); // Start the game when screen is tapped or clicked
  }
}

// Add event listeners for starting the game
canvas.addEventListener('touchstart', startOnInput);
canvas.addEventListener('click', startOnInput);

// Display the instructions screen initially
drawInstructions();

// Main game loop
function gameLoop() {
  if (gameOver) {
    // Display game over screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.fillText(`Final Score: ${Math.floor(score / 100)}`, canvas.width / 2 - 90, canvas.height / 2 + 40);
    ctx.fillText('Click or Tap to Restart', canvas.width / 2, canvas.height / 2 + 80);

    // Allow restart on click or tap
    canvas.addEventListener('click', restartGame);
    canvas.addEventListener('touchstart', restartGame);
    return;
  }

  // Game logic (move player, check for collisions, update score, etc.)
  updateGame();
  
  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

// Game restart function
function restartGame() {
  // Reset game variables
  score = 0;
  obstacles = [];
  powerUps = [];
  gameOver = false;
  frameCount = 0;

  // Remove event listeners for restarting
  canvas.removeEventListener('click', restartGame);
  canvas.removeEventListener('touchstart', restartGame);

  // Start the game loop again
  gameLoop();
}

// Player jump function
function playerJump() {
  if (!player.isJumping) {
    player.dy = player.jumpPower;
    player.isJumping = true;
    jumpSound.play();
  }
}

// Function to handle the player's movements and gravity
function updatePlayer() {
  player.dy += player.gravity; // Apply gravity
  player.y += player.dy; // Update player position

  // Prevent player from falling below the ground
  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
  }

  // Draw the player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to update the game (player movement, obstacles, score, etc.)
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Update and draw player
  updatePlayer();

  // Update score
  score += 1;

  // Draw the score
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${Math.floor(score / 100)}`, 10, 30);
  
  // Handle obstacles, power-ups, etc. (this part needs to be implemented)
}

// Event listeners for player jumping
canvas.addEventListener('touchstart', playerJump);
canvas.addEventListener('click', playerJump);
