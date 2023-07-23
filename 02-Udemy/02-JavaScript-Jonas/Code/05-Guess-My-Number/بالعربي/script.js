'use strict';

let score = 20;
let highscore = 0;
let secretNum = Math.trunc(Math.random() * 20) + 1;
const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

// When the 'Check' btn is clicked:
document.querySelector('.check').addEventListener('click', function () {
  document.querySelector('.score').textContent = score;
  const guess = Number(document.querySelector('.guess').value);

  // When there's no number:
  if (!guess) {
    displayMessage('⛔ انت بتستغفلني يا عم إنت؟');
    document.querySelector('.message').style.fontSize = '3rem';
  }
  // When guess is correct:
  else if (guess === secretNum) {
    displayMessage('🎉 يابن اللعيبة، جاااامد');
    document.querySelector('.message').style.fontSize = '3rem';

    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNum;
    document.querySelector('body').style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  // When guess is wrong:
  else if (guess !== secretNum) {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage(guess > secretNum ? '📈 إنزل شوية' : '📉 إطلع شوية');
      document.querySelector('.message').style.fontSize = '3rem';
    } else {
      displayMessage('💥 إلعب بعيد يابابا');
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.background = 'rgb(167, 43, 43)';
    }
  }
});

// When the 'Again' btn is clicked:
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  displayMessage('...توقع الرقم اللي في دماغي يلا');
  document.querySelector('.message').style.fontSize = '3rem';
  document.querySelector('.message').style.fontWeight = 'bold';
  document.querySelector('.guess').value = '';
  secretNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.background = '#222';
});
