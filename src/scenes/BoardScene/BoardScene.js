import React, { useState, useEffect } from 'react';

import Cell from './sub-components/Cell/Cell';

import './styles.scss';



// Objective: Generate random numbers from 1 to 9, and flash for the user to see
// the user then should click the number and if it matches, add new one
// on each start re-play the numbers for the user to see - don't let the user to click when playing them
// if the user has incorrect number, get the final score and re-start again




// Step one: Select random numbers from 1 to 9. 
//           Each time it reaches the end, restart it and add new number and show it again


function BoardScene() {

    const [memoryNumbers, setMemoryNumbers] = useState([1, 3, 5, 9]);// move one by one withing the array
    const [playerTurn, setPlayerTurn] = useState(false);
    const [userNumber, setUserNumber] = useState(null)
    const [bestScore, setBestScore] = useState(0); // store in local storage later
    const [userClickedNumer, setUserClickedNumer] = useState(null);

    const [flashCard, setFlashCard] = useState(null);
    // User current click, must match whats in the array

    let count = 0;
    let index = 0;
    let timerID;


    function initGame() {
        // Initialise the game with basic values
    }

    function startGame() {
        // When user starts, add one item to the memory numbers
        blinkCell()
    }

    function resetGame() {
        // Reset the game values
        // Memory Numbers, current score, indexes
    }

    function gameOver() {
        // Stop the game, and assign best score if it has been higher than prev score
    }

    function blinkCell() {
        // Flash, then add a new number when all have been flashed, and repeat
        // Disable user clicking on cells when flashing cells
        const memoryNumbersLenght = memoryNumbers.length;


        timerID = setInterval(() => {
            // setFlashCard(count++)
            if (index === memoryNumbersLenght) {
                clearInterval(timerID)
                addNewNumber()
            } else {
                setFlashCard(memoryNumbers[count])
                count++
                index++
            }
        }, 500)
    }

    function addNewNumber() {
        let memoryNumber = generateRandomNumber(1, 9)
        setMemoryNumbers(memoryNumbers => [...memoryNumbers, memoryNumber])
    }


    let currentIndex = 0;
    function isMatch() {

        // Match if what the user clicked, currently matches whats in array
        const memoryCurrentNumber = memoryNumbers[currentIndex];
        console.log(memoryCurrentNumber)


        if (userNumber === memoryCurrentNumber) {

            console.log("Well done! Clap clap clap")
            currentIndex++;
        } else {
            // Game over
            console.log("Game over")
        }
    }

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function clickedNumber(number) {
        setUserClickedNumer(number)
        isMatch(number)
        console.log("Clicked", number)
    }

    return (
        <div>
            <div>
                <div>
                    <button onClick={startGame}>Start Game</button>
                </div>
                <div>
                    <span>Game numbers: </span>
                    {memoryNumbers.map((item, i) => {
                        return <span key={i}>{item}</span>
                    })}
                </div>
                <div>
                    <span>Score: {memoryNumbers.length}</span>
                </div>
                <div>
                    <span>Clicked number: {userClickedNumer}</span>
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
                        <p>Score:</p><span>{memoryNumbers.length}</span>
                    </div>
                    <div>
                        <p>Best Score:</p><span>{bestScore}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BoardScene;
