let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️',
    lizard: '🦎',
    spock: '🖖'
};

const winRules = {
    rock: {
        scissors: 'crushes',
        lizard: 'crushes'
    },
    paper: {
        rock: 'covers',
        spock: 'disproves'
    },
    scissors: {
        paper: 'cuts',
        lizard: 'decapitates'
    },
    lizard: {
        spock: 'poisons',
        paper: 'eats'
    },
    spock: {
        scissors: 'smashes',
        rock: 'vaporizes'
    }
};

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerDisplay = document.getElementById('player-choice-display');
const computerDisplay = document.getElementById('computer-choice-display');
const resultMsg = document.getElementById('result-message');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');

function playGameSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'click') {
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'win') {
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } else if (type === 'lose') {
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'tie') {
            osc.frequency.setValueAtTime(350, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        }
    } catch (e) {
    }
}

function getRandomComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerChoice) {
    const computerChoice = getRandomComputerChoice();

    playerDisplay.classList.remove('winner-pop', 'shake', 'placeholder');
    computerDisplay.classList.remove('winner-pop', 'shake', 'placeholder');
    playerDisplay.textContent = emojiMap[playerChoice];
    computerDisplay.textContent = emojiMap[computerChoice];
    if (playerChoice === computerChoice) {
        resultMsg.textContent = `It's a tie! Both chose ${playerChoice.toUpperCase()}.`;
        playerDisplay.classList.add('shake');
        computerDisplay.classList.add('shake');
        playGameSound('tie');
    } 
    else if (winRules[playerChoice][computerChoice]) {
        const verb = winRules[playerChoice][computerChoice];
        resultMsg.textContent = `You Win! ${playerChoice.toUpperCase()} ${verb} ${computerChoice.toUpperCase()}.`;
        playerScore++;
        playerScoreEl.textContent = playerScore;
        playerDisplay.classList.add('winner-pop');
        playGameSound('win');
    } 
    else {
        const verb = winRules[computerChoice][playerChoice];
        resultMsg.textContent = `You Lose! ${computerChoice.toUpperCase()} ${verb} ${playerChoice.toUpperCase()}.`;
        computerScore++;
        computerScoreEl.textContent = computerScore;
        computerDisplay.classList.add('winner-pop');
        playGameSound('lose');
    }
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedChoice = button.getAttribute('data-choice');
        playGameSound('click');
        playRound(selectedChoice);
    });
});

resetBtn.addEventListener('click', () => {
    playGameSound('click');
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerDisplay.textContent = '❓';
    computerDisplay.textContent = '❓';
    playerDisplay.classList.add('placeholder');
    computerDisplay.classList.add('placeholder');
    resultMsg.textContent = 'Choose your move!';
});
