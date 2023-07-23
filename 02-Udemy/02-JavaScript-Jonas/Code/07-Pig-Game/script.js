'use strict';

/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player = document.querySelector('.player');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

/// /// /// /// /// /// /// /// ///
let playing, activePlayer, scores, currentScore;

const start = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

start();
/// /// /// /// /// /// /// /// ///

/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
// The roll btn:
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1st step:
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2nd step:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3rd step:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 4th step:
      switchPlayer();
    }
  }
});

// The hold btn:
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1st step:
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // 2nd step - if wins:
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 2nd step - if !wins:
      switchPlayer();
    }
  }
});

// The new game btn:
btnNew.addEventListener('click', start);
/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
