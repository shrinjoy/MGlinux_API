var betinputpanel = document.getElementById("betinputpanel");
var gameidtext = document.getElementById("gameid");
var gametimertext = document.getElementById("timer");
var realtimertext = document.getElementById("realtime");
var username = "";
var password = "";
var bettingID = [];
var time = 99999;
var gameid = "X00";
var userbalance = 0;
var userid = "nouser";


var alltop =0;
var allbottom=0;//
var betinputs
var totalbet;



var lastbetbarcode="";

for (y = -1; y < 10; y++) {


    var betdata=[]; 
    var tr = document.createElement("tr");
    for (x = -1; x < 10; x++) {
        var td = document.createElement("td");
        td.setAttribute("class", "td_betinp");
        var namelabel = document.createElement("label");
        namelabel.innerHTML = `NR${y}${x}`;
        var br = document.createElement("br");
        br.setAttribute("class", "spacer");

        var inp = document.createElement("input");
        inp.setAttribute("class", "betinput");
        inp.setAttribute("id", `NR${y}${x}`);
        
        inp.setAttribute("type","number");
        inp.addEventListener("input", function () {
            inputfieldupdate()

        });
     
        if (x === -1 || y === -1) {
            
            //blocks are all bet inputs
            
            if(x==-1)
            {
                inp.setAttribute("id",`B${y}`);
            }
            if(y==-1)
            {
                inp.setAttribute("id",`T${x}`);
            }
            inp.addEventListener("input", function () {
              allfieldbetplace(this.id)
    
            });

        } else {
            td.append(namelabel);
        }
        td.append(br);

        if (x === -1 && y === -1) {
            td.append(namelabel);
            //this is a block field for header ;c
            namelabel.innerHTML = "Block";
        } 
        else {
            td.append(inp);
        }
        tr.append(td);
        
    }
    betinputpanel.append(tr);
}
///getallresult

function allfieldbetplace(thisid)
{
    var betdata = thisid;
    if(betdata[0]==="T")
    {
        for(x = 0;x<10;x++)
        {
            var idinp="";
            idinp=`NR${x}${thisid[1]}`
            document.getElementById(idinp).value=document.getElementById(thisid).value;
            
        }
        console.log("top");
    }
    if(betdata[0]=="B")
    {
        console.log("bottom");
        limit =0;
       
        limit = parseInt(betdata[1])+1;

        
        console.log(`${parseInt(betdata[1])*10}${(limit*10)}`)
        for(x = parseInt(betdata[1])*10;x<(limit*10);x++)
        {
        
            var idinp="";
            if(x<10)
            {
                idinp=`NR0${x}`
            }
            else
            {
                idinp=`NR${x}`

            }
            
            document.getElementById(idinp).value=document.getElementById(thisid).value;
        }
    }
    inputfieldupdate();
    console.log(betdata[0],betdata[1]);
}


function inputfieldupdate() {
    totalbet = 0;

    for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
            // Get the input element
           
            let inputElement = document.getElementById(`NR${y}${x}`);
            
            // Get the value and parse it to an integer, or use 0 if not a valid number
            let inputValue = parseInt(inputElement.value) || 0;

            // Add the valid number to totalbet
            totalbet += inputValue;
        }
    }

    document.getElementById("totqt_val").innerHTML  = totalbet;
    document.getElementById("totamt_val").innerHTML = totalbet;
}


//username
//password
//tickets
//totalbet
//gameid

function buyticket()
{
    var datax=[];
    for(y=0;y<10;y++)
    {
        for(x=0;x<10;x++)
        {
            var id=`${y}${x}`
            datax.push(`${y}${x}Q${parseInt(document.getElementById("NR"+id).value)||0}`)
        }
    }

    data= {
        username: username,
        password: password,
        tickets:datax.toString(),
        totalbet:totalbet,
        gameid:gameid.toString()
    }
    console.log(data);



    bettingID.forEach(e =>{
        axios({
            method: "post",
            url: "http://localhost:3000/placebet",
            data: {
                username: username,
                password: password,
                tickets:datax.toString(),
                totalbet:totalbet,
                gameid:e.toString()
            },
        })
            .then(function (res) {
                console.log("placed bet in id:"+e.toString());
            console.log(res["data"]["barcode"]);
            getuserdata(username,password)

            })
            .catch(function(err){


                alert(err)
                getuserdata(username,password)

            });
    })
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Loop through each checkbox and uncheck it
checkboxes.forEach(function(checkbox) {
  checkbox.checked = false;
getuserdata(username,password)


var currentid=
bettingID[0];
bettingID=[];
bettingID.push(currentid);
});


    /**/
}


function loadallpossiblefuturebets() {
    var advancebet = document.getElementById("advancebet_show");
    var advancebettable = document.getElementById("advance_bet_table");
    var firstid;
    while (advancebettable.rows.length > 0) {
        advancebettable.deleteRow(0);
    }
    while (advancebettable.rows.length > 0) {
        advancebettable.deleteRow(1);
    }
    axios({
        method: "get",
        url: "http://localhost:3000/getallresult",
    }).then(function (res) {
        var parsedData = res.data;
        var count = 0;
        var tablerow = document.createElement("tr");

        var firstbet = 0;
        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {

                if (key.toString() === gameid) {
                    console.log("found same id");
                } else {
                    if (parsedData[key].toString().trim().length === 0) {
                        count += 1;
                        if (count == 10) {
                            advancebettable.append(tablerow);
                            count = 1;
                            tablerow = document.createElement("tr");
                        }
                        var td = document.createElement("td");
                        td.innerHTML = key;
                        var inp = document.createElement("input");
                        inp.setAttribute("type", "checkbox");
                        inp.setAttribute("id", `${key}`);

                        // Add event listener to each checkbox
                        inp.addEventListener("change", function () {
                            addidtolistforadvancebet(this.id);
                        });

                        /* console.log(
                             `${key}${parsedData[key]} ${
                             parsedData[key].toString().trim().length
                             }`
                         );*/
                        td.append(inp);


                        tablerow.append(td);


                    }

                }


            }
        }
    });

}

showadvancebet_bool = false;
function showadvancebet() {
    var advancebet = document.getElementById("advancebet_show");

    if (showadvancebet_bool === true) {
        advancebet.style = "display:none";
        showadvancebet_bool = false;
    } else if (showadvancebet_bool === false) {
        advancebet.style = "display:block";

        showadvancebet_bool = true;
    }
}

// Function to handle checkbox change event
function addidtolistforadvancebet(checkboxId) {
    // Print a message with the checkbox ID

    //console.log(`Checkbox with ID '${checkboxId}' is ${document.getElementById(checkboxId).checked ? 'checked' : 'unchecked'}`);
    if (document.getElementById(checkboxId).checked === true) {
        bettingID.push(checkboxId);
        console.log(bettingID);
    } else if (document.getElementById(checkboxId).checked === false) {
        for (k = 0; k < bettingID.length; k++) {
            if (bettingID[k] === checkboxId) {
                bettingID.splice(k, 1);
            }
        }
        console.log(bettingID);
    }
}

function getAllResultsSoFar() {
    var table = document.getElementById("res_sofar_table");
    if (table) {
        var rowCount = table.rows.length;

        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }
    if (table) {
        var rowCount = table.rows.length;

        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }
    var tablerow = document.createElement("tr");
    // Clear existing rows in the table
    table.innerHTML = "";

    axios({
        method: "get",
        url: "http://localhost:3000/getallresult",
    })
        .then(function (res) {
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
                    gameidname.setAttribute("class", "oldres");
                    //gameidname.setAttribute("rowspan","1")
                    gameresultname.innerHTML = parsedData[key];
                    gameresultname.setAttribute("class", "oldres");
                    gameresultname.setAttribute("id", "oldresid");
                    gameidname.append(gameresultname);
                 
                    tablerow.append(gameidname);
                    count += 1;
                   if(count==3)
                   {
                    table.append(tablerow);
                        count = 0;
                        tablerow = document.createElement("tr");
                        tablerow.setAttribute("class", "tablerow");
                   }
                    
                       
                    
                }
            }

            // Move the return statement outside the loop
            return res.data;
        })
        .catch((err) => {
            console.log("Failed to fetch result data: " + err);
        });
}

getAllResultsSoFar();

function gettimeandgameid() {
    axios({
        method: "get",
        url: "http://localhost:3000/timeleft",
    }).then(function (res) {
        time = res["data"]["time"];
        gameid = res["data"]["gameid"];
        bettingID = [];
        bettingID = [gameid.toString()];
       // console.log(bettingID);
    });
}

function getuserdata(usernamex, passwordx) {
    axios({
        method: "post",
        url: "http://localhost:3000/getalluserdata",
        data: {
            username: usernamex,
            password: passwordx,
        },
    })
        .then(function (res) {
            userid = res["data"]["username"];
            username=userid;
            password=res["data"]["password"]
            userbalance = res["data"]["balance"];
            document.getElementById("balance").innerHTML = userbalance;
            document.getElementById("username").innerHTML = userid;
        })
        .catch((err) => {
            //alert(err);
        });
}

getuserdata("ADMIN", "12345");
gettimeandgameid();

loadallpossiblefuturebets();
function timerupdate() {
    time -= 1;
    if (time < 1) {
        console.clear();
        getAllResultsSoFar();

        gettimeandgameid();


        loadallpossiblefuturebets();

    }
   
    gametimertext.innerHTML = formatSecondsToTime(time);
    gameidtext.innerHTML = gameid;
    realtimertext.innerHTML = getCurrentTime();
}
function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
}
function formatSecondsToTime(seconds) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondsFormatted = date.getUTCSeconds();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secondsFormatted.toString().padStart(2, "0")}`;

    return formattedTime;
}

setInterval(timerupdate, 1000);
