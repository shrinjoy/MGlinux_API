import React, { forwardRef, useContext, useEffect, useState } from 'react';
import Barcode from 'react-barcode'
import { DataContext } from '../../Context/DataContext';

const TicketToPrint = forwardRef((props, ref) => {
    const { isClaim } = props;
    const { ticketData } = useContext(DataContext)
    const [ticketArr, setTicketArr] = useState();
    useEffect(() => {
        const tempArr = ticketData.ticketNumbers.replace(/,+$/, '');
        const tempTicketArr = tempArr.trim().split(',');
        setTicketArr(tempTicketArr);
    }, [])
    return (
        <div ref={ref} className='ticket'>
            <div className='container'>
                {!isClaim ? <div className='row'>
                    <div className='heading text-center'>
                        <h3>Metro Deluxe</h3>
                    </div>
                    <div className='col-6 text-start'>
                        <div><label>Ack: {ticketData.barcode}</label></div>
                        <div><label>{ticketData.gameID}: {new Date(ticketData.gameDate).toLocaleDateString()}-{new Date(ticketData.gameTime).toLocaleTimeString('en-US', { timeZone: 'UTC' })}</label></div>
                    </div>
                    <div className='col-6 text-end'>
                        <div><label>PosID: {ticketData.posID}</label></div>
                        <div><label>STONE GROUP: MG</label></div>
                    </div>
                    <div className='listType'>
                        <ul>
                            {ticketArr ? ticketArr.map((item, index) => (
                                <li key={index}>{item.slice(0, 4)} * {item.slice(5)}</li>
                            )) : ""}
                        </ul>
                    </div>
                    <div className='text-center'>
                        <label>Qty: {ticketData.totalQty} Total Pts: {ticketData.totalQty} {new Date(ticketData.drawTime).toLocaleTimeString('en-US', { timeZone: 'UTC' })}</label>
                    </div>
                    <div className='text-center'>
                        <Barcode value={ticketData.barcode} height={60} width={1} />
                    </div>
                </div> :
                    <div className='row'>
                        <div className='heading text-center'>
                            <h3>Claimed</h3>
                        </div>
                        <div className='col-12 text-start'>
                            <div><label>Metro Deluxe {new Date(ticketData.gameDate).toLocaleDateString()}-{new Date(ticketData.gameTime).toLocaleTimeString('en-US', { timeZone: 'UTC' })}</label></div>
                            <div><label>{ticketData.posID} Bar: {ticketData.barcode}</label></div>
                        </div>
                        <div className='col-6'>
                            <div><label>Prize Claim Points</label></div>
                        </div>
                        <div className='col-6'>
                            <div><label>{ticketData.winPoints} Pts.</label></div>
                        </div>
                    </div>}
            </div>
        </div>
    );
});

export default TicketToPrint;
