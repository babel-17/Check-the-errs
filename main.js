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
      ]
      
          /*----- state variables -----*/
      const cells = document.querySelectorAll("td");
      let redPieces = document.querySelectorAll("p");
      let blackPieces = document.querySelectorAll("span");
      const redTurn = document.querySelectorAll(".red-turn");
      const blackTurn = document.querySelectorAll(".black-turn");
      const divider = document.querySelector("#divider");
      
      let turn = true;
      let redScore = 12;
      let blackScore = 12; 
      let playerPieces;
      
      let selectedPiece = {
        pieceId: -1, 
        indexOfBoardPiece: -1,
        isKing: false,
        seventhSpace: false,
        ninthSpace: false, 
        fourteenthSpace: false,
        minusSeventhSpace: false,
        minusNinthSpace: false, 
        minusFourteenthSpace: false, 
        minusEighteenthSpace: false
      }
      
          /*----- cached elements  -----*/
      let findPiece = function (pieceId) {
          let parsed = parseInt(pieceId);
          return board.indexOf(parsed);
      };
      
          /*----- event listeners -----*/
      // startBtn.addEventListener('click', startFunction)
      function givePiecesEventListeners() {
        if (turn) {
          for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener("click", getPlayerPieces);
          }
        } else {
          for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPlayerPieces);
          } 
        }
      }
      
          /*----- functions -----*/
      function getPlayerPieces () {
        if (turn) {
          playerPieces = redPieces;
        } else {
          playerPieces = blackPieces;
        }
        removeCellonclick();
        resetBorders();
      }
      
      function removeCellonclick() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("onclick");
        }
      }
      
      function resetBorders() {
        for (let i = 0; i < playerPieces.length; i++) {
            playerPieces[i].style.border = "1px solid white";
        }
        resetSelectedPieceProperties();
        getSelectedPiece();
      }
      
      function resetSelectedPieceProperties() {
        selectedPiece.pieceId = -1;
        selectedPiece.isKing = false;
        selectedPiece.seventhSpace = false;
        selectedPiece.ninthSpace = false;
        selectedPiece.fourteenthSpace = false;
        selectedPiece.eighteenthSpace = false;
        selectedPiece.minusSeventhSpace = false;
        selectedPiece.minusNinthSpace = false;
        selectedPiece.minusFourteenthSpace = false;
        selectedPiece.minusEighteenthSpace = false;  
      } 
      
      function getSelectedPiece() {
        selectedPiece.pieceId = parseInt(event.target.id);
        selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
        isPieceKing();
      }
      
      function isPieceKing() {
        if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
          selectedPiece.isKing = true;
        } else {
          selectedPiece.isKing = false;
        }
        getAvailableSpaces();
      }
      
      function getAvailableSpaces() {
        if (board[selectedPiece.indexOfBoardPiece + 7] === null &&
            cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
            selectedPiece.seventhSpace = true;
          }
        if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
            cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
            selectedPiece.ninthSpace = true;
          }
        if (board[selectedPiece.indexOfBoardPiece - 7] === null &&
            cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
            selectedPiece.minusSeventhSpace = true;
          }
        if (board[selectedPiece.indexOfBoardPiece - 9] === null &&
            cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
            selectedPiece.minusNinthSpace = true;
          }
          checkAvailableJumpSpaces();
      }
      
      function checkAvailableJumpSpaces() {
        if (turn) {
          if (board[selectedPiece.indexOfBoardPiece + 14] === null 
            && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
          }
        }
      }
      