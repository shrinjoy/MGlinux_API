import React, { useContext, useEffect, useState } from 'react'
import { getCurrentTime, getGameResult, getTimeLeft } from '../Globals/GlobalFunctions'
import { DataContext } from '../Context/DataContext';

function GameView() {
    const {userName, setUserName} = useContext(DataContext);
    const [time, setTime] = useState(getCurrentTime());
    const [gameId, setGameId] = useState("");
    const [gameTime, setGameTime] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [gameResult, setGameResult] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {   
        handleGameResults(); 
        getTimeLeft()
        .then(data => {
            setGameId(data.gameId);
            setGameTime(data.gameTime);
        })
    }, [isTimerActive]); 
      
    useEffect(() => {
    let intervalId;
    if (isTimerActive) {
        intervalId = setInterval(() => {
            setGameTime(prevTime => {
                if (prevTime < 1) {
                    clearInterval(intervalId);
                    setIsTimerActive(false);
                    setTimeout(() => {
                        handleTimerReset();
                    }, 2000)
                    console.log('Stage 1 Done');
                    return 0;
                }
                return prevTime - 1
            });
        }, 1000);
    } else {
        clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
    }, [isTimerActive]);

    const handleTimerReset = () => {
        setIsTimerActive(true);
        handleGameResults();
        console.log('Sequence Started Again');
    }

    async function handleGameResults(){
        const data = await getGameResult();
        setGameResult(data);
        console.log(data);
    }
    
  return (
    <>
    <section id="mc" className="mainContent">
        <div
            className="container-fluid"
            style={{ borderBottom: "1px solid red" }}
        >
            <div className="gameWrapper">
                <div className="row gameRow gx-0">
                    <div className="col-4">
                        <div className="headerRow">
                            <div className="col-12 text-center">
                                <h1>Metro Deluxe</h1>
                            </div>
                            <div className="col-6 text-center">
                                <label>Game Gift Code</label>
                                <label id="gameid" style={{ color: "blue" }}>
                                    {gameId}
                                </label>
                            </div>
                            <div className="col-6 text-center">
                                <label> Countdown </label>
                                <label id="timer" className='d-block'>{gameTime}</label>
                            </div>
                        </div>
                        <div id="background" className="mt-2">
                            <div className="retardedSpinningShit position-relative">
                                <div className="imgWrapper mx-auto">
                                    <img src={require('../../../assets/images/background.png')} />
                                </div>
                                <div className="imgWrapper2">
                                    <img id="card" src={require('../../../assets/images/1.jpeg')} />
                                </div>
                            </div>
                            <div id="res_sofar_div">
                                <table
                                    style={{
                                    height: "100%",
                                    width: "100%",
                                    overflowY: "scroll",
                                    display: "block"
                                    }}
                                    id="res_sofar_table">
                                    {gameResult ? (
                                        Object.entries(gameResult).reduce((rows, [key, value], index) => {
                                            const rowIndex = Math.floor(index / 2); // Calculate the index of the current row
                                            if (!rows[rowIndex]) rows[rowIndex] = []; // Initialize row if it doesn't exist
                                            rows[rowIndex].push(
                                                <td key={key}>{key}</td>,
                                                <td key={value} className='text-white'>{value}</td>
                                            );
                                            return rows;
                                        }, []).map((row, index) => (
                                            <tr key={index}>{row}</tr>
                                        ))
                                    ) : ""}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="headerRow">
                            <div className="col-3">
                                <label> P.No. </label>
                                <label id="username" style={{ color: "#ce0b00" }}>
                                    {userName}
                                </label>
                            </div>
                            <div className="col-3 text-end">
                                <label id="balance" style={{ color: "#ce0b00" }}>
                                    {" "}
                                    00000{" "}
                                </label>
                            </div>
                            <div className="col-3 text-center">
                                <label> Time :</label>
                                <label id="realtime">&nbsp;&nbsp;{time}</label>
                            </div>
                            <div className="col-3 text-end">
                                <button
                                    className="text-white border-0"
                                    style={{ backgroundColor: "red", fontSize: 18 }}
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                        <div id="buttonholder" className="mt-2">
                            <table id="betinputpanel" className="h-100" />
                        </div>
                    </div>
                </div>
                <div className="buttonsRow" style={{ marginLeft: 10 }}>
                    <div className="btnItem">
                        <button
                            className="gamebutton"
                            id="buybuttonXD"
                            style={{ backgroundColor: "#eac697" }}
                        >
                            F6-Buy
                        </button>
                    </div>
                    <div className="btnItem" style={{ width: 215 }}>
                        <button className="gamebutton">
                            Advance Draw(F8)
                        </button>
                    </div>
                    <div className="btnItem">
                        <button className="gamebutton">
                            Clear(ESC)
                        </button>
                    </div>
                    <div className="btnItem">
                        <button className="gamebutton">
                            Cancel(F9)
                        </button>
                    </div>
                    <div className="btnItem">
                        <button className="gamebutton">
                            Report(F4)
                        </button>
                    </div>
                    <div className="btnItem">
                        <button className="gamebutton">
                            Stone(F7)
                        </button>
                    </div>
                    <div className="btnItem" style={{ width: 70 }}>
                        <button
                            className="gamebutton"
                            style={{ backgroundColor: "#eac697" }}
                        >
                            Exit
                        </button>
                    </div>
                    <div className="btnItem" style={{ width: "max-content" }}>
                        <label id="totqt_val">
                            Total Qty: <span>0</span>
                        </label>
                    </div>
                    <div className="btnItem" style={{ width: "max-content" }}>
                        <label id="totamt_val">
                            Total Amnt: <span>0</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default GameView