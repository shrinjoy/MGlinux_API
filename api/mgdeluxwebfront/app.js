var betinputpanel = document.getElementById("betinputpanel")
var gameidtext = document.getElementById("gameid")
var gametimertext = document.getElementById("timer")
var realtimertext = document.getElementById("realtime")
var username="";
var password="";

var time = 99999;
var gameid = "X00";
var userbalance=0;
var userid="nouser";
for (y = 0; y < 10; y++) {
    var tr = document.createElement("tr")
    for (x = 0; x < 10; x++) {
        var td = document.createElement("td");
        var namelabel = document.createElement("label")
        namelabel.innerHTML = `NR${y}${x}`
        var br = document.createElement("br")
        br.setAttribute("class", "spacer")
        var inp = document.createElement("input")
        inp.setAttribute("class", "betinput")
        td.append(namelabel);
        td.append(br)
        td.append(inp)
        tr.append(td);
    }
    betinputpanel.append(tr)
}
///getallresult


function getallresultsofar()
{
    axios({
        method: "get",
        url: "http://localhost:3000/getallresult",


    }).then(function (res) {

        console.log(res)
       return res["data"];


    })
    .catch((err)=>{

        console.log("failed to fetch result data"+err);
    })
}
getallresultsofar();

function gettimeandgameid() {
    axios({
        method: "get",
        url: "http://localhost:3000/timeleft",


    }).then(function (res) {

        time = res["data"]["time"]
        gameid = res["data"]["gameid"]


    })
}

function getuserdata(usernamex,passwordx) {
    axios({
        method: "post",
        url: "http://localhost:3000/getalluserdata",
        data:{
            username:usernamex,
            password:passwordx
        }

    }).then(function (res) {

       userid=res["data"]["username"];
       userbalance=res["data"]["balance"];
        document.getElementById("balance").innerHTML=userbalance;
        document.getElementById("username").innerHTML=userid;

    })
    .catch((err)=>{
//alert(err);
    })
}

getuserdata("ADMIN","12345")
gettimeandgameid();



function timerupdate()
{



    time-=1;
    if(time<1)
    {
        gettimeandgameid();
    }
    gametimertext.innerHTML=formatSecondsToTime(time);
    gameidtext.innerHTML=gameid;
    realtimertext.innerHTML=getCurrentTime();
}
function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  
    const currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
  }
function formatSecondsToTime(seconds) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondsFormatted = date.getUTCSeconds();
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsFormatted.toString().padStart(2, '0')}`;
    
    return formattedTime;
  }

setInterval(timerupdate,1000);