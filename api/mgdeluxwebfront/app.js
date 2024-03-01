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
var alltop = 0;
var allbottom = 0; //
var betinputs;
var totalbet;
var lastbetbarcode = "";

document.getElementById("mc").style = "display:none";

for (y = -1; y < 10; y++) {
  var betdata = [];
  var tr = document.createElement("tr");
  for (x = -1; x < 10; x++) {
    var td = document.createElement("td");
    td.setAttribute("class", "td_betinp");
    var namelabel = document.createElement("label");
    namelabel.innerHTML = `NR${y}${x}`;
    var br = document.createElement("br");
    // br.setAttribute("class", "spacer");

    var inp = document.createElement("input");
    inp.setAttribute("class", "betinput");
    inp.setAttribute("id", `NR${y}${x}`);
    inp.setAttribute("min", "0");
    inp.setAttribute("type", "number");
    inp.addEventListener("input", function () {
      inputfieldupdate();
    });
    inp.addEventListener("change", function () {
      inputfieldupdate();
    });
    if (x === -1 || y === -1) {
      //blocks are all bet inputs
      namelabel.innerHTML = "&nbsp";
      td.append(namelabel);

      if (x == -1) {
        inp.setAttribute("id", `B${y}`);
      }
      if (y == -1) {
        inp.setAttribute("id", `T${x}`);
      }
      inp.addEventListener("input", function () {
        allfieldbetplace(this.id);
      });
    } else {
      td.append(namelabel);
    }
    td.append(br);

    if (x === -1 && y === -1) {
      td.append(namelabel);
      //this is a block field for header ;c
      namelabel.innerHTML = "Block";
    } else {
      td.append(inp);
    }
    tr.append(td);
  }
  betinputpanel.append(tr);
}

function checklogin() {
  // /canlogin

  console.log(
    document.getElementById("uname").value.toString(),
    document.getElementById("pword").value.toString()
  );
  var name = document.getElementById("uname").value.toString();
  var pass = document.getElementById("pword").value.toString();
  axios({
    method: "post",
    url: "http://193.203.163.194:3000/canlogin",
    data: {
      username: name,
      password: pass,
    },
  })
    .then(function (res) {
      if ((res.data.status = "200")) {
        document.getElementById("loginform").style = "display:none";

        document.getElementsByClassName("mainContent").style = "display:block";
        document.getElementById("mc").style = "display:block";

        mobileUIFix();

        getuserdata(name, pass);
        setInterval(function () {
          getuserdata(username, password);
        }, 1000);

        username = name;
        password = pass;
      }
    })
    .catch((err) => {
      console.log(err);
      alert("wrong username or password");
    });
}

function allfieldbetplace(thisid) {
  let inputValue = parseInt(document.getElementById(thisid).value);

  if (isNaN(inputValue) || inputValue < 0) {
    document.getElementById(thisid).value = ""; // Clear the input
  }

  var betdata = thisid;
  if (betdata[0] === "T") {
    for (x = 0; x < 10; x++) {
      var idinp = "";
      idinp = `NR${x}${thisid[1]}`;
      document.getElementById(idinp).value =
        (parseInt(document.getElementById(thisid).value) || 0) +
        (parseInt(document.getElementById(idinp).value) || 0);
    }
    //("top");
  }
  if (betdata[0] == "B") {
    //("bottom");
    limit = 0;

    limit = parseInt(betdata[1]) + 1;

    //(`${parseInt(betdata[1])*10}${(limit*10)}`)
    for (x = parseInt(betdata[1]) * 10; x < limit * 10; x++) {
      var idinp = "";
      if (x < 10) {
        idinp = `NR0${x}`;
      } else {
        idinp = `NR${x}`;
      }

      document.getElementById(idinp).value =
        (parseInt(document.getElementById(thisid).value) || 0) +
        (parseInt(document.getElementById(idinp).value) || 0);
    }
  }
  inputfieldupdate();
  //(betdata[0],betdata[1]);
}
function inputfieldupdate() {
  totalbet = 0;

  for (y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      // Get the input element

      let inputElement = document.getElementById(`NR${y}${x}`);

      // Get the value and parse it to an integer, or use 0 if not a valid number
      let inputValue = parseInt(inputElement.value) || 0;

      if (isNaN(inputValue) || inputValue < 0) {
        inputElement.value = ""; // Clear the input
      }
      // Add the valid number to totalbet
      totalbet += inputValue;
    }
  }

  document.getElementById("totqt_val").innerHTML =
    "Total Qnt: <span>" + totalbet + "</span>";
  document.getElementById("totamt_val").innerHTML =
    "Total Amnt: <span>" + totalbet + "</span>";
}
function buyticket() {
  var datax = [];
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      var id = `${y}${x}`;
      datax.push(
        `${y}${x}Q${parseInt(document.getElementById("NR" + id).value) || 0}`
      );
    }
  }

  data = {
    username: username,
    password: password,
    tickets: datax.toString(),
    totalbet: totalbet,
    gameid: gameid.toString(),
  };
  //(data);

  bettingID.forEach((e) => {
    axios({
      method: "post",
      url: "http://193.203.163.194:3000/placebet",
      data: {
        username: username,
        password: password,
        tickets: datax.toString(),
        totalbet: totalbet,
        gameid: e.toString(),
      },
    })
      .then(function (res) {
        //("placed bet in id:"+e.toString());
        //(res["data"]["barcode"]);
        lastbetbarcode = res["data"]["barcode"];
        getuserdata(username, password);
      })
      .catch(function (err) {
        alert(err);
        getuserdata(username, password);
      });
  });
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Loop through each checkbox and uncheck it
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
    getuserdata(username, password);
  });
  var currentid = bettingID[0];
  bettingID = [];
  bettingID.push(currentid);
  clearallinputs();

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
  startloading = false;
  axios({
    method: "get",
    url: "http://193.203.163.194:3000/getallresult",
  })
    .then(function (res) {
      var parsedData = res.data;
      var count = 0;
      var tablerow = document.createElement("tr");

      var firstbet = 0;
      for (var key in parsedData) {
        if (parsedData.hasOwnProperty(key)) {
          if (key.toString() === gameid) {
            //("found same id");
            startloading = true;
          } else {
            if (startloading === true) {
              if (parsedData[key].toString().trim().length === 0) {
                count += 1;
                if (count == 10) {
                  advancebettable.append(tablerow);
                  count = 1;
                  tablerow = document.createElement("tr");
                }
                var td = document.createElement("td");
                // td.innerHTML = key;
                var tdText = document.createElement("label"); // remove if necessary
                tdText.innerHTML = key; // remove if necessary
                td.append(tdText); // remove if necessary
                var inp = document.createElement("input");
                inp.setAttribute("type", "checkbox");
                inp.setAttribute("id", `${key}`);

                // Add event listener to each checkbox
                inp.addEventListener("change", function () {
                  addidtolistforadvancebet(this.id);
                });

                /* //(
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
      }
    })
    .catch((err) => {
      alert("failed to load the data try to load again");
      loadallpossiblefuturebets();
    });
}

showstones_bool = false;

function showstones() {
  var advancebet = document.getElementById("stone_show");

  if (showadvancebet_bool === true) {
    advancebet.style = "display:none";
    showadvancebet_bool = false;
  } else if (showadvancebet_bool === false) {
    advancebet.style = "display:block";

    showadvancebet_bool = true;
  }
}

// /getallresultbydate
function showresultbydate() {
  var table = document.getElementById("stones_table");
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
    method: "post",
    url: "http://193.203.163.194:3000/getallresultbydate",
    data: {
      date: document.getElementById("date").value.toString(),
    },
  })
    .then(function (res) {
      // Assuming res.data is already a parsed JSON object
      var parsedData = res.data;
      var count = 0;
      var tr;
      //(res);
      for (var key in parsedData) {
        if (parsedData.hasOwnProperty(key)) {
          var gameidname = document.createElement("td");
          var gameresultname = document.createElement("td");
          gameidname.innerHTML = key;
          //rowspan="1" colspan="2"
          gameidname.setAttribute("class", "oldres");
          //gameidname.setAttribute("rowspan","1")
          gameresultname.innerHTML = "NR" + parsedData[key];
          gameresultname.setAttribute("class", "oldres");
          gameresultname.setAttribute("id", "oldresid");
          gameidname.append(gameresultname);

          tablerow.append(gameidname);
          count += 1;
          if (count == 10) {
            table.append(tablerow);
            count = 0;
            tablerow = document.createElement("tr");
            tablerow.setAttribute("class", "tablerow");
          }
        }
      }
      table.append(tablerow);
      // Move the return statement outside the loop
      return res.data;
    })
    .catch((err) => {
      //("Failed to fetch result data: " + err);
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
function addidtolistforadvancebet(checkboxId) {
  // Print a message with the checkbox ID

  ////(`Checkbox with ID '${checkboxId}' is ${document.getElementById(checkboxId).checked ? 'checked' : 'unchecked'}`);
  if (document.getElementById(checkboxId).checked === true) {
    bettingID.push(checkboxId);
    //(bettingID);
  } else if (document.getElementById(checkboxId).checked === false) {
    for (k = 0; k < bettingID.length; k++) {
      if (bettingID[k] === checkboxId) {
        bettingID.splice(k, 1);
      }
    }
    //(bettingID);
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
    url: "http://193.203.163.194:3000/getallresultsofar",
  })
    .then(function (res) {
      // Assuming res.data is already a parsed JSON object
      var parsedData = res.data;
      var count = 0;
      var tr;
      //(res);
      for (var key in parsedData) {
        if (parsedData.hasOwnProperty(key)) {
          var gameidname = document.createElement("td");
          var gameresultname = document.createElement("td");
          gameidname.innerHTML = key;
          //rowspan="1" colspan="2"
          gameidname.setAttribute("class", "oldres");
          //gameidname.setAttribute("rowspan","1")
          gameresultname.innerHTML = "NR" + parsedData[key];
          gameresultname.setAttribute("class", "oldres");
          gameresultname.setAttribute("id", "oldresid");
          gameidname.append(gameresultname);

          tablerow.append(gameidname);
          count += 1;
          if (count == 4) {
            table.append(tablerow);
            count = 0;
            tablerow = document.createElement("tr");
            tablerow.setAttribute("class", "tablerow");
          }
        }
      }
      table.append(tablerow);

      // Move the return statement outside the loop
      return res.data;
    })
    .catch((err) => {
      //("Failed to fetch result data: " + err);
    });
}
getAllResultsSoFar();
function gettimeandgameid() {
  axios({
    method: "get",
    url: "http://193.203.163.194:3000/timeleft",
  }).then(function (res) {
    time = res["data"]["time"];
    gameid = res["data"]["gameid"];
    bettingID = [];
    bettingID = [gameid.toString()];
    // //(bettingID);
  });
}
function getuserdata(usernamex, passwordx) {
  axios({
    method: "post",
    url: "http://193.203.163.194:3000/getalluserdata",
    data: {
      username: usernamex,
      password: passwordx,
    },
  })
    .then(function (res) {
      userid = res["data"]["username"];
      username = userid;
      password = res["data"]["password"];
      userbalance = res["data"]["balance"];
      document.getElementById("balance").innerHTML = userbalance;
      document.getElementById("username").innerHTML = userid;
      console.log("usernamepassdata fetched XDXD");
    })
    .catch((err) => {
      //alert(err);
    });
}

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
function clearallinputs() {
  var inputnumberbox = document.querySelectorAll('input[type="number"]');

  inputnumberbox.forEach((e) => {
    e.value = null;
  });
  inputfieldupdate();
}
function cancelbet() {
  // /cancelbybarcode
  axios({
    method: "post",
    url: "http://193.203.163.194:3000/cancelbybarcode",
    data: {
      barcode: lastbetbarcode,
    },
  })
    .then(function (res) {
      getuserdata(username, password);
    })
    .catch((err) => {
      alert("no ticket with code-" + lastbetbarcode + "   found");
      getuserdata(username, password);
    });
  lastbetbarcode = "";
}
setInterval(timerupdate, 1000);


function mobileUIFix(){
  x = window.matchMedia("(max-width: 991px)");
  if (x.matches){
    // This sets the Required Meta Tag
    var viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (viewportMetaTag) {
      viewportMetaTag.setAttribute(
        "content",
        "width=device-width, initial-scale=0.1"
      );
    }
    // This sets the Required style for '#buttonholder'
    var buttonHolder = document.getElementById('buttonholder');
    buttonHolder.style.width = 'max-content';

    // This sets the Required style for '#res_sofar_div'
    var resSofarDiv = document.getElementById('res_sofar_div');
    resSofarDiv.style.width = '85%';
    resSofarDiv.style.margin = 'auto';

    // This sets the Required style for '.betinput'
    var betInput = document.querySelectorAll('.betinput');
    betInput.forEach(element => {
      element.style.width= '75%';
    });

    // This sets the Required style for '.td_betinp'
    var tdBetInp = document.querySelectorAll('.td_betinp');
    tdBetInp.forEach(element => {
      element.style.maxWidth= '75px';
    });
  }
}
