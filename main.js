//----- Model -----//
/*----- constants -----*/

const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];

/*----- State Variables -----*/
// Player properties.
let turn = true;
let redScore = 12;
let blackScore = 12;
let playerChecker;

// Selected checker properties.
let selectedChecker = {
    checkerId: -1,
    indexOfBoardChecker: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
};

// Parses checker Id's and returns the index of that checker on the board
let findChecker = function (checkerId) {
  let parsed = parseInt(checkerId);
  return board.indexOf(parsed);
};

//----- View -----//
/*----- Cached Elements -----*/

// For the DOM
const cells = document.querySelectorAll("td");
let redChecker = document.querySelectorAll("p");
let blackChecker = document.querySelectorAll("span");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider");

//----- Controller-----//
/*---------- Event Listeners ----------*/
// Initialize event listeners on checkers.
function giveCheckerEventListeners() {
    if (turn) {
        for (let i = 0; i < redChecker.length; i++) {
            redChecker[i].addEventListener("click", getPlayerChecker);
        }
    } else {
        for (let i = 0; i < blackChecker.length; i++) {
            blackChecker[i].addEventListener("click", getPlayerChecker);
        }
    }
}

/*----- functions -----*/

// Sets the PlayerChecker to either red or black.
function getPlayerChecker() {
    if (turn) {
        playerChecker = redChecker;
    } else {
        playerChecker = blackChecker;
    }
    removeCellonclick();
    resetBorders();
}

// Removes potential moves associated with the previously chosen checker.
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// Resets borders.
function resetBorders() {
    for (let i = 0; i < playerChecker.length; i++) {
        playerChecker[i].style.border = "1px solid white";
    }
    resetSelectedCheckerProperties();
    getSelectedChecker();
}

// Resets selected checker properties to initial value.
function resetSelectedCheckerProperties() {
    selectedChecker.checkerId = -1;
    selectedChecker.indexOfBoardChecker = -1;
    selectedChecker.isKing = false;
    selectedChecker.seventhSpace = false;
    selectedChecker.ninthSpace = false;
    selectedChecker.fourteenthSpace = false;
    selectedChecker.eighteenthSpace = false;
    selectedChecker.minusSeventhSpace = false;
    selectedChecker.minusNinthSpace = false;
    selectedChecker.minusFourteenthSpace = false;
    selectedChecker.minusEighteenthSpace = false;
}

// Gets and sets ID and index of the cell on the board.
function getSelectedChecker() {
    selectedChecker.checkerId = parseInt(event.target.id);
    selectedChecker.indexOfBoardChecker = findChecker(selectedChecker.checkerId);
    isCheckerKing();
}

// Checks for a king.
function isCheckerKing() {
    if (document.getElementById(selectedChecker.checkerId).classList.contains("king")) {
        selectedChecker.isKing = true;
    } else {
        selectedChecker.isKing = false;
    }
    getAvailableSpaces();
}

// Gets the moves that the selected checker can make.
function getAvailableSpaces() {
    if (board[selectedChecker.indexOfBoardChecker + 7] === null && 
        cells[selectedChecker.indexOfBoardChecker + 7].classList.contains("noCheckerHere") !== true) {
        selectedChecker.seventhSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker + 9] === null && 
        cells[selectedChecker.indexOfBoardChecker + 9].classList.contains("noCheckerHere") !== true) {
        selectedChecker.ninthSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker - 7] === null && 
        cells[selectedChecker.indexOfBoardChecker - 7].classList.contains("noCheckerHere") !== true) {
        selectedChecker.minusSeventhSpace = true;
    }
    if (board[selectedChecker.indexOfBoardChecker - 9] === null && 
        cells[selectedChecker.indexOfBoardChecker - 9].classList.contains("noCheckerHere") !== true) {
        selectedChecker.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

// Gets the moves that the selected checker can jump.
function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedChecker.indexOfBoardChecker + 14] === null 
        && cells[selectedChecker.indexOfBoardChecker + 14].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker + 7] >= 12) {
            selectedChecker.fourteenthSpace = true;
        }
        if (board[selectedChecker.indexOfBoardChecker + 18] === null 
        && cells[selectedChecker.indexOfBoardChecker + 18].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker + 9] >= 12) {
            selectedChecker.eighteenthSpace = true;
        }
        if (board[selectedChecker.indexOfBoardChecker - 14] === null 
        && cells[selectedChecker.indexOfBoardChecker - 14].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker - 7] >= 12) {
            selectedChecker.minusFourteenthSpace = true;
        }
        if (board[selectedChecker.indexOfBoardChecker - 18] === null 
        && cells[selectedChecker.indexOfBoardChecker - 18].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker - 9] >= 12) {
            selectedChecker.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedChecker.indexOfBoardChecker + 14] === null 
        && cells[selectedChecker.indexOfBoardChecker + 14].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker + 7] < 12 && board[selectedChecker.indexOfBoardChecker + 7] !== null) {
            selectedChecker.fourteenthSpace = true;
        }
        if (board[selectedChecker.indexOfBoardChecker + 18] === null 
        && cells[selectedChecker.indexOfBoardChecker + 18].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker + 9] < 12 && board[selectedChecker.indexOfBoardChecker + 9] !== null) {
            selectedChecker.eighteenthSpace = true;
        }
        if (board[selectedChecker.indexOfBoardChecker - 14] === null && cells[selectedChecker.indexOfBoardChecker - 14].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker - 7] < 12 
        && board[selectedChecker.indexOfBoardChecker - 7] !== null) {
            selectedChecker.minusFourteenthSpace = true;
        }
        if (board[selectedChecker.indexOfBoardChecker - 18] === null && cells[selectedChecker.indexOfBoardChecker - 18].classList.contains("noCheckerHere") !== true
        && board[selectedChecker.indexOfBoardChecker - 9] < 12
        && board[selectedChecker.indexOfBoardChecker - 9] !== null) {
            selectedChecker.minusEighteenthSpace = true;
        }
    }
    checkCheckerConditions();
}

// Restricts movement if the piece is a king
function checkCheckerConditions() {
    if (selectedChecker.isKing) {
        giveCheckerBorder();
    } else {
        if (turn) {
            selectedChecker.minusSeventhSpace = false;
            selectedChecker.minusNinthSpace = false;
            selectedChecker.minusFourteenthSpace = false;
            selectedChecker.minusEighteenthSpace = false;
        } else {
            selectedChecker.seventhSpace = false;
            selectedChecker.ninthSpace = false;
            selectedChecker.fourteenthSpace = false;
            selectedChecker.eighteenthSpace = false;
        }
        giveCheckerBorder();
    }
}

// Gives checker a blue highlight.
function giveCheckerBorder() {
    if (selectedChecker.seventhSpace || selectedChecker.ninthSpace || selectedChecker.fourteenthSpace || selectedChecker.eighteenthSpace
    || selectedChecker.minusSeventhSpace || selectedChecker.minusNinthSpace || selectedChecker.minusFourteenthSpace || selectedChecker.minusEighteenthSpace) {
        document.getElementById(selectedChecker.checkerId).style.border = "3px solid blue";
        giveCellsClick();
    } else {
        return;
    }
}

// Gives the cells on the board a 'click' baseed on possible moves.
function giveCellsClick() {
    if (selectedChecker.seventhSpace) {
        cells[selectedChecker.indexOfBoardChecker + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedChecker.ninthSpace) {
        cells[selectedChecker.indexOfBoardChecker + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedChecker.fourteenthSpace) {
        cells[selectedChecker.indexOfBoardChecker + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedChecker.eighteenthSpace) {
        cells[selectedChecker.indexOfBoardChecker + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedChecker.minusSeventhSpace) {
        cells[selectedChecker.indexOfBoardChecker - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedChecker.minusNinthSpace) {
        cells[selectedChecker.indexOfBoardChecker - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedChecker.minusFourteenthSpace) {
        cells[selectedChecker.indexOfBoardChecker - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedChecker.minusEighteenthSpace) {
        cells[selectedChecker.indexOfBoardChecker - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

// Makes the move that was clicked.
function makeMove(number) {
    document.getElementById(selectedChecker.checkerId).remove();
    cells[selectedChecker.indexOfBoardChecker].innerHTML = "";
    if (turn) {
        if (selectedChecker.isKing) {
            cells[selectedChecker.indexOfBoardChecker + number].innerHTML = `<p class="red-checker king" id="${selectedChecker.checkerId}"></p>`;
            redChecker = document.querySelectorAll("p");
        } else {
            cells[selectedChecker.indexOfBoardChecker + number].innerHTML = `<p class="red-checker" id="${selectedChecker.checkerId}"></p>`;
            redChecker = document.querySelectorAll("p");
        }
    } else {
        if (selectedChecker.isKing) {
            cells[selectedChecker.indexOfBoardChecker + number].innerHTML = `<span class="black-checker king" id="${selectedChecker.checkerId}"></span>`;
            blackChecker = document.querySelectorAll("span");
        } else {
            cells[selectedChecker.indexOfBoardChecker + number].innerHTML = `<span class="black-checker" id="${selectedChecker.checkerId}"></span>`;
            blackChecker = document.querySelectorAll("span");
        }
    }

    let indexOfChecker = selectedChecker.indexOfBoardChecker
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfChecker, indexOfChecker + number, indexOfChecker + number / 2);
    } else {
        changeData(indexOfChecker, indexOfChecker + number);
    }
  render();
}

// Changes the board states data. 
function changeData(indexOfBoardChecker, modifiedIndex, removeChecker) {
    board[indexOfBoardChecker] = null;
    board[modifiedIndex] = parseInt(selectedChecker.checkerId);
    if (turn && selectedChecker.checkerId <12 && modifiedIndex >= 57) {
        document.getElementById(selectedChecker.checkerId).classList.add("king")
    }
    if (turn === false && selectedChecker.checkerId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedChecker.checkerId).classList.add("king");
    }
    if (removeChecker) {
        board[removeChecker] = null;
        if (turn && selectedChecker.checkerId < 12) {
            cells[removeChecker].innerHTML = "";
            blackScore--
        }
        if (turn === false && selectedChecker.checkerId >= 12) {
            cells[removeChecker].innerHTML = "";
            redScore--
        }
    }
    resetSelectedCheckerProperties();
    removeCellonclick();
    removeEventListeners();
}

// Removes the 'onClick' event listeners.
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redChecker.length; i++) {
            redChecker[i].removeEventListener("click", getPlayerChecker);
        }
    } else {
        for (let i = 0; i < blackChecker.length; i++) {
            blackChecker[i].removeEventListener("click", getPlayerChecker);
        }
    }
    checkForWin();
    giveCheckerEventListeners();
}

// Checks for a win.
function checkForWin() {
    if (blackScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurnText[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (redScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < blackTurnText.length; i++) {            
            blackTurnText[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurnText[i].textContent = "BLACK WINS!";
        }
    }
    changePlayer();
}

// Switches players turn.
function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "lightGrey";
            blackTurnText[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = "lightGrey";
            redTurnText[i].style.color = "black";
        }
    }
    giveCheckerEventListeners();
  render();
}

giveCheckerEventListeners();

//----- Additional Functions -----//
function initGame() {
    giveCheckerEventListeners();
}

initGame();
