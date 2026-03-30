// Core Tic-Tac-Toe game logic
// Board state: 9 cells, null = empty, 'X' or 'O' = player marks
const board = Array(9).fill(null);
let currentPlayer = 'X';
const scores = { X: 0, O: 0 };

// DOM element references (will be set in initGame)
let cells; // NodeList of .cell elements
let scoreXEl;
let scoreOEl;
let resetBtn;

// Winning index combinations
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

function initGame() {
  // Grab DOM elements after the document is ready
  cells = document.querySelectorAll('.cell');
  scoreXEl = document.getElementById('score-x');
  scoreOEl = document.getElementById('score-o');
  resetBtn = document.getElementById('reset-button');

  // Reset UI and attach listeners
  resetBoard();
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  if (resetBtn) resetBtn.addEventListener('click', resetGame);
  updateScoreDisplay();
}

function handleCellClick(event) {
  const cell = event.target;
  const idx = Number(cell.dataset.index);
  if (board[idx] || checkWin()) return; // ignore if occupied or game over
  board[idx] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');
  if (checkWin()) {
    updateScore(currentPlayer);
    displayResult(`${currentPlayer} wins!`);
  } else if (checkDraw()) {
    displayResult('Draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function checkDraw() {
  return board.every(cell => cell !== null) && !checkWin();
}

function updateScore(winner) {
  if (winner && scores[winner] !== undefined) {
    scores[winner]++;
    updateScoreDisplay();
  }
}

function updateScoreDisplay() {
  if (scoreXEl) scoreXEl.textContent = scores.X;
  if (scoreOEl) scoreOEl.textContent = scores.O;
}

function displayResult(message) {
  // Simple overlay using alert; replace with custom UI if needed
  alert(message);
  // After showing result, reset board for next round
  resetBoard();
}

function resetBoard() {
  board.fill(null);
  if (cells) {
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('disabled');
    });
  }
  currentPlayer = 'X';
}

function resetGame() {
  resetBoard();
  scores.X = 0;
  scores.O = 0;
  updateScoreDisplay();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
