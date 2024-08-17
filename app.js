console.log('in Js');

//Create a function that return random idx in array of choices.
function getComputerChoice() {
  const arr = ['👊 Rock', '✋ Paper', '✌️ Scissor'];
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

//set event handler to each button and store value in variable
const choices = document.querySelectorAll('#rock, #paper, #scissor');

//create a function see if it's game-set
function checkGameSet(){
  if (humanScore == 5 || computerScore == 5) {
    rock.disabled = true;
    paper.disabled = true;
    scissor.disabled = true;
  }
}

//create a function to determine who wins the round.
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return '-';
  }
  if (
    (humanChoice === 'Rock' && computerChoice === 'Scissor') ||
    (humanChoice === 'Scissor' && computerChoice === 'Paper') ||
    (humanChoice === 'Paper' && computerChoice === 'Rock')
  ) {
    humanScore += 1;
    checkGameSet()
    return 'You';
  } else {
    computerScore += 1;
    checkGameSet()
    return 'Computer';
  }
}

//create variable to store score and display
const computerScoreUi = document.querySelector('.score.computer');
const humanScoreUi = document.querySelector('.score.human');
computerScoreUi.textContent = computerScore;
humanScoreUi.textContent = humanScore;

const playHistory = document.querySelector('.play-history');
//roundNum
let i = 1;

function handleClick(e) {
  //get the value from computer and human
  const humanValue = e.target.textContent; //👊 Rock
  const humanValueModified = humanValue.slice(2).trimStart(); //Rock
  const computerValue = getComputerChoice(); // e.g ✋ Papper
  const computerValueModified = computerValue.slice(2).trimStart(); //e.g. Paper
  //who is winner
  const winner = playRound(humanValueModified, computerValueModified);
  //inside play round
  const playRoundUi = document.createElement('div');
  playRoundUi.classList.toggle('play-round');
  const roundData = document.createElement('div');
  roundData.classList.toggle('round-data');
  const roundWinner = document.createElement('div');
  roundWinner.classList.toggle('round-winner');
  playRoundUi.appendChild(roundData);
  playRoundUi.appendChild(roundWinner);
  //inside round data
  const roundHeading = document.createElement('h5');
  roundHeading.textContent = 'Round: ';
  const playerChoice = document.createElement('div');
  playerChoice.classList.toggle('player-choice');
  roundData.appendChild(roundHeading);
  roundData.appendChild(playerChoice);
  //inside round heading
  const roundNum = document.createElement('span');
  roundNum.classList.toggle('round-num');
  roundNum.textContent = i;
  i++;
  roundHeading.appendChild(roundNum);
  //inside player choice
  const humanChoiceUi = document.createElement('div');
  humanChoiceUi.textContent = 'You: ';
  const computerChoiceUi = document.createElement('div');
  computerChoiceUi.textContent = 'Computer: ';
  playerChoice.appendChild(humanChoiceUi);
  playerChoice.appendChild(computerChoiceUi);
  //inside human choice ui
  const humanChoice = document.createElement('span');
  humanChoice.textContent = humanValue; //'👊 Rock'
  humanChoice.classList.toggle('emphasis');
  humanChoiceUi.appendChild(humanChoice);
  //inside computer choice ui
  const computerChoice = document.createElement('span');
  computerChoice.textContent = computerValue;
  computerChoice.classList.toggle('emphasis');
  computerChoiceUi.appendChild(computerChoice);
  //inside round winner
  const h5 = document.createElement('h5');
  h5.textContent = 'Winner';
  const winnerUi = document.createElement('div');
  winnerUi.classList.toggle('emphasis');
  winnerUi.textContent = winner; // computer, you, ''
  roundWinner.appendChild(h5);
  roundWinner.appendChild(winnerUi);
  //append the play round inside the play history
  playHistory.appendChild(playRoundUi);

  //display score in the scoreboardUi
  computerScoreUi.textContent = computerScore;
  humanScoreUi.textContent = humanScore;
}

choices.forEach(choice => {
  choice.addEventListener('click', handleClick);
})

// //reset the game
// function reset() {
//   humanScore = 0;
//   computerScore = 0;
// }
