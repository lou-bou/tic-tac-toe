function createPlayer(name, symbol) {
    const play = (position) => gameboard.addSymbol(position, symbol);
    return { name, symbol, play };
}

const gameboard = (function() {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    const resetGameboardArray = () => gameboard = ["", "", "", "", "", "", "", "", ""];
    const setPosition = (player, playerPosition) => player.play(playerPosition);
    const addSymbol = (position, symbol) => {
        let index;
        switch (position) {
            case "number0":
                index = 0;
                break;
            case "number1":
                index = 1;
                break;
            case "number2":
                index = 2;
                break;
            case "number3":
                index = 3;
                break;
            case "number4":
                index = 4;
                break;
            case "number5":
                index = 5;
                break;
            case "number6":
                index = 6;
                break;
            case "number7":
                index = 7;
                break;
            case "number8":
                index = 8;
                break;
            default:
                return 0; // 0 indicates failure to play round by a player
        }
        if (gameboard[index] != "") { // if a position selected by a player isn't equal to 0, that means it's either equal to 'X' or 'O', so it can not be picked
            return 0; // 0 indicates failure to play round by a player
        } else {
            gameboard.splice(index, 1, symbol);
            return 1; // 1 indicates the players successfully played a position
        }
        
    };
    const getGameboard = () => gameboard;
    return { getGameboard, addSymbol, setPosition, resetGameboardArray };
})();

const gameFlow = (function() {
    let turn = 0;
    let round = 1;
    const getRound = () => round;
    const setRound = (roundNum) => round = roundNum;
    const nextRound = () => round++;
    const getTurn = () => turn;
    const resetTurn = () => turn = 0;
    const changeTurn = () => {
        if (turn == 0) {
            turn = 1;
        } else {
            turn = 0;
        }
    };

    const playGame = (player1, player2) => {
        resetGameboard();

        gameFlow.setRound(1);

        if (document.querySelector("#play")) {
            DOMController.cleanInitialInterface();
        }
        
        if (!document.querySelector("#restart")) {
            DOMController.createRestartButton();
        }

        if (document.querySelector("h1")) {

        }
        
        DOMController.displayGameboard();
        
        const gameboardSquares = document.querySelectorAll(".square");
        gameboardSquares.forEach((square) => {
            square.addEventListener("click", () => {
                let squareID = square.getAttribute("id");
                console.log(`Square ${squareID} selected`);
                if (turn == 0) {
                    let hasPlayed = gameboard.setPosition(player1, squareID);
                    if (hasPlayed) {
                        changeTurn();
                        nextRound();
                        DOMController.updateGameboard(square, player1.symbol);
                    } else {
                        console.log(`${player1.name} selected an invalid position, please select again.`);
                    }
                } else {
                    let hasPlayed = gameboard.setPosition(player2, squareID);
                    if (hasPlayed) {
                        changeTurn();
                        nextRound();
                        DOMController.updateGameboard(square, player2.symbol);
                    } else {
                        console.log(`${player2.name} selected an invalid position, please select again.`);
                    }
                }

                if (checkWinner(player1)) {
                    setTimeout(() => {
                        alert(`${player1.name} won!`);
                        resetGameboard();
                    }, 50); // I set a timeout to make sure the gameboard updates with the last symbol before showing the result. I chose 50ms to not let the player click another square before showing the result (that would show 2 consecutive results).
                } else if (checkWinner(player2)) {
                    setTimeout(() => {
                        alert(`${player2.name} won!`);
                        resetGameboard();
                    }, 50);
                } 

                if (getRound() == 10) {
                    setTimeout(() => {
                        alert("It's a tie");
                        resetGameboard();
                    }, 50);
                    
                }
            });
        });
    };

    const resetGameboard = () => {
        gameboard.resetGameboardArray();
        DOMController.resetGameboardDOM();
        setRound(1);
        resetTurn();
    }

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
    
    return { playGame, checkWinner, changeTurn, getRound, nextRound, setRound, getTurn, resetTurn, resetGameboard };
})();


const DOMController = (function () {
    const body = document.querySelector("body");
    const gameboardArray = gameboard.getGameboard();
    const gameboardWhole = document.createElement("div");
    gameboardWhole.setAttribute("class", "gameboard");
    body.appendChild(gameboardWhole);

    const gameDialog = document.querySelector("#game-dialog");
    const closeDialog = document.querySelector("#game-dialog button");
    const gameForm = document.querySelector("#game-dialog form");
    const startGame = document.querySelector("#start-game");
    const playButton = document.querySelector("#play");
    playButton.addEventListener("click", () => {
        gameDialog.showModal();
    });

    closeDialog.addEventListener("click", () => {
        gameDialog.close();
    })

    startGame.addEventListener("click", () => {
        const player1 = createPlayer(gameForm.player1_name.value, "X");
        const player2 = createPlayer(gameForm.player2_name.value, "O");

        gameFlow.playGame(player1, player2);
    });
    
    const displayGameboard = () => {
        gameboardWhole.textContent = ""; 
        for (let i = 0; i <= 8; i++) {
            const gameboardSquare = document.createElement("div"); 
            gameboardSquare.textContent = gameboardArray[i];
            gameboardSquare.setAttribute("class", "square");
            gameboardSquare.setAttribute("id", `number${i}`);
            gameboardWhole.appendChild(gameboardSquare);
        }
    }

    const updateGameboard = (square, symbol) => {
        square.textContent = symbol;
    }

    const resetGameboardDOM = () => {
        const gameboardSquares = document.querySelectorAll(".square");
        gameboardSquares.forEach((square) => {
            square.textContent = "";
        });
    }

    const createRestartButton = () => {
        const restartButton = document.createElement("button");
        restartButton.setAttribute("id", "restart");
        restartButton.textContent = "Restart Game";
        body.prepend(restartButton);

        restartButton.addEventListener("click", () => {
            const player1 = createPlayer(gameForm.player1_name.value, "X");
            const player2 = createPlayer(gameForm.player2_name.value, "O");

            gameFlow.playGame(player1, player2);
        })
    }

    const cleanInitialInterface = () => {

        if (document.querySelector("#play")) {
            body.removeChild(playButton);
        }

        if (document.querySelector("h1")) {
            body.removeChild(document.querySelector("h1"));
        }
        
    }

    return { displayGameboard, updateGameboard, resetGameboardDOM, createRestartButton, cleanInitialInterface };
})();