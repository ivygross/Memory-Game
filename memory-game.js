"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

let firstCard = '';
let secondCard = '';
const defaultColor = 'beige';
const score = document.getElementById('score');
score.innerHTML = null;
const highScore = document.getElementById('highScore');
highScore.innerHTML = Infinity;
highScore.hidden = true;
// created to easily keep track of card count; assigned value that is # of cards present
let keepingTally = 0;
const newGameBtn = document.getElementById('newGameBtn');
const gameBoard = document.getElementById("game");

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/* Event listener added for New Game button which "resets" necessary components for functionality */
newGameBtn.addEventListener('click', function () {
  score.innerHTML = null;
  gameBoard.innerHTML = null;
  createCards(colors);
  firstCard = '';
  secondCard = '';
  keepingTally = 10;
})

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  // const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let temp = document.createElement('div');
    temp.classList.add(color);
    temp.classList.add('gameCards');
    // temp.classList.add('noClicking');
    // temp.setAttribute('name', 'colorCard');
    temp.setAttribute('name', color);
    temp.addEventListener('click', handleCardClick);
    gameBoard.appendChild(temp);
    // increment keepingTally to account for each card present
    keepingTally++;
  }
}


/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = card.getAttribute('name');
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = defaultColor;
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  // incrementing score which will be seen on page
  score.innerHTML++;
  // assignment of card to firstCard, flipping card and removing eventListener
  if (firstCard === '') {
    firstCard = evt.target;
    flipCard(firstCard);
    firstCard.removeEventListener('click', handleCardClick);
    // console.log(evt.target);
    // this will run if firstCard has already been assigned, doing the same for secondCard
  } else {
    secondCard = evt.target;
    flipCard(secondCard);
    // console.log(firstCard, secondCard, 'these are both cards targeted');
    // preventing any other cards from being clicked while working with firstCard and secondCard
    for (let card of document.querySelectorAll('.gameCards')) {
      card.classList.add('noClicking');
    }

    /* when cards without the same color are chosen, we will set a timeout to allow the user to see which cards they flipped over, we will then unflip the cards, "reset" firstCard and secondCard, and reinstate the click events on the cards*/
    if (firstCard.getAttribute('name') !== secondCard.getAttribute('name')) {
      setTimeout(() => {
        unFlipCard(firstCard);
        unFlipCard(secondCard);
        firstCard.addEventListener('click', handleCardClick);
        secondCard.addEventListener('click', handleCardClick);
        firstCard = '';
        secondCard = '';
        for (let card of document.querySelectorAll('.gameCards')) {
          card.classList.remove('noClicking');
        }

      }, 1000);
      // console.log('not removing event listener');

      /* In the case that the cards have matching colors, we will simply remove the click events on the cards while leaving the card flips, "reset" both firstCard and secondCard, reinstate the click events on the other cards, and decrement our keepingTally */
    } else {
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = '';
      secondCard = '';

      for (let card of document.querySelectorAll('.gameCards')) {
        card.classList.remove('noClicking');
      }
      keepingTally -= 2;
      console.log(keepingTally);
      console.log('removed event listener');
      if (keepingTally === 0) {
        // highScore.innerHTML = score.innerHTML;
        changeHighScore();
      }
    }
  }

}
/** Funciton to handle change the highScore */
function changeHighScore() {
  if (score.innerHTML < highScore.innerHTML) {
    highScore.innerHTML = score.innerHTML;
    highScore.hidden = false;
  }
}


