const Board = (function() {
    const board = [];
    const rows = 3, cols = 3;

    for(let i = 0; i < rows; i++) { //Creates board
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(" ");
        }
    }
    const getBoard = () => board;
    const clearBoard = () => {
        for(let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                setCell(i, j, " ");
            }
        }
    }
    const showBoard = () => console.table(board);
    const setCell = (row, col, value) => board[row][col] = value; 
    const getCell = (row, col) => board[row][col];
    const isCellFull  = (row, col) => getCell(row, col) !== " " ;
    const isFull = () => {
        for(let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!isCellFull(i,j)) return false;
            }
        }
        return true;
    }
    return {getBoard, getCell, setCell, showBoard, isFull, isCellFull, clearBoard}
})();


const game = (function () {
    const players = [
        {name: "Player One", token: "X"},
        {name: "Player Two", token: "O"}
    ]
    let currentPlayer = players[0];
    let winMessage = "";

    const getWinMessage = () => winMessage;
    const getCurrentPlayer = () => currentPlayer;
    const switchTurn = () => currentPlayer = currentPlayer === players [0] ? players[1] : players[0];
    const printNewRound = () => {
        console.log(`${getCurrentPlayer().name} turn. [${getCurrentPlayer().token}]`);
        Board.showBoard();
    }
    const inputValue = (token, row, col) => {
        if (Board.isCellFull(row,col)) {
            console.log("Please enter your token in a empty cell.");
            return false;
        }
        Board.setCell(row, col, token);
        return true;
    }

    const handleEndGame = () => {
        if (checkWinner()) {
            winMessage = `${getCurrentPlayer().name} won.`
        }
        else if (Board.isFull()) {
            winMessage = "Nobody won."
        }
        console.log(winMessage);
        Board.showBoard();

        let choice = prompt("Do you want to play again? Yes[Y] No[N]").toLowerCase();
        switch (choice) {
            case "y":
                Board.clearBoard();
                switchTurn();
                winMessage = "";
                printNewRound();
                break;
            case "n":
                alert("Thank you for playing.");
                break;
            default: 
                console.log("Invalid option");
                break;
        }
    }
    
    const checkWinner = () => {
        for (let i = 0; i < 3; i++) { //Check rows and cols
            if (Board.isCellFull(i,0) && Board.getCell(i,0) === Board.getCell(i,1) && Board.getCell(i,1) === Board.getCell(i,2)) return true;
            else if (Board.isCellFull(0,i) && Board.getCell(0,i) === Board.getCell(1,i) && Board.getCell(1,i) === Board.getCell(2,i)) return true;
        }
        if (Board.isCellFull(1,1)) { //Check diagonals
            if (Board.getCell(0,0) === Board.getCell(1,1) && Board.getCell(1,1) === Board.getCell(2,2)) return true;
            else if (Board.getCell(2,0) === Board.getCell(1,1) && Board.getCell(1,1) === Board.getCell(0,2)) return true;
        }
        return false;   
    }

    const playRound = (row, col) => { //Main function

        //If the user tries to input a value in a empty cell thros a error message
        if(!inputValue(getCurrentPlayer().token, row, col)) return; 

        if(checkWinner() || Board.isFull()) { 
            handleEndGame();
            return;
        }
        switchTurn();
        printNewRound();
    }
    printNewRound();
    return {playRound, getCurrentPlayer, getWinMessage}
})();

const screenController = (function () {
    const divTurn = document.querySelector(".turn");
    const divBoard = document.querySelector("#board");
    const winDiv = document.querySelector(".win");

    const clickHandlerBoard = (e) => {
        let row = e.target.getAttribute("row");
        let col = e.target.getAttribute("col");
        game.playRound(row, col);
        updateScreen();
    }

    const updateDivBoard = () => {
        let board = Board.getBoard();
        board.forEach((row, r) => {
            const divRow = document.createElement("div");
            divRow.classList.add("row"); 
            row.forEach((col, c) => {      
                const divCol = document.createElement("button");
                //Add atribbutes to button for styling and targetting purposes
                divCol.setAttribute("row", r);
                divCol.setAttribute("col", c);
                divCol.classList.add("cell");
                divCol.textContent = Board.getCell(r, c);
                divCol.addEventListener("click", (e) => clickHandlerBoard(e));
                divRow.appendChild(divCol);
            });
            divBoard.appendChild(divRow);
        }); 
    }

    const updateScreen = () => {
        divBoard.textContent = "";
        let currentPlayer = game.getCurrentPlayer().name;
        divTurn.textContent = `${currentPlayer} turn.`;
        updateDivBoard();
        winDiv.textContent = game.getWinMessage();
    }
    updateScreen();
})();