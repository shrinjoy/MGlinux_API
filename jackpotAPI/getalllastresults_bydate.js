module.exports = {
    getlastresults_all_bydate: function (db, json) {
        return new Promise((resolve, reject) => {

            db.query(`SELECT * FROM [RESULT99] WHERE CONVERT(DATE, GAMEDATE) = CONVERT(DATE, '${json["date"]}')   order by INTNUMBER;`)
                .then((data) => {
                    console.log("date gen res pen ");

                    if (data.recordset.length > 0) {
                        var arraydata = {};
                        console.log(data.recordset.length);
                        data.recordset.forEach(element => {
                            arraydata[element["GAMENUM"]] = element["GAMERESULT"];
                        });

                        resolve(arraydata); // Resolve the JSON object directly
                    }
                    else
                    {
                        reject({"error":"please add column with todays date to retrive data from data base"});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject({ "message": err });
                });
        });
    }
};
