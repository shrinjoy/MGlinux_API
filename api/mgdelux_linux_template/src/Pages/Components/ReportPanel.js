import React from 'react'
import TicketPrinter from './TicketPrinter'

function ReportPanel({ onClose }) {
    return (
        <div className='reportPanel'>
            <div className='topPart'>
                <div className='formWrapper'>
                    <div>
                        <label>From:</label>
                    </div>
                    <div className='ms-2'>
                        <select>
                            <option>Saturday . January</option>
                        </select>
                    </div>
                </div>
                <div className='formWrapper ms-2'>
                    <div>
                        <label>To:</label>
                    </div>
                    <div className='ms-2'>
                        <select>
                            <option>Sunday . April</option>
                        </select>
                    </div>
                </div>
                <div className='formWrapper ms-3'>
                    <div>
                        <button className='loginButton'>
                            Show
                        </button>
                    </div>
                    <div className='ms-2'>
                        <TicketPrinter title={"Print"} />
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
                <div className='row p-2'>
                    <div className='col-6'>
                        <div className='detailsWrapper'>
                            <div className='heading'>
                                Game Report
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='detailsWrapper'>
                            <div className='heading'>
                                Point Report
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportPanel