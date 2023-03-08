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
let winner; // null = no winner; 1/-1 = winner
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
        div.classList.remove('active');
    })
    turn = -1;
    winner = null;
    isPieceActive = false;
    render();
}

// function selectActivePiece () {
    boardDivs.forEach(div => {
        div.addEventListener('click', function (event) {
            if(isPieceActive === false) {
                if(div.style.backgroundColor === 'green' && turn === 1 && winner === null) {
                    isPieceActive = true
                    // need to update this so that only one div can be active at a time
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
// }


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
    // const leftTileValue = board[moveLeftRow][moveLeftCol];
    // const rightTileValue = board[moveRightRow][moveRightCol];
    if (board[moveRightRow][moveRightCol] === -1) {
        moveRightRow += 1;
        moveRightCol += 1;
    }
    if (board[moveRightRow][moveRightCol] === 0) {
        board[moveRightRow][moveRightCol] = 2;
    }
    if (board[moveLeftRow][moveLeftCol] === -1) {
        moveLeftRow += 1;
        moveLeftCol -= 1;
    }
    if (board[moveLeftRow][moveLeftCol] === 0) {
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
    // const leftTileValue = board[moveLeftRow][moveLeftCol];
    // const rightTileValue = board[moveRightRow][moveRightCol];
    if (board[moveRightRow][moveRightCol] === 1) {
        moveRightRow -= 1;
        moveRightCol += 1;
    }
    if (board[moveRightRow][moveRightCol] === 0) {
        board[moveRightRow][moveRightCol] = 2;
    }
    if (board[moveLeftRow][moveLeftCol] === 1) {
        moveLeftRow -= 1;
        moveLeftCol -= 1;
    }
    if (board[moveLeftRow][moveLeftCol] === 0) {
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
        isPieceActive = false;
        turn *= -1;
        
    } else if (board[row][col] === 2 && turn === 1) {
        board[row][col] = 1;
        isPieceActive = false;
        turn *= -1;
    } else {
        return;
    }
    console.log(event.target);
    let activePieces = document.querySelector('.active');
    let activePiecesId = activePieces.id;
    const activePiecesRow = Number(activePiecesId.charAt(1));
    const activePiecesCol = Number(activePiecesId.charAt(3));
    board[activePiecesRow][activePiecesCol] = 0;
    activePieces.classList.remove('active');
    render();
}


function render () {
    renderBoard();
    renderMessage();
    // renderControls();
    // selectActivePiece();
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

function renderMessage () {
    if(winner) {
        msgEl.innerHTML = `<span style="color: ${colors[winner]}">${colors[winner].toUpperCase()} Won!</span>`;
    } else {
        msgEl.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}'s Turn...</span>`;
    }
}

// function renderControls () {

// }

