import React from 'react'
import TicketPrinter from './TicketPrinter'

function ReportPanel() {
    return (
        <div className='reportPanel'>
            <div><h1>Report Panel</h1></div>
            <div>
                <TicketPrinter />
            </div>
        </div>
    )
}

export default ReportPanel