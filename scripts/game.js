// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

// Global constants used in all classes in the Bunco game
const BUNCO = 21;    // The winning number of points for a round.
const ROUNDS = 6;    // The number of rounds in the game.

// Bunco game class
class Game {
    // Declare private instance variables
    #players;                 // An array of all the Player objects
    #currentPlayerIndex;      // Index to the players array
    #round;                   // Number from 1 to 6
    #dice;                    // An array for the three dice

    constructor() {
        // Initialize instance variables
        this.#players = [];
        this.#currentPlayerIndex = 0;
        this.#round = 1;
        this.#dice = [];
        // Add three die to the game
        this.#dice.push(new Die());
        this.#dice.push(new Die());
        this.#dice.push(new Die());
    }

    // These getters are only used ouside the class
    get dice() { return this.#dice; }
    get round() { return this.#round; }

    // This method is used both inside and outside the class
    getCurrentPlayer() {
        return this.#players[this.#currentPlayerIndex];
    }

    // Add a player to the game. 
    // Pass in the palyer's name as a string
    addPlayer(name) {
        if (name === "") {  // if name is an empty string, use a default name
            name = "Player " + (this.#players.length + 1);
        }
        let player = new Player(name);
        player.number = this.#players.length + 1;
        this.#players.push(player);
    }

    // Start the next round of the game
    nextRound() {
        this.#round++;
        // If the round is over 6, the game is over
        if (this.#round > ROUNDS) {
            this.#round = 0;  // this means the game is over
            // the round will be reset to 1 in getGameWinner
        }
        // add round score to the total score
        for (const player of this.#players) {
            player.totalScore += player.roundScore;
        }

        // reset all the round scores
        for (const player of this.#players) {
            player.roundScore = 0;
        }
    }

    // The current player rolls the dice
    rollDice() {
        let player = this.getCurrentPlayer();
        player.roll(this.#dice);
        let rollScore = player.calculateScore(this.#dice, this.#round);


        // If the player's round score is 21 or more, the round is over
        if (player.roundScore >= BUNCO) {
            player.roundsWon++;
            this.nextRound();
        }

        // copy all the scores into an object to be returned at the end of this method
        const scores = {
            rollScore,
            roundScore: player.roundScore,
            totalScore: player.totalScore,
            roundsWon: player.roundsWon
        };

        // if the player scored 0, their turn is over
        if (rollScore === 0) {
            this.#currentPlayerIndex++;
            if (this.#currentPlayerIndex >= this.#players.length) {
                this.#currentPlayerIndex = 0;
            }
        }
        // rturn an object containing all the scores
        return scores
    }

    // Determine the winner
    getGameWinner() {
        let winner = this.#players[0];
        // check for ties
        // fist, find the mody rounds won by any player
        let maxRoundsWon = Math.max(...this.#players.map(p => p.roundsWon));
        // Get an array of players who have won the most rounds
        let roundWinners = this.#players.filter(p => p.roundsWon === maxRoundsWon); if (roundWinners.length === 1) {
            winner = roundWinners[0];
        }
        else {
            // if there is a tie, the winner is the player with the highest total score
            for (let i = 0; i < roundWinners.length; i++) {
                if (roundWinners[i].totalScore > winner.totalScore) {
                    winner = roundWinners[i];
                }
            }
        }
        return winner;
    }

    startNewGame() {
        this.#round = 1;
        this.#currentPlayerIndex = 0;
        for (const player of this.#players) {
            player.totalScore = 0;
            player.roundScore = 0;
            player.roundsWon = 0;
        }
    }
}