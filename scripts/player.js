// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

class Player {
    // declare private instance variables
    #name
    #number // player number
    #totalScore
    #roundScore
    #roundsWon

    constructor(name) {
        // Initialize instance variables.
        this.#name = name;
        this.#number = 0;
        this.#totalScore = 0;
        this.#roundScore = 0;
        this.#roundsWon = 0;
    }

    // Getters and Setters
    get name() { return this.#name; }
    get number() { return this.#number; }
    get roundScore() { return this.#roundScore; }
    get totalScore() { return this.#totalScore; }
    get roundsWon() { return this.#roundsWon; }

    set number(value) { this.#number = value; }
    set roundScore(value) { this.#roundScore = value; }
    set totalScore(value) { this.#totalScore = value; }
    set roundsWon(value) { this.#roundsWon = value; }

    // Roll all the dice in the array passed to the player
    roll(dice) {
        for (let i = 0; i < dice.length; i++) {
            dice[i].roll();
        }
    }

    // Calculate the socre for this round and add it to the player's total score
    calculateScore(dice, round) {
        let rollScore = 0;
        // Sum the number of die that match the round number
        for (let i = 0; i < dice.length; i++) {
            if (dice[i].value === round) {
                rollScore++;
            }
        }
        if (rollScore === 3)  // all die match and match round, this is a bunco!
        {
            rollScore = BUNCO;
        }
        // If all the die are the same value, the player scored 5 points
        else if (dice.every(d => d.value === dice[0].value)) {
            rollScore = 5;
        }

        this.#roundScore += rollScore;
        // Round score can't be over BUNCO
        if (this.#roundScore > BUNCO) {
            this.#roundScore = BUNCO;
        }
        return rollScore;
    }

}