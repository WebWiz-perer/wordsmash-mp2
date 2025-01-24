/*jshint esversion: 6*/

let currentWordIndex = 0;
let score = 0;
let lives = 5;
let timer;

const wordBlanks = document.getElementById('word-blanks');
const hintElement = document.getElementById('hint');
const keyboard = document.getElementById('keyboard');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const nextWordBtn = document.getElementById('nextword-btn'); 
const words = [
  { word: 'Jovial', hint: 'Cheerful and friendly.', definition: 'Full of good humor and joy.' },
  { word: 'Hasten', hint: 'To move quickly.', definition: 'To hurry or act swiftly.' },
  { word: 'Gleeful', hint: 'Feeling very happy.', definition: 'Expressing joy or delight.' },
  { word: 'Dwell', hint: 'To stay in one place.', definition: 'To live or remain in a particular place.' },
  { word: 'Yearn', hint: 'To long for something.', definition: 'To feel a strong desire or craving.' },
  { word: 'Impetuous', hint: 'Acting without thinking.', definition: 'Marked by impulsive passion or force.' },
  { word: 'Sublime', hint: 'Inspiring awe or admiration.', definition: 'Of such beauty or excellence as to inspire great respect or reverence.' },
  { word: 'Pernicious', hint: 'Harmful in a subtle way.', definition: 'Causing harm or damage, often in a gradual or hidden manner.' },
  { word: 'Voracious', hint: 'Having a great appetite.', definition: 'Eager or enthusiastic in pursuit of something, especially food or knowledge.' },
  { word: 'Tenebrous', hint: 'Dark and mysterious.', definition: 'Obscure or shadowy; difficult to understand.' },
];

// Start the Game by resetting all the scores,index and lives.

function startGame() {
  currentWordIndex = 0;
  score = 0;
  lives = 5;
  displayWord();
  updateScoreAndLives();
  createKeyboard();
}

/**
 * Starts a 60-second timer and updates the countdown, also resets if already exists.
 */

function startTimer() {
  clearInterval(timer); 
  let timeLeft = 60;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      Swal.fire({
        title: 'Time Up!',
        text: 'The timer has run out. Learn the word and got to next word ot Try again! 👍',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: "confirm-btn"
        }
      }).then(() => {
       showDefinition(false);
       });
    }
  }, 1000);
}

/**
 * Create the on-screen keyboard
 * @param {string[]} alphabet - The set of letters to create buttons for.
 */

function createKeyboard() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  keyboard.innerHTML = ''; 
  alphabet.split('').forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('keyboard-btn');
    button.addEventListener('click', () => handleLetterClick(letter));
    keyboard.appendChild(button);
  });
}

/**
 * Reveals the correct letters in the word or decreases lives if incorrect.
 * @param {string} letter - The letter clicked by the user.
 */

function handleLetterClick(letter) {
  const keyboardButtons = document.querySelectorAll('#keyboard button');
  keyboardButtons.forEach(button => {
    if (button.textContent === letter) {
      button.disabled = true; // Disable the clicked button
      button.classList.add('disabled'); // Add the 'disabled' class for styling
    }
  });
  
let correctGuess = false;
  const spans = wordBlanks.querySelectorAll('span');
  spans.forEach(span => {
    if (span.getAttribute('data-letter') === letter) {
      span.textContent = letter;
      correctGuess = true;
    }
  });

  if (!correctGuess) {
    lives--;
    updateScoreAndLives();
    if (lives === 0) {
      showDefinition(false);
      return;
    }
  }

  if (![...spans].some(span => span.textContent === '_')) {
    score++;
    updateScoreAndLives();
    showDefinition(true);
  }
}

function updateScoreAndLives() {
  scoreElement.textContent = `Score: ${score}`;
  livesElement.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    const bookIcon = document.createElement('i');
    bookIcon.className = 'fas fa-book';
    livesElement.appendChild(bookIcon);
  }
}

function displayWord() {
  const wordObj = words[currentWordIndex];
  if (!wordObj) {
    handleError();
    return;
  }

  const word = wordObj.word.toUpperCase();
  hintElement.textContent = `Hint: ${wordObj.hint}`;
  wordBlanks.innerHTML = '';

  for (let i = 0; i < word.length; i++) {
    const span = document.createElement('span');
    span.textContent = '_';
    span.setAttribute('data-letter', word[i]);
    wordBlanks.appendChild(span); 
  }

  lives = 5;
  updateScoreAndLives();
  clearInterval(timer);
  startTimer();
  createKeyboard();
  document.getElementById('definition-section').classList.add('hidden');
}

/**
 * Handles the scenario where a word is missing or out of range.
 */
function handleError() {
  Swal.fire({
    title: 'Error!',
    text: 'An error occurred while loading your next word. Please return to the homepage.',
    icon: 'error',
    confirmButtonText: 'Back to Home',
    customClass: {
      confirmButton: "confirm-btn"
    }
  }).then(() => {
    window.location.href = "index.html";
  });
}

/**
 * Shows the definition of the word and displays the result of the round.
 * @param {boolean} isWin - Indicates whether the player guessed the word correctly.
 */
function showDefinition(isWin) {
  const wordObj = words[currentWordIndex];
  const resultText = isWin ?
    '🎉 Congratulations! You guessed the word! 🎉' :
    '🤓 Oh, Not to Fret! You learned something new today 💪.';

  // Using Swal.fire to display the message in a popup

  Swal.fire({
    title: resultText,
    text: `The word was "${wordObj.word}": ${wordObj.definition}`,
    icon: isWin ? 'success' : 'info',
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: "confirm-btn"
    },
  }).then(() => {
    moveToNextWord();
  });
}

function moveToNextWord() {
  if (currentWordIndex < words.length - 1) {
    currentWordIndex++;
    displayWord();
  } else {
    endGame();
  }
}

nextWordBtn.addEventListener('click', moveToNextWord);

/**
 * Ends the game and redirects to the endgame page
 */

function endGame() {
  localStorage.setItem("finalScore", score);
  clearInterval(timer);
  setTimeout(() => {
    window.location.href = "endgame.html";
  }, 500);
}

// Start the game
startGame();
