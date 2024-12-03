import React, { useState } from 'react'
import { convertGameIdToTime, getStoneDetails } from './Globals/globalFunction';

function ResultPage() {
    const [searchDate, setSearchDate] = useState();
    const [searchGame, setSearchGame] = useState();

    const [stoneDetails, setStoneDetails] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getStoneDetails().then((data) => {
            setStoneDetails(data);
        });

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
        if (stoneDetails) {
            setFilteredData(Object.values(stoneDetails));
        }
    }, [stoneDetails]);


    return (
        <>
            <section className='resultPage'>
                <div className='container'>
                    <div className='row'>
                        <div className='d-flex'>
                            <div className='col-6'>
                                <input type='date' value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                            </div>
                            <div className='col-6'>
                                <select value={searchGame} onChange={(e) => setSearchGame(e.target.value)}>
                                    <option value={"2Digit2"}>2 Digit 2</option>
                                </select>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Result</th>
                                <th>Bonus</th>
                            </thead>
                            <tbody>
                                {filteredData
                                    ? filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{convertGameIdToTime(item?.gameID)}</td>
                                            <td className="text-center">{item?.gameTime}</td>
                                            <td className="text-center">{item?.gameResult}</td>
                                            <td className="text-center">{item?.gameMultiplier}</td>
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