import React, { forwardRef, useContext, useEffect, useState } from 'react';
import Barcode from 'react-barcode'
import { DataContext } from '../../Context/DataContext';

const dateTimeTicketFormatter = (dateTime) => {
    const ogdate = dateTime.split('T')[0];
    const ogtime = dateTime.split('T')[1].split('.')[0];

    const formattedDate = ogdate.replace(/-/g, '');
    const formattedTime = ogtime.replace(/:/g, '');

    const combinedDateTime = formattedDate + formattedTime;

    return { combinedDateTime, ogtime }
}

const TicketToPrint = forwardRef((props, ref) => {
    const { isClaim } = props;
    const { ticketData } = useContext(DataContext)
    const [ticketArr, setTicketArr] = useState();
    useEffect(() => {
        const tempArr = ticketData.ticketNumbers.replace(/,+$/, '');
        const tempTicketArr = tempArr.trim().split(',');
        setTicketArr(tempTicketArr);
    }, [])

    useEffect(() => {
        console.log('ticketArr', ticketArr)
    }, [ticketArr])

    return (
        <div ref={ref} className='ticket'>
            <div className='container'>
                {!isClaim ? <div className='row'>
                    <div className='heading text-center'>
                        <h3>Metro Deluxe</h3>
                    </div>
                    <div className='col-6 text-start'>
                        <div><label>Ack: {ticketData?.barcode.slice(0, 6)}</label></div>
                        <div><label>{ticketData?.gameID}: {dateTimeTicketFormatter(ticketData?.gameTime).combinedDateTime}</label></div>
                    </div>
                    <div className='col-6 text-end'>
                        <div><label>PosID: {ticketData?.posID}</label></div>
                        <div><label>STONE GROUP: {ticketArr ? ticketArr[0].slice(0, 2) : "MG"}</label></div>
                    </div>
                    <div className='listType'>
                        <ul>
                            {ticketArr?.map((item, index) => (
                                <li key={index}>{item.slice(0, 4)} * {item.slice(5)}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='text-center'>
                        <label>Qty: {ticketData?.totalQty} Total Pts: {ticketData?.totalQty} {dateTimeTicketFormatter(ticketData?.gameTime).ogtime}</label>
                    </div>
                    <div className='text-center'>
                        <Barcode value={ticketData?.barcode} height={60} width={1} />
                    </div>
                </div> :
                    <div className='row'>
                        <div className='heading text-center'>
                            <h3>Claimed</h3>
                        </div>
                        <div className='col-12 text-start'>
                            <div><label>Metro Deluxe {dateTimeTicketFormatter(ticketData?.gameTime).combinedDateTime}</label></div>
                            <div><label>{ticketData?.posID} Bar: {ticketData?.barcode.slice(0, 6)}</label></div>
                        </div>
                        <div className='col-6'>
                            <div><label>Prize Claim Points</label></div>
                        </div>
                        <div className='col-6'>
                            <div><label>{ticketData?.winPoints} Pts.</label></div>
                        </div>
                    </div>}
            </div>
        </div>
    );
});

export default TicketToPrint;
