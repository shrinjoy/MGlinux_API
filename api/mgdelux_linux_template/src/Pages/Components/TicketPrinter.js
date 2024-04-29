import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import TicketToPrint from './TicketToPrint';

function TicketPrinter({ title }) {
    console.log(title);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <button onClick={handlePrint} className='loginButton'>{title}</button>
            <TicketToPrint ref={componentRef} />
        </div>
    )
}

export default TicketPrinter