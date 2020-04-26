import React, { useState, useEffect } from 'react';

import Cell from './sub-components/Cell/Cell';

import './styles.scss';

/**
 * Encapsulates the number sequence guessing mechanic
 * @param {number[]} numbersToGuess The correct number sequence
 * @param {function(): void} onComplete Called when the user guesses all numbers in the correct sequence
 * @param {function(): void} onGuessIncorrectly Called when the user guesses a wrong number for the sequence
 * @return {function(number): void} User guess function, call with the number the user guessed
 * */
function useGuessing(numbersToGuess, onComplete, onGuessIncorrectly) {
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

    // Restart the guessing sequence when the numbers to be guessed
    // are changed, so the player isn't stuck mid-way through.
    useEffect(() => {
        setCurrentGuessIndex(0);
    }, [numbersToGuess]);

    // When we reach the end of the guess sequence, it means the
    // player got all the numbers right.
    useEffect(() => {
        if (currentGuessIndex === numbersToGuess.length) {
            onComplete();
        }
    }, [currentGuessIndex]);

    return choice => {
        if (choice === numbersToGuess[currentGuessIndex]) {
            setCurrentGuessIndex(currentGuessIndex + 1);
        } else {
            setCurrentGuessIndex(0);
            onGuessIncorrectly();
        }
    };
}

/**
 * Every time the sequence changes, updates the return value
 * with every number in the sequence, spaced in time by the interval.
 * @param {any[]} sequence The values to emit
 * @param {number} interval Time in milliseconds between each change
 * @return {number | null} Currently selected number, or null if sequence ended
 * */
function useTimedSequence(sequence, interval) {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        let index = 0;
        const timerId = setInterval(() => {
            if (index === sequence.length) {
                clearInterval(timerId);
                setCurrent(null)
            } else {
                setCurrent(sequence[index]);
                index++;
            }
        }, interval);
    }, [sequence, interval]);

    return current;
}

/**
 * Collects the maximum value that the parameter ever reached.
 * @param {number} value The value to compare
 * @return {number} The highest number value ever reached
 * */
function useMaximum(value) {
    const [max, setMax] = useState(null);

    useEffect(() => {
        if (max == null || value > max) {
            setMax(value);
        }
    }, [value, max]);

    return max;
}

/**
 * Handles game logic and state, outputting information for the UI to render.
 * @param {number} tileCount Amount of tiles that can be chosen
 * @return {object} All the data and callbacks the UI needs to operate the game
 * */
function useGameLogic(tileCount) {
    const [gameNumbers, setGameNumbers] = useState([]);
    const flashCard = useTimedSequence(gameNumbers, 500);
    const performGuess = useGuessing(
        gameNumbers,
        addNewNumber,
        resetGame
    );

    // We don't need useState, since this value is tied specifically to
    // when there are no cards flashing, we can just calculate it directly.
    const isPlayerTurn = flashCard == null;

    const [currentScore, setCurrentScore] = useState(0);
    const bestScore = useMaximum(currentScore);

    function startGame() {
        resetGame();
        addNewNumber();
    }

    function resetGame() {
        setGameNumbers([]);
        setCurrentScore(0);
    }

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function addNewNumber() {
        setGameNumbers(gameNumbers => [
            ...gameNumbers,
            generateRandomNumber(1, tileCount)
        ]);
    }

    return {
        gameNumbers,
        currentScore,
        bestScore,
        isPlayerTurn,
        flashCard,
        performGuess,
        startGame,
        addNewNumber,
    };
}

function BoardScene() {
    const tileCount = 9;
    const {
        gameNumbers,
        currentScore,
        bestScore,
        isPlayerTurn,
        flashCard,
        performGuess,
        startGame,
        addNewNumber,
    } = useGameLogic(tileCount);

    return (
        <div className="game-container">
            <div className="testing-stuff">
                <div>
                    <button onClick={startGame}>Start Game</button>
                </div>
                <div onClick={addNewNumber}>
                    <button>Add new number</button>
                </div>
                <div>
                    <span>Game numbers: </span>
                    {gameNumbers.map((item, i) => (
                        <span key={i}>{item}</span>
                    ))}
                </div>
                <div>
                    <span>User Turn: {isPlayerTurn ? "True" : "False"}</span>
                </div>
                <div>
                    <span>Score: {currentScore}</span>
                </div>
            </div>

            <div className="board">
                {Array(tileCount).fill(null).map((_, index) => {
                    const number = index + 1;
                    return (
                        <Cell
                            key={index}
                            onClick={() => performGuess(number)}
                            number={number}
                            active={number === flashCard}
                        />
                    );
                })}
            </div>

            <div className="stats">
                <div className="stats__score-wrap">
                    <span>Score: </span><span>{gameNumbers.length}</span>
                </div>
                <div className="stats__bestScore-wrap">
                    <span>Best Score: </span><span>{bestScore}</span>
                </div>
            </div>

        </div>
    );
}

export default BoardScene;
