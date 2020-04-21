import React, { useState, useEffect } from 'react';

import Cell from './sub-components/Cell/Cell';

import './styles.scss';



// Objective: Generate random numbers from 1 to 9, and flash for the user to see
// the user then should click the number and if it matches, add new one
// on each start re-play the numbers for the user to see - don't let the user to click when playing them
// if the user has incorrect number, get the final score and re-start again




// Step one: Select random numbers from 1 to 9. 
//           Each time it reaches the end, restart it and add new number and show it again



// Screen Loaded
// User presses Start Button
//   - Random number get generated -> the number flashes on screen -> user turn now
// 
// If user clicks the right numbers





function BoardScene() {


    const [gameNumbers, setGameNumbers] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const [flashCard, setFlashCard] = useState(null);

    const [number, setNumber] = useState(null);

    // TODO: refactor
    let count = 0;
    let index = 0;





    function initGame() {
        // Initialise the game with basic values
    }

    function startGame() {
        // When user starts, add one item to the memory numbers
        blinkCell()
    }

    function resetGame() {
        setGameNumbers([])
        if (bestScore < gameNumbers.length) return setBestScore(gameNumbers.length)
    }

    function blinkCell() {
        // Add new number and stop, wait for the user to go over them, and then stop again

        // Flash, then add a new number when all have been flashed, and repeat
        // Disable user clicking on cells when flashing cells
        const gameNumbersLenght = gameNumbers.length;

        const timerID = setInterval(() => {
            // setFlashCard(count++)
            if (index === gameNumbersLenght) {
                clearInterval(timerID)
                addNewNumber()
                count = 0
                index = 0
                setIsPlayerTurn(true)
                // blinkCell()
                setFlashCard(gameNumbers[count])
            } else {
                setFlashCard(gameNumbers[count])
                count++
                index++
            }
        }, 500)
    }

    function addNewNumber() {
        let memoryNumber = generateRandomNumber(1, 9)
        setGameNumbers(gameNumbers => [...gameNumbers, memoryNumber])
    }

    let currentUserIndex = 0;
    const isMatch = (userNumber) => {

        console.log("memory", gameNumbers[currentUserIndex])

        if (userNumber === gameNumbers[currentUserIndex]) {

            currentUserIndex++;
            console.log("Well done! Clap clap clap")

            addNewNumber()
        } else {
            // Game over
            console.log("Game over")
            resetGame()
        }
    }

    console.log("current index", currentUserIndex)

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function clickedNumber(number) {
        // isMatch(number)
        setNumber(number)
    }

    useEffect(() => {
        isMatch(number)
    }, [number])

    return (
        <div>


            <div className="testing-stuff">
                <div>
                    <button onClick={startGame}>Start Game</button>
                </div>
                <div>
                    <span>Game numbers: </span>
                    {gameNumbers.map((item, i) => {
                        return <span key={i}>{item}</span>
                    })}
                </div>
                <div>
                    <span>User Turn: {isPlayerTurn ? "True" : "False"}</span>
                </div>
                <div>
                    <span>Score: {gameNumbers.length}</span>
                </div>

            </div>

            <div className="game-container">
                <div className="board">
                    {Array(9).fill().map((x, i) => {
                        return (
                            <Cell key={i} onClick={() => clickedNumber(i + 1)} number={i + 1} active={i + 1 === flashCard ? true : false} />
                        )
                    })}
                </div>

                <div className="stats">
                    <div>
                        <span>Score:</span><span>{gameNumbers.length}</span>
                    </div>
                    <div>
                        <span>Best Score:</span><span>{bestScore}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BoardScene;
