"use strict";
// my variables
const score0 = document.getElementById("score--0"); // or document.getElementById which is a faster process
const score1 = document.getElementById("score--1");
const CurrentScore0 = document.getElementById("current--0");
const CurrentScore1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const hold = document.querySelector(".btn--hold");
const roll = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
let scores, currentscore, activePlayer, playing;

// start conditions

//The Reset Function
const reset = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;
  CurrentScore0.textContent = 0;
  CurrentScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add("hidden");
  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

reset();
// the switch player Function
const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
// Dice Roll Button

roll.addEventListener("click", function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6 + 1);
    //1-Display Dice
    dice.classList.remove("hidden");
    dice.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      //2- Current Score
      currentscore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentscore;

      //3- Switching Player
    } else {
      switchPlayers();
    }
  }
});

// The Hold Button
hold.addEventListener("click", function () {
  if (playing) {
    // Add current score to score held
    scores[activePlayer] += currentscore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Swap Player
    if (scores[activePlayer] >= 10) {
      playing = false;
      dice.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayers();
    }
  }
});

// the Reset Button
newGame.addEventListener("click", reset);

