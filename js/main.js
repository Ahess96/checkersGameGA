  /*----- constants -----*/
const colors = {
    '0': 'white',
    '1': 'green',
    '-1': 'red',
    '2' : 'yellow'
}

  /*----- state variables -----*/
let board; // Array of 8 column arrays with 8 indexes
let turn; // 1 or -1
let isPieceActive;
let winner = null; // null = no winner; 1/-1 = winner
let king; // new rules for pieces that have become kings

  /*----- cached elements  -----*/
const msgEl = document.querySelector('h1');
const btn = document.querySelector('button');
let boardDivs = document.querySelectorAll('#board > div');
let gameBoard = document.getElementById('board')

  /*----- event listeners -----*/
// gameBoard.addEventListener('click', movePiece);
btn.addEventListener('click', init);

  /*----- functions -----*/
// initialize state of the board then evoke render ()
init (); 

function init () {
    // numbers at array indexes represent no player present or player present
    board = [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
    ];
    boardDivs.forEach(div => {
        div.classList.remove('active', 'just-moved');
    })
    turn = -1;
    winner = null;
    isPieceActive = false;
    render();
}

boardDivs.forEach(div => {
    div.addEventListener('click', function (event) {
        if(isPieceActive === false) {
            if(div.style.backgroundColor === 'green' && turn === 1 && winner === null) {
                isPieceActive = true
                div.setAttribute('class', 'active')
                selectGreen(event);

            } else if(div.style.backgroundColor === 'red' && turn === -1 && winner === null) {
                isPieceActive = true
                div.setAttribute('class', 'active')
                selectRed(event);
            }
        } else if(isPieceActive === true) {
            if (div.style.backgroundColor === 'red' || div.style.backgroundColor === 'green') {
                let activeDiv = document.querySelector('.active');
                activeDiv.classList.remove('active');
                isPieceActive = false;
                renderBoard();
                return;
            } 
            move(event);
        }
    })
})


// When a user clicks, update the board with available move options, then listen for a click on an empty div and update the state then call render;
function selectGreen (event) {
    const greenPiece = event.target;
    const id = greenPiece.id;
    const row = Number(id.charAt(1));
    const col = Number(id.charAt(3));
    let moveLeftRow = row + 1;
    let moveLeftCol = col - 1;
    let moveRightRow = row + 1;
    let moveRightCol = col + 1;
    if (moveRightRow < 8 && board[moveRightRow][moveRightCol] === -1) {
        moveRightRow += 1;
        moveRightCol += 1;
    }
    if (moveRightRow < 8 && board[moveRightRow][moveRightCol] === 0) {
        board[moveRightRow][moveRightCol] = 2;
    }
    if (moveLeftRow < 8 && board[moveLeftRow][moveLeftCol] === -1) {
        moveLeftRow += 1;
        moveLeftCol -= 1;
    }
    if (moveLeftRow < 8 && board[moveLeftRow][moveLeftCol] === 0) {
        board[moveLeftRow][moveLeftCol] = 2;
    }
    renderBoard();
}

function selectRed (event) {
    const redPiece = event.target;
    const id = redPiece.id;
    const row = Number(id.charAt(1));
    const col = Number(id.charAt(3));
    let moveLeftRow = row - 1;
    let moveLeftCol = col - 1;
    let moveRightRow = row - 1;
    let moveRightCol = col + 1;
    if (moveRightRow > -1 && board[moveRightRow][moveRightCol] === 1) {
        moveRightRow -= 1;
        moveRightCol += 1;
    }
    if (moveRightRow > -1 && board[moveRightRow][moveRightCol] === 0) {
        board[moveRightRow][moveRightCol] = 2;
    }
    if (moveLeftRow > -1 && board[moveLeftRow][moveLeftCol] === 1) {
        moveLeftRow -= 1;
        moveLeftCol -= 1;
    }
    if (moveLeftRow > -1 && board[moveLeftRow][moveLeftCol] === 0) {
        board[moveLeftRow][moveLeftCol] = 2;
    }
    renderBoard();
}

function move (event) {
    // select currently active piece
    const selectedPiece = event.target;
    const id = selectedPiece.id;
    const row = Number(id.charAt(1));
    const col = Number(id.charAt(3));
    if (board[row][col] === 2 && turn === -1) {
        board[row][col] = -1;
        const justMovedPiece = document.getElementById(`r${row}c${col}`);
        justMovedPiece.setAttribute('class', 'just-moved');
        captureGreenPiece();
        isPieceActive = false;
        turn *= -1;
        
    } else if (board[row][col] === 2 && turn === 1) {
        board[row][col] = 1;
        const justMovedPiece = document.getElementById(`r${row}c${col}`);
        justMovedPiece.setAttribute('class', 'just-moved');
        captureRedPiece();
        isPieceActive = false;
        turn *= -1;
    } else {
        return;
    }
    let activePieces = document.querySelector('.active');
    let activePiecesId = activePieces.id;
    const activePiecesRow = Number(activePiecesId.charAt(1));
    const activePiecesCol = Number(activePiecesId.charAt(3));
    board[activePiecesRow][activePiecesCol] = 0;
    activePieces.classList.remove('active');
    let movedPeice = document.querySelector('.just-moved');
    movedPeice.classList.remove('just-moved');
    render();
}

function captureRedPiece () {
    // case for red being captured
    let activePieces = document.querySelector('.active');
    let activePiecesId = activePieces.id;
    const row = Number(activePiecesId.charAt(1));
    const col = Number(activePiecesId.charAt(3));
    const moveLeftRowGreen = row + 1;
    const moveLeftColGreen = col - 1;
    const moveRightRowGreen = row + 1;
    const moveRightColGreen = col + 1;
    const rightOfGreen = board[moveRightRowGreen][moveRightColGreen];
    const leftOfGreen = board[moveLeftRowGreen][moveLeftColGreen];
    if (row < 6 && col < 6) {
        const greenCaptureRight = document.getElementById(`r${row + 2}c${col + 2}`);
        if(rightOfGreen === -1 && greenCaptureRight.classList.contains('just-moved')) {
            board[moveRightRowGreen][moveRightColGreen] = 0;
        }
    }
    if (row < 6 && col > 1) {
        const greenCaptureLeft = document.getElementById(`r${row + 2}c${col - 2}`);
        if(leftOfGreen === -1 && greenCaptureLeft.classList.contains('just-moved')) {
            board[moveLeftRowGreen][moveLeftColGreen] = 0;
        }
    } 
}

// case for green being captured  
function captureGreenPiece () {
    let activePieces = document.querySelector('.active');
    let activePiecesId = activePieces.id;
    const row = Number(activePiecesId.charAt(1));
    const col = Number(activePiecesId.charAt(3));
    const moveLeftRowRed = row - 1;
    const moveLeftColRed = col - 1;
    const moveRightRowRed = row - 1;
    const moveRightColRed = col + 1;
    const rightOfRed = board[moveRightRowRed][moveRightColRed];
    const leftOfRed = board[moveLeftRowRed][moveLeftColRed];
    if (row > 1 && col < 6) {
        const redCaptureRight = document.getElementById(`r${row - 2}c${col + 2}`);
        if(rightOfRed === 1 && redCaptureRight.classList.contains('just-moved')) {
            board[moveRightRowRed][moveRightColRed] = 0;
        }
    }
    if (row > 1 && col > 1) {
        const redCaptureLeft = document.getElementById(`r${row - 2}c${col - 2}`);
        if(leftOfRed === 1 && redCaptureLeft.classList.contains('just-moved')) {
            board[moveLeftRowRed][moveLeftColRed] = 0;
        }
    }
}


function render () {
    renderBoard();
    isWinner();
    renderMessage();
}

// The following function was influenced by GA's code along for Connect Four **
function renderBoard () {
    // render the board such that the values held in the board array are reflected by the color of the player's pieces
    // this iterates through each array in board
    board.forEach(function(rowArr, rowIdx) {
        // now iterate through each index within the nested arrays which represent row
        rowArr.forEach(function(cellVal, colIdx) {
            const cellId = `r${rowIdx}c${colIdx}`;
            const cellEl = document.getElementById(cellId);
            if(cellVal === 1 || cellVal === -1) {
                cellEl.style.borderRadius = '50%';
            }
            if(cellVal === 2 && isPieceActive === false) {
                board[rowIdx][colIdx] = 0;
            }
            if (board[rowIdx][colIdx] === 0) {
                cellEl.style.borderRadius = 'unset';
            }
            cellEl.style.backgroundColor = colors[board[rowIdx][colIdx]];
        });
    });
}

function isWinner() {
    let greenPresent = false;
    let redPresent = false;
    board.forEach(rowArr => {
        rowArr.forEach(cellVal => {
            if(cellVal === -1) {
                redPresent = true;
            }
            if(cellVal === 1) {
                greenPresent = true;
            }
        })
    })
    if (!greenPresent) {
        winner = -1
    }
    if (!redPresent) {
        winner = 1
    }
}

function renderMessage () {
    if(winner) {
        msgEl.innerHTML = `<span style="color: ${colors[winner]}">${colors[winner].toUpperCase()} Won!</span>`;
    } else {
        msgEl.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}'s Turn...</span>`;
    }
}


