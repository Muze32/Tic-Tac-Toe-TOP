const gameBoard = (function() {
    const board = [];
    const rows = 3, columns = 3;

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(" ");
        }
    }
    console.log(board);

    const getBoard = () => board;
    const showBoard = () => console.log(getBoard());
    return {getBoard, showBoard}
})();
