import axios from 'axios';

const jackURL = 'http://77.37.47.190:3025/'
// const jackURL = "https://cors-anywhere.herokuapp.com/http://77.37.47.190:3025";

const axiosInstance = axios.create({
    baseURL: jackURL,
    headers: { "Content-Type": "application/json" },
});

export async function getStoneDetails() {
    return axiosInstance
        .get(`/getallresultinfo`)
        .then((res) => {
            const rawData = res.data;
            const preparedData = rawData.map((index) => ({
                gameResult: index.GAMERESULT,
                gameID: index.GAMENUM,
                gameTime: index.GAMETIME,
                gameMultiplier: index.GAMECLS,
            }));
            return preparedData;
        })
        .catch((err) => {
            return null;
        });
}

export async function getGameResultWithMulti() {
    return axiosInstance.get(`/getallresultwithmultiplier`).then((res) => {
        return res.data;
    });
}

export function convertGameIdToTime(param) {
    let startHour = 9;
    let startMinute = 5;

    let letter = param.charAt(0);
    let number = parseInt(param.slice(1), 10);

    let letterValue = letter.charCodeAt(0) - "A".charCodeAt(0);
    let totalIntervals = letterValue * 12 + number;
    let totalMinutes = totalIntervals * 5;

    let newHour = startHour + Math.floor((startMinute + totalMinutes) / 60);
    let newMinute = (startMinute + totalMinutes) % 60;
    let period = newHour >= 12 ? "PM" : "AM";

    newHour = newHour > 12 ? newHour - 12 : newHour;

    return `${newHour.toString().padStart(2, "0")}:${newMinute
        .toString()
        .padStart(2, "0")} ${period}`;
}