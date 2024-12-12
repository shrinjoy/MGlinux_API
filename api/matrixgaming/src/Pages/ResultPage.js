import React, { useEffect, useState } from "react";
import {
  convertGameIdToTime,
  getGameResultWithMulti,
  getResultByDateWithMulti,
  getStoneDetails,
} from "./Globals/globalFunction";

function ResultPage() {
  const [searchDate, setSearchDate] = useState();
  const [searchGame, setSearchGame] = useState();

  const [stoneDetails, setStoneDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  async function handleGetAllResult() {
    if (searchDate && searchGame) {
      const data = await getResultByDateWithMulti(searchDate);
      if (data) {
        setStoneDetails(data);
      }
    }
  }

  useEffect(() => {
    // getStoneDetails().then((data) => {
    //     setStoneDetails(data);
    // });

    const getFormattedDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
    setSearchDate(getFormattedDate(new Date()));
  }, []);

  useEffect(() => {
    if (stoneDetails) {
      setFilteredData(stoneDetails);
    }
  }, [stoneDetails]);

  return (
    <>
      <style>
        {`
                body{
                    background-color: rgba(20, 20, 20, 1.0);
                }   
            `}
      </style>
      <section className="resultPage">
        <div className="container">
          <div className="row">
            <div className="header">
              {window.location.pathname === "/jackpotresult"
                ? "Jackpot"
                : "SmartWin"}
            </div>
            <div className="searchPanel">
              <div className="col-4">
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  disabled
                />
              </div>
              <div className="col-4">
                <select
                  value={searchGame}
                  onChange={(e) => setSearchGame(e.target.value)}
                >
                  <option>Select Game</option>

                  <option
                    value={`2Digit${
                      window.location.pathname === "/jackpotresult" ? "2" : "1"
                    }`}
                  >
                    2 Digit{" "}
                    {window.location.pathname === "/jackpotresult" ? "2" : "1"}
                  </option>
                </select>
              </div>
              <div className="col-4">
                <button onClick={handleGetAllResult}>Search</button>
              </div>
            </div>
            <table className="table table-bordered table-condensed">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Result</th>
                  <th>Bonus</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  ? filteredData.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          {item?.date_time.split(" ")[0]}
                        </td>
                        <td className="text-center">
                          {item?.date_time.split(" ")[1]}
                        </td>
                        <td className="text-center">{item?.result}</td>
                        <td className="text-center">
                          {item?.xresult > 0 ? (
                            <span>{item?.xresult}X</span>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  : "Loading..."}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResultPage;
