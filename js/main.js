  /*----- constants -----*/
const icons = {
    '0': 'rgba(255, 235, 205, 0.6)',
    '1': 'url(./images/Yosemite.jpg)',
    '-1': 'url(./images/glacier.jpeg)',
    '2' : 'yellow'
}

const players = {
    '1': 'Yosemite',
    '-1': 'Glacier'
}

  /*----- state variables -----*/
let board; // Array of 8 column arrays with 8 indexes
let turn; // 1 or -1
let isPieceActive;
let winner = null; // null = no winner; 1/-1 = winner

  /*----- cached elements  -----*/
const msgEl = document.querySelector('h1');
const btn = document.querySelector('button');
let boardDivs = document.querySelectorAll('#board > div');

  /*----- Initialize -----*/
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

/*----- event listeners -----*/
btn.addEventListener('click', init);

// Set an event listener on each div in the board
boardDivs.forEach(div => {
    div.addEventListener('click', function (event) {
        // The game begins with isActivePiece = false, so the first click will only register at a dic that meets the conditions
        if(isPieceActive === false) {
            if(div.style.background === 'url("./images/Yosemite.jpg") 0% 0% / cover' && turn === 1 && winner === null) {
                isPieceActive = true
                div.setAttribute('class', 'active')
                selectYosemite(event);

            } else if(div.style.background === 'url("./images/glacier.jpeg") 0% 0% / cover' && turn === -1 && winner === null) {
                isPieceActive = true
                div.setAttribute('class', 'active')
                selectGlacier(event);
            }
         // If a piece is alreay selected, the next click will allow the player to unselect their piece and click on a new piece 
        } else if(isPieceActive === true) {
            if (div.style.background === 'url("./images/glacier.jpeg") 0% 0% / cover' || div.style.background === 'url("./images/Yosemite.jpg") 0% 0% / cover') {
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

/*----- Functions  -----*/

// When a user clicks, update the board with available move options then listen for a click on an empty div and update the state then call render
function selectYosemite (event) {
    const yosemitePiece = event.target;
    const id = yosemitePiece.id;
    const row = Number(id.charAt(1));
    const col = Number(id.charAt(3));
    // Since Yosemite moves down the board, their moves will always be at least one row greater than their current row
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

function selectGlacier (event) {
    const glacierPiece = event.target;
    const id = glacierPiece.id;
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
    // select currently active piece by accessing the event object 
    const selectedPiece = event.target;
    const id = selectedPiece.id;
    const row = Number(id.charAt(1));
    const col = Number(id.charAt(3));
    // Listen for a click at an allowable spot and change the value in the array, switch turns and assign a new class
    if (board[row][col] === 2 && turn === -1) {
        board[row][col] = -1;
        const justMovedPiece = document.getElementById(`r${row}c${col}`);
        justMovedPiece.setAttribute('class', 'just-moved');
        captureYosemitePiece();
        isPieceActive = false;
        turn *= -1;
        
    } else if (board[row][col] === 2 && turn === 1) {
        board[row][col] = 1;
        const justMovedPiece = document.getElementById(`r${row}c${col}`);
        justMovedPiece.setAttribute('class', 'just-moved');
        captureGlacierPiece();
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

function captureGlacierPiece () {
    // case for Glacier being captured
    let activePieces = document.querySelector('.active');
    let activePiecesId = activePieces.id;
    const row = Number(activePiecesId.charAt(1));
    const col = Number(activePiecesId.charAt(3));
    const moveLeftRowYosemite = row + 1;
    const moveLeftColYosemite = col - 1;
    const moveRightRowYosemite = row + 1;
    const moveRightColYosemite = col + 1;
    const rightOfYosemite = board[moveRightRowYosemite][moveRightColYosemite];
    const leftOfYosemite = board[moveLeftRowYosemite][moveLeftColYosemite];
    if (row < 6 && col < 6) {
        const yosemiteCaptureRight = document.getElementById(`r${row + 2}c${col + 2}`);
        if(rightOfYosemite === -1 && yosemiteCaptureRight.classList.contains('just-moved')) {
            board[moveRightRowYosemite][moveRightColYosemite] = 0;
        }
    }
    if (row < 6 && col > 1) {
        const yosemiteCaptureLeft = document.getElementById(`r${row + 2}c${col - 2}`);
        if(leftOfYosemite === -1 && yosemiteCaptureLeft.classList.contains('just-moved')) {
            board[moveLeftRowYosemite][moveLeftColYosemite] = 0;
        }
    } 
}

// case for Yosemite being captured  
function captureYosemitePiece () {
    let activePieces = document.querySelector('.active');
    let activePiecesId = activePieces.id;
    const row = Number(activePiecesId.charAt(1));
    const col = Number(activePiecesId.charAt(3));
    const moveLeftRowGlacier = row - 1;
    const moveLeftColGlacier = col - 1;
    const moveRightRowGlacier = row - 1;
    const moveRightColGlacier = col + 1;
    const rightOfGlacier = board[moveRightRowGlacier][moveRightColGlacier];
    const leftOfGlacier = board[moveLeftRowGlacier][moveLeftColGlacier];
    if (row > 1 && col < 6) {
        const glacierCaptureRight = document.getElementById(`r${row - 2}c${col + 2}`);
        if(rightOfGlacier === 1 && glacierCaptureRight.classList.contains('just-moved')) {
            board[moveRightRowGlacier][moveRightColGlacier] = 0;
        }
    }
    if (row > 1 && col > 1) {
        const glacierCaptureLeft = document.getElementById(`r${row - 2}c${col - 2}`);
        if(leftOfGlacier === 1 && glacierCaptureLeft.classList.contains('just-moved')) {
            board[moveLeftRowGlacier][moveLeftColGlacier] = 0;
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
            if(cellVal === 2 && isPieceActive === false) {
                board[rowIdx][colIdx] = 0;
            }
            cellEl.style.background = icons[board[rowIdx][colIdx]];
            cellEl.style.backgroundSize = 'cover';
        });
    });
}

function isWinner() {
    let isYosemitePresent = false;
    let isGlacierPresent = false;
    board.forEach(rowArr => {
        rowArr.forEach(cellVal => {
            if(cellVal === -1) {
                isGlacierPresent = true;
            }
            if(cellVal === 1) {
                isYosemitePresent = true;
            }
        })
    })
    if (!isYosemitePresent) {
        winner = -1
    }
    if (!isGlacierPresent) {
        winner = 1
    }
}

function renderMessage () {
    if(winner) {
        msgEl.innerHTML = `<span style="color: red">${players[winner].toUpperCase()} Won!</span>`;
    } else {
        msgEl.innerHTML = `<span style="color: green">${players[turn].toUpperCase()}'s Turn...</span>`;
    }
}


