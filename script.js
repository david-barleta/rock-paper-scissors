function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

function getComputerChoice() {
    let choices = [
        "Rock",
        "Paper",
        "Scissors"
    ];
    let randomChoice = (Math.floor(Math.random()*choices.length));
    let computerChoice = choices[randomChoice];
    return (computerChoice);
}

function getPlayerChoice() {
    let playerInput = prompt("Rock, Paper, or Scissors?", "Rock");
    let playerChoice = toTitleCase(playerInput);
    if (playerChoice !== "Rock" && playerChoice !== "Paper" && playerChoice !== "Scissors") {
        console.log("Your input is not in the choices. The round will be repeated. Please choose only among rock, paper, or scissors.");
        return ("invalid");
    } else {
        return (playerChoice);
    }
}

function compareChoices(playerChoice, computerChoice) {
    console.log(`You: ${playerChoice} | Computer: ${computerChoice}`);
    if (playerChoice === computerChoice) {
        return ("none");
    } else if (playerChoice === "Rock" && computerChoice === "Scissors") {
        console.log ("Rock beats scissors.");
        return ("player");
    } else if (playerChoice === "Paper" && computerChoice === "Rock") {
        console.log ("Paper beats rock.");
        return ("player");
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
        console.log ("Scissors beats paper.");
        return ("player");
    } else if (playerChoice === "Scissors" && computerChoice === "Rock") {
        console.log ("Rock beats scissors.");
        return ("computer");
    } else if (playerChoice === "Rock" && computerChoice === "Paper") {
        console.log ("Paper beats rock.");
        return ("computer");
    } else if (playerChoice === "Paper" && computerChoice === "Scissors") {
        console.log ("Scissors beats paper.");
        return ("computer");
    }
}

function playRound() {
    let computerSelection = getComputerChoice();
    let playerSelection = getPlayerChoice();
    if (playerSelection === "invalid") {
        return ("repeat")
    } else {
        var winner = compareChoices(playerSelection, computerSelection);
        if (winner === "none") {
            console.log("There is a tie. No one won this round.");
        } else if (winner === "player") {
            console.log("You won this round!");
        } else if (winner === "computer") {
            console.log("The computer won this round.");
        }
    }
    return (winner);
}

function game() {
    let rounds = 1;
    let playerWins = 0;
    let computerWins = 0;
    let result
    for (; rounds < 6; ) {
        console.log(`Round ${rounds} of 5`);
        result = playRound();
        if (result === "repeat") {
            rounds--;
        } else if (result === "player") {
            playerWins++;
        } else if (result === "computer") {
            computerWins++;
        }
        rounds++;
    }
    if (playerWins === computerWins) {
        console.log("You and the computer have the same number of win(s). No one won the game.")
    } else if (playerWins > computerWins) {
        console.log(`You have ${playerWins} win(s) while the computer has ${computerWins} win(s). Congratulations, you won the game!`)
    } else if (playerWins < computerWins) {
        console.log(`You have ${playerWins} win(s) while the computer has ${computerWins} win(s). You lost the game, better luck next time!`)
    }
}