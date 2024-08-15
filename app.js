console.log('in Js');

//Create a function that return random idx in array of choices.
function getComputerChoice() {
  const arr = ['Rock', 'Paper', 'Scissor'];
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

//Create function that invoke a prompt for user to input choice, and return the input
function getHumanChoice() {
  const choice = prompt('Rock, Paper, or Scissor?', '');
  return choice;
}

//create variable for human and computer, and initialize value with 0
let humanScore = 0;
let computerScore = 0;

//create a function to determine who wins the round.
function playRound(humanChoice, computerChoice) {
  let winningMsg = `You win! ${humanChoice} beats ${computerChoice}`;
  let losingMsg = `You lose! ${computerChoice} beats ${humanChoice}`;
  //check if a tie
  if (humanChoice === computerChoice) {
    return `It's a tie! You all go with ${humanChoice}`;
  }
  //then check the choice individually
  if (humanChoice === 'Rock') {
    if (computerChoice === 'Scissor') {
      humanScore += 1;
      return winningMsg;
    } else {
      computerScore += 1;
      return losingMsg;
    }
  }
  if (humanChoice === 'Scissor') {
    if (computerChoice === 'Paper') {
      humanScore += 1;
      return winningMsg;
    } else {
      computerScore += 1;
      return losingMsg;
    }
  }
  if (humanChoice === 'Paper') {
    if (computerChoice === 'Rock') {
      humanScore += 1;
      return winningMsg;
    } else {
      computerScore += 1;
      return losingMsg;
    }
  }
}

//de-caseSensitive for the choice
function deCaseSensitive(text) {
  const modified = text.toLowerCase();
  const newText = modified.replace(modified[0], modified[0].toUpperCase());
  return newText;
}

//decide who wins the whole game
function isWinner() {
  if (humanScore !== computerScore) {
    return humanScore > computerScore ? 'You win!' : 'You lose!';
  } else {
    return `It's a tie!`;
  }
}

//reset the game
function reset() {
  humanScore = 0;
  computerScore = 0;
}

//create a function that will pay num round of games
function playGame(roundNum) {
  for (let i = 0; i < roundNum; i++) {
    //create variable to get deCaseSensitive choice
    const humanChoice = deCaseSensitive(getHumanChoice());
    const computerChoice = deCaseSensitive(getComputerChoice());
    const Msg = playRound(humanChoice, computerChoice);
    console.log(`Round ${i + 1}`);
    console.log(Msg);
    console.log(`Human:${humanScore}, Computer:${computerScore}`);
  }
  console.log('//// Game Set ////');
  console.log(isWinner());
  console.log(`Total run: ${roundNum}. Human:${humanScore}, Computer:${computerScore}.`);
  reset();
}

playGame(5);