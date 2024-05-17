import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Loader() {
    const [value, setValue] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setValue(prevValue => {
                const newValue = prevValue + 10;
                if (newValue > 85) {
                    clearInterval(intervalId);
                    navigate('/home')
                }
                return newValue;
            });
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    const divs = Array.from({ length: value / 10 }, (_, index) => <div key={index}></div>)
    return (
        <div className='bg-dark' style={{ width: '100vw', height: '100vh' }}>
            <div className='spinner'>
                {divs}
                <label>{value}%</label>
            </div>
        </div>
    )
}

export default Loader