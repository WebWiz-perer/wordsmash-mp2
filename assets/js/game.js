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

// Start the Game
function startGame() {
    currentWordIndex = 0;
    score = 0;
    displayWord();
    updateScoreAndLives();
}

function displayWord() {
    const wordObj = [ currentWordIndex]
    const word = wordObj.word.toUpperCase()
    const hint = wordObj.hint;
}


  // Display blanks based on word length
  const wordContainer = document.getElementById('word-blanks');
  wordContainer.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const blank = document.createElement('span');
    blank.className = 'blank';
    blank.textContent = '_';
    blank.setAttribute('data-letter', word[i]);
    wordContainer.appendChild(blank);
  }