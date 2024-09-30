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
    const inputValue = (token, row, column) => board[row][column] = `${token}`;
    return {getBoard, inputValue, showBoard}
})();


const game = (function () {
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
    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (gameBoard.getBoard()[0][0] == gameBoard.getBoard()[i][1] == gameBoard.getBoard()[i][2]) {
                return true;
            }
            else if (gameBoard.getBoard()[0][i] == gameBoard.getBoard()[1][i] == gameBoard.getBoard()[2][i]) {
                return true;
            }
        }

        if (gameBoard.getBoard()[0][0] == gameBoard.getBoard()[1][1] == gameBoard.getBoard()[2][2]) {
            return true;
        }
        else if (gameBoard.getBoard()[2][0] == gameBoard.getBoard()[1][1] == gameBoard.getBoard()[0][2]) {
            return true;
        }
        else return false;

    }
    const playRound = (row, column) => {
        gameBoard.inputValue(getCurrentPlayer().token, row, column);
        console.log(checkWinner());
        switchTurn();
        printNewRound();
    }
    printNewRound();

    return {playRound, getCurrentPlayer}
})();