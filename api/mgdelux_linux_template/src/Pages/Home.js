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
        } else {
            setNetworkError(true);
            setIsConnected(false);
        }
    }

    return (
        <main className="homeWrapper">
            <div className="wrapper p-5">
                <div className='position-absolute' style={{ top: 10, right: 10 }}>
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
                    <div style={{ width: '20%' }}>
                        {isConnected ? <button className="homeBtn" onClick={() => { setIsConnected(false) }}>Dis-Connect</button> : <button className="homeBtn connect" onClick={() => checkInternetConnection()}>
                            Connect
                        </button>}
                    </div>
                    <div style={{ width: '20%' }}>
                        {isConnected ? <button className="homeBtn login" onClick={() => navigate('/login')}>Login</button> : ""}
                    </div>
                    <div style={{ width: '20%' }}>
                        <button className="homeBtn" onClick={() => { window.electronAPI.systemSettings(); window.open('http://localhost:631/admin', '_blank') }}>System</button>
                    </div>
                    <div style={{ width: '20%' }}>
                        <button className="homeBtn" onClick={() => systemServGet("restart")}>Restart</button>
                    </div>
                    <div style={{ width: '20%' }}>
                        <button className="homeBtn" onClick={() => systemServGet("shutdown")}>PowerOff</button>
                    </div>
                </div>
            </div>

        </main >

    )
}

export default Home