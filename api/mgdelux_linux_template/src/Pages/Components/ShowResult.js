import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Context/DataContext';
import { getCurrentResult } from '../../Globals/GlobalFunctions';

function ShowResult() {
    const { gameId, currentGameResult, setCurrentGameResult, nextGameDate, nextGameTime } = useContext(DataContext)
    const [randomNumber, setRandomNumber] = useState(null)

    //Current Game Result
    useEffect(() => {
        let intervalId;
        async function handleCurrentGameResult() {
            const data = await getCurrentResult(gameId);
            if (data && !data.result || !data) {
                intervalId = setTimeout(handleCurrentGameResult, 250);
            } else {
                setCurrentGameResult(data.result.substr(2))
            }
        }
        handleCurrentGameResult()
        return () => {
            clearTimeout(intervalId);
        }
    }, [])

    useEffect(() => {
        const updateRandomNumber = () => {
            const newRandomNumber = Math.floor(Math.random() * 90) + 10;
            setRandomNumber(newRandomNumber);
            setTimeout(updateRandomNumber, 10);
        };
        updateRandomNumber();

        return () => {
            clearTimeout(updateRandomNumber);
        };
    }, []);
    return (
        <div className='showResultScreen'>
            <div className='infoBox'>
                <h2>Metro Deluxe</h2>
                <div className='d-flex justify-content-between'>
                    <div><label>Date: {nextGameDate}</label></div>
                    <div><label>Time: {nextGameTime}</label></div>
                </div>
            </div>
            <div className='resultTime'>
                <div><label>MINOR MG</label></div>
                <div><label>TIME: {nextGameTime}</label></div>
            </div>
            <div className='resultBox' style={{ backgroundColor: currentGameResult ? "red" : "yellow" }}>
                <h1 style={{ color: currentGameResult ? 'white' : 'red' }}>MG <label>{currentGameResult ? currentGameResult : randomNumber}</label></h1>
            </div>
        </div>
    )
}

export default ShowResult