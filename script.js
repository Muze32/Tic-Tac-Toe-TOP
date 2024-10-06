const Board = (function() {
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
    const getCell = (row, column) => getBoard()[row][column];
    return {getCell, inputValue, showBoard}
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
        console.log(`${getCurrentPlayer().name} turn. [${getCurrentPlayer().token}]`);
        Board.showBoard();
    }
    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (Board.getCell(i,0) !== " " && Board.getCell(i,0) === Board.getCell(i,1) && Board.getCell(i,1) === Board.getCell(i,2)) {
                return true;
            }
            else if (Board.getCell(0,i) !== " " && Board.getCell(0,i) === Board.getCell(1,i) === Board.getCell(2,i)) {
                return true;
            }
        }

        if (Board.getCell(1,1) !== " ") {
            if (Board.getCell(0,0) === Board.getCell(1,1) && Board.getCell(1,1) === Board.getCell(2,2)) {
                return true;
            }
            else if (Board.getCell(2,0) === Board.getCell(1,1) && Board.getCell(1,1) === Board.getCell(0,2)) {
                return true;
            }
        }
        return false;   
    }
    const playRound = (row, column) => {
        Board.inputValue(getCurrentPlayer().token, row, column);
        switchTurn();
        if(checkWinner()) {
            console.log("Someone won");
        }
        printNewRound();
    }
    printNewRound();

    return {playRound, getCurrentPlayer}
})();