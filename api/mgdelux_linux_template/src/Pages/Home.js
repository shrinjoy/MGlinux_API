import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [clickConnect, setClickConnect] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const navigate = useNavigate();

    return (
        <main className="homeWrapper">
            <div className="wrapper p-5">
                {clickConnect ? <div className="unlockForm">
                    {isConnected ? "" : <div className="formWrapper">
                        <div className="me-2">
                            <div>
                                <label className="py-3">UNLOCK</label>
                            </div>
                            <input type="text" />
                        </div>
                        <div>
                            <div>
                                <label className="fw-bold py-3">&nbsp;</label>
                            </div>
                            <div>
                                <button onClick={() => setIsConnected(true)}>UNLOCK</button>
                            </div>
                            <div>
                                <button>desktop</button>
                            </div>
                        </div>
                    </div>}
                    {isConnected ? <div className="status">CONNECTED</div> : ""}
                </div> : ""}
                <div className="buttonGroup row">
                    <div style={{ width: '20%' }}>
                        {isConnected ? <button className="homeBtn">Dis-Connect</button> : <button className="homeBtn connect" onClick={() => setClickConnect(true)}>
                            Connect
                        </button>}
                    </div>
                    <div style={{ width: '20%' }}>
                        {isConnected ? <button className="homeBtn login" onClick={() => navigate('/login')}>Login</button> : ""}
                    </div>
                    <div style={{ width: '20%' }} onClick={() => window.electronAPI.systemSettings()}>
                        <button className="homeBtn">System</button>
                    </div>
                    <div style={{ width: '20%' }} onClick={() => window.electronAPI.systemRestart()}>
                        <button className="homeBtn">Restart</button>
                    </div>
                    <div style={{ width: '20%' }}>
                        <button className="homeBtn" onClick={() => window.electronAPI.systemShutdown()}>PowerOff</button>
                    </div>
                </div>
            </div>
        </main >

    )
}

export default Home