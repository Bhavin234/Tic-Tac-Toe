const board = document.getElementById("board");
const resetButton = document.getElementById("reset-button");
const modal = document.getElementById("myModal");
const resultMessage = document.getElementById("result-message");
const closeButton = document.getElementById("close-button");

let currentPlayer = "X";
let cells = new Array(9).fill(null);
let gameEnded = false;

function handleCellClick(cell, index) {
  if (gameEnded || cells[index]) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    gameEnded = true;
    showResultMessage(`Player ${currentPlayer} wins!`);
  } else if (checkDraw()) {
    gameEnded = true;
    showResultMessage("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winCombinations) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return cells.every(cell => cell !== null);
}

function showResultMessage(message) {
  resultMessage.textContent = message;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function resetGame() {
  cells = new Array(9).fill(null);
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('X', 'O'));
  currentPlayer = 'X';
  gameEnded = false;
  closeModal();
}

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.addEventListener("click", () => handleCellClick(cell, i));
  board.appendChild(cell);
}

resetButton.addEventListener("click", resetGame);
closeButton.addEventListener("click", closeModal);

function closeModal() {
    modal.style.display = "none";
    resetGame(); // Reset the game when the modal is closed
  }
  

  