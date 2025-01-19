/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Endgame page loaded.");

    
    const finalScore = localStorage.getItem("finalScore") || 0;
    const finalScoreElement = document.getElementById("final-score-end");
    const personalisedMessageElement = document.getElementById("personalised-message");

    console.log(`Retrieved final score: ${finalScore}`);

    
    finalScoreElement.textContent = finalScore;


    let message;
    if (finalScore >= 8) { // Since you have 10 questions, a score of 8 and above is great!
        message = `🌟 Incredible! You're a Word Wizard! Keep it up! You scored ${finalScore}.`;
    } else if (finalScore >= 5) {
        message = `✨ Great work! You're on your way to mastering words! You scored ${finalScore}.`;
    } else {
        message = `💪 Don't give up! Practice makes perfect. Try again! You scored ${finalScore}.`;
    }
    const messageElement = document.createElement('p');
    messageElement.id = 'personalised-message';
    messageElement.classList.add('scale-in');
    messageElement.textContent = message;

    const endPage = document.getElementById('end-game');
    endPage.appendChild(messageElement);
});

