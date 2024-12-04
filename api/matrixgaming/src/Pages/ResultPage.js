import React, { useEffect, useState } from 'react'
import { convertGameIdToTime, getGameResultWithMulti, getStoneDetails } from './Globals/globalFunction';

function ResultPage() {
    const [searchDate, setSearchDate] = useState();
    const [searchGame, setSearchGame] = useState();

    const [stoneDetails, setStoneDetails] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [gameResultMulti, setGameResultMulti] = useState([]);

    async function handleGetAllResult() {
        if (searchDate && searchGame) {
            getStoneDetails().then((data) => {
                setStoneDetails(data);
            });
            const multiData = await getGameResultWithMulti();
            setGameResultMulti(multiData.data.sort((a, b) => b.INTNUMBER - a.INTNUMBER));
        }
    }

    useEffect(() => {
        // getStoneDetails().then((data) => {
        //     setStoneDetails(data);
        // });

        const getFormattedDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = ("0" + (d.getMonth() + 1)).slice(-2);
            const day = ("0" + d.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        };
        setSearchDate(getFormattedDate(new Date()));
    }, []);

    useEffect(() => {
        if (stoneDetails && gameResultMulti) {
            setFilteredData(stoneDetails.map((item, index) => ({
                ...item,
                multiplier: gameResultMulti[index]?.XDETAILS || 0
            })));
        }
    }, [stoneDetails, gameResultMulti]);


    return (
        <>
            <style>
                {`
                body{
                    background-color: rgba(20, 20, 20, 1.0);
                }   
            `}
            </style>
            <section className='resultPage'>
                <div className='container'>
                    <div className='row'>
                        <div className="header">Jackpot</div>
                        <div className='searchPanel'>
                            <div className='col-4'>
                                <input type='date' value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                            </div>
                            <div className='col-4'>
                                <select value={searchGame} onChange={(e) => setSearchGame(e.target.value)}>
                                    <option >Select Game</option>
                                    <option value={"2Digit2"}>2 Digit 2</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <button onClick={handleGetAllResult}>Search</button>
                            </div>
                        </div>
                        <table className='table table-bordered table-condensed'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Result</th>
                                    <th>Bonus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData
                                    ? filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{item?.gameTime.split(" ")[0]}</td>
                                            <td className="text-center">{item?.gameTime.split(" ")[1]}</td>
                                            <td className="text-center">{item?.gameResult}</td>
                                            <td className="text-center">{item?.multiplier > 0 ? <span>{item?.multiplier}B</span> : ""}</td>
                                        </tr>
                                    ))
                                    : "Loading..."}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResultPage