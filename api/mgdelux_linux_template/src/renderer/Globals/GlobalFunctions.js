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
            return res;
        })
        .catch(error => {
            return error;
        })
}

