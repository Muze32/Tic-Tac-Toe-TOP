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
    const showBoard = () => console.log(board);
    const getCell = (row, column) => board[row][column];
    const isCellFull  = (row, column) => getCell(row, column) !== " " ;
    const isFull = () => {
        for(let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (!isCellFull(i,j)) return false;
            }
        }
        return true;
    }
    return {getCell, showBoard, isFull, getBoard, isCellFull}
})();


const game = (function () {
    const players = [
        {name: "Player One", token: "X"},
        {name: "Player Two", token: "O"}
    ]
    let currentPlayer = players[0];

    const getCurrentPlayer = () => currentPlayer;
    const switchTurn = () => currentPlayer = currentPlayer === players [0] ? players[1] : players[0];
    const printNewRound = () => {
        console.log(`${getCurrentPlayer().name} turn. [${getCurrentPlayer().token}]`);
        Board.showBoard();
    }
    const inputValue = (token, row, column) => {
        if (Board.isCellFull(row,column)) {
            console.log("Please enter your token in a empty cell.");
            return false;
        }
        Board.getBoard()[row][column] = `${token}`;
        return true;
    }

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (Board.isCellFull(i,0) && Board.getCell(i,0) === Board.getCell(i,1) && Board.getCell(i,1) === Board.getCell(i,2)) {
                return true;
            }
            else if (Board.isCellFull(0,i) && Board.getCell(0,i) === Board.getCell(1,i) === Board.getCell(2,i)) {
                return true;
            }
        }

        if (Board.isCellFull(1,1)) {
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
        if(!inputValue(getCurrentPlayer().token, row, column)) return;
    
        if (checkWinner()) {
            console.log(`${getCurrentPlayer().name} won. Want to play again?`);
            Board.showBoard();
            return;
        }
        else if (Board.isFull()) {
            console.log("Nobody won. Do you want to play again?");
            Board.showBoard();
            return;
        }
        switchTurn();
        printNewRound();
    }
    printNewRound();

    return {playRound}
})();