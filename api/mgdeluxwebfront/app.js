var betinputpanel = document.getElementById("betinputpanel")
var gameidtext = document.getElementById("gameid")
var gametimertext = document.getElementById("timer")
var realtimertext = document.getElementById("realtime")
var username = "";
var password = "";

var time = 99999;
var gameid = "X00";
var userbalance = 0;
var userid = "nouser";
for (y = 0; y < 10; y++) {
    var tr = document.createElement("tr")
    for (x = 0; x < 10; x++) {
        var td = document.createElement("td");
        td.setAttribute("class", "td_betinp")
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


function getAllResultsSoFar() {
    var table = document.getElementById("res_sofar_table");
    if (table) {
        var rowCount = table.rows.length;

        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }
    
    var tablerow = document.createElement("tr")
    // Clear existing rows in the table
    table.innerHTML = '';

    axios({
        method: "get",
        url: "http://localhost:3000/getallresult",
    }).then(function (res) {
        // Assuming res.data is already a parsed JSON object
        var parsedData = res.data;
        var count = 0;
        var tr;
        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {



                var gameidname = document.createElement("td");
                var gameresultname = document.createElement("td");
                gameidname.innerHTML = key;
                //rowspan="1" colspan="2"
                gameidname.setAttribute("class", "oldres")
                //gameidname.setAttribute("rowspan","1")
                gameresultname.innerHTML = parsedData[key];
                gameresultname.setAttribute("class", "oldres")

                gameidname.append(gameresultname)

                tablerow.append(gameidname);

                
                console.log(key + ": " + parsedData[key]);
                if (count == 2) {

                    count = 0;
                     tablerow=document.createElement("tr")
                     tablerow.setAttribute("class","tablerow")
                    table.append(tablerow);
                }
                else {
                    count += 1;
                }
            }
        }

        // Move the return statement outside the loop
        return res.data;
    }).catch((err) => {
        console.log("Failed to fetch result data: " + err);
    });
}



getAllResultsSoFar()



function gettimeandgameid() {
    axios({
        method: "get",
        url: "http://localhost:3000/timeleft",


    }).then(function (res) {

        time = res["data"]["time"]
        gameid = res["data"]["gameid"]


    })
}

function getuserdata(usernamex, passwordx) {
    axios({
        method: "post",
        url: "http://localhost:3000/getalluserdata",
        data: {
            username: usernamex,
            password: passwordx
        }

    }).then(function (res) {

        userid = res["data"]["username"];
        userbalance = res["data"]["balance"];
        document.getElementById("balance").innerHTML = userbalance;
        document.getElementById("username").innerHTML = userid;

    })
        .catch((err) => {
            //alert(err);
        })
}

getuserdata("ADMIN", "12345")
gettimeandgameid();



function timerupdate() {



    time -= 1;
    if (time < 1) {
        getAllResultsSoFar()

        gettimeandgameid();
    }
    gametimertext.innerHTML = formatSecondsToTime(time);
    gameidtext.innerHTML = gameid;
    realtimertext.innerHTML = getCurrentTime();
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

setInterval(timerupdate, 1000);