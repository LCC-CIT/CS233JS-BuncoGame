// Written by Brian Bird, 4/9/2024

// create a new game
let bunco = new Game();

window.onload = function () {
    // click event handlers
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("roll").addEventListener("click", rollDice);
    // initialize the game UI
    document.getElementById("start").disabled = false;
    document.getElementById("roll").disabled = true;
}

function startGame() {
    bunco.startNewGame();
    document.getElementById("start").disabled = true;
    document.getElementById("roll").disabled = false;
    bunco.addPlayer(document.getElementById("name1").value);
    bunco.addPlayer(document.getElementById("name2").value);
    document.getElementById("nextRoll").innerText += bunco.getCurrentPlayer().name;
    bunco.startNewGame();
    console.log("Game started");
}

function rollDice() {
    let player = bunco.getCurrentPlayer();
    const scores = bunco.rollDice();
    document.getElementById("die1").src = `images/die${bunco.dice[0].value}.png`;
    document.getElementById("die2").src = `images/die${bunco.dice[1].value}.png`;
    document.getElementById("die3").src = `images/die${bunco.dice[2].value}.png`;
    document.getElementById("round").innerText = bunco.round;

    if(player.number === 1) {
    document.getElementById("player1").style = "background-color: lightblue";
    document.getElementById("player2").style = "background-color: white";
    document.getElementById("rollScore1").innerText = scores.rollScore;
    document.getElementById("roundScore1").innerText = scores.roundScore;
    document.getElementById("totalScore1").innerText = scores.totalScore;
    document.getElementById("roundsWon1").innerText = scores.roundsWon;
    }
    else if (player.number === 2) {
        document.getElementById("player2").style = "background-color: lightblue";
        document.getElementById("player1").style = "background-color: white";
        document.getElementById("rollScore2").innerText = scores.rollScore;
        document.getElementById("roundScore2").innerText = scores.roundScore;
        document.getElementById("totalScore2").innerText = scores.totalScore;
        document.getElementById("roundsWon2").innerText = scores.roundsWon;
    }

    // get current player again since the round may have ended
    player = bunco.getCurrentPlayer();
    // put the current player's name on the roll button
    document.getElementById("nextRoll").innerText = player.name;

}

/* ****************** */
/*  For testing only  */
/* ****************** */

// Test the game by automatically playing with two players.
// Call this function in the console to run through a complete game.
function testGame() {
    bunco.startNewGame();
    bunco.addPlayer("Player 1");
    bunco.addPlayer("Player 2");
    do {
        // A player takes a turn. The game will automatically switch to the next player
        const player = bunco.getCurrentPlayer();
        console.log(`Round ${bunco.round} Player ${player.name}'s turn`);
        const scores = bunco.rollDice();
        console.log(`Player ${player.name} rolled ${bunco.dice[0].value}, ${bunco.dice[1].value}, ${bunco.dice[2].value}, roll score: ${scores.rollScore}`)
        console.log(`player ${player.name}: round score: ${scores.roundScore}, total score: ${scores.totalScore}, rounds won: ${scores.roundsWon}`);
    } while (bunco.round > 0);
    console.log(`The winner is ${bunco.getGameWinner().name}`);

}

// Temporary test for Farkle scoring
function testFarkleScoring() {
    let player = new Player();
    let setAsideDice = [1,3,4,2,1,4]; // two 1s: 200
    let score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [1,3,4,3,1,4];  // three pairs: 1500
    score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [1,2,3,4,5,6]; // straight: 3000
    score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [1,1,1,2,3,4]; // tripple 1s: 1000
    score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [1,1,1,2,2,2]; // tripple 1s and 2s: 1200
    score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [2,2,2,2,2,2]; // six 2s: 400
    score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [1,1,1,1,5,5]; // tripple 1s, a 1 and two 5s: 1200
    score = player.scoreFarkle(setAsideDice);
    console.log(score);

    setAsideDice = [1,1,1];  // 1000
    score = player.scoreFarkle(setAsideDice);
    console.log(score);
    
    setAsideDice = [1,1];  // 200
    score = player.scoreFarkle(setAsideDice);
    console.log(score);
}
