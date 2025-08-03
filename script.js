// gameboard as an array

// players as objects
// game flow controllers as objects

function createPlayer(name, symbol) {
    let score = 0;
    const displayScore = () => score;
    const addScore = () => score++;
    return { name, symbol, displayScore, addScore };
}

const gameboard = (function() {
    let gameboard = [];
    const add = (position, symbol) => gameboard.splice(position, 0, symbol);
    const get = () => gameboard;
    return { get, add };
})();

/*
Logic:
- The gameboard is an array with each position being an index [1-1, 1-2, 1-3, 2-1, ...etc]
- Player1 chooses a position (1-3, 3-2...etc) to put X in
- Player2 does the same with O
- If 3 of the same symbol in a row: win
All lines are:
> 1-1 1-2 1-3
> 2-1 2-2 2-3
> 3-1 3-2 3-3
> 1-1 2-1 3-1
> 1-2 2-2 3-2
> 1-3 2-3 3-3
> 1-1 2-2 3-3
> 1-3 2-2 3-1
*/

// print position format, get them to select a position

const player1 = createPlayer("Lou", "X");
const player2 = createPlayer("Sam", "O");

console.log("Position format: n-m \n");
let position = prompt("Enter position: ");
switch (position) {
    case "1-1":
        gameboard.add(0, "X");
        break;
    case "1-2":
        gameboard.add(1, "X");
        break;
    case "1-3":
}
console.log(gameboard.get());