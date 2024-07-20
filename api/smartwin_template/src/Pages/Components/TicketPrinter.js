import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import TicketToPrint from './TicketToPrint';

function TicketPrinter({ title }) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <button onClick={handlePrint} className='loginButton'>{title}</button>
            {/* <div className='d-none'><TicketToPrint ref={componentRef} /></div> */}
        </div>
    )
}

export default TicketPrinter