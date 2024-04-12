// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

class Die
{
    #value
    
    constructor()
    {
        this.#value = 0;
    }

    get value() { return this.#value; }

    roll()
    {
        // Random number from 1 to 6 to simulate a six-sided die
        this.#value = Math.floor(Math.random() * 6) + 1;
    }
}