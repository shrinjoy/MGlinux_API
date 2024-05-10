import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import '../src/Assets/bootstrap/bootstrap.min.css'
import './index.css'
import GameView from './Pages/GameView';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/main_window" element={<Home />} />
                <Route path='/login' Component={() => { window.location.href = "http://193.203.163.194:8082/#/login"; return null; }} />
                {/* <Route path="/game" element={<GameView />} /> */}
                <Route path="*" element={<Navigate to="/main_window" />} />
            </Routes>
        </HashRouter>
    )
}

export default App