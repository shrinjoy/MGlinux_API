import React, { useEffect, useState } from 'react'
import TicketPrinter from './TicketPrinter'
import { getStoneDetails } from '../../Globals/GlobalFunctions';

function StoneInfo({ onClose }) {
    const [gameSearch, setGameSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');
    const [stoneDetails, setStoneDetails] = useState({});
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        getStoneDetails()
            .then(data => {
                setStoneDetails(data);

            })
    }, [])

    useEffect(() => {
        if (stoneDetails) {
            setFilteredData(Object.values(stoneDetails));
        }
    }, [stoneDetails])


    const handleSearch = () => {
        if (gameSearch.trim === "" || !gameSearch) {
            setFilteredData(Object.values(stoneDetails));
        } else {
            if (searchCriteria === 'gameID') {
                const searchData = Object.values(stoneDetails).filter(item => item.gameID === gameSearch);
                setFilteredData(searchData);
            } else if (searchCriteria === 'result') {
                const searchData = Object.values(stoneDetails).filter(item => item.gameResult === gameSearch);
                setFilteredData(searchData);
            }
        }
    }

    return (
        <div className='reportPanel'>
            <div className='topPart'>
                <div className='formWrapper'>
                    <div>
                        <label>Select</label>
                    </div>
                    <div className='ms-2'>
                        <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                            <option value={'gameID'}>Game ID</option>
                            <option value={'result'}>Result</option>
                        </select>
                    </div>
                </div>
                <div className='formWrapper ms-3'>
                    <div>
                        <label>Search</label>
                    </div>
                    <div className='ms-2'>
                        <input className="loginInput" type='text' value={gameSearch.trim()} onChange={(e) => setGameSearch(e.target.value)} />
                    </div>
                </div>
                <div className='formWrapper ms-3'>
                    <div>
                        <button className='loginButton' onClick={() => handleSearch()}>
                            {gameSearch ? "Show" : "Reset"}
                        </button>
                    </div>
                    <div className='ms-2'>
                        <TicketPrinter title={"Re-Print"} />
                    </div>
                </div>
                <div className='formWrapper ms-auto'>
                    <div>
                        <button className='loginButton' onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
            <div className='botPart mt-2'>
                <div style={{ height: '75vh', backgroundColor: '#9d9d9d', overflow: 'auto' }}>
                    <table className='betInfoTable' style={{ height: 'auto' }}>
                        <thead>
                            <tr>
                                <th>Game Result</th>
                                <th>Game Time</th>
                                <th>Game Event Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData ? filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{item.gameResult}</td>
                                    <td className='text-center'>{item.gameTime}</td>
                                    <td className='text-center'>{item.gameID}</td>
                                </tr>
                            )) : "Loading..."}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StoneInfo