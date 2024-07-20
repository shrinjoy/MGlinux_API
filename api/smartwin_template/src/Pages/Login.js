import React, { useContext, useEffect, useState } from "react";
import { verNo } from "../Globals/GlobalMetaData";
import {
  checkMacId,
  checkMacIdByMac,
  login,
  updateMacId,
} from "../Globals/GlobalFunctions";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { FadeLoader } from "react-spinners";

function Login() {
  const { userName, setUserName, setPassWord, setUserId } =
    useContext(DataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userIdForm, setUserIdForm] = useState("");
  const [userMacId, setUserMacId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMacId, setIsMacId] = useState(true);

  const navigate = useNavigate();

  // Loader
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });

  // Deriving User Mac ID
  useEffect(() => {
    async function getMacAddress() {
      const res = await window.electronAPI.getMacAddress();
      // const res = await systemServGet('getmac')
      if (res) {
        setUserMacId(res);
        console.log(res);
      }
    }
    getMacAddress();
    checkMacIdAuth();
  }, [userMacId]);

  // Check Mac ID
  async function checkMacIdAuth() {
    const data = await checkMacIdByMac(userMacId);
    // const data = await window.electronAPI.checkHardMac();
    // console.log(data);
    if (data) {
      setIsMacId(true);
    } else {
      setIsMacId(false);
    }
  }

  // Update Mac ID
  async function handleMacIdAuth() {
    if (!username.trim()) {
      setError("Username is Missing");
      setTimeout(setError, 2000, "");
    } else {
      const data = await updateMacId(username, userMacId.toString());
      if (data && data.message.includes("updated mac id")) {
        setIsMacId(true);
      }
    }
  }

  // Handle Login
  async function checkLogin() {
    if (!username.trim()) {
      setError("Username is Missing");
      setTimeout(setError, 2000, "");
    } else if (!password.trim()) {
      setError("Password is Missing");
      setTimeout(setError, 2000, "");
    } else {
      const data = await login(
        userIdForm,
        username,
        password,
        userMacId.toString()
      );
      if (data && data.data.message.includes("macid_wrong")) {
        setError("MAC ID Mismatch");
        setTimeout(setError, 2000, "");
      } else if (data) {
        setUserName(username);
        setPassWord(password);
        setUserId(userIdForm);
        navigate("/game");
      } else {
        setError("Network Error!");
        setTimeout(setError, 2000, "");
      }
    }
  }

  return isLoading ? (
    <div className="loader">
      <FadeLoader color="#454545" />
    </div>
  ) : (
    <main className="loginWrapper">
      <div className="position-absolute top-0 col-12 d-flex justify-content-between px-2">
        <div>
          <label className="fw-bold">Ver {verNo}</label>
        </div>
        <div>
          <label className="fw-bold">
            {userMacId
              ? userMacId.replace(/:/g, "").toUpperCase()
              : "Mac ID Not Found!"}
          </label>
        </div>
      </div>
      <div className="wrapper p-5">
        {!isMacId ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="formWrapper">
              <div className="loginHeading">TERMINAL REGISTRATION</div>
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <div className="col-auto me-2">
                    <label>Username: </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="loginInput"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-2 offset-1 mt-2">
                <div className="d-flex justify-content-between">
                  <div>
                    <button className="loginButton" onClick={handleMacIdAuth}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={isMacId ? "d-flex align-items-center h-100" : "d-none"}
          >
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
                <div className="d-flex justify-content-center">
                  <div className="col-1 me-2">
                    <label>Username</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="loginInput"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="d-flex justify-content-center">
                  <div className="col-1 me-2">
                    <label>Password</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      className="loginInput"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 text-center text-danger fw-bold">
                {error ? error : ""}
              </div>
              <div className="col-2 offset-1 mt-2">
                <div className="d-flex justify-content-between">
                  <div>
                    <button className="loginButton" onClick={checkLogin}>
                      Login
                    </button>
                  </div>
                  <div>
                    <button
                      className="loginButton"
                      onClick={() => window.electronAPI.backToHome()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-3">
                <label>Welcome to Lottery Terminal</label>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Login;
