import React, { useState, useEffect } from 'react';

import './styles.scss';

// TODO:
//
// Go from 1 to 9
// // Generate random number from 1 to 9, add it to array
// If user 


// Objective: Generate random numbers from 1 to 9, and blip for the user to see
// the user then should click the number and if it matches, add new one
// on each start re-play the numbers for the user to see - don't let the user to click when playing them
// if the user has incorrect number, get the final score and re-start again


function Cell({ number, active, onClick }) {

    return (
        <div className={[`board__cell`, active ? "is-active" : null].join(" ")} onClick={onClick}>
            {number}
        </div >
    )
}

// Step one: Select random numbers from 1 to 9. 
//           Each time it reaches the end, restart it and add new number and show it again


function BoardScene() {

    const [memoryNumbers, setMemoryNumbers] = useState([4, 2, 5, 6]);// move one by one withing the array
    const [playerTurn, setPlayerTurn] = useState(false);
    const [userNumber, setUserNumber] = useState(null)

    const [flashCard, setFlashCard] = useState(null);
    // User current click, must match whats in the array

    function checkMatch() {
        if (userNumber === memoryNumbers) {

        }
    }

    function flashCell() {
        // Increment array every 1second 
        const memoryNumbersLenght = memoryNumbers.length;

        let count = 0;
        let timerID;

        if (count === memoryNumbersLenght) {
            console.log("1")
            clearInterval(timerID)
        } else {
            console.log("2")

            // timerID = setInterval(() => {
            count++
            setFlashCard(count)
            // }, 500)

        }

        console.log("Hello", memoryNumbers[count])
    }

    function generateNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        let memoryNumber = generateNumber(1, 9)
        setMemoryNumbers(memoryNumbers => [...memoryNumbers, memoryNumber])
    }, [])

    useEffect(() => {
        flashCell()
    }, [flashCard])

    // { console.log(memoryNumbers) }


    function clickedNumer() {

    }

    return (
        <div className="board">




            {Array(9).fill().map((x, i) => {
                return (
                    <Cell onClick={clickedNumer} number={i + 1} active={null} />
                )
            })}



        </div>
    );
}

export default BoardScene;
