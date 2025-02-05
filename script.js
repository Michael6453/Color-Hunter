// DOM Elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const loader = document.querySelector('[data-testid="loader"]');

let score = 0;
let targetColor = '';

// Function to generate a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate an array of random colors
function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

// Function to start the game
function startGame() {
  // Show loader while generating new colors
  loader.style.display = 'block';
  colorOptionsContainer.style.display = 'none';

  // Clear previous options and status
  colorOptionsContainer.innerHTML = '';
  gameStatus.textContent = '';

  // Generate new random colors
  const colors = generateRandomColors(6);

  // Select a random target color
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  // Simulate a delay for loading (e.g., 1 second)
  setTimeout(() => {
    // Hide loader and show color options
    loader.style.display = 'none';
    colorOptionsContainer.style.display = 'flex';

    // Create color buttons
    colors.forEach(color => {
      const button = document.createElement('button');
      button.classList.add('color-option');
      button.style.backgroundColor = color;
      button.setAttribute('data-testid', 'colorOption');

      button.addEventListener('click', () => handleGuess(color));
      colorOptionsContainer.appendChild(button);
    });
  }, 1000); 
}


// Function to handle user guess
function handleGuess(selectedColor) {
    if (selectedColor === targetColor) {
      gameStatus.textContent = 'Correct 🌟!';
      gameStatus.style.color = 'green';
      colorBox.classList.add('correct-celebration'); 
      score++;
      updateScore();
  
      // Start a new game after a correct guess
      setTimeout(() => {
        colorBox.classList.remove('correct-celebration'); 
        startGame();
      }, 1000); 
    } else {
      gameStatus.textContent = 'Wrong! Try again.';
      gameStatus.style.color = 'red';
      colorBox.classList.add('wrong');
    }
  
    setTimeout(() => {
      colorBox.classList.remove('correct', 'wrong');
    }, 500);
  }
// Function to update the score
function updateScore() {
  scoreDisplay.textContent = score;
}

// Reset the game and score when the "New Game" button is clicked
newGameButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score; 
  startGame(); 
});

// Start the game on page load
startGame();