import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { systemServGet } from '../Globals/GlobalFunctions';

function Home() {
    const [clickConnect, setClickConnect] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const navigate = useNavigate();

    function checkInternetConnection() {
        const isOnline = navigator.onLine;
        if (isOnline) {
            setIsConnected(true);
            setNetworkError(false);
        } else {
            setNetworkError(true);
            setIsConnected(false);
        }
    }

    const triggerDriverChecker = () => {
        window.electronAPI.printDriver();
        console.log('test');
    }

    return (
        <main className="homeWrapper">
            <div className="wrapper p-5">
                <div className='position-absolute' style={{ top: 10, right: 50 }}>
                    <button
                        onClick={() => window.electronAPI.quitApp()}
                        className="homeBtn"
                    >
                        Exit
                    </button>
                </div>
                <div className="unlockForm">
                    {isConnected ? <div className="status">CONNECTED</div> : ""}
                    {networkError ? <div className="status text-danger">NETWORK ERROR</div> : ""}</div>
                <div className="buttonGroup row">
                    <div style={{ width: '16%' }}>
                        {isConnected ? <button className="homeBtn" onClick={() => { setIsConnected(false) }}>Dis-Connect</button> : <button className="homeBtn connect" onClick={() => checkInternetConnection()}>
                            Connect
                        </button>}
                    </div>
                    <div style={{ width: '16%' }}>
                        {isConnected ? <button className="homeBtn login transparent" onClick={() => navigate('/login')}>Login</button> : ""}
                    </div>
                    <div style={{ width: '16%' }}>
                        <button className="homeBtn transparent" onClick={() => { window.electronAPI.systemSettings()}}>System</button>
                    </div>
                    <div style={{ width: '16%' }}>
                        <button onClick={() => window.electronAPI.printDriver()} className="homeBtn transparent">Driver</button>
                    </div>
                    <div style={{ width: '16%' }}>
                        <button className="homeBtn transparent" onClick={() => window.electronAPI.systemRestart()}>Restart</button>
                    </div>
                    <div style={{ width: '16%' }}>
                        <button className="homeBtn transparent" onClick={() => window.electronAPI.systemShutdown()}>PowerOff</button>
                    </div>
                </div>
            </div>
        </main >

    )
}

export default Home