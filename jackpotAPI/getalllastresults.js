module.exports =
{
    getlastresults_all_sofar: function (db) {
        return new Promise((resolve, reject) => {

            db.query(`SELECT * FROM [RESULT99] WHERE CONVERT(DATE, GAMEDATE) = CONVERT(DATE,GETDATE())  order by INTNUMBER desc`)
                .then((data) => {
                    var arraydata = {};
                    console.log(data.recordset.length);
                    data.recordset.forEach(element => {
                        arraydata[element["GAMENUM"]] = element["GAMERESULT"];
                    });

                    resolve(arraydata); // Resolve the JSON object directly
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
        });
    },
    getlastresultsinfo: function (db) {
        return new Promise((resolve, reject) => {

            db.query(`SELECT * FROM [RESULT99] WHERE CONVERT(DATE, GAMEDATE) = CONVERT(DATE,GETDATE())  order by INTNUMBER desc`)
                .then((data) => {
                    var arraydata = [];
                    console.log(data.recordset.length);
                    data.recordset.forEach(element => {
                        arraydata.push(element);
                    });

                    resolve(arraydata); // Resolve the JSON object directly
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
        });
    },
    getlastresults_all: function (db) {
        return new Promise((resolve, reject) => {
            console.log("forshur");
            //GETDATE()
            db.query(`SELECT * FROM [RESULT] WHERE CONVERT(DATE, GAMEDATE) = CONVERT(DATE,GETDATE());`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "error": "please add column with todays date to retrive data from data base" });
                }
                else if (data.recordset.length > 0) {

                    var alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                    try {
                        var filteredresultdata = "{"
                        for (x = 0; x < alphabets.length; x++) {
                            for (y = 0; y < 12; y++) {
                                if (y < 10) {

                                    var datax = data.recordset[0][`${alphabets[x]}0${y}`]

                                    if (datax === null) {
                                        datax = "    "

                                    }
                                    filteredresultdata += (`"${alphabets[x]}0${y}"` + ":" + `"${datax}"`)
                                    filteredresultdata += ","
                                }
                                else {
                                    var datax = data.recordset[0][`${alphabets[x]}${y}`]

                                    if (datax === null) {
                                        datax = "    "



                                    }
                                    filteredresultdata += (`"${alphabets[x]}${y}"` + ":" + `"${datax}"`)

                                    if (x == alphabets.length - 1 && y == 11) {
                                        filteredresultdata += "}"

                                    }
                                    else {
                                        filteredresultdata += ","
                                    }

                                }
                            }
                        }
                        resolve(filteredresultdata);

                    }
                    catch (err) {
                        reject({ "message": "failed to filter" + err })
                    }
                }
            })
                .catch((error) => {

                })
        })
    },



    //comibes the reuslt and muliplier and returns it only gives the result with current gamedate 
    getonlylastresultwithmultiplier: function (db, jsondata) {
        return new Promise(async (resolve, reject) => {
            var multiplier = 0;
            var result = 0;
            await db.query(`SELECT * FROM [XRESULT] WHERE CONVERT(DATE, GDATE) = CONVERT(DATE,GETDATE())  and GDETAILS='${jsondata["gameid"]}'`)
                .then((data) => {
                    if (data.recordset.length > 0) {
                        console.log(data.recordset[0]);
                        multiplier = data.recordset[0].XDETAILS;
                        console.log("multiplier value:" + multiplier)
                    }
                    else {
                        reject({ "reject": "not available" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
            await db.query(`SELECT * FROM [RESULT99] WHERE CONVERT(DATE, GAMEDATE) = CONVERT(DATE,GETDATE()) and GAMENUM='${jsondata["gameid"]}' order by INTNUMBER desc`)
                .then((data) => {
                    if (data.recordset.length > 0) {

                        result = data.recordset[0].GAMERESULT;
                        console.log("result value:" + result)

                    }
                    else {
                        reject({ "reject": "not available" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
            resolve({ "muliplier": `${multiplier}`, "result": `${result}` });

        });
    },

    getlastresultwithmultiplier: function (db, jsondata) {
        return new Promise((resolve, reject) => {

            db.query(`SELECT * FROM [XRESULT] WHERE CONVERT(DATE, GDATE) = CONVERT(DATE,GETDATE())  and GDETAILS='${jsondata["gameid"]}'`)
                .then((data) => {
                    var arraydata = [];
                    console.log(data.recordset.length);
                    data.recordset.forEach(element => {
                        arraydata.push(element);
                    });

                    resolve(arraydata); // Resolve the JSON object directly
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
        });
    },
    getallresultwithmultiplier: function (db) {
        return new Promise((resolve, reject) => {
            //GDATE
            db.query(`SELECT * FROM [XRESULT] WHERE CONVERT(DATE, GDATE) = CONVERT(DATE,GETDATE())`)
                .then((data) => {
                    var arraydata = [];
                    console.log(data.recordset.length);
                    data.recordset.forEach(element => {
                        arraydata.push(element);
                    });

                    resolve(arraydata); // Resolve the JSON object directly
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
        });
    }
}