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
                <div>
                    <table className='betInfoTable' style={{ height: '75vh', backgroundColor: '#9d9d9d' }}>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BetInfo