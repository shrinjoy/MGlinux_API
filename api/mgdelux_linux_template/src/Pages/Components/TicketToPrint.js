import React, { forwardRef } from 'react';

const TicketToPrint = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <div>Some Data</div>
            <div>Some Data</div>
            <div>Some Data</div>
            <div>Some Data</div>
            <div>Some Data</div>
            <div>Some Data</div>
        </div>
    );
});

export default TicketToPrint;
