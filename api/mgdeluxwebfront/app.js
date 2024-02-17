var betinputpanel = document.getElementById("betinputpanel")
var gameidtext = document.getElementById("gameid")
var gametimertext = document.getElementById("timer")

var time = 99999;
var gameid = "X00";
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


function gettimeandgameid() {
    axios({
        method: "get",
        url: "http://localhost:3000/timeleft",


    }).then(function (res) {

        time = res["data"]["time"]
        gameid = res["data"]["gameid"]


    })
}
gettimeandgameid();



function timerupdate()
{



    time-=1;
    if(time<1)
    {
        gettimeandgameid();
    }
    gametimertext.innerHTML=time;
    gameidtext.innerHTML=gameid;
}

setInterval(timerupdate,1000);