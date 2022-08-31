const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("player-turns");
const winnerText = document.getElementById("win-title");
const WINNING_LOGIC = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn = true;

cells.forEach((cell) => {
  cell.addEventListener("click", playGame, { once: true });
});

const playGame = (e) => {
  const cell = e.target;
  const currentTurn = turn ? "X" : "O";
  cell.classList.add(currentTurn);
  placeMarker(cell, currentTurn);
  changeTurn();
  changeTurnText();
  if (checkWin(currentTurn)) {
    console.log(`${currentTurn} wins`);
    changeWinnerText(currentTurn);
    endGame();
  } else if (checkDraw()) {
    console.log("Draw");
    changeWinnerText("Draw");
    endGame();
  }
}

const placeMarker = (cell, currentTurn) => {
  turn ? (cell.innerText = "x") : (cell.innerText = "o");
}

const changeTurn = () =>  {
  turn = !turn;
}

const changeTurnText = () => {
  if (turn) {
    turnText.innerText = "It's player 1 turn";
  } else {
    turnText.innerText = "It's player 2 turn";
  }
}

const changeWinnerText = (currentTurn) => {
  console.log(currentTurn);
  if (currentTurn == "X") {
    winnerText.innerText = `Player 1 wins!`;
    turnText.innerText = "";
  } else if (currentTurn == "O") {
    winnerText.innerText = "Player 2 wins!";
    turnText.innerText = "";
  } else {
    winnerText.innerText = "Draw!";
    turnText.innerText = "";
  }
}

const showRestartButton = () => {
  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart Game";
  restartButton.classList.add("restart-button");
  restartButton.addEventListener("click", restartGame);
  grid.appendChild(restartButton);
}

const checkWin = (currentTurn) => {
  return WINNING_LOGIC.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentTurn);
    });
  });
}

const checkDraw = () => {
  return [...cells].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

const endGame = () => {
  cells.forEach((cell) => {
    cell.removeEventListener("click", playGame);
  });
  showRestartButton();
}

const restartGame = (e) => {
  const restartButton = document.querySelector(".restart-button");
  grid.removeChild(restartButton);
  cells.forEach((cell) => {
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.innerText = "";
    cell.addEventListener("click", playGame, { once: true });
  });
  turn = true;
  changeTurnText();
  winnerText.innerText = "";
}
