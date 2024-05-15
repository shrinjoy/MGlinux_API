import React, { forwardRef } from 'react';
import Barcode from 'react-barcode'

const TicketToPrint = forwardRef((props, ref) => {
    return (
        <div ref={ref} className='ticket'>
            <div className='row'>
                <div className='heading'>
                    <h3>Metro Deluxe</h3>
                </div>
                <div className='col-6 text-start'>
                    <div><label>Ack: PLACEBARCODE</label></div>
                    <div><label>GAMEID: DATETIME</label></div>
                </div>
                <div className='col-6 text-end'>
                    <div><label>PosID: TERMINALID</label></div>
                    <div><label>STONE GROUP: MG</label></div>
                </div>
                <div className='text-center'>
                    <label>Qty: 170 Total Pts: 170 11:27:06 AM</label>
                </div>
                <div>
                    <Barcode value="barcode-example" />
                </div>
            </div>
        </div>
    );
});

export default TicketToPrint;
