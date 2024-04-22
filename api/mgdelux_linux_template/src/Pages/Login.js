import React, { useContext, useState } from 'react'
import { verNo } from '../Globals/GlobalMetaData';
import { login } from '../Globals/GlobalFunctions';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';

function Login() {
    const { userName, setUserName, setPassWord } = useContext(DataContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [userMacId, setUserMacId] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function checkLogin() {
        if (!username.trim()) {
            setError("Username is Missing");
        } else if (!password.trim()) {
            setError("Password is Missing");
        } else {
            const data = await login(userId, username, password, userMacId);
            if (data) {
                console.log(data);
                setUserName(username);
                setPassWord(password);
                navigate('/game');
            } else if (error) {
                setError("Incorrect Username/Password Entered!")
            }
        }
    }

    return (
        <main className='loginWrapper'>
            <div className='position-absolute top-0 col-12 d-flex justify-content-between px-2'>
                <div>
                    <label className='fw-bold'>Ver {verNo}</label>
                </div>
                <div>
                    <label className='fw-bold'>0000ACADGNRLNKNPRK</label>
                </div>
            </div>
            <div className='wrapper p-5'>
                <div className='formWrapper'>
                    <div className='col-12 '>
                        <div className='d-flex justify-content-center'>
                            <div className='col-1 me-2'>
                                <label>UserID</label>
                            </div>
                            <div>
                                <input type="text" className="loginInput" value={userId} onChange={(e) => setUserId(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 mt-2'>
                        <div className='d-flex justify-content-center'>
                            <div className='col-1 me-2'>
                                <label>Username</label>
                            </div>
                            <div>
                                <input type="text" className="loginInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 mt-2'>
                        <div className='d-flex justify-content-center'>
                            <div className='col-1 me-2'>
                                <label>Password</label>
                            </div>
                            <div>
                                <input type="password" className="loginInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 text-center'>
                        {error ? error : ""}
                    </div>
                    <div className='col-2 offset-1 mt-2'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <button className='loginButton' onClick={checkLogin}>Login</button>
                            </div>
                            <div>
                                <button className='loginButton'>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 text-center mt-3'>
                        <label>Welcome to Lottery Terminal</label>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login