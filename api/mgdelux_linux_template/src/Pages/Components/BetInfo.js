import React from 'react'
import TicketPrinter from './TicketPrinter'

function BetInfo({ onClose }) {
    return (
        <div className='reportPanel'>
            <div className='topPart'>
                <div className='formWrapper'>
                    <div>
                        <label>Select</label>
                    </div>
                    <div className='ms-2'>
                        <select>
                            <option>Current</option>
                        </select>
                    </div>
                </div>
                <div className='formWrapper ms-3'>
                    <div>
                        <button className='loginButton'>
                            Show
                        </button>
                    </div>
                </div>
                <div className='formWrapper mx-auto'>
                    <div>
                        <button className='loginButton'>
                            Re Sync
                        </button>
                    </div>
                    <div className='ms-2'>
                        <TicketPrinter title={"Re-Print"} />
                    </div>
                    <div className='ms-2'>
                        <button className='loginButton'>
                            Cancel
                        </button>
                    </div>
                    <div className='ms-2'>
                        <button className='loginButton'>
                            Claim
                        </button>
                    </div>
                    <div className='ms-2'>
                        <button className='loginButton'>
                            All Claim
                        </button>
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
                                <th>Ticket No.</th>
                                <th>Date</th>
                                <th>Drow Time</th>
                                <th>Entry Time</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123456789</td>
                                <td>01-11-1001</td>
                                <td>11:11</td>
                                <td>11:01</td>
                                <td>111</td>
                                <td>PENDING</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BetInfo