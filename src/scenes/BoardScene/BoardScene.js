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

    let count = 0;
    const blinkCell = () => {
        const timerID = setInterval(() => {
            if (currentUserIndex === gameNumbers.length) {
                clearInterval(timerID)
                count = 0;
            } else {
                setFlashCard(gameNumbers[count])
                count++
            }
        }, 500);
    }

    console.log("player turns", isPlayerTurn)
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function addNewNumber() {
        console.log("Add new number")
        let memoryNumber = generateRandomNumber(1, 9)
        setGameNumbers(gameNumbers => [...gameNumbers, memoryNumber])
    }

    function clickedNumberHandle(number) {
        if (isPlayerTurn) {
            setClickedNumber(number)
            isMatch(number)
        }
    }

    function isMatch(number) {
        if (number === gameNumbers[currentUserIndex]) {
            console.log("Correct")
            if (currentUserIndex + 1 === gameNumbers.length) {
                console.log("Next Round")
                setCurrentUserIndex(0)
                setCurrentGameIndex(0)
                addNewNumber()
                blinkCell();
            } else {
                setCurrentUserIndex(currentUserIndex + 1)
            }

        } else {
            resetGame()
            console.log("game over")
        }
    }

    useEffect(() => {
        blinkCell()
    }, [gameNumbers])

    return (
        <>
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
        </>
    );
}

export default BoardScene;
