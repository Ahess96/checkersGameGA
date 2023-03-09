# CHECKERS
## PROPOSAL

The goal for this game is to create a player v player checkers game that allows two players to play one another on the same computer. Each player is only be allowed to move a piece if it is their turn and their turn ends after the move.

Players are able to capture and remove their opponent's piece and the board automatically updates with the piece missing once that happens.

## BEHIND THE GAME

![Checkers-Title](images/title.jpeg)

This version of checkers is a browser ready game that allows two players to play against eachother at the same computer. A winner is determined when all of the pieces of one player have been captured, and the game can be restarted if a stalemate has been reached. 

The game is written using HTML, CSS and JavaScript. 

An initialization function is called immediately once the page loads is responsible for rendering the board contents and the message displaying whose turn it is. 

The HTML contains 64 "div" elements, each with their own ID but otherwise contain no information about the presence of a player piece. 

``` HTML
    <body>
        ....
        <section id='board'>
            
            <div id="r0c0"></div>
            <div id="r0c1"></div>
            <div id="r0c2"></div>
            <div id="r0c3"></div>
            <div id="r0c4"></div>
            <div id="r0c5"></div>
            <div id="r0c6"></div>
            <div id="r0c7"></div>
            
            ....
        </section>
    </body>
```

A glabal two-dimensional array is responsible for rendering the game pieces and their location on the board, which is linked to the "div" elements based on their id. 

``` JS
    function init () {
    // numbers at array indexes represent no player present (0) or player present (1 / -1)
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
        ....
    }
```

## GAMEPLAY

[LIVE DEMO](https://ahess96.github.io/checkersGameGA/)

Gameplay is kept simple and accessible to most audiences. A message at the top of the board displays whose turn it is and each player gets one move per turn, at which point the turn ends and the message renders that it is the other player's turn.

Turn, location in the array, movement and winner logic all rely on the presence of the numbers 1 and -1 in the board array. 

There are two event listeners in the JavaScript. One is responsible for restarting the game. The other is responsible for responding to selecting a peice and moving it.

![GIF-of-gameplay](<div style="width:100%;height:0;padding-bottom:105%;position:relative;"><iframe src="https://giphy.com/embed/VQZz6F7zfE7N7rkg9M" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/VQZz6F7zfE7N7rkg9M">via GIPHY</a></p>)

## HIGHLIGHTS

The checkers game is fully functional without bugs or error messages in the console. The styling is sleek and minimalist with a traditional spin of using the colors "red" and "green".

This game required a lot of logic but was kept to a relatively minimal amount of code written in a semantic way and is in large part able to be edited for future modifications or features. 

## CHALLENGES

While the two dimensional board array seems like a great, straightfoward way to track pieces, it has its complications. One of the challenges is being able to consistently access a location on the array and linking it to the div tag that it corresponds to. But this conceptual challenge has the perk of being clear and dynamic during gameplay. 

## FUTURE ENHANCEMENTS




















