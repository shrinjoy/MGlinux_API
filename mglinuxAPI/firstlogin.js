module.exports = {
    checkifmacthere: function (sql, body) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT CLIENTMAC from CLIENTLOGIN where CLIENTUSERNAME ='${body["username"]}'`)
                .then((data) => {
                    if (data && data.recordset && data.recordset.length > 0) {
                        console.log(data.recordset[0]["CLIENTMAC"]);

                        if (data.recordset[0]["CLIENTMAC"].trim().length > 0) {
                            resolve({ "message": "mac found", "mac": data.recordset[0]["CLIENTMAC"] });
                        }
                        else {
                            reject({ "message": "no mac found" });


                        }

                    } else {
                        reject({ "message": "no mac found" });
                    }
                })
                .catch((err) => {
                    reject({ "message": "failed to check mac id reason" + err });
                });
        });
    },
    checkifmacthere_bymac: function (sql, body) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT CLIENTMAC from CLIENTLOGIN where CLIENTMAC ='${body["username"]}'`)
                .then((data) => {
                    if (data && data.recordset && data.recordset.length > 0) {
                        console.log(data.recordset[0]["CLIENTMAC"]);

                        if (data.recordset[0]["CLIENTMAC"].trim().length > 0) {
                            resolve({ "message": "mac found", "mac": data.recordset[0]["CLIENTMAC"] });
                        }
                        else {
                            reject({ "message": "no mac found" });


                        }

                    } else {
                        reject({ "message": "no mac found" });
                    }
                })
                .catch((err) => {
                    reject({ "message": "failed to check mac id reason" + err });
                });
        });
    },
    forcesetmacid: function (sql, body) {
        return new Promise((resolve, reject) => {
            sql.query(`UPDATE CLIENTLOGIN SET CLIENTMAC = '${body["mac"]}' where CLIENTUSERNAME ='${body["username"]}'`)
                .then((data) => {
                    if (data && data.rowsAffected && data.rowsAffected.length > 0 && data.rowsAffected[0] > 0) {
                        resolve({ "message": "updated mac id" });
                    } else {
                        reject({ "message": "failed to update mac id" });
                    }
                })
                .catch((err) => {
                    reject({ "message": "failed to update mac id reason" + err });
                });
        });
    }
};
