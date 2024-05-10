import axios from "axios";


const baseName = 'http://193.203.163.194:3020';
const systemBaseName = 'http://127.0.0.1:3000'

const axiosInstance = axios.create({
    baseURL: baseName,
    headers: { 'Content-Type': 'application/json' },
});

//login function
export async function login(userId, loginUsername, password, userMacId) {
    const parsedData = { userid: userId, username: loginUsername, password: password, macid: userMacId };
    return axiosInstance.post(`/canlogin_macid`, parsedData)
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch(error => {
            return null;
        })
}

//Get UserData Function
export async function getUserData(userName, passWord) {
    const parsedData = { username: userName, password: passWord }
    return axiosInstance.post(`/getalluserdata`, parsedData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return null;
        })
}

//Game Data Function
export async function getTimeLeft() {
    return axiosInstance.get(`/timeleft`)
        .then(res => {
            const preparedData = {
                "gameTime": res.data.time,
                "gameId": res.data.gameid,
                "nextGameDate": res.data.nextgamedate,
                "nextGameTime": res.data.nextgametime
            }
            console.log(preparedData);
            return preparedData;
        })
        .catch(error => {
            if (error) {
                getTimeLeft()
            }
        })
}

//Get Game Results
export async function getGameResult() {
    return axiosInstance.get(`/getallresultsofar`)
        .then(res => {
            return res.data;
        })
}

//Place Bet
export async function placeBet(userName, passWord, totalTickets, totalBet, gameId) {
    const parsedData = { username: userName, password: passWord, tickets: totalTickets, totalbet: totalBet, gameid: gameId }
    return axiosInstance.post(`/placebet`, parsedData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

//Cancel Last Bet
export async function cancelLastBet(lastBetBarCode) {
    const parsedData = { barcode: lastBetBarCode }
    return axiosInstance.post(`/cancelbybarcode`, parsedData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return null;
        })
}

//Claim Bet
export async function claimBarcode(userId, barCodeSearch) {
    const parsedData = { userid: userId, barcode: barCodeSearch }
    return axiosInstance.post(`/claimbybarcode`, parsedData)
        .then(res => {
            return res;
        })
        .catch(err => {
            return null;
        })
}

//Get Result by Game ID
export async function getCurrentResult(gameId) {
    const parsedData = { gameid: gameId }
    return axiosInstance.post(`/getresultbyid`, parsedData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return null;
        })
}

//F7 Stone Details
export async function getStoneDetails() {
    return axiosInstance.get(`/getallresultinfo`)
        .then(res => {
            const rawData = res.data;
            const preparedData = rawData.map((index) => ({
                gameResult: index.GAMERESULT,
                gameID: index.GAMENUM,
                gameTime: index.GAMETIME
            }))
            return preparedData;
        })
        .catch(err => {
            return null;
        })
}

//Change Password
export async function changePassword(userName, passWord, newPassword) {
    const parsedData = { username: userName, password: passWord, newpassword: newPassword }
    return axiosInstance.post(`/changepassword`, parsedData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return null;
        })
}

//Get Report by Date
export async function getReportByDate(userName, date) {
    const parsedData = { username: userName, date: date }
    return axiosInstance.post(`/getreportbydate`, parsedData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return null;
        })
}

//Current Time Function
export function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const currentTime = `${hours}:${minutes}:${seconds}`;

    return currentTime;
}

// System Server API
export async function systemServGet(endpoint) {
    return axiosInstance.get(`${systemBaseName}/${endpoint}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            return null
        })
}

export async function systemServPost(endpoint, sysCommand) {
    const parsedData = { command: sysCommand }
    return axiosInstance.get(`${systemBaseName}/${endpoint}`, parsedData)
        .then(res => {
            return res
        })
        .catch(err => {
            return null
        })
}