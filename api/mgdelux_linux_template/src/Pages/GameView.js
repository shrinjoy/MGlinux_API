import React, { useContext, useEffect, useRef, useState } from 'react'
import { cancelLastBet, claimBarcode, generateTicketByBarcode, getCurrentTime, getGameResult, getTimeLeft, getUserData, placeBet } from '../Globals/GlobalFunctions'
import { DataContext } from '../Context/DataContext';
import BetTable from './Components/BetTable';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import ReportPanel from './Components/ReportPanel';
import BetInfo from './Components/BetInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import StoneInfo from './Components/StoneInfo';
import ShowResult from './Components/ShowResult';
import { toastConfig } from '../Globals/GlobalMetaData';
import TicketToPrint from './Components/TicketToPrint';
import { useReactToPrint } from 'react-to-print';

function GameView() {
    const { userName, setUserName, passWord, userId, gameId, setGameId, userBalance, setUserBalance, lastBetBarCode, setLastBetBarCode, setNextGameDate, setNextGameTime, ticketData, setTicketData } = useContext(DataContext);
    const [time, setTime] = useState(getCurrentTime());
    const [gameTime, setGameTime] = useState(0);
    const [totalBet, setTotalBet] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);
    const [barCodeSearch, setBarCodeSearch] = useState('');
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [gameResult, setGameResult] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isClaim, setIsClaim] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const navigate = useNavigate();
    const ticketPrintRef = useRef();
    const barCodeSearchRef = useRef(null);
    // Simple Buttons
    const [clearTrigger, setClearTrigger] = useState(false);
    const [luckyTrigger, setLuckyTrigger] = useState(false);
    // Panel Show - Hide
    const [reportTrigger, setReportTrigger] = useState(false);
    const [betInfoTrigger, setBetInfoTrigger] = useState(false);
    const [stoneInfoTrigger, setStoneInfoTrigger] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // BarCode Scanner
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'b' || event.key === 'B') {
                event.preventDefault();
                if (barCodeSearchRef.current) {
                    barCodeSearchRef.current.focus();
                }
            }
            document.addEventListener('keydown', handleKeyPress);
        }
    }, [])

    // Close Report Panel
    const closeReportPanel = () => {
        setReportTrigger(false);
    };

    // Close Bet Info Panel
    const closeBetInfoPanel = () => {
        setBetInfoTrigger(false);
    };

    // Close Stone Info Panel
    const closeStoneInfoPanel = () => {
        setStoneInfoTrigger(false);
    };

    // Update Game Time
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    // Total Bet Handler
    const handleTotalBetChange = (value) => {
        setTotalBet(value);

    };

    // Total Ticket Array Handler
    const handleTotalTicketsChange = (tickets) => {
        setTotalTickets(tickets);
        // console.log(totalTickets);
    };

    // useEffect(() => {
    //     console.log(totalTickets);
    // }, [totalTickets]);

    // Update Game Result & Round Timer
    useEffect(() => {
        handleGameResults();
        updateUserData()
        getTimeLeft()
            .then(data => {
                setGameId(data.gameId);
                setNextGameDate(data.nextGameDate);
                setNextGameTime(data.nextGameTime);
                if (data.gameTime < 1 && !isTimerActive) {
                    setGameTime(0);
                } else {
                    setGameTime(data.gameTime);
                }
            })
    }, [isTimerActive]);

    useEffect(() => {
        let intervalId;
        if (isTimerActive) {
            intervalId = setInterval(() => {
                setGameTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setIsTimerActive(false);
                        handlePreTimerReset();
                        setTimeout(() => {
                            handleTimerReset();
                        }, 5000)
                        console.log('Stage 1 Done');
                        return 0;
                    }
                    return Math.max(prevTime - 1, 0);
                });
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isTimerActive]);

    const handlePreTimerReset = () => {
        // handleCurrentGameResult();
        setShowResult(true);
        handleGameResults();
    }

    // Timer Reset Function
    const handleTimerReset = () => {
        setIsTimerActive(true);
        setShowResult(false);
        // console.log('Sequence Started Again');
    }

    // Update Game Result Function
    async function handleGameResults() {
        const data = await getGameResult();
        setGameResult(data);
        // console.log(data);
    }

    // Update User Balance Function
    async function updateUserData() {
        const data = await getUserData(userName, passWord)
        if (data) {
            setUserBalance(data.balance);
        }
        else {
            toast.error("Error! Failed to load Balance!", toastConfig);
            setUserBalance(0);
        }
    }

    // async function handleCurrentGameResult() {
    //     const data = await getCurrentResult(gameId);
    //     console.log(data);
    // }

    // Bet Place Function
    async function handleBetPlacement() {
        setIsClaim(false)
        if (totalBet > 0 && gameTime > 10 && userBalance >= totalBet) {
            const toastId = toast.loading('Placing Bet, Please Wait!', {
                position: "top-center",
                hideProgressBar: false,
                theme: "colored"
            })
            const data = await placeBet(userName, passWord, totalTickets, totalBet, gameId);
            if (data && data.message) {
                setLastBetBarCode(data.barcode);
                toast.update(toastId, { render: "Bet Placed Successfully!", type: "success", isLoading: false, autoClose: 2000 });
                setClearTrigger(true);
                setUserBalance(parseInt(userBalance) - parseInt(totalBet));
                handleTicketPrint();
            } else {
                toast.update(toastId, { render: "Bet Failed!", type: "error", isLoading: false, autoClose: 2000 });
            }
        } else if (gameTime < 10) {
            toast.error("No Time Left!", toastConfig);
        } else if (totalBet === 0) {
            toast.error("Please Input Amount", toastConfig);
        } else if (userBalance < totalBet) {
            toast.error("Not enough balance!", toastConfig);
        }
    }

    // Cancel Bet Function
    async function cancelBet() {
        const data = await cancelLastBet(lastBetBarCode);
        const toastId = toast.loading('Cancelling Bet, Please Wait!', {
            position: "top-center",
            hideProgressBar: false,
            theme: "colored",
        })
        if (data && data.message) {
            toast.update(toastId, { render: "Bet Cancelled Successfully!", type: "success", isLoading: false, autoClose: 2000 });
            updateUserData();
        } else {
            toast.update(toastId, { render: "Bet Cancellation Failed!", type: "error", isLoading: false, autoClose: 2000 });
        }
    }

    // Barcode Claim Function
    async function handleBarcodeClaim() {
        setIsClaim(true)
        const toastId = toast.loading('Claiming Barcode, Please Wait!', {
            position: "top-center",
            hideProgressBar: false,
            theme: "colored"
        })
        const data = await claimBarcode(userId, barCodeSearch)
        if (data && data.amount) {
            toast.update(toastId, { render: "Barcode Claimed Successfully!", type: "success", isLoading: false, autoClose: 2000 });
            updateUserData();
        } else {
            toast.update(toastId, { render: "Barcode Claim Failed!", type: "error", isLoading: false, autoClose: 2000 });
        }
        setBarCodeSearch("")
    }

    // Clear Bet Table Function
    const handleClearAllValues = () => {
        setClearTrigger(true)
        const betFields = document.querySelectorAll('[data-old]');
        betFields.forEach((item) => {
            item.setAttribute("data-old", 0);
        })
    }

    // Random Bet Place Function
    const handleLuckyPik = () => {
        setLuckyTrigger(true)
    }

    // Convert Seconds to HH:MM:SS
    function secondsToHMS(gameTime) {
        const hours = Math.floor(gameTime / 3600);
        const minutes = Math.floor((gameTime % 3600) / 60);
        const remainingSeconds = gameTime % 60;

        // Format hours, minutes, and seconds to ensure they have two digits
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Game Left Side Spinning Shit
    const images = [
        { url: require("../Assets/images/1.jpeg").default },
        { url: require("../Assets/images/2.jpeg").default },
        { url: require("../Assets/images/3.jpeg").default },
        { url: require("../Assets/images/4.jpeg").default },
        { url: require("../Assets/images/5.jpeg").default },
        { url: require("../Assets/images/6.jpeg").default },
        { url: require("../Assets/images/7.jpeg").default },
        { url: require("../Assets/images/8.jpeg").default },
    ];

    async function handleTicketPrint() {
        const data = await generateTicketByBarcode(lastBetBarCode);
        if (data) {
            setTicketData(data);
            const res = await window.electronAPI.printFocusWindow();
        } else {
            toast.error("Error! Failed to load Ticket!", toastConfig);
        }
        // console.log("B2519329103379140e0f2")
    }

    // Redirect to Home if userName not available
    // useEffect(() => {
    //     if (!userName) {
    //         navigate('/main_window');
    //     }
    // })

    return (
        <>
            <section id="mc" className="mainContent">
                <div
                    className="container-fluid px-0"
                    style={{ borderBottom: "1px solid red" }}
                >
                    <div className="gameWrapper w-100">
                        <div className="row gameRow gx-0 col-12">
                            <div className="headerRow">
                                <div className="col-6 d-flex justify-content-center align-items-center">
                                    <h1>Metro Deluxe</h1>
                                </div>
                                <div className="col-3 text-end row align-items-center">
                                    <div>
                                        <label id="balance">
                                            {userBalance}
                                        </label>
                                    </div>
                                    <div>
                                        <label className='d-inline-block'> P.No. </label>
                                        <label id="username" style={{ marginLeft: 5, display: 'inline-block' }}>
                                            {userName}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2 ms-auto">
                                    {/* <label> Time :</label>
                                        <label id="realtime">&nbsp;&nbsp;{time}</label> */}
                                    <div className='analogClock d-flex justify-content-end'>
                                        <Clock value={time} size={80} renderNumbers={true} />
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
                                        <img src={require('../Assets/images/' + (isOnline ? 'lightbulbGreen.png' : 'lightbulbRed.png')).default} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 leftPane">
                                <div className="headerRow">
                                    <div className="col-6 text-center">
                                        <label style={{ fontSize: 12 }}>Game Gift Code</label>
                                        <label id="gameid" style={{ color: "blue" }}>
                                            {gameId}
                                        </label>
                                    </div>
                                    <div className="col-6 text-center">
                                        <label style={{ fontSize: 12 }}> Countdown </label>
                                        <label id="timer" style={{ color: gameTime < 7 ? 'red' : "" }}>{secondsToHMS(gameTime)}</label>
                                    </div>
                                </div>
                                <div id="background" className="mt-2">
                                    <div className="retardedSpinningShit position-relative">
                                        <div className="imgWrapper mx-auto">
                                            <img src={require('../Assets/images/background.png').default} />
                                        </div>
                                        <div className="imgWrapper2">
                                            <SimpleImageSlider
                                                width={185}
                                                height={185}
                                                images={images}
                                                showBullets={false}
                                                showNavs={false}
                                                autoPlay={true}
                                                slideDuration={0}
                                                autoPlayDelay={2}
                                                style={{ animation: 'sizeChange 1s infinite alternate ease-in-out' }}
                                            />
                                        </div>
                                    </div>
                                    <div id="res_sofar_div">
                                        <table
                                            style={{
                                                height: "auto",
                                                width: "100%",
                                            }}
                                            id="res_sofar_table">
                                            <tbody>
                                                {gameResult ? (
                                                    Object.entries(gameResult).reduce((rows, [key, value], index) => {
                                                        const rowIndex = Math.floor(index / 2); // Calculate the index of the current row
                                                        if (!rows[rowIndex]) rows[rowIndex] = []; // Initialize row if it doesn't exist
                                                        rows[rowIndex].push(
                                                            <td key={key}>{key}</td>,
                                                            <td key={value} className='text-white'>MD{value}</td>
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
                                <div className='buttonsRow b justify-content-start'>
                                    <div className='btnItem'>
                                        <button className='gamebutton' onClick={() => setBetInfoTrigger(true)}>
                                            Stone
                                        </button>
                                    </div>
                                    <div className='btnItem'>
                                        <button className='gamebutton' onClick={handleLuckyPik}>
                                            LuckyPik
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 rightPane">
                                <BetTable onTotalBetChange={handleTotalBetChange} onTotalTicketsChange={handleTotalTicketsChange} clearTrigger={clearTrigger} onClearAllValues={() => setClearTrigger(false)} luckyTrigger={luckyTrigger} onLuckyPick={() => setLuckyTrigger(false)} />
                                <div className='col-xl-12 ms-auto'>
                                    <div className='buttonsRow justify-content-end' style={{ marginTop: '5px' }}>
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
                                        <div className='ms-3 formWrapper align-items-center'>
                                            <div>
                                                <label style={{ fontWeight: 800 }}>F8 Barcode-</label>
                                            </div>
                                            <div className='ms-2'>
                                                <input className="loginInput" type='text' ref={barCodeSearchRef} value={`B${barCodeSearch}`} onChange={(e) => { setBarCodeSearch(e.target.value); setTimeout(() => handleBarcodeClaim(), 100) }} onKeyDown={(e) => { if (e.key === 'Enter') { handleBarcodeClaim() } }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='buttonsRow'>
                            <div className='d-flex justify-content-between'>
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
                                <div className="btnItem" style={{ width: 110 }}>
                                    <button className="gamebutton" onClick={handleTicketPrint}>
                                        Last Receipt
                                    </button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className="btnItem" style={{ width: 70 }}>
                                    <button
                                        onClick={() => window.electronAPI.quitApp()}
                                        className="gamebutton"
                                        style={{ backgroundColor: "#ff0000" }}
                                    >
                                        Exit(X)
                                    </button>
                                </div>
                                <div className='btnItem' style={{ width: 140 }}>
                                    <button className="gamebutton" onClick={() => setReportTrigger(true)} style={{ backgroundColor: '#ffddb8' }}>
                                        Purchase Details
                                    </button>
                                </div>
                                <div className='btnItem me-0'>
                                    <button className="gamebutton" onClick={() => setStoneInfoTrigger(true)} style={{ backgroundColor: '#ffddb8' }}>
                                        F7 Stones
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='popupWrapper'>
                        {reportTrigger ? <ReportPanel onClose={closeReportPanel} /> : ""}
                    </div>
                    <div className='popupWrapper'>
                        {betInfoTrigger ? <BetInfo onClose={closeBetInfoPanel} /> : ""}
                    </div>
                    <div className='popupWrapper'>
                        {stoneInfoTrigger ? <StoneInfo onClose={closeStoneInfoPanel} /> : ""}
                    </div>
                    <div>
                        {showResult ? <ShowResult /> : ""}
                    </div>
                </div>
            </section>
            <div className='ticketWrapper'>{ticketData ? <TicketToPrint ref={ticketPrintRef} isClaim={isClaim} /> : ""}</div>
            <ToastContainer />
        </>
    )
}

export default GameView