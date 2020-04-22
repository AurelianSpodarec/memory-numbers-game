import React, { useState, useEffect } from 'react';

import Cell from './sub-components/Cell/Cell';

import './styles.scss';


function BoardScene() {


    const [gameNumbers, setGameNumbers] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const [flashCard, setFlashCard] = useState(null);

    const [clickedNumber, setClickedNumber] = useState(null);

    const [currentUserIndex, setCurrentUserIndex] = useState(0)
    const [currentGameIndex, setCurrentGameIndex] = useState(0)

    // // TODO: refactor
    // let count = 0;
    // let index = 0;


    // function initGame() {
    //     // Initialise the game with basic values
    // }

    function startGame() {
        addNewNumber()
    }

    function resetGame() {
        setGameNumbers([])
        setCurrentUserIndex(0)
        if (bestScore < gameNumbers.length) return setBestScore(gameNumbers.length)
    }

    // // function blinkCell() {
    // //     // Add new number and stop, wait for the user to go over them, and then stop again

    // //     // Flash, then add a new number when all have been flashed, and repeat
    // //     // Disable user clicking on cells when flashing cells
    // //     const gameNumbersLenght = gameNumbers.length;

    // //     const timerID = setInterval(() => {
    // //         // setFlashCard(count++)
    // //         if (index === gameNumbersLenght) {
    // //             clearInterval(timerID)
    // //             addNewNumber()
    // //             count = 0
    // //             index = 0
    // //             setIsPlayerTurn(true)
    // //             // blinkCell()
    // //             setFlashCard(gameNumbers[count])
    // //         } else {
    // //             setFlashCard(gameNumbers[count])
    // //             count++
    // //             index++
    // //         }
    // //     }, 500)
    // // }



    // function addNewNumber() {
    //     let memoryNumber = generateRandomNumber(1, 9)
    //     setGameNumbers(gameNumbers => [...gameNumbers, memoryNumber])
    // }


    // console.log("currentUserIndefffx", gameNumbers[currentUserIndex])
    // function isMatch(userNumber) {
    //     console.log("currentUserIndex", gameNumbers[currentUserIndex])

    //     if (userNumber === gameNumbers[currentUserIndex]) {
    //         setCurrentUserIndex(currentUserIndex => currentUserIndex + 1);
    //         addNewNumber()
    //         console.log("Well done! Clap clap clap")
    //     } else {
    //         // Game over
    //         console.log("Game over")
    //         // resetGame()
    //     }
    // }


    // function clickedNumber(number) {
    //     // isMatch(number)
    //     // currentUserIndex++
    //     isMatch(number)
    //     setCurrentUserIndex(currentUserIndex => currentUserIndex + 1);
    //     setNumber(number)
    // }
    // console.log(currentUserIndex)

    // useEffect(() => {
    //     isMatch(number)
    // }, [number])


    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function addNewNumber() {
        let memoryNumber = generateRandomNumber(1, 9)
        setGameNumbers(gameNumbers => [...gameNumbers, memoryNumber])
    }

    function clickedNumberHandle(number) {
        setClickedNumber(number)
        isMatch(number)

    }

    // Current gameIndex

    function isMatch(number) {
        if (number === gameNumbers[currentUserIndex]) {

            if (currentUserIndex + 1 === gameNumbers.length) {
                setCurrentUserIndex(0)
                setCurrentGameIndex(0)
                addNewNumber()
            } else {
                setCurrentUserIndex(currentUserIndex + 1)
            }

        } else {
            resetGame()
            console.log("game over")
        }
    }


    // Each new level, the user needs to go though the entire begining in the array and match game aray

    // [2,5,9,4]
    // user then needs to click 2, 5, 9 - if he get one wrong, 


    console.log("Clicked number", clickedNumber)



    return (
        <div>


            <div className="testing-stuff">
                <div>
                    <button onClick={startGame}>Start Game</button>
                </div>
                <div onClick={addNewNumber}>
                    <button>Add new number</button>
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
                            <Cell key={i} onClick={() => clickedNumberHandle(i + 1)} number={i + 1} active={i + 1 === flashCard ? true : false} />
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
