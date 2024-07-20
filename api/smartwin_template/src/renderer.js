import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./Context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<DataProvider><App /></DataProvider>);