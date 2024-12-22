const ballgame = document.getElementById('gamehref');
ballgame.addEventListener('click', function(event) {
    window.location.href = 'index.html';
});

const MAX_GUESSES = 15;
function createGameState() {
    return {
        secretNumber: generateRandomNumber(),
        guesses: [],
        isGameOver: false,
        remainingGuesses: MAX_GUESSES
    };
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function resetGame(state) {
    state.secretNumber = generateRandomNumber();
    state.guesses = [];
    state.isGameOver = false;
    state.remainingGuesses = MAX_GUESSES;
    return state;
}

function updateGuessHistory(guesses) {
    const historyContainer = document.getElementById('guessHistory');
    historyContainer.innerHTML = guesses
        .map(guess => `<span class="guess-badge">${guess}</span>`)
        .join('');
}

function clearGuessHistory() {
    const historyContainer = document.getElementById('guessHistory');
    historyContainer.innerHTML = '';
}

function updateGuessCount() {
    const guessCountElement = document.getElementById('guessCount');
    if (guessCountElement) {
        guessCountElement.textContent = `Guesses left: ${gameState.remainingGuesses}`;
    }
}

let gameState = createGameState();

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const resultMessage = document.getElementById('resultMessage');

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', handleReset);
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        resultMessage.textContent = '⚠️ Please enter a valid number between 1 and 100';
        resultMessage.className = 'message incorrect';
        return;
    }

    gameState.guesses.push(userGuess);
    gameState.remainingGuesses--;
    updateGuessHistory(gameState.guesses);
    updateGuessCount();

    if (userGuess === gameState.secretNumber) {
        handleWin();
    } else if (userGuess > gameState.secretNumber) {
        resultMessage.textContent = '📉 Too high! Try a lower number.';
        resultMessage.className = 'message incorrect';
        document.body.className = 'too-high';
    } else {
        resultMessage.textContent = '📈 Too low! Try a higher number.';
        resultMessage.className = 'message incorrect';
        document.body.className = 'too-low';
    }

    if (gameState.remainingGuesses <= 0) {
        handleLoss();
    }

    guessInput.value = '';
    guessInput.focus();
}

function handleWin() {
    resultMessage.textContent = '🎉 Congratulations! You found the number!';
    resultMessage.className = 'message correct';
    document.body.className = 'success';
    endGame();
}

function handleLoss() {
    resultMessage.textContent = `😢 Game Over! You've used all ${MAX_GUESSES} guesses. The number was ${gameState.secretNumber}.`;
    resultMessage.className = 'message incorrect';
    document.body.className = 'failure';
    endGame();
}

function endGame() {
    gameState.isGameOver = true;
    guessButton.style.display = 'none';
    resetButton.style.display = 'block';
    guessInput.disabled = true;
}

function handleReset() {
    gameState = resetGame(gameState);
    clearGuessHistory();
    resultMessage.textContent = '';
    resultMessage.className = 'message';
    document.body.className = '';
    guessButton.style.display = 'block';
    resetButton.style.display = 'none';
    guessInput.value = '';
    guessInput.disabled = false;
    guessInput.focus();
    updateGuessCount();
}

updateGuessCount();
