# checkersGameGA
PROPOSAL

The goal for Project 1 is to create a player v player checkers game that allows two players to play one another on the same computer. Each player will only be allowed to move a piece if it is their turn.

Players will be able to capture and remove their opponent's piece and the board will be automatically updated with the piece missing once that happens.

There is no plans to have pieces be able to become a king piece. 




click act like aswitch
    first click = true, 2nd false
then build control flow
when 1st click is something, grab it
2nd click move it



function activePiece () {
    boardDivs.forEach(div => {
        div.addEventListener('click', function () {
            if(div.style.backgroundColor === 'green' && turn === 1 && winner === null) {
                console.log('green');
                // need to update this so that only one div can be active at a time
                div.setAttribute('class', 'active')
                div.style.boxShadow = '1vmin 1vmin 1vmin rgba(0, 0, 0, 0.4)'
                movePiece();
            } else if(div.style.backgroundColor === 'red' && turn === -1 && winner === null) {
                console.log('red');
                div.setAttribute('class', 'active')
                div.style.boxShadow = '1vmin 1vmin 1vmin rgba(0, 0, 0, 0.4)'
                movePiece();
            }
        })
    })
}


// When a user clicks, update the board with available move options, then listen for a click on an empty div and update the state then call render;
function movePiece (event) {
    // select currently active piece
    
    console.log(event);
    turn *= -1;
    render();
}





















