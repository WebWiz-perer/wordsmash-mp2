/*jshint esversion: 6*/
// List of words of the day with definitions
const randomwords = [
    { word: 'Ebullient', definition: 'Cheerful and full of energy.' },
    { word: 'Ineffable', definition: 'Too great to be expressed in words.' },
    { word: 'Quixotic', definition: 'Exceedingly idealistic; unrealistic and impractical.' },
    { word: 'Peregrinate', definition: 'To travel or wander around from place to place.' },
    { word: 'Halcyon', definition: 'Denoting a period of time in the past that was idyllically happy and peaceful.' },
    { word: 'Panacea', definition: 'A solution or remedy for all difficulties or diseases.' },
    { word: 'Ambrosial', definition: 'Worthy of the gods; delicious or fragrant.' },
    { word: 'Labyrinthine', definition: 'Like a maze; highly complex and confusing.' },
    { word: 'Aegis', definition: 'Under the sponsorship or guidance of something.' },
    { word: 'Ubiquitous', definition: 'Appearing or existing everywhere simultaneously.' },
    { word: 'Evanescent', definition: 'Vanishing quickly; fleeting.' }
];

// Function to generate and display a random word
function displayRandomWord() {
    const randomIndex = Math.floor(Math.random() * randomwords.length); 
    const randomWord = randomwords[randomIndex]; 

// Display word and definition
    document.getElementById('random-word').innerText = randomWord.word; 
    document.getElementById('random-word-definition').innerText = randomWord.definition;
}

// Trigger the random word display on page load
document.addEventListener('DOMContentLoaded', function () {
    displayRandomWord();
});
