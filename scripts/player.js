// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

class Player
{
    // declare private instance variables
    #name
    #number // player number
    #totalScore
    #roundScore
    #roundsWon

    constructor(name)
    {
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
    roll(dice)
    {
        for (let i = 0; i < dice.length; i++)
        {
            dice[i].roll();
        }
    }

    // Calculate the socre for this round and add it to the player's total score
    calculateScore(dice, round)
    {
        let rollScore = 0;
        // Sum the number of die that match the round number
        for (let i = 0; i < dice.length; i++)
        {
            if (dice[i].value === round)
            {
                rollScore++;
            }
        }
        if (rollScore === 3)  // all die match and match round, this is a bunco!
        {
            rollScore = BUNCO;
        }
        // If all the die are the same value, the player scored 5 points
        else if (dice.every(d => d.value === dice[0].value)) 
        {
            rollScore = 5;
        }

        this.#roundScore += rollScore;
        // Round score can't be over BUNCO
        if (this.#roundScore > BUNCO)
        {
            this.#roundScore = BUNCO;
        }
        return rollScore;
    }

    // Temporary demo method for scoring Farkle
    // The values parameter is an array of the valies 
    // on the dice in the set of dice to score.
    scoreFarkle(values)
    {

        let score = 0;
        let numberOfDice = values.length;

        // Search the dice array for distinct values and count them.
        const counts = {}; // object to hold counts of matching values
        for (const value of values)
        {
            if (value in counts)
            {
                counts[value]++;
            }
            else
            {
                counts[value] = 1;
            }
        }
        // check for a straight--six distinct values
        let keys = Object.keys(counts);
        let distinctValues = keys.length;
        if (distinctValues === 6)
        {
            score = 3000;
        }
        // check for thee pairs of matching die
        else if (distinctValues === 3 && numberOfDice === 6)
        {
            score = 1500;
        }
        // check for sets of three matching dice
        else
        {

            for (let key of keys)
            {
                // check for three or six (two tripples of the same value)
                let count = counts[key];  // count is the number of die with the value in key
                if (count % 3 >= 0)
                {
                    // Check for three ones
                    if (key === "1")
                    {
                        score += 1000;
                    }
                    // Three of any other number
                    else
                    {
                        score += 100 * key;
                    }
                    // if there were two sets of tripple ones, double the score
                    if (count === 6)
                    {
                        score *= 2;
                    }
                }
                // if there are not 3 or 6 of this value, check for fives and ones
                else if (key === "1")
                {
                    score += 100 * count;
                } else if (key === "5")
                {
                    score += 50 * count;
                }
            }
        }

        return score;
    }
}