const ballgame = document.getElementById('gamehref');
ballgame.addEventListener('click', function(event) {
    window.location.href = '/Iclass/game.html';
});

const messages = [
    "It is certain",
    "Without a doubt",
    "Probably not",
    "Yes definitely",
    "You may rely on it",
    "Maybe?",
    "Don't count on it",
    "Ask again later",
    "NO!!!"
];

function shakeBall() {
    const circle = document.querySelector('.circle');
    const triangle = document.querySelector('.triangle');
    const triangleText = document.querySelector('.triangle-text');
    const closeButton = document.getElementById('close-btn');

    circle.classList.add('shake');
    
    setTimeout(() => {
        circle.classList.remove('shake');
        triangle.classList.add('grow');
        triangleText.textContent = messages[Math.floor(Math.random() * messages.length)];
        triangleText.style.display = 'block';
        closeButton.style.display = 'block';
    }, 1000); 
}

function resetBall() {
    const triangle = document.querySelector('.triangle');
    const triangleText = document.querySelector('.triangle-text');
    const closeButton = document.getElementById('close-btn');

    triangle.classList.remove('grow');
    triangleText.textContent = 'Shake the Ball';
    closeButton.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const triangleText = document.querySelector('.triangle-text');
    const closeButton = document.getElementById('close-btn');

    if (triangleText) {
        triangleText.addEventListener('click', shakeBall);
    }

    if (closeButton) {
        closeButton.addEventListener('click', resetBall);
    }
});
