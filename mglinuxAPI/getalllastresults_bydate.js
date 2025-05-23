module.exports = {
    getlastresults_all_bydate: function (db, json) {
        return new Promise((resolve, reject) => {
           
            db.query(`SELECT * FROM [RESULT99] WHERE CONVERT(DATE, GAMEDATE) = CONVERT(DATE, '${json["date"]}')   order by INTNUMBER;`)
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
                reject({"message": err});
            });
        });
    }
};
