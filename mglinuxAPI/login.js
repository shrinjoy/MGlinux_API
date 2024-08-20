module.exports = {
    canlogin: function (db, request) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * from [CLIENTLOGIN] where CLIENTID ='${request["userid"]}' and CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "message": "no user found with the provided creds" });
                }
                else {

                    resolve({ "message": "good to log in " })


                }

            }).catch((err) => {
                reject({ "message": "failed because-" + err })
            })
        })
    },
    canlogin_macid: function (db, request) {
        return new Promise((resolve, reject) => {


            if (request["username"] !== "9903" && request["password"] != "9903") {
                // console.log(`SELECT * from [CLIENTLOGIN] where CLIENTID ='${request["userid"]}' and CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`)
                db.query(`SELECT * from [CLIENTLOGIN] where CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data) => {



                    if (data.recordset.length < 1) {
                        reject({ "message": "no user found with the provided creds" });
                    }
                    else {


                        if (data.recordset[0]["CLIENTMAC"] !== request["macid"]) {
                          
                          //  db.query(`UPDATE [CLIENTLOGIN] set CLIENTMAC = '' where CLIENTMAC = '${request["macid"]}'`)
                            
                            db.query(`UPDATE [CLIENTLOGIN] set requestedmac = '${request["macid"]}' where  CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`)


                            resolve({ "message": "macid_wrong" })

                        }
                        else {

                            db.query(`UPDATE [CLIENTLOGIN] set CLIENTMAC = '' where CLIENTMAC = '${request["macid"]}' and CLIENTUSERNAME !='${request["username"]}' and CLIENTPASSWORD !='${request["password"]}' `)

                            resolve({ "message": "good to log in " })

                        }
                    }

                }).catch((err) => {
                    reject({ "message": "failed because-" + err })
                })
            }
            else {
                db.query(`UPDATE [CLIENTLOGIN] SET CLIENTMAC = '' WHERE CLIENTMAC = '${request["macid"]}' `).then((data) => {
                    resolve({ "message": "macid_reset" })

                }).catch((err) => {
                    reject({ "message": "failed because-" + err })
                })
            }
        })

    }
}
