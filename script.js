const gameBoard = (function() {
    const board = [];
    const rows = 3, columns = 3;

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(" ");
        }
    }

    const getBoard = () => board;
    const showBoard = () => console.log(getBoard());
    const inputValue = (token) => {
        let row = prompt("Select a row for the input: ");
        let column = prompt("Select a column for the input: ");
        board[row][column] = `${token}`;
    }
    return {getBoard, inputValue, showBoard}
})();


const gameController = (function () {
    const players = [
        {name: "Player One", token: "X"},
        {name: "Player Two", token: "O"}
    ]
    let currentPlayer = players[0];

    const getCurrentPlayer = () => currentPlayer;
    const switchTurn = () => {
        currentPlayer = currentPlayer === players [0] ? players[1] : players[0];
    };
    const printNewRound = () => {
        console.log(`${getCurrentPlayer().name} turn.`);
        gameBoard.showBoard();
    }
    const playRound = () => {
        printNewRound();
        gameBoard.inputValue(getCurrentPlayer().token);
        switchTurn();
    }

    return {playRound, getCurrentPlayer}
})();