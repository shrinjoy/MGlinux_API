import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { systemServGet } from "../Globals/GlobalFunctions";

function Home() {
  const [clickConnect, setClickConnect] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  const buttonRefs = useRef([]);
  buttonRefs.current = [];

  const addToRefs = (el) => {
    if (el && !buttonRefs.current.includes(el)) {
      buttonRefs.current.push(el);
    }
  };

  const handleKeyDown = (event) => {
    document.body.requestPointerLock();
    setIsPointerLocked(true);
    if (event.key === "ArrowLeft") {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + buttonRefs.current.length) %
          buttonRefs.current.length
      );
    } else if (event.key === "ArrowRight") {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % buttonRefs.current.length
      );
    }
  };
  const handleMouse = () => {
    if (isPointerLocked) {
      document.exitPointerLock();
      setIsPointerLocked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousemove", handleMouse);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousemove", handleMouse);
    };
  }, [isPointerLocked]);

  useEffect(() => {
    buttonRefs.current.forEach((button, index) => {
      if (index === activeIndex) {
        button.classList.add("active");
        button.focus();
      } else {
        button.classList.remove("active");
      }
    });
  }, [activeIndex]);

  const navigate = useNavigate();

  async function checkInternetConnection() {
    const res = await window.electronAPI.checkInternet();
    if (res) {
      setIsConnected(true);
      setNetworkError(false);
    } else {
      setIsConnected(false);
      setNetworkError(true);
    }
  }

  const triggerDriverChecker = () => {
    window.electronAPI.printDriver();
    console.log("test");
  };

  const handleLoginNavigation = () => {
    if (isConnected && !networkError) {
      navigate("/login");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <main className="homeWrapper">
      <div className="wrapper p-5">
        {/* <div className='position-absolute' style={{ top: 10, right: 50 }}>
                    <button
                        onClick={() => window.electronAPI.quitApp()}
                        className="homeBtn"
                    >
                        Exit
                    </button>
                </div> */}
        <div className="unlockForm">
          {error ? <div className="status">PLEASE CONNECT FIRST</div> : ""}
          {isConnected ? <div className="status">CONNECTED</div> : ""}
          {networkError ? (
            <div className="status text-danger">ERROR 1004</div>
          ) : (
            ""
          )}
        </div>
        <div className="buttonGroup row">
          <div style={{ width: "16%" }}>
            {isConnected ? (
              <button
                ref={addToRefs}
                className="homeBtn transparent"
                onClick={() => {
                  setIsConnected(false);
                }}
              >
                Dis-Connect
              </button>
            ) : (
              <button
                ref={addToRefs}
                className="homeBtn transparent"
                onClick={() => checkInternetConnection()}
              >
                Connect
              </button>
            )}
          </div>
          <div style={{ width: "16%" }}>
            <button
              ref={addToRefs}
              className="homeBtn transparent"
              onClick={handleLoginNavigation}
            >
              Login
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              ref={addToRefs}
              className="homeBtn transparent"
              onClick={() => window.electronAPI.systemSettings()}
            >
              System
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              ref={addToRefs}
              className="homeBtn transparent"
              onClick={() => window.electronAPI.printDriver()}
            >
              Init
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              ref={addToRefs}
              className="homeBtn transparent"
              onClick={() => window.electronAPI.systemRestart()}
            >
              Restart
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              ref={addToRefs}
              className="homeBtn transparent"
              onClick={() => window.electronAPI.systemShutdown()}
            >
              PowerOff
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
