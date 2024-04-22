import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import '../src/Assets/bootstrap/bootstrap.min.css'
import './index.css'
import GameView from './Pages/GameView';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main_window" element={<GameView />} />
                <Route path='/login' element={<Login />} />
                <Route path="/game" element={<GameView />} />
                <Route path="*" element={<Navigate to="/main_window" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App