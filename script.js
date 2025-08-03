// gameboard as an array

// players as objects
// game flow controllers as objects

function createPlayer(name, symbol) {
    const play = (position) => gameboard.add(position, symbol);
    return { name, symbol, play };
}

const gameboard = (function() {
    let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const add = (position, symbol) => {
        let index;
        switch (position) {
            case "1-1":
                index = 0;
                break;
            case "1-2":
                index = 1;
                break;
            case "1-3":
                index = 2;
                break;
            case "2-1":
                index = 3;
                break;
            case "2-2":
                index = 4;
                break;
            case "2-3":
                index = 5;
                break;
            case "3-1":
                index = 6;
                break;
            case "3-2":
                index = 7;
                break;
            case "3-3":
                index = 8;
                break;
            default:
                console.log("Invalid format.");
                return;
        }
        gameboard.splice(index, 1, symbol);
    };
    const get = () => gameboard;
    return { get, add };
})();

const gameFlow = (function() {
    let turn = 0;
    const getTurn = () => turn;
    const changeTurn = () => {
        if (turn == 0) {
            turn = 1;
        } else {
            turn = 0;
        }
    };
    return { getTurn, changeTurn };
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
let position;
let round = 1;

while (round <= 9) {
    if (gameFlow.getTurn() == 0) {
        position = prompt(`${player1.name}, enter your position`);
        player1.play(position);
        gameFlow.changeTurn();
        round++;
    } else {
        position = prompt(`${player2.name}, enter your position`);
        player2.play(position);
        gameFlow.changeTurn();
        round++;
    }
}
console.log(gameboard.get());