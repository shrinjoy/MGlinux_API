import React, { useContext, useEffect, useState } from 'react'
import { cancelLastBet, getCurrentTime, getGameResult, getTimeLeft, placeBet } from '../Globals/GlobalFunctions'
import { DataContext } from '../Context/DataContext';
import BetTable from './Components/BetTable';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import ReportPanel from './Components/ReportPanel';

function GameView() {
    const { userName, setUserName, passWord, gameId, setGameId } = useContext(DataContext);
    const [time, setTime] = useState(getCurrentTime());
    const [gameTime, setGameTime] = useState(0);
    const [totalBet, setTotalBet] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);
    const [barCodeSearch, setBarCodeSearch] = useState('');
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [gameResult, setGameResult] = useState("");
    const [lastBetBarCode, setLastBetBarCode] = useState("");
    const [buttonTrigger, setButtonTrigger] = useState(false);
    // Panel Show - Hide
    const [reportTrigger, setReportTrigger] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    const handleTotalBetChange = (value) => {
        setTotalBet(value);
    };

    const handleTotalTicketsChange = (tickets) => {
        setTotalTickets(tickets);
        // console.log(totalTickets);
    };

    // useEffect(() => {
    //     console.log(totalTickets);
    // }, [totalTickets]);

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
        // handleGameResults();
        console.log('Sequence Started Again');
    }

    async function handleGameResults() {
        const data = await getGameResult();
        setGameResult(data);
        console.log(data);
    }

    async function handleBetPlacement() {
        if (totalBet > 0 && gameTime > 10) {
            // const data = await placeBet(userName, passWord, totalTickets, totalBet, gameId);
            // if (data) {
            //     console.log('bet placed');
            // }
            console.log('bet place fn');
        }
    }

    async function cancelBet() {
        const data = cancelLastBet(lastBetBarCode);
        if (data) {
            console.log(data);
        }
    }

    const handleClearAllValues = () => {
        setButtonTrigger(true)
    }

    return (
        <>
            <section id="mc" className="mainContent">
                <div
                    className="container-fluid"
                    style={{ borderBottom: "1px solid red" }}
                >
                    <div className="gameWrapper">
                        <div className="row gameRow gx-2">
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
                                        <label id="timer">{gameTime}</label>
                                    </div>
                                </div>
                                <div id="background" className="mt-2" style={{ height: 497 }}>
                                    <div className="retardedSpinningShit position-relative">
                                        <div className="imgWrapper mx-auto">
                                            <img src={require('../Assets/images/background.png').default} />
                                        </div>
                                        <div className="imgWrapper2">
                                            <img id="card" src={require('../Assets/images/1.jpeg').default} />
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
                                            <tbody>
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
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='buttonsRow b'>
                                    <div className='btnItem'>
                                        <button className='gamebutton'>
                                            Stone
                                        </button>
                                    </div>
                                    <div className='btnItem'>
                                        <button className='gamebutton'>
                                            LuckyPik
                                        </button>
                                    </div>
                                </div>
                                <div className='buttonsRow'>
                                    <div className="btnItem">
                                        <button
                                            className="gamebutton"
                                            id="buybuttonXD"
                                            style={{ backgroundColor: "#eac697" }}
                                            onClick={handleBetPlacement}
                                        >
                                            F6-Buy
                                        </button>
                                    </div>
                                    <div className="btnItem">
                                        <button className="gamebutton" onClick={handleClearAllValues}>
                                            Clear(ESC)
                                        </button>
                                    </div>
                                    <div className="btnItem">
                                        <button className="gamebutton" onClick={cancelBet}>
                                            Cancel(F9)
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="headerRow">
                                    <div className="col-6 text-end">
                                        <label> P.No. </label>
                                        <label id="username" style={{ color: "#ce0b00", marginLeft: 5 }}>
                                            {userName}
                                        </label>
                                        <div>
                                            <label id="balance" style={{ color: "#ce0b00" }}>
                                                {" "}
                                                00000{" "}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-3 ms-auto">
                                        {/* <label> Time :</label>
                                        <label id="realtime">&nbsp;&nbsp;{time}</label> */}
                                        <div className='analogClock d-flex justify-content-center'>
                                            <Clock value={time} size={85} renderNumbers={true} />
                                        </div>
                                    </div>
                                    <div className="col-auto text-end">
                                        {/* <button
                                            className="text-white border-0"
                                            style={{ backgroundColor: "red", fontSize: 18 }}
                                        >
                                            Change Password
                                        </button> */}
                                        <div className='imgWrapper status'>
                                            <img src={require('../Assets/images/lightbulb.png').default} />
                                        </div>
                                    </div>
                                </div>
                                <BetTable onTotalBetChange={handleTotalBetChange} onTotalTicketsChange={handleTotalTicketsChange} buttonTrigger={buttonTrigger} onClearAllValues={() => setButtonTrigger(false)} />
                                <div className='col-md-11 ms-auto'>
                                    <div className='buttonsRow' style={{ marginTop: '-18px' }}>
                                        <div>
                                            <label className='totalBet'>
                                                {totalBet}
                                            </label>
                                        </div>
                                        <div className='ms-2'>
                                            <label className='totalBet' style={{ backgroundColor: '#00ff00' }}>
                                                {totalBet}
                                            </label>
                                        </div>
                                        <div className='ms-4 formWrapper align-items-center'>
                                            <div>
                                                <label>F8 Barcode-</label>
                                            </div>
                                            <div className='ms-2'>
                                                <input className="loginInput" type='text' value={barCodeSearch} onChange={(e) => setBarCodeSearch(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonsRow justify-content-end">
                                        <div className="btnItem" style={{ width: 70 }}>
                                            <button
                                                onClick={() => window.electronAPI.quitApp()}
                                                className="gamebutton"
                                                style={{ backgroundColor: "#ff0000" }}
                                            >
                                                Exit(X)
                                            </button>
                                        </div>
                                        <div className='btnItem' style={{ width: 120 }}>
                                            <button className="gamebutton" onClick={() => setReportTrigger(true)}>
                                                Purchase Details
                                            </button>
                                        </div>
                                        <div className='btnItem'>
                                            <button className="gamebutton">
                                                F7 Stones
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='popupWrapper'>
                        {reportTrigger ? <><button onClick={setReportTrigger(false)}>Close</button><ReportPanel /></> : ""}
                    </div>
                </div>
            </section>
        </>
    )
}

export default GameView