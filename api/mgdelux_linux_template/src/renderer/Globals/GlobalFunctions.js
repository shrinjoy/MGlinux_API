import axios from "axios";

const baseName = 'http://193.203.163.194:3000';

const axiosInstance = axios.create({
    baseURL: baseName,
    headers: { 'Content-Type': 'application/json' },
});

//login function
export async function login(userId, loginUsername, password, userMacId) {
    const parsedData = { userid: userId, username: loginUsername, password: password, macid: userMacId };
    return axiosInstance.post(`/canlogin_macid`, parsedData)
        .then(res => {
            if (res.status === 200){
                return res.data;
            } 
        })
        .catch(error => {
            return error;
        })
}

//Game Data Function
export async function getTimeLeft(){
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
}

//Get Game Results
export async function getGameResult(){
    return axiosInstance.get(`/getallresultsofar`)
    .then(res => {
        return res.data;
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

