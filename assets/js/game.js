const randomWords = [
    { word: 'Ebullient', definition: 'Cheerful and full of energy.' },
    { word: 'Ineffable', definition: 'Too great to be expressed in words.' },
    { word: 'Quixotic', definition: 'Exceedingly idealistic; unrealistic and impractical.' },
    { word: 'Peregrinate', definition: 'To travel or wander around from place to place.' },
    { word: 'Halcyon', definition: 'Denoting a period of time in the past that was idyllically happy and peaceful.' }
];

let selectedWord = "";
let guessedLetters = [];
let lives = 5; // Number of lives (books)
const bookEmoji = "📚";

// Function to select a random word and generate blanks
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const randomWordObj = randomWords[randomIndex];
    selectedWord = randomWordObj.word.toUpperCase(); // Convert to uppercase for consistency
    guessedLetters = Array(selectedWord.length).fill("_"); // Fill blanks
    document.getElementById("random-word").innerText = guessedLetters.join(" "); // Display blanks
    document.getElementById("hint").innerText = `Hint: ${randomWordObj.definition}`; // Display hint
    updateLivesDisplay();
}

// Function to update lives display
function updateLivesDisplay() {
    const livesContainer = document.getElementById("lives");
    livesContainer.innerText = bookEmoji.repeat(lives); // Display remaining books as emojis
}

// Function to handle user guesses
function handleGuess(letter) {
    if (lives <= 0) {
        alert("Game Over! Refresh to play again.");
        return;
    }

    const upperLetter = letter.toUpperCase();
    let isCorrect = false;

    // Check if the guessed letter is in the word
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === upperLetter && guessedLetters[i] === "_") {
            guessedLetters[i] = upperLetter;
            isCorrect = true;
        }
    }

    if (!isCorrect) {
        lives--; // Decrease lives if the guess is wrong
        updateLivesDisplay();
    }

    // Update the displayed word with guessed letters
    document.getElementById("random-word").innerText = guessedLetters.join(" ");

    // Check for win or lose
    if (guessedLetters.join("") === selectedWord) {
        document.getElementById("message").innerText = "Congratulations! You guessed the word!";
    } else if (lives === 0) {
        document.getElementById("message").innerText = `Game Over! The word was: ${selectedWord}`;
    }
}

// Event listener for guessing letters
document.getElementById("guess-button").addEventListener("click", function () {
    const letterInput = document.getElementById("guess-input").value;
    if (letterInput.length === 1 && /^[a-zA-Z]$/.test(letterInput)) {
        handleGuess(letterInput);
    } else {
        alert("Please enter a valid letter!");
    }
    document.getElementById("guess-input").value = ""; // Clear input
});

// Initialize game on page load
document.addEventListener("DOMContentLoaded", function () {
    selectRandomWord(); // Select a word and set up the game
});