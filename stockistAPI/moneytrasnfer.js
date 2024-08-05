module.exports = {
    sendmoney: function (db, json) {
        /*
        userid password targetuserid amount
        */
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM  [CLIENTLOGIN] where CLIENTID='${json["userid"]}' and CLIENTPASSWORD=${json["password"]}`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "error": "no user found" });
                }
                else {
                    if (parseInt(data.recordset[0]["CLIENTBALANCE"]) >= parseInt( Math.abs(json["amount"]))) {
                        db.query(`SELECT * FROM  [CLIENTLOGIN] where CLIENTID='${json["targetid"]}' and (CLIENTDIST='${json["username"]}' or CLIENTSUPDIST='${json["username"]}' or CLIENTADMIN='${json["username"]}')`)
                            .then((data) => {
                                if (data.recordset.length < 1) {
                                    reject({ "error": "nigga who?" });

                                }
                                else {
                                    console.log(json["amount"])
                                    //user have enough balance
                                    db.query(`UPDATE  [CLIENTLOGIN] set CLIENTBALANCE = CLIENTBALANCE+${ Math.abs(json["amount"])}  where CLIENTID='${json["targetid"]}' and (CLIENTDIST='${json["username"]}' or CLIENTSUPDIST='${json["username"]}' or CLIENTADMIN='${json["username"]}')`).then((data) => {
                                        db.query(`UPDATE  [CLIENTLOGIN] set CLIENTBALANCE = CLIENTBALANCE - ${ Math.abs(json["amount"])}  where CLIENTID='${json["userid"]}'  `).then((data) => {
                                            resolve({ "message": "amount transfer successfull" });
                                        })
                                    })
                                        .catch((err) => {
                                            reject({ "error": "no  user to pay" })
                                        })
                                }
                            })
                            .catch((err) => {
                                reject({ "error": "nigga who?" + err });

                            })

                    }
                    else {
                        reject({ "error": "no money? no bitches? :c " });
                    }
                }
            })
        })
    },

    takemoney: function (db, json) {
        /*
        userid password targetuserid amount
        */
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM  [CLIENTLOGIN] where CLIENTID='${json["userid"]}' and CLIENTPASSWORD=${json["password"]}`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "error": "no user found" });
                }
                else {

                    db.query(`SELECT * FROM  [CLIENTLOGIN] where CLIENTID='${json["targetid"]}' and (CLIENTDIST='${json["username"]}' or CLIENTSUPDIST='${json["username"]}' or CLIENTADMIN='${json["username"]}')`)
                        .then((data) => {



                            if (data.recordset.length < 1) {
                                reject({ "error": "nigga who?" });

                            }
                            else {
                                if (parseInt(data.recordset[0]["CLIENTBALANCE"]) >= parseInt( Math.abs(json["amount"]))) {

                                    console.log(json["amount"])
                                    //user have enough balance
                                    db.query(`UPDATE  [CLIENTLOGIN] set CLIENTBALANCE = CLIENTBALANCE-${ Math.abs(json["amount"])}  where CLIENTID='${json["targetid"]}' and (CLIENTDIST='${json["username"]}' or CLIENTSUPDIST='${json["username"]}' or CLIENTADMIN='${json["username"]}')`).then((data) => {
                                        db.query(`UPDATE  [CLIENTLOGIN] set CLIENTBALANCE = CLIENTBALANCE + ${ Math.abs(json["amount"])}  where CLIENTID='${json["userid"]}'  `).then((data) => {
                                            resolve({ "message": "amount transfer successfull" });
                                        })
                                    })
                                        .catch((err) => {
                                            reject({ "error": "no  user to pay" })
                                        })
                                }
                                else
                                {
                                    reject({ "error": "no money? no bitches? :c " });

                                }
                            }

                        })
                        .catch((err) => {
                            reject({ "error": "nigga who?" + err });

                        })


                }
            })
        })
    }

}
