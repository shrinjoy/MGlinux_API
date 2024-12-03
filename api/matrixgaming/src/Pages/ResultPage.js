import React, { useState } from 'react'

function ResultPage() {
    const [searchDate, setSearchDate] = useState();
    const [searchGame, setSearchGame] = useState();
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

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResultPage