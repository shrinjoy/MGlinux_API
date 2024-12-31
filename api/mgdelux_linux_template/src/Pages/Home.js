import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { systemServGet } from "../Globals/GlobalFunctions";

function Home() {
  const [clickConnect, setClickConnect] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    const buttons = document.querySelectorAll('.homeBtn');
    let currentIndex = 0;

    // Function to update the active button
    function updateActiveButton(index) {
      buttons.forEach((button, i) => {
        if (i === index) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }

    // Initial active button
    updateActiveButton(currentIndex);

    // Event listener for keydown events
    const handleKeyDown = (event) => {
      const button = document.querySelector('.homeBtn.active');
      if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % buttons.length;
      } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      } else if ((event.code === 'Space' || event.key === 'Enter' || event.code === 'space' || event.key === 'enter') && button) {
        button.click()
      }
      updateActiveButton(currentIndex);
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // useEffect for handling mouseover to remove 'active' class
  useEffect(() => {
    const buttons = document.querySelectorAll('.homeBtn');

    const handleMouseOver = () => {
      buttons.forEach(button => {
        button.classList.remove('active');
      });
    };

    // Attach mouseover event listeners to each button
    buttons.forEach(button => {
      button.addEventListener('mouseover', handleMouseOver);
    });

    // Cleanup mouseover event listeners on component unmount
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseover', handleMouseOver);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <main className="homeWrapper">
      <div className="wrapper p-5">
        <div className='position-absolute' style={{ top: 10, right: 10 }}>
          <label>Ver 2.1</label>
        </div>
        <div className="unlockForm">
          {error ? <div className="status">PLEASE CONNECT FIRST</div> : ""}
          {isConnected ? <div className="status">CONNECTED</div> : ""}
          {networkError ? (
            <div className="status text-danger">ERROR 1001</div>
          ) : (
            ""
          )}
        </div>
        <div className="buttonGroup row">
          <div style={{ width: "16%" }}>
            {isConnected ? (
              <button
                className="homeBtn transparent"
                onClick={() => {
                  setIsConnected(false);
                }}
              >
                Dis-Connect
              </button>
            ) : (
              <button
                className="homeBtn connect transparent"
                onClick={() => checkInternetConnection()}
              >
                Connect
              </button>
            )}
          </div>
          <div style={{ width: "16%" }}>
            <button
              className="homeBtn login transparent"
              onClick={handleLoginNavigation}
            >
              Login
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              className="homeBtn transparent"
              onClick={() => window.electronAPI.systemSettings()}
            >
              System
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              className="homeBtn transparent"
              onClick={() => window.electronAPI.printDriver()}
            >
              Init
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
              className="homeBtn transparent"
              onClick={() => window.electronAPI.systemRestart()}
            >
              Restart
            </button>
          </div>
          <div style={{ width: "16%" }}>
            <button
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
