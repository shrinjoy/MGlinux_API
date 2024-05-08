import React, { useState } from 'react'
import TicketPrinter from './TicketPrinter'

function StoneInfo({ onClose }) {
    const [barCodeSearch, setBarCodeSearch] = useState('');
    return (
        <div className='reportPanel'>
            <div className='topPart'>
                <div className='formWrapper'>
                    <div>
                        <label>Date</label>
                    </div>
                    <div className='ms-2'>
                        <select>
                            <option>Current</option>
                        </select>
                    </div>
                </div>
                <div className='formWrapper ms-3'>
                    <div>
                        <label>Select</label>
                    </div>
                    <div className='ms-2'>
                        <input className="loginInput" type='text' value={barCodeSearch} onChange={(e) => setBarCodeSearch(e.target.value)} />
                    </div>
                </div>
                <div className='formWrapper ms-3'>
                    <div>
                        <button className='loginButton'>
                            Show
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
                            <tr>
                                <td className='text-center'>21</td>
                                <td className='text-center'>01/02/2024 04:20:00 PM</td>
                                <td className='text-center'>J05</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StoneInfo