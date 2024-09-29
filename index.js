const emojis = [
  ["🐸", "🐶", "🐰", "🐱"],
  ["🐮", "🐸", "🐰", "🐭"],
  ["🐭", "🐷", "🐨", "🐨"],
  ["🐶", "🐱", "🐮", "🐷"],
].sort(() => 0.5 - Math.random());

let pairs = [];
let cardsDown = emojis.map((item) => item.map(() => 0));

function resetGame() {
  emojis.sort(() => 0.5 - Math.random());
  cardsDown = emojis.map((item) => item.map(() => 0));
  screenController();
}
console.log(emojis);
function game(selectedCol, selectedRow) {
  function clearPairs() {
    pairs = [];
  }
  if (cardsDown[selectedCol][selectedRow] !== 0) {
    return cardsDown;
  } else {
    pairs.push(emojis[selectedCol][selectedRow]);
    cardsDown[selectedCol][selectedRow] = emojis[selectedCol][selectedRow];
    screenController();
  }

  if (pairs.length === 2) {
    const isPairs = pairs[0] === pairs[1];

    if (isPairs) {
      clearPairs();
      if (checkWin()) {
        resetGame();
      }
      return cardsDown;
    } else {
      flipCard();
      clearPairs();
    }
  }
  return cardsDown;
}

function flipCard() {
  for (let i = 0; i < cardsDown.length; i++) {
    for (let j = 0; j < cardsDown.length; j++) {
      if (cardsDown[i][j] === pairs[0] || cardsDown[i][j] === pairs[1]) {
        cardsDown[i][j] = 0;

        setTimeout(() => {
          screenController();
        }, 1000);
      }

      console.log(cardsDown, pairs[2], "unmatched");
    }
  }
}

function checkWin() {
  for (let i = 0; i < cardsDown.length; i++) {
    for (let j = 0; j < cardsDown.length; j++) {
      if (cardsDown[i][j] !== emojis[i][j]) {
        return false;
      }
    }
  }
  {
    return true;
  }
}

function screenController() {
  let html = "";
  for (let i = 0; i < emojis.length; i++) {
    for (let j = 0; j < emojis.length; j++) {
      html += `<div class='game' ><button data-row=${i} data-col=${j} class='card'>${
        cardsDown[i][j] === 0 ? " " : cardsDown[i][j]
      }</button></div></div>`;
    }
  }
  document.getElementById("gameboard").innerHTML = html;

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      let row = event.target.getAttribute("data-row");
      let col = event.target.getAttribute("data-col");
      game(row, col);
    });
  });
}

screenController();
