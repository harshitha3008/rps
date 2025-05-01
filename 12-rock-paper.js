let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0}; 
updateScore();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-autoplay-btn')
  .addEventListener('click', ()=>{
    autoPlay();
  });

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() =>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('Rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('Paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', ()=>{
    playGame('Scissors');
  });

document.body.addEventListener('keydown', (event)=>{
  if(event.key==='r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's'){
    playGame('Scissors');
  }
})

function playGame(PlayerMove) {
  const computernum = pickComputerMove();
  let res = '';

  if (PlayerMove === 'Scissors') {
    res = computernum === 'Rock' ? 'You Lose' : computernum === 'Paper' ? 'You Win' : 'Tie';
  } else if (PlayerMove === 'Paper') {
    res = computernum === 'Rock' ? 'You Win' : computernum === 'Paper' ? 'Tie' : 'You Lose';
  } else if (PlayerMove === 'Rock') {
    res = computernum === 'Rock' ? 'Tie' : computernum === 'Paper' ? 'You Lose' : 'You Win';
  }

  if (res === 'You Win') {
    score.wins += 1;
  } else if (res === 'You Lose') {
    score.losses += 1;
  } else if (res === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();

  document.querySelector('.js-result').innerHTML = res;
  document.querySelector('.js-moves').innerHTML = 
    `You <img src="images/${PlayerMove}-emoji.png" class="move-icon"> 
     <img src="images/${computernum}-emoji.png" class="move-icon"> Computer`;
}

document.querySelector('.js-reset-button')
  .addEventListener('click', ()=>{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
  });

function updateScore() {
  document.querySelector('.js-score').innerHTML = 
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomnumber = Math.random();
  return randomnumber < 1/3 ? 'Rock' : randomnumber < 2/3 ? 'Paper' : 'Scissors';
}
