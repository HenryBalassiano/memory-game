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
    pairs.push({
      emoji: emojis[selectedCol][selectedRow],
      coordinates: [selectedCol, selectedRow],
    });
    cardsDown[selectedCol][selectedRow] = emojis[selectedCol][selectedRow];
    screenController();
  }
  if (pairs.length > 2) {
    const [first, second] = pairs;
    if (first.emoji !== second.emoji) {
      flipCard(first.coordinates, second.coordinates);
    }
    pairs.splice(0, 2);
  }

  if (pairs.length === 2) {
    const isPairs = pairs[0].emoji === pairs[1].emoji;
    console.log(pairs);
    if (isPairs) {
      clearPairs();
      if (checkWin()) {
        resetGame();
      }
      return cardsDown;
    } else {
      flipCard(pairs[0].coordinates, pairs[1].coordinates);
      clearPairs();
    }
  }
  return cardsDown;
}

function flipCard(coord1, coord2) {
  const [row1, col1] = coord1;
  const [row2, col2] = coord2;

  cardsDown[row1][col1] = 0;
  cardsDown[row2][col2] = 0;

  setTimeout(() => {
    screenController();
  }, 1000);
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
