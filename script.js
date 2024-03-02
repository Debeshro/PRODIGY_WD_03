const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}


function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            resultDisplay.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (boardState.every(cell => cell !== '')) {
            resultDisplay.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => boardState[index] === currentPlayer)
    );
}
