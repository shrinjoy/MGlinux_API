module.exports = {
    checkifmacthere: function (sql, body) {

        return new Promise((resolve, reject) => {
            try{
            sql.query(`SELECT CLIENTMAC from CLIENTLOGIN where CLIENTUSERNAME ='${body["userid"]}'`)
                .then((data) => {
                    if (data && data.recordset && data.recordset.length > 0) {
                        console.log(data.recordset[0]["CLIENTMAC"]);

                        if (data.recordset[0]["CLIENTMAC"].trim().length > 0) {
                            
                            this.forcesetmacid(sql,`
                                {
                                "mac":"${ data.recordset[0]["CLIENTMAC"]}",
                                "username":"${body["userid"]}"
                                }`)
                                .then((data)=>{

                                console.log("reset passed");

                            })
                            .catch((err)=>{
                                console.log("reset failed");
                            })
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
            }
            catch(err)
            {
                reject({ "message": "no mac found" });

            }
        });
    },
    checkifmacthere_bymac: function (sql, body) {
        return new Promise((resolve, reject) => {
            try{
            sql.query(`SELECT * from CLIENTLOGIN where CLIENTMAC ='${body["mac"]}' `)
                .then((data) => {
                    if (data && data.recordset && data.recordset.length > 0) {
                        console.log(data.recordset[0]["CLIENTMAC"]);

                        if (data.recordset[0]["CLIENTMAC"].trim().length > 0) {
                            resolve({ "message": data.recordset[0] });
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
            }
            catch(err)
            {
                reject({ "message": "failed to check mac id reason" + err });

            }
        });
    },
    forcesetmacid: function (sql, body) {
        return new Promise((resolve, reject) => {
            try{
            sql.query(`UPDATE [CLIENTLOGIN] set CLIENTMAC = '' where CLIENTMAC = '${body["mac"]}' and CLIENTUSERNAME !='${body["username"]}'`)
            
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
            }
            catch(err){

                    reject({ "message": "failed to update mac id reason" + err });
            }
        });
    }
};
