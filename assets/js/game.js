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

function startGame() {
  currentWordIndex = 0;
  score = 0;
  lives = 5;
  displayWord();
  updateScoreAndLives();
  createKeyboard();
}

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
      handleIncorrectWord();
    }
  }, 1000);
}

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

function handleLetterClick(letter) {
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
      resetGame();
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
    console.error("No word found for current index:", currentWordIndex);
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

function showDefinition(isWin) {
  const wordObj = words[currentWordIndex];
  const resultText = isWin 
    ? '🎉 Congratulations! You guessed the word!\🎉' 
    : '🤓 Oh, Not to Fret! You learned something new today💪.';
  document.getElementById('game-result').textContent = resultText;
  document.getElementById('word-definition').textContent = `The word was "${wordObj.word}": ${wordObj.definition}`;
  document.getElementById('definition-section').classList.remove('hidden');
}

nextWordBtn.addEventListener('click', () => {
  if (currentWordIndex < words.length - 1) {
    currentWordIndex++;
    displayWord();
  } else {
    endGame();
  }
});

function resetGame() {
  score = 0;
  lives = 5;
  currentWordIndex = 0;
  clearInterval(timer);
  updateScoreAndLives();
  startGame();
}

function endGame() {
  localStorage.setItem("finalScore", score);
  clearInterval(timer);
  setTimeout(() => {
    window.location.href = "endgame.html";
  }, 500);
}

// Start the game
startGame();
