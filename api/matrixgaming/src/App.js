import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Home from "./Pages/Home.js";
import ResultPage from "./Pages/ResultPage.js";

function App() {
  const urlParam = useParams();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/jackpotresult`} element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
