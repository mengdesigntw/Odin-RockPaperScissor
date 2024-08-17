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
const resetBtn = document.querySelector('.reset');
const isHumanWin = document.querySelector('.winner.human');
const isComputerWin = document.querySelector('.winner.computer');

//create a function see if it's game-set
function checkGameSet() {
  if (humanScore == 5 || computerScore == 5) {
    rock.disabled = true;
    paper.disabled = true;
    scissor.disabled = true;
    resetBtn.classList.toggle('display');
    humanScore > computerScore ? isHumanWin.classList.toggle('display') : isComputerWin.classList.toggle('display');
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
    checkGameSet();
    return 'You';
  } else {
    computerScore += 1;
    checkGameSet();
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

//helper Func
function createElement(type, className, textContent) {
  const element = document.createElement(type);
  if (className) element.classList.toggle(className);
  if (textContent) element.textContent = textContent;
  return element;
}

function createPlayRoundUI(roundNum, humanValue, computerValue, winner) {
  const playRoundUi = createElement('div', 'play-round');

  const roundData = createElement('div', 'round-data');
  playRoundUi.appendChild(roundData);

  const roundWinner = createElement('div', 'round-winner');
  playRoundUi.appendChild(roundWinner);

  const roundHeading = createElement('h5', null, 'Round: ');
  const roundNumElem = createElement('span', 'round-num', roundNum);
  roundHeading.appendChild(roundNumElem);

  const playerChoice = createElement('div', 'player-choice');
  const humanChoiceUi = createElement('div', null, 'You: ');
  const computerChoiceUi = createElement('div', null, 'Computer: ');

  const humanChoice = createElement('span', 'emphasis', humanValue);
  humanChoiceUi.appendChild(humanChoice);
  playerChoice.appendChild(humanChoiceUi);

  const computerChoice = createElement('span', 'emphasis', computerValue);
  computerChoiceUi.appendChild(computerChoice);
  playerChoice.appendChild(computerChoiceUi);

  roundData.appendChild(roundHeading);
  roundData.appendChild(playerChoice);

  const winnerHeading = createElement('h5', null, 'Winner');
  const winnerUi = createElement('div', 'emphasis', winner);
  roundWinner.appendChild(winnerHeading);
  roundWinner.appendChild(winnerUi);

  return playRoundUi;
}

function handleClick(e) {
  //get the value from computer and human
  const humanValue = e.target.textContent; //👊 Rock
  const humanValueModified = humanValue.slice(2).trimStart(); //Rock
  const computerValue = getComputerChoice(); // e.g ✋ Papper
  const computerValueModified = computerValue.slice(2).trimStart(); //e.g. Paper
  //who is winner
  const winner = playRound(humanValueModified, computerValueModified);
  //ui
  const playRoundUi = createPlayRoundUI(i, humanValue, computerValue, winner);
  //append the play round inside the play history
  playHistory.appendChild(playRoundUi);
  //display score in the scoreboardUi
  computerScoreUi.textContent = computerScore;
  humanScoreUi.textContent = humanScore;
  //add round num
  i++;
}

choices.forEach((choice) => {
  choice.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', function () {
  //enable the buttons
  rock.disabled = false;
  paper.disabled = false;
  scissor.disabled = false;
  //dismiss resetBtn and win text
  resetBtn.classList.toggle('display');
  humanScore > computerScore ? isHumanWin.classList.toggle('display') : isComputerWin.classList.toggle('display');
  //reset score and display
  humanScore = 0;
  computerScore = 0;
  computerScoreUi.textContent = computerScore;
  humanScoreUi.textContent = humanScore;
  //reset round num
  i = 1;
  //remove history
  while (playHistory.firstChild) {
    playHistory.removeChild(playHistory.firstChild);
  }
});
// //reset the game
// function reset() {
//   humanScore = 0;
//   computerScore = 0;
// }
