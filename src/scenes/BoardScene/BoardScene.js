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

    const [flashCard, setFlashCard] = useState(null);
    // User current click, must match whats in the array
    let count = 0;
    let index = 0;
    let timerID;


    // Flash, then add a new number when all have been flashed, and repeat

    function checkMatch() {
        if (userNumber === memoryNumbers) {

        }
    }

    const flashCell = () => {
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

    function generateNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function clickedNumber(number) {
        console.log("Clicked", number)
    }

    function startGame() {
        flashCell()
    }

    function addNewNumber() {
        let memoryNumber = generateNumber(1, 9)
        setMemoryNumbers(memoryNumbers => [...memoryNumbers, memoryNumber])
    }

    useEffect(() => {

    }, [])

    // useEffect(() => {
    //     flashCell()
    // }, [])

    { console.log("flashcardnumber", flashCard) }

    return (
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
            <div className="board">


                {Array(9).fill().map((x, i) => {
                    return (
                        <Cell key={i} onClick={() => clickedNumber(i)} number={i + 1} active={i === flashCard ? true : false} />
                    )
                })}

            </div>
        </div>
    );
}

export default BoardScene;
