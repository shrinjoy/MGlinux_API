import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import "../src/Assets/bootstrap/bootstrap.min.css";
import "./index.css";
import GameView from "./Pages/GameView";
import Loader from "./Pages/Loader";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/main_window" element={<Loader />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route
          path="/login"
          Component={() => {
            window.location.href = "http://77.37.47.190:8084/#/login";
            return null;
          }}
        />
        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path="/game" element={<GameView />} /> */}
        <Route path="*" element={<Navigate to="/main_window" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
