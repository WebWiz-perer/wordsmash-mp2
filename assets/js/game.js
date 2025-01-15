// Array of words with hints and definitions
const words = [
    { word: 'Ebullient', hint: 'Cheerful and full of energy.', definition: 'Showing excitement and enthusiasm.' },
    { word: 'Ineffable', hint: 'Too great to be expressed in words.', definition: 'Beyond description or expression.' },
    { word: 'Quixotic', hint: 'Exceedingly idealistic.', definition: 'Impractical and overly romantic.' },
    { word: 'Peregrinate', hint: 'To travel around.', definition: 'To wander from place to place.' },
    { word: 'Halcyon', hint: 'A peaceful time.', definition: 'Calm and serene, typically referring to the past.' },
    { word: 'Serendipity', hint: 'Finding something good by chance.', definition: 'An unexpected and pleasant discovery.' },
    { word: 'Luminous', hint: 'Radiating light.', definition: 'Bright, shining, or glowing.' },
    { word: 'Ephemeral', hint: 'Short-lived.', definition: 'Lasting for a very short time.' },
    { word: 'Sanguine', hint: 'Optimistic.', definition: 'Confident and cheerful in difficult situations.' },
    { word: 'Acuity', hint: 'Sharpness of thought.', definition: 'Keenness or sharpness in understanding or vision.' }
  ];
  
  let currentWordIndex = 0;
  let score= 0;
  let lives= 5; 
  let timer;


const wordBlanks = document.getElementById('word-blanks');
const hintElement = document.getElementById('hint');
const keyboard = document.getElementById('keyboard');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

// Start the Game
function startGame() {
    currentWordIndex = 0;
    score = 0;
    displayWord();
    updateScoreAndLives();
    createKeyboard();
}

function displayWord() {
    const wordObj =words[currentWordIndex]
    const word = wordObj.word.toUpperCase()
    hintElement.textContent = `Hint: ${wordObj.hint}`;
    
    //Blanks displayed based on word length
    
    wordBlanks.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.textContent = '_';
        span.setAttribute('data-letter', word[i]);
        wordBlanks.appendChild(span);
    }

     // Show hint
  document.getElementById('hint').textContent = `Hint: ${wordObj.hint}`;

  // Reset lives
  lives = 5;
  updateScoreAndLives();

  // Start the timer
  startTimer();
}

// Start a 60-second timer
function startTimer() {
  clearInterval(timer); // Clear any existing timer
  let timeLeft = 60;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleIncorrectWord();
    }
  }, 1000);
}

// Create the on-screen keyboard
function createKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    keyboard.innerHTML = ''; // Clear any existing buttons

    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('keyboard-btn');
        button.addEventListener('click', () => handleLetterClick(letter));
        keyboard.appendChild(button);
    });
}

// Handle the user's letter click
function handleLetterClick(letter) {
    const wordObj = words[currentWordIndex];
    const word = wordObj.word.toUpperCase();
    let correctGuess = false;

    // Check if the letter is in the word
    const spans = wordBlanks.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (span.getAttribute('data-letter') === letter) {
            span.textContent = letter; // Reveal the letter
            correctGuess = true;
        }
    });

    // If the guess was incorrect, decrement lives
    if (!correctGuess) {
        lives--;
        updateScoreAndLives();
        if (lives === 0) {
            alert('Game Over!');
            resetGame();
        }
    }

    // Check if the word is fully guessed
    if (![...wordBlanks.querySelectorAll('span')].some(span => span.textContent === '_')) {
        score++;
        currentWordIndex++;
        if (currentWordIndex >= words.length) {
            alert('You won the game!');
            resetGame();
        } else {
            displayWord();
        }
    }
}

// Update score and lives
function updateScoreAndLives() {
    scoreElement.textContent = `Score: ${score}`;
    livesElement.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const bookIcon = document.createElement('i');
        bookIcon.className = 'fas fa-book';
        livesElement.appendChild(bookIcon);
    }
}

// Handle the "Next Word" button click
document.getElementById('next-word-btn').addEventListener('click', () => {
    if (currentWordIndex < words.length - 1) {
      currentWordIndex++; // Move to the next word
      displayWord(); // Display the next word
      document.getElementById('definition-section').classList.add('hidden'); // Hide the definition
    } else {
      alert('You have completed all words! Restarting the game...');
      startGame(); // Restart the game if all words are completed
    }
  });

// Reset the game
function resetGame() {
    score = 0;
    lives = 5;
    currentWordIndex = 0;
    updateScoreAndLives();
}
    // Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', startGame);