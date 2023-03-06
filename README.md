# checkersGameGA
PROPOSAL

The goal for Project 1 is to create a player v player checkers game that allows two players to play one another on the same computer. Each player will only be allowed to move a piece if it is their turn.

Players will be able to capture and remove their opponent's piece and the board will be automatically updated with the piece missing once that happens.

There is no plans to have pieces be able to become a king piece. 






















// function activePiece () { 
//     boardDivs.forEach(div => {
//     // if it's green's turn, there's no winner and they click on one of their pieces, give that piece (div) a class of active and evoke movePiece
//     if (div.style.backgroundColor === 'green' && turn === 1 && winner === null) {
//         div.addEventListener('click', function () {
//             console.log('green')
//             div.setAttribute('class', 'active')
//             movePiece();
//         });
//     } else if (div.style.backgroundColor === 'red' && turn === -1 && winner === null) {
//         div.addEventListener('click', function () {
//             console.log('red')
//             div.setAttribute('class', 'active')
//             movePiece();
//             }); 
//         }
//     })
// }
