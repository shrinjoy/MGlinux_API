import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { brand, verNo } from "../Globals/GlobalMetaData";
import {
  audioPlayer,
  checkMacIdExist,
  getCurrentTime,
  login,
  updateMacId,
} from "../Globals/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function Login() {
  const [userMacId, setUserMacId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Will always True
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [time, setTime] = useState(getCurrentTime());
  const [currentDate, setCurrentDate] = useState("");
  const [userIdForm, setUserIdForm] = useState("");
  const [error, setError] = useState("");
  const [isMacRegistered, setIsMacRegistered] = useState(false);
  const [isMacId, setIsMacId] = useState(true); // Will Stay True
  const passwordInput = useRef();
  const timeRef = useRef(time);
  const [loginMsg, setLoginMsg] = useState("Welcome to Lottery Terminal");
  const [userStore, setUserStore] = useState(false);

  const navigate = useNavigate();

  // const userStore = localStorage.getItem("username");
  // const passStore = localStorage.getItem("password");

  // Loader
  // useEffect(() => {
  //     setTimeout(() => {
  //         setIsLoading(false)
  //     }, 2500)
  // })

  useEffect(() => {
    const updateClock = () => {
      const currentTime = getCurrentTime();
      if (currentTime !== timeRef.current) {
        timeRef.current = currentTime;
        setTime(currentTime);
      }
    };
    const intervalId = setInterval(updateClock, 1000);
    // Initial update to prevent lag
    updateClock();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getFormattedDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
    setCurrentDate(getFormattedDate(new Date()));
  }, []);

  // Deriving User Mac ID
  useEffect(() => {
    async function getMacAddress() {
      const res = await window.electronAPI.getMacAddress();
      // const res = await systemServGet('getmac')
      if (res) {
        setUserMacId(res);
        if (userMacId) {
          setIsLoading(false);
          // Remove the Following Comment & Delete the setIsLoading To Start Registration Function LOL
          // checkMacIdAuth();
        }
      }
    }
    getMacAddress();
    setTimeout(() => {
      if (passwordInput.current) {
        passwordInput.current.focus();
      }
    }, 200);
  }, [userMacId]);

  // Check Mac ID
  async function checkMacIdAuth() {
    const data = await checkMacIdExist(userStore);
    // const data = await checkMacIdByMac(userStore, userMacId);
    // const data = await window.electronAPI.checkHardMac();
    // console.log(data);
    if (data && data === userMacId) {
      setIsMacId(true);
      setIsLoading(false);
      setTimeout(() => {
        if (passwordInput.current) {
          passwordInput.current.focus();
        }
      }, 200);
    } else {
      setIsMacId(false);
      setIsLoading(false);
    }
  }

  // Update Mac ID
  async function handleMacIdAuth() {
    if (!username.trim()) {
      setError("Username is Missing");
      setTimeout(setError, 2000, "");
    } else if (!userMacId.trim()) {
      checkMacIdAuth();
    } else {
      const data = await updateMacId(username, userMacId.toString());
      if (data && data.message.includes("updated mac id")) {
        setIsMacRegistered(true);
        setTimeout(() => {
          setIsMacId(true);
        }, 2000);
      }
    }
  }

  // Reset Mac ID
  async function resetMacId() {
    const data = await login("9903", password, userMacId.toString());
    if (data) {
      navigate("/");
      localStorage.clear();
      window.electronAPI.deleteCredentials();
    }
  }

  // Handle Remember Credentials
  useEffect(() => {
    async function fetchCredentials() {
      const data = await window.electronAPI?.fetchCredentials();
      if (data) {
        setUsername(data.username);
        // setPassword(data.password);
        setUserStore(true);
      }
    }
    fetchCredentials();
  }, []);

  // Handle Login
  async function checkLogin() {
    setLoginMsg("Checking Game Info, Please Wait...");
    if ((!username.trim() && !password.trim()) || !password.trim()) {
      setError("Missing Credentials");
      setTimeout(setError, 2000, "");
    } else if (password === "9903") {
      resetMacId();
    } else if (password === "0101") {
      const res = await window.electronAPI.minimizeWindow();
    } else {
      const data = await login(username, password, userMacId.toString());
      if (data && data.data.message.includes("macid_wrong")) {
        setError("Contact Camp Office");
        setTimeout(setError, 2000, "");
      } else if (data) {
        // localStorage.setItem("username", username);
        // localStorage.setItem("password", password);
        window.electronAPI.saveCredentials(username, password);
        // setUserId(userIdForm)
        if (brand === "JackPot") {
          window.location.href = "http://game.matrixgaming.in:8084/#/games/2digit2";
        } else {
          window.location.href = "http://game.matrixgaming.in:8086/#/lobby";
        }
      } else {
        setError("Network Error");
        setTimeout(setError, 2000, "");
        setPassword("");
      }
    }
  }

  const handleKeyPress = useCallback(
    (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Prevent CTRL+SHIFT+ESC
      if (ctrl && shift && key === "escape") {
        event.preventDefault();
        alert("press");
        return;
      }

      // Prevent ALT+TAB
      if (alt && key === "tab") {
        event.preventDefault();
        alert("press");
        return;
      }

      switch (event.key) {
        case " ":
        case "Enter":
          audioPlayer(1, "KeyPress");
          if (!isMacId) {
            handleMacIdAuth();
            break;
          } else {
            checkLogin();
            break;
          }
        case "Escape":
          audioPlayer(1, "KeyPress");
          setUsername("");
          setPassword("");
          break;
        default:
          break;
      }
    },
    [handleMacIdAuth, checkLogin]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  // Handle Key Press
  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     const buyBtn = document.getElementById("loginBtn");
  //     if (event.key === "Enter" || event.code === "Enter") {
  //       if (buyBtn) {
  //         buyBtn.click();
  //       }
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyPress);
  // }, []);

  return isLoading ? (
    <div className="loader">
      <FadeLoader color="#454545" />
    </div>
  ) : (
    <>
      <style>
        {`
        body {
          margin: 0;
          background-color: rgb(255, 255, 255) !important;
          /* overflow: hidden; */
          width: 1024px;
          height: 100vh;
          position: relative;
          margin: auto !important;
        }

        body > * {
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}
      </style>
      <main className="loginWrapper">
        <img
          src={
            require(`../Assets/images/smnartwinlogin${brand === "JackPot" ? "JACK" : ""
              }.png`).default
          }
          className="loginImage"
        />
        <div
          className="position-absolute col-11 d-flex justify-content-between px-2"
          style={{ top: "0px", left: "50%", transform: "translate(-50%)" }}
        >
          <div>
            <label className="fw-bold text-white">Ver {verNo}</label>
          </div>
          <div>
            <label className="fw-bold text-white">
              {userMacId
                ? userMacId.replace(/:/g, "").toUpperCase()
                : "ERROR 1001"}
            </label>
          </div>
          <div className="logoWrapper">
            {/* <div className="imgWrapper">
            <img src={require(`../Assets/images/gamelogologin${brand === "JackPot" ? "JACK" : ""}.png`)} />
          </div> */}
            <div className="formWrapper justify-content-between">
              <div className="me-3">
                <label style={{ fontSize: "20px" }}>
                  Date - <span className="text-info">{currentDate}</span>
                </label>
              </div>
              <div>
                <label style={{ fontSize: "20px" }}>
                  Time - <span className="text-info">{time}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="loginFormWrapper">
          {!isMacId ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="formWrapper">
                <div className="loginHeading">
                  {isMacRegistered
                    ? "REGISTERED SUCCESSFULLY"
                    : "TERMINAL REGISTRATION"}
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-start">
                    <div className="col-4">
                      <label>Username: </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="loginInput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onCopy={(e) => preventCopyPaste(e)}
                        onPaste={(e) => preventCopyPaste(e)}
                        style={{ width: "150px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className="d-flex justify-content-between">
                    <div className="col-12">
                      <button
                        id="loginBtn"
                        className="loginButton"
                        onClick={handleMacIdAuth}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={"d-flex align-items-center h-100"}>
              <div className="formWrapper">
                {/* <div className='col-12 '>
                                <div className='d-flex justify-content-center'>
                                    <div className='col-1 me-2'>
                                        <label>UserID</label>
                                    </div>
                                    <div>
                                        <input type="text" className="loginInput" value={userIdForm} onChange={(e) => setUserIdForm(e.target.value)} />
                                    </div>
                                </div>
                            </div> */}
                <div className="col-12 mt-2">
                  <div className="d-flex justify-content-start">
                    <div className="col-4">
                      <label>Username :</label>
                    </div>
                    <div>
                      {userStore ? (
                        <label>{username}</label>
                      ) : (
                        <input
                          type="text"
                          className="loginInput"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onCopy={(e) => preventCopyPaste(e)}
                          onPaste={(e) => preventCopyPaste(e)}
                          disabled={userStore ? true : false}
                          style={{ cursor: userStore ? "default" : "none" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className="d-flex justify-content-start">
                    <div className="col-4">
                      <label>Password :</label>
                    </div>
                    <div>
                      <input
                        type="password"
                        className="loginInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onCopy={(e) => preventCopyPaste(e)}
                        onPaste={(e) => preventCopyPaste(e)}
                        ref={passwordInput}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center text-warning fw-bold">
                  {error ? error : ""}
                </div>
                <div className="col-12 mt-2">
                  <div className="d-flex justify-content-between">
                    <div className="col-6">
                      <button
                        className="loginButton"
                        onClick={() => {
                          setUsername("");
                          setPassword("");
                        }}
                      >
                        Clear (Esc)
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="loginButton"
                        id="loginBtn"
                        onClick={checkLogin}
                      >
                        Login (Enter)
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: "-30px" }}>
                  <label>{loginMsg}</label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="loginButtonsWrapper">
          <div
            className="btnImageWrapper"
            onClick={() => window.electronAPI.systemSettings()}
          >
            <img src={require("../Assets/images/settings.png").default} />
          </div>
          <div
            className="btnImageWrapper"
            onClick={() => window.electronAPI.systemRestart()}
          >
            <img src={require("../Assets/images/restart.png").default} />
          </div>
          <div
            className="btnImageWrapper"
            onClick={() => window.electronAPI.systemShutdown()}
          >
            <img src={require("../Assets/images/shutdown.png").default} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
