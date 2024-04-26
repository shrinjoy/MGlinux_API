import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import TicketToPrint from './TicketToPrint';

function TicketPrinter() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>

            <button onClick={handlePrint}>Print this out!</button>
            <TicketToPrint ref={componentRef} />
        </div>
    )
}

export default TicketPrinter