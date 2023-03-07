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






how to tell if we're at click one or two

first click is grabbing el, so var off
click pie

use activePiece to toggle


boardDivs.forEach(div => {
    div.addEventListener('click', function (event) {
        if (activePiece === false) {
            const newLocation = (event.target);
            renderBoard(newLocation)
        }
    }
} 

let boardDivs = [...document.querySelectorAll('#board > div')];
const colIdx = boardDivs.indexOf(evt.target);
const colArr = board[colIdx]
console.log(colIdx)


















