const grid = document.querySelector('.grid');

const gameBoard = (() => {
    const board = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];
    const renderBoard = () => {
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = board[i];
            grid.appendChild(cell);
        }   
    } 
    return {
        board,
        renderBoard
    };
}) ();

gameBoard.renderBoard()
