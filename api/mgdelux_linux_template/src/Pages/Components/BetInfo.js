import React, { useContext, useEffect, useState } from "react";
import TicketPrinter from "./TicketPrinter";
import { getReportByDate } from "../../Globals/GlobalFunctions";
import { DataContext } from "../../Context/DataContext";

function BetInfo({ onClose }) {
  const { userName } = useContext(DataContext);
  const [searchDate, setSearchDate] = useState("");
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // handleGameReportByDate();
  }, [searchDate]);

  async function handleGameReportByDate() {
    let date;
    if (searchDate != null) {
      date = searchDate;
    } else {
      date = currentDate;
    }
    console.log(date);
    const data = await getReportByDate(date, userName);
    if (data) {
      console.log(data);
    }
  }
  return (
    <div className="reportPanel">
      <div className="topPart">
        <div className="formWrapper">
          <div>
            <label>Select</label>
          </div>
          <div className="ms-2">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>
        <div className="formWrapper ms-3">
          <div>
            <button className="loginButton" onClick={handleGameReportByDate}>
              Show
            </button>
          </div>
        </div>
        <div className="formWrapper mx-auto">
          <div>
            <button className="loginButton">Re Sync</button>
          </div>
          <div className="ms-2">
            <TicketPrinter title={"Re-Print"} />
          </div>
          <div className="ms-2">
            <button className="loginButton">Cancel</button>
          </div>
          <div className="ms-2">
            <button className="loginButton">Claim</button>
          </div>
          <div className="ms-2">
            <button className="loginButton">All Claim</button>
          </div>
        </div>
        <div className="formWrapper ms-auto">
          <div>
            <button className="loginButton" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="botPart mt-2">
        <div
          style={{
            height: "75vh",
            backgroundColor: "#9d9d9d",
            overflow: "auto",
          }}
        >
          <table className="betInfoTable" style={{ height: "auto" }}>
            <thead>
              <tr>
                <th>Ticket No.</th>
                <th>Date</th>
                <th>Drow Time</th>
                <th>Entry Time</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="bg-black text-white text-end"
                  style={{ paddingRight: 5 }}
                >
                  123456789
                </td>
                <td>01-11-1001</td>
                <td>11:11</td>
                <td>11:01</td>
                <td>111</td>
                <td>PENDING</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BetInfo;
