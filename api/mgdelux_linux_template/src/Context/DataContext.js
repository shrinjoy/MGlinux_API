import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [passWord, setPassWord] = useState("");
    const [gameId, setGameId] = useState("");
    const [currentGameResult, setCurrentGameResult] = useState("");
    const [nextGameTime, setNextGameTime] = useState("");
    const [nextGameDate, setNextGameDate] = useState("");
    const [date, setDate] = useState("");
    const [serverTime, setServerTime] = useState("");
    const [userAccessLevel, setUserAccessLevel] = useState(0);
    const [userBalance, setUserBalance] = useState(0);
    const [urlParam, setUrlParam] = useState(false);
    const [agentsTableName, setAgentsTableName] = useState([]);
    const [isAdjust, setIsAdjust] = useState(false);
    const [dashDetailsTable, setDashDetailsTable] = useState([]);
    const [agentIDDetail, setAgentIDDetail] = useState([]);
    const [lastBetBarCode, setLastBetBarCode] = useState("");
    const [ticketData, setTicketData] = useState();
    const [claimData, setClaimData] = useState();


    return (
        <DataContext.Provider value={{ userName, setUserName, date, setDate, serverTime, setServerTime, userAccessLevel, setUserAccessLevel, userBalance, setUserBalance, urlParam, setUrlParam, agentsTableName, setAgentsTableName, isAdjust, setIsAdjust, userId, setUserId, dashDetailsTable, setDashDetailsTable, agentIDDetail, setAgentIDDetail, gameId, setGameId, passWord, setPassWord, lastBetBarCode, setLastBetBarCode, currentGameResult, setCurrentGameResult, nextGameTime, setNextGameTime, nextGameDate, setNextGameDate, ticketData, setTicketData, claimData, setClaimData }}>
            {children}
        </DataContext.Provider>
    );
};