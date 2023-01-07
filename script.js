const page = document.querySelector("body");
const playerChoices = document.querySelectorAll(".player-choices .choice");
const round = document.querySelector(".round");
const message = document.querySelector(".message");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");

let gameStarted = false;
let gameEnded = false;
let roundInProgress = false;
let rounds = 0;
let playerWins = 0;
let computerWins = 0;

function getComputerChoice() {
    let choices = [
        "rock",
        "paper",
        "scissors"
    ];
    let randomChoice = (Math.floor(Math.random()*choices.length));
    let computerChoice = choices[randomChoice];
    return computerChoice;
}

function compareChoices(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        message.textContent = "There is a tie.";
        return ("none");
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
        message.textContent = "Rock beats scissors.";
        return ("player");
    } else if (playerChoice === "paper" && computerChoice === "rock") {
        message.textContent = "Paper beats rock.";
        return ("player");
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
        message.textContent = "Scissors beats paper.";
        return ("player");
    } else if (playerChoice === "scissors" && computerChoice === "rock") {
        message.textContent = "Rock beats scissors.";
        return ("computer");
    } else if (playerChoice === "rock" && computerChoice === "paper") {
        message.textContent = "Paper beats rock.";
        return ("computer");
    } else if (playerChoice === "paper" && computerChoice === "scissors") {
        message.textContent = "Scissors beats paper.";
        return ("computer");
    }
}

function displayRoundResults(winner) {
    if (winner === "player") {
        message.textContent += " You win the round!";
    } else if (winner === "computer") {
        message.textContent += " The computer wins the round.";
    } else {
        message.textContent += " No one wins the round.";
    }
}

function displayGameResults() {
    if (playerWins === computerWins) {
        message.textContent += " There is a tie, no one wins the game. Click anywhere to play again.";
    } else if (playerWins > computerWins) {
        message.textContent += " Congratulations, you win the game! Click anywhere to play again.";
    } else if (playerWins < computerWins) {
        message.textContent += " The computer wins the game, better luck next time! Click anywhere to play again.";
    }
}

function addScore(winner) {
    if (winner === "player") {
        playerWins++;
        playerScore.textContent = `Score: ${playerWins}`;
    } else if (winner === "computer") {
        computerWins++;
        computerScore.textContent = `Score: ${computerWins}`;
    } else {
        return;
    }
}

function addRound() {
    rounds++;
    round.textContent = `Round ${rounds} of 5`;
}

function startGame() {
    gameStarted = true;
    addRound();
    message.textContent = "Choose an option on the player area."
}

function endGame() {
    gameEnded = true;
}

function animateUp(player, computer) {
    const playerChoice = document.querySelector(`.player-choices .${player} img`);
    const computerChoice = document.querySelector(`.computer-choices .${computer} img`);
    playerChoice.classList.add("animateUp");
    computerChoice.classList.add("animateUp");
}

function animateDown(player, computer) {
    const playerChoice = document.querySelector(`.player-choices .${player} img`);
    const computerChoice = document.querySelector(`.computer-choices .${computer} img`);
    playerChoice.classList.remove("animateUp");
    computerChoice.classList.remove("animateUp");
}

function playRound(playerChoice) {
    let playerSelection = playerChoice;
    let computerSelection = getComputerChoice();
    animateUp(playerSelection, computerSelection);
    let winner = compareChoices(playerSelection, computerSelection);
    addScore(winner);
    setTimeout(function() {animateDown(playerSelection, computerSelection)}, 1000);
    if (rounds === 5) {
        displayGameResults();
        setTimeout(endGame, 1);
    } else {
        displayRoundResults(winner);
    }
}

function endRound() {
    if (gameEnded === false) {
        roundInProgress = false;
        message.textContent = "Choose next option.";
        addRound();
    } else {
        roundInProgress = false;
    }
}

function playAgain() {
    rounds = 1, playerWins = 0, computerWins = 0;
    message.textContent = "Choose an option on the player area."
    round.textContent = `Round ${rounds} of 5`;
    playerScore.textContent = `Score: ${playerWins}`;
    computerScore.textContent = `Score: ${computerWins}`;
}

playerChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
        if (gameStarted) {
            if (roundInProgress === false) {
                roundInProgress = true;
                let playerChoice = choice.classList[1];
                playRound(playerChoice);
                setTimeout(endRound, 2000);
            }
        }
    })
})

page.addEventListener('click', () => {
    if (gameStarted === false && rounds === 0) {
        startGame();
    } else if (gameEnded === true) {
        playAgain();
        gameEnded = false;
    }
})