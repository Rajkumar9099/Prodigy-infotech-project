// script.js
const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let board = Array(9).fill(null);

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWin = (player) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => cells[index].classList.contains(player));
    });
};

const checkDraw = () => {
    return board.every(cell => cell !== null);
};

const handleClick = (e) => {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (cell.classList.contains('x') || cell.classList.contains('o')) {
        return;
    }

    const player = isXTurn ? 'x' : 'o';
    cell.classList.add(player);
    board[index] = player;

    if (checkWin(player)) {
        messageElement.textContent = `${player.toUpperCase()} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (checkDraw()) {
        messageElement.textContent = `It's a draw!`;
    } else {
        isXTurn = !isXTurn;
        messageElement.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    }
};

const restartGame = () => {
    board.fill(null);
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick);
    });
    isXTurn = true;
    messageElement.textContent = `Player X's turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

restartGame(); // Initialize the game
