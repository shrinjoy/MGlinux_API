import React, { useContext } from 'react'
import { DataContext } from '../../Context/DataContext';

function WinScreen(props) {
  const { isWin, showWinScreen, setShowWinScreen, onUpdateUser } = props;
  const { claimData } = useContext(DataContext);
  return (
    <>
      {showWinScreen && (
        <section className='winScreen'>
          <div className='wrapper'>
            <div className='container h-100'>
              <div className='row h-100'>
                <div className='content'>
                  <h2 className='mb-3'>{isWin ? "Winning Ticket!" : "Not a Winning Ticket!"}</h2>
                  <h4>Price Points: <span className='ms-5'>{claimData?.amount}</span></h4>
                  <h4>Claim Points: <span className='ms-5'>?</span></h4>
                  <div className='col-12 mt-4'><a className='stdBtn' onClick={() => { setShowWinScreen(false); onUpdateUser() }}>Yes</a> <a className='stdBtn float-end' onClick={() => setShowWinScreen(false)}>No</a></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default WinScreen