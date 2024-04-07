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

// document.getElementById("mc").style = "display:none";

for (y = -1; y < 10; y++) {
  var betdata = [];
  var tr = document.createElement("tr");
  for (x = -1; x < 10; x++) {
    var td = document.createElement("td");
    td.setAttribute("class", "td_betinp");
    var namelabel = document.createElement("label");
    namelabel.innerHTML = `MD${y}${x}`;
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
      inp.setAttribute("data-oldall", 0);
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

try{
  var d =getJSONCookie("userdata");
  document.getElementById("uname").value=d.user_name;
  document.getElementById("pword").value=d.user_pass;

}
catch
{

}


function checklogin() {
  // /canlogin

  // console.log(
  //   document.getElementById("uname").value.toString(),
  //   document.getElementById("pword").value.toString(),
  // );
  var name = document.getElementById("uname").value.toString();
  var pass = document.getElementById("pword").value.toString();
  var captcha = document.getElementById('catchpa').textContent;
  var captchaInput = document.getElementById('captchaInput').value;

  if (captchaInput === captcha) {
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

          if(document.getElementById("keepLoggedIn").checked)
          {
            var jdata ={user_name:name,user_pass:pass}
            setJSONCookie("userdata",jdata,365);
          }

        }
      })
      .catch((err) => {
        console.log(err);
        showpopup("Wrong username or password", "red");
      });
  } else {
    showpopup("Wrong CAPTCHA", "red");
  }

}



function setJSONCookie(name, data, daysToExpire) {
  const jsonData = JSON.stringify(data);
  let expires = "";
  if (daysToExpire) {
      const date = new Date();
      date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(jsonData) + expires + "; path=/";
}
function getJSONCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
          const jsonStr = decodeURIComponent(cookie.substring(name.length + 1));
          return JSON.parse(jsonStr);
      }
  }
  return null; // Cookie not found
}






function allfieldbetplace(thisid) {
  let inputValue = parseInt(document.getElementById(thisid).value);

  //data-oldall

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
      document.getElementById(idinp).value -= parseInt(
        document.getElementById(thisid).getAttribute("data-oldall") || 0
      );
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
      document.getElementById(idinp).value -= parseInt(
        document.getElementById(thisid).getAttribute("data-oldall") || 0
      );
    }
  }

  inputfieldupdate();

  document
    .getElementById(thisid)
    .setAttribute("data-oldall", document.getElementById(thisid).value);

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

      if (isNaN(inputValue) || inputValue <= 0) {
        inputElement.value = ""; // Clear the input
      }

      inputElement.setAttribute("data-old", inputElement.value);
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
  if (totalbet > 0 && time > 10) {
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
    var tempids = bettingID;

    if (bettingID.length > 1) {
      tempids.shift();
    }
    else if (bettingID.length == 1) {
      tempids = [];
      tempids.push(gameid);
    }

    console.log(tempids);

    tempids.forEach((e) => {
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

          console.log("got user data");


          showpopup("Transaction Succesfull", "green"); //popup_function




          datax = null;
          totalbet = 0;
        })
        .catch(function (err) {


          alert(err);
          showpopup("Transaction Failed", "red"); //popup_function


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
  } else {
    try {
      showpopup("Transaction Failed", "red"); //popup_function
    }
    catch {

    }
    resetbetdata();
  }
  /**/
}

function resetbetdata() {
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
}
async function loadallpossiblefuturebets() {
  // console.clear();
  // console.log("loading future bets");

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
  await axios({
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
                // console.log(`${key}`)
                // Add event listener to each checkbox
                inp.addEventListener("change", function () {
                  addidtolistforadvancebet(this.id);
                });
                td.append(inp);
                tablerow.append(td);
              }
            }
          }
        }
      }
      advancebettable.append(tablerow);
    })
    .catch((err) => {
      // alert("failed to load the data try to load again");
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
          // var gameresultname = document.createElement("td");
          var textWrapper = document.createElement("div");
          var textWrapper2 = document.createElement("div");
          // gameidname.innerHTML = key;
          //rowspan="1" colspan="2"
          gameidname.setAttribute("class", "oldres");
          gameidname.append(textWrapper);
          textWrapper.innerHTML = key;
          gameidname.append(textWrapper2);
          textWrapper2.innerHTML = "MD" + parsedData[key];
          textWrapper2.setAttribute("id", "oldresid");
          //gameidname.setAttribute("rowspan","1")
          // gameresultname.innerHTML = "NR" + parsedData[key];
          // gameresultname.setAttribute("class", "oldres");
          // gameresultname.setAttribute("id", "oldresid");
          // gameidname.append(gameresultname);

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
  

  axios({
    method: "get",
    url: "http://193.203.163.194:3000/getallresultsofar",
  })
    .then(function (res) {
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
      // Assuming res.data is already a parsed JSON object
      var parsedData = res.data;
      var count = 0;
      var tr;
      //(res);
      for (var key in parsedData) {
        if (parsedData.hasOwnProperty(key)) {
          var gameidname = document.createElement("td");
          var gameresultname = document.createElement("td");
          var randoLab = document.createElement("label");
          randoLab.innerHTML = key;
          gameidname.append(randoLab);
          //rowspan="1" colspan="2"
          gameidname.setAttribute("class", "oldres");
          //gameidname.setAttribute("rowspan","1")
          gameresultname.innerHTML = "MD" + parsedData[key];
          gameresultname.setAttribute("class", "oldres");
          gameresultname.setAttribute("id", "oldresid");
          gameidname.append(gameresultname);

          tablerow.append(gameidname);
          count += 1;
          if (count == 3) {
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
    time = time - 12;
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
      // console.log("usernamepassdata fetched XDXD");
    })
    .catch((err) => {
      //alert(err);
    });
}

gettimeandgameid();

function timerupdate() {
  time -= 1;
  if (time < 1) {
    // console.clear();
    getAllResultsSoFar();

    gettimeandgameid();

    loadallpossiblefuturebets();
  }
  if (time < 10) {
    gametimertext.style = "color:red";
  } else {
    gametimertext.style = "color:black";
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
  if(seconds<0)
  {
    seconds=0;
  }
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
    e.setAttribute("data-oldall", 0);
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
      showpopup("Canceled ticket", "green"); //popup_function
    })
    .catch((err) => {
      showpopup("No tickets to cancel", "red"); //popup_function

      getuserdata(username, password);
    });
  lastbetbarcode = "";
}
setInterval(timerupdate, 1000);

function mobileUIFix() {
  x = window.matchMedia("(max-width: 991px)");
  if (x.matches) {
    // This sets the Required Meta Tag
    var viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (viewportMetaTag) {
      viewportMetaTag.setAttribute(
        "content",
        "width=device-width, initial-scale=0.1"
      );
    }
    // This sets the Required style for '#buttonholder'
    // var buttonHolder = document.getElementById('buttonholder');
    // buttonHolder.style.width = 'max-content';

    // This sets the Required style for '#res_sofar_div'
    var resSofarDiv = document.getElementById("res_sofar_div");
    resSofarDiv.style.width = "95%";
    resSofarDiv.style.margin = "auto";

    // This sets the Required style for '.betinput'
    // var betInput = document.querySelectorAll('.betinput');
    // betInput.forEach(element => {
    //   element.style.width= '75%';
    // });

    // This sets the Required style for '.td_betinp'
    // var tdBetInp = document.querySelectorAll('.td_betinp');
    // tdBetInp.forEach(element => {
    //   element.style.maxWidth= '75px';
    // });
  }
}

function togglePopup(e) {
  var wrapper = document.querySelector(`[data-id='${e}']`);
  var wrapperStyles = getComputedStyle(wrapper);

  if (wrapperStyles.display === "none") {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
}

async function showpopup(popuptext, popupcolor) {
  try {
    var popup = document.getElementById("popup");

    document.getElementById("popup_msg").innerHTML = popuptext;
    popup.style = `background-color:${popupcolor}`;

    popup.setAttribute("id", "popup_notif_show");
    await new Promise((resolve) => setTimeout(resolve, 700));

    popup.setAttribute("id", "popup_notif_slide");
    await new Promise((resolve) => setTimeout(resolve, 500));
    popup.setAttribute("id", "popup");
  }
  catch
  {

  }
}

function changePassword(event) {
  event.preventDefault();
  var data_username = username;
  var currentpass = document.getElementById("cpusername").value.toString();
  var data_currentPassword = document
    .getElementById("password")
    .value.toString();
  var data_newPassword = document
    .getElementById("newpassword")
    .value.toString();
  console.log(`${data_username} ${data_currentPassword} ${data_newPassword}`);
  axios({
    method: "post",
    url: "http://193.203.163.194:3000/changepassword",
    data: {
      username: data_username,
      password: currentpass,
      newpassword: data_newPassword,
    },
  })
    .then(function (res) {
      console.log(res);
      showpopup("Password Changed Successfully", "green");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      showpopup("Please Try Again", "red");
    });
}
loadallpossiblefuturebets();

function getReportFromDate() {
  var table = document.getElementById("datewiseSummaryTable");
  var startDate = document.getElementById("startDate");
  var endDate = document.getElementById("endDate");
  var submit = document.getElementById("summarySubmit");

  submit.addEventListener("click", function () {
    var startDateValue = startDate.value;
    var endDateValue = endDate.value;
    // console.log("startDate", startDateValue, "endDate", endDateValue);

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

    axios
      .post("http://193.203.163.194:3000/getreportfromdatetodate", {
        username: username,
        start_date: startDateValue,
        end_date: endDateValue,
      })
      .then(function (response) {
        var responseData = response.data.flat();
        responseData.forEach(function (item) {
          var tr = document.createElement("tr");

          var dateCell = document.createElement("td");
          var dateTextNode = document.createTextNode(item.date);
          var date = new Date(item.date);
          var formattedDate = date.toLocaleDateString();
          dateTextNode.textContent = formattedDate;
          dateCell.appendChild(dateTextNode);

          var purchasePointCell = document.createElement("td");
          var purchasePointTextNode = document.createTextNode(
            item.purchasepoint
          );
          purchasePointCell.appendChild(purchasePointTextNode);

          var pwtpointCell = document.createElement("td");
          var pwtpointTextNode = document.createTextNode(item.pwtpoint);
          pwtpointCell.appendChild(pwtpointTextNode);

          var netpointCell = document.createElement("td");
          var netpointTextNode = document.createTextNode(item.netpoint);
          netpointCell.appendChild(netpointTextNode);

          tr.appendChild(dateCell);
          tr.appendChild(purchasePointCell);
          tr.appendChild(pwtpointCell);
          tr.appendChild(netpointCell);

          table.appendChild(tr);
        });
        console.log("Response:", response.data);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
}

function getDetailReportFromDate() {
  var table = document.getElementById("playDetailsTable");
  var currentDate = document.getElementById("reportDate");
  var buttonSelectorReport = document.getElementById("buttonSelectorReport");

  var submit = document.getElementById("reportSubmit");

  submit.addEventListener("click", function () {
    var dateValue = currentDate.value;
    var gameIDSelector = buttonSelectorReport.value;

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

    if (buttonSelectorReport.value === "all") {
      axios
        .post("http://193.203.163.194:3000/getreportbydate", {
          username: username,
          date: dateValue,
        })
        .then(function (response) {
          // console.log(response.data.data[0]);
          var responseData = response.data.data[0];
          responseData.forEach(function (game, index) {
            var tr = document.createElement("tr");

            // Serial No. (Index No.)
            var serialNo = document.createElement("td");
            var serialNoTextNode = document.createTextNode(index + 1);
            serialNo.appendChild(serialNoTextNode);
            tr.appendChild(serialNo);

            // Gift Event Code (GAMEID)
            var gameId = document.createElement("td");
            var gameIdTextNode = document.createTextNode(game.GAMEID);
            gameId.appendChild(gameIdTextNode);
            tr.appendChild(gameId);

            // Qty (TICKETTOTALRS[0])
            var qty = document.createElement("td");
            var qtyTextNode = document.createTextNode(game.TICKETTOTALRS[0]);
            qty.appendChild(qtyTextNode);
            tr.appendChild(qty);

            // Points (TICKETTOTALRS[1])
            var points = document.createElement("td");
            points.style.textAlign = "right";
            var pointsTextNode = document.createTextNode(game.TICKETTOTALRS[1]);
            points.appendChild(pointsTextNode);
            tr.appendChild(points);

            // Request ID (TICKETNUMBER)
            var requestId = document.createElement("td");
            requestId.id = "ticketNumber";
            var requestIdTextNode = document.createTextNode(game.TICKETNUMBER);
            requestId.appendChild(requestIdTextNode);
            tr.appendChild(requestId);

            // Date Time (GAMETIME)
            var utcTimestamp = game.GAMETIME;

            var dateObject = new Date(utcTimestamp);
            dateObject.setMinutes(dateObject.getMinutes() + 330);
            var year = dateObject.getFullYear();
            var month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month starts from 0
            var day = String(dateObject.getDate()).padStart(2, "0");
            var hours = String(dateObject.getHours()).padStart(2, "0");
            var minutes = String(dateObject.getMinutes()).padStart(2, "0");

            var formattedDateTime = utcTimestamp;//`${year}-${month}-${day} ${hours}:${minutes}`;

            var dateTime = document.createElement("td");
            var dateTimeTextNode = document.createTextNode(formattedDateTime);
            dateTime.appendChild(dateTimeTextNode);
            tr.appendChild(dateTime);

            // Gift Points (WINRS)
            var giftPoints = document.createElement("td");
            giftPoints.style.textAlign = "right";
            var giftPointsTextNode = document.createTextNode(game.WINRS);
            giftPoints.appendChild(giftPointsTextNode);
            tr.appendChild(giftPoints);

            // Stone (N/A)
            var stone = document.createElement("td");
            if (!game.GAMERESULT) {
              var stoneTextNode = document.createTextNode("N/A");
              stone.appendChild(stoneTextNode);
              tr.appendChild(stone);
            } else {
              var stoneTextNode = document.createTextNode(game.GAMERESULT);
              stone.appendChild(stoneTextNode);
              tr.appendChild(stone);
            }

            // Status (Active)
            var status = document.createElement("td");
            var statusTextNode = document.createTextNode("Active");
            status.appendChild(statusTextNode);
            tr.appendChild(status);

            // View
            var view = document.createElement("td");
            var viewLink = document.createElement("a");
            viewLink.href = "#"; // Add your view link here
            viewLink.setAttribute("onclick", "viewBarcodeByTicket(event)");
            viewLink.textContent = "View";
            view.appendChild(viewLink);
            tr.appendChild(view);

            table.appendChild(tr);
          });
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    } else {
      axios
        .post("http://193.203.163.194:3000/getreportbydateandid", {
          username: username.toString(),
          date: dateValue.toString(),
          gameid: gameIDSelector.toString(),
        })
        .then(function (response) {
          console.log(response.data);
          var responseData = response.data.data[0];
          responseData.forEach(function (game, index) {
            var tr = document.createElement("tr");

            // Serial No. (Index No.)
            var serialNo = document.createElement("td");
            var serialNoTextNode = document.createTextNode(index + 1);
            serialNo.appendChild(serialNoTextNode);
            tr.appendChild(serialNo);

            // Gift Event Code (GAMEID)
            var gameId = document.createElement("td");
            var gameIdTextNode = document.createTextNode(game.GAMEID);
            gameId.appendChild(gameIdTextNode);
            tr.appendChild(gameId);

            // Qty (TICKETTOTALRS[0])
            var qty = document.createElement("td");
            var qtyTextNode = document.createTextNode(game.TICKETTOTALRS[0]);
            qty.appendChild(qtyTextNode);
            tr.appendChild(qty);

            // Points (TICKETTOTALRS[1])
            var points = document.createElement("td");
            points.style.textAlign = "right";
            var pointsTextNode = document.createTextNode(game.TICKETTOTALRS[1]);
            points.appendChild(pointsTextNode);
            tr.appendChild(points);

            // Request ID (TICKETNUMBER)
            var requestId = document.createElement("td");
            requestId.id = "ticketNumber";
            var requestIdTextNode = document.createTextNode(game.TICKETNUMBER);
            requestId.appendChild(requestIdTextNode);
            tr.appendChild(requestId);

            // Date Time (GAMETIME)
            var utcTimestamp = game.GAMETIME;

            var dateObject = new Date(utcTimestamp);
            dateObject.setMinutes(dateObject.getMinutes() + 330);

            var year = dateObject.getFullYear();
            var month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month starts from 0
            var day = String(dateObject.getDate()).padStart(2, "0");
            var hours = String(dateObject.getHours()).padStart(2, "0");
            var minutes = String(dateObject.getMinutes()).padStart(2, "0");

            var formattedDateTime = utcTimestamp;//`${year}-${month}-${day} ${hours}:${minutes}`;

            var dateTime = document.createElement("td");
            var dateTimeTextNode = document.createTextNode(formattedDateTime);
            dateTime.appendChild(dateTimeTextNode);
            tr.appendChild(dateTime);

            // Gift Points (WINRS)
            var giftPoints = document.createElement("td");
            giftPoints.style.textAlign = "right";
            var giftPointsTextNode = document.createTextNode(game.WINRS);
            giftPoints.appendChild(giftPointsTextNode);
            tr.appendChild(giftPoints);

            // Stone (N/A)
            var stone = document.createElement("td");
            if (!game.GAMERESULT) {
              var stoneTextNode = document.createTextNode("N/A");
              stone.appendChild(stoneTextNode);
              tr.appendChild(stone);
            } else {
              var stoneTextNode = document.createTextNode(game.GAMERESULT);
              stone.appendChild(stoneTextNode);
              tr.appendChild(stone);
            }

            // Status (Active)
            var status = document.createElement("td");
            var statusTextNode = document.createTextNode("Active");
            status.appendChild(statusTextNode);
            tr.appendChild(status);

            // View
            var view = document.createElement("td");
            var viewLink = document.createElement("a");
            viewLink.href = "#"; // Add your view link here
            viewLink.setAttribute("onclick", "viewBarcodeByTicket(event)");
            viewLink.textContent = "View";
            view.appendChild(viewLink);
            tr.appendChild(view);

            table.appendChild(tr);
          });
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }
  });
}

function viewBarcodeByTicket(event) {

  closeBarCodePopup();
  var reportPanel = document.querySelector(".barcodePopup");
  var viewButton = event.target;
  var ticketNumber = viewButton
    .closest("tr")
    .querySelector("#ticketNumber").textContent;
  reportPanel.style.display = "block";

  axios
    .post("http://193.203.163.194:3000/getticketbybarcode", {
      barcode: ticketNumber,
    })
    .then(function (response) {

      var responseData = response.data.data[0];

      var qtyPopupValue = 0;

      responseData.forEach(function (item) {
        var ticketGroup = document.querySelector(".barcodePopup .ticketGroup");
        var ticketDetailsArray = item.TICKETDETAILS.split(",");
        qtyPopupValue = (item["TICKETTOTALRS"]);
        ticketDetailsArray.forEach(function (ticketDetail) {


          if (parseInt(ticketDetail.substring(3)) !== 0) {
            var divElement = document.createElement("div");
            var pElement = document.createElement("p");
            pElement.classList.add("elementToClear");
            var ticketRaw = ticketDetail.trim();
            var abv = ticketDetail.substring(0, 2);
            var abvbv = "";


            let ticMD = "MD" + ticketDetail.substring(0, 2) + "*" + ticketDetail.substring(3);
            // let ticQ = ticketDetail
            var textNode = document.createTextNode(ticMD);

            qtyPopupValue = qtyPopupValue + 1;

            pElement.appendChild(textNode);
            divElement.appendChild(pElement);
            ticketGroup.appendChild(divElement);
          }
        });

        var dateTimePopup = document.getElementById("dateTimePopup");
        var dateSpan = document.createElement("span");
        dateSpan.id = "dateSpan";
        dateSpan.classList.add("elementToClear");
        dateSpan.innerHTML = item.GAMEDATE.slice(0, 10);
        dateTimePopup.append(dateSpan);

        var timeSpan = document.createElement("span");
        timeSpan.style.marginLeft = "5px";
        timeSpan.id = "timeSpan";
        timeSpan.classList.add("elementToClear");
        timeSpan.innerHTML = item.GAMETIME.slice(11, 19);
        dateTimePopup.append(timeSpan);

        var gameIdPopup = document.getElementById("gameIdPopup");
        gameIdPopup.innerHTML = item.GAMEID;

        var posIdPopup = document.getElementById("posIdPopup");
        posIdPopup.innerHTML = item.TARMINALID;

        var barCodePopupValue = document.getElementById("barCodePopupValue");
        barCodePopupValue.innerHTML = ticketNumber;

        var qtyPopup = document.getElementById("qtyPopup");
        qtyPopup.innerHTML = item["TICKETTOTALRS"];

        var totalPtsPopup = document.getElementById("totalPtsPopup");
        totalPtsPopup.innerHTML = item["TICKETTOTALRS"];

        JsBarcode("#barcodeEle", `${ticketNumber}`, {
          fontSize: 28,
          height: 60,
        });

        // console.log(item.TICKETDETAILS);
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getReportFromDate();
  getDetailReportFromDate();
});

function closeBarCodePopup() {
  var reportPanel = document.querySelector(".barcodePopup");

  var elementsToClear = document.querySelectorAll(".elementToClear");
  elementsToClear.forEach(function (element) {
    element.innerHTML = "";
  });

  reportPanel.style.display = "none";
}

function createOptions(array) {
  let options = "";
  array.forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    selectElement.appendChild(option);
  });
  return options;
}

const alpha = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
];
let betentryarray = [];

for (let x = 0; x < alpha.length; x++) {
  for (let y = 0; y < 12; y++) {
    let entry = y < 10 ? `${alpha[x]}0${y}` : `${alpha[x]}${y}`;
    betentryarray.push(entry);
  }
}

console.log(betentryarray);

// Now, let's create options for each item in the betentryarray
const selectElement = document.getElementById("buttonSelectorReport");
createOptions(betentryarray, selectElement);

function countTotal() {
  var totalQty = document.querySelectorAll("");
  var a = 0;
  totalQty.forEach((item) => {
    a = a + item.textContent;
  });
}



// Page Idle Script 
let timea = new Date().getTime();

const setActivityTime = () => {
  timea = new Date().getTime();
};

document.body.addEventListener("touchstart", setActivityTime);
document.body.addEventListener("touchmove", setActivityTime);
document.body.addEventListener("touchend", setActivityTime);
document.body.addEventListener("mousedown", setActivityTime);
document.body.addEventListener("mousemove", setActivityTime);
document.body.addEventListener("keypress", setActivityTime);

const refresh = () => {
  if (new Date().getTime() - timea >= 7 * 60000) {
    alert("session time out")
    window.location.reload(true);
  } else {
    setTimeout(refresh, 1);
  }
};

setTimeout(refresh, 1);