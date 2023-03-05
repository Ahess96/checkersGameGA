  /*----- constants -----*/
const colors = {
    '0': 'white',
    '1': 'green',
    '-1': 'red'
}

  /*----- state variables -----*/
let board; // Array of 8 column arrays with 8 indexes
let turn; // 1 or -1
let winner; // null = no winner; 1/-1 = winner
let king; // new rules for pieces that have become kings

  /*----- cached elements  -----*/
const msgEl = document.querySelector('h1');
const btn = document.querySelector('button');
const boardDivs = document.querySelectorAll('#board > div');

  /*----- event listeners -----*/
// document.getElementById('board').addEventListener('click', movePiece);

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
    turn = 1;
    winner = null;
    render();
}

// When a user clicks, update the board with available move options, then listen for a click on an empty div and update the state then call render;
function movePiece (evt) {

}

function render () {
    renderBoard();
    renderMessage();
    renderControls();
}

// The following function was influenced by GA's code along for Connect Four **
function renderBoard () {
    // render the board such that the values held in the board array are reflected by the color of the player's pieces
    // this iterates through each array in board
    board.forEach(function(colArr, colIdx) {
        // now iterate through each index within the nested arrays which represent columns
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = colors[cellVal];
            if(cellVal === 1 || cellVal === -1)
                cellEl.style.borderRadius = '50%';
        });
    });
}

function renderMessage () {

}

function renderControls () {

}

// This needs to be at the bottom so the color assignment to each div is handled first
boardDivs.forEach(div => {
    if (div.style.backgroundColor === 'green') {
        div.addEventListener('click', function () {
            console.log('green')
        });
    } else if (div.style.backgroundColor === 'red') {
        div.addEventListener('click', function () {
            console.log('red')
        }); 
    }
})
