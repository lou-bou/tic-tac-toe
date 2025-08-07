// gameboard as an array

// players as objects
// game flow controllers as objects

function createPlayer(name, symbol) {
    const play = (position) => gameboard.addSymbol(position, symbol);
    return { name, symbol, play };
}

const gameboard = (function() {
    let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const setPosition = (player, playerPosition) => player.play(playerPosition);
    const addSymbol = (position, symbol) => {
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
                return 0; // 0 indicates failure to play round by a player
        }
        if (gameboard[index] != 0) { // if a position selected by a player isn't equal to 0, that means it's either equal to 'X' or 'O', so it can not be picked
            return 0; // 0 indicates failure to play round by a player
        } else {
            gameboard.splice(index, 1, symbol);
            return 1; // 1 indicates the players successfully played a position
        }
        
    };
    const getGameboard = () => gameboard;
    return { getGameboard, addSymbol, setPosition };
})();

const gameFlow = (function() {
    let turn = 0;
    let round = 1;
    const getRound = () => round;
    const setRound = (roundNum) => round = roundNum;
    const nextRound = () => round++;
    const getTurn = () => turn;
    const changeTurn = () => {
        if (turn == 0) {
            turn = 1;
        } else {
            turn = 0;
        }
    };
    
    const playRound = (player1, player2) => {
        if (turn == 0) {
            let hasPlayed = gameboard.setPosition(player1, prompt(`${player1.name}, enter your position`));
            if (hasPlayed) {
                changeTurn();
                round++;
            } else {
                console.log(`${player1.name} selected an invalid position, please select again.`);
            }
        } else {
            let hasPlayed = gameboard.setPosition(player2, prompt(`${player2.name}, enter your position`));
            if (hasPlayed) {
                changeTurn();
                round++;
            } else {
                console.log(`${player2.name} selected an invalid position, please select again.`);
            }
        }
    };

    const playGame = (player1, player2) => {
        while (round <= 9) {
            playRound(player1, player2);
            if (checkWinner(player1)) {
                console.log(player1.name + " won this game.");
                return;
            } else if (checkWinner(player2)) {
                console.log(player2.name + " won this game.");
                return;
            } 
        }
        

        console.log("It's a tie.");
    };

    const checkWinner = (player) => {
        const gbArray = gameboard.getGameboard();

        for (let i = 0; i <= 8; i++) {
            if ((i == 0) || (i == 3) || (i == 6)) {
                if ((gbArray[i] == player.symbol) && (gbArray[i+1] == player.symbol) && (gbArray[i+2] == player.symbol)) {
                    return 1; // 1 indicates the player met this condition and thus won
                }
            }

            if ((i == 0) || (i == 1) || (i == 2)) {
                if ((gbArray[i] == player.symbol) && (gbArray[i+3] == player.symbol) && (gbArray[i+6] == player.symbol)) {
                    return 1; 
                }
            }

            if ((gbArray[0] == player.symbol) && (gbArray[4] == player.symbol) && (gbArray[8] == player.symbol)) {
                return 1; 
            }

            if ((gbArray[2] == player.symbol) && (gbArray[4] == player.symbol) && (gbArray[6] == player.symbol)) {
                return 1; 
            }
        }

        return 0;
    };
    
    return { playGame, playRound, checkWinner, changeTurn, getRound, nextRound, setRound, getTurn };
})();

const player1 = createPlayer("Lou", "X");
const player2 = createPlayer("Sam", "O");
console.log("Position format: n-m \n");

gameFlow.setRound(1);
gameFlow.playGame(player1, player2);
console.log(gameboard.getGameboard());