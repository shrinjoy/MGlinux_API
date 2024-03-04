module.exports = {
    changepassword: function (request, db) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "message": "no user found with the provided creds" });
                }
                else {
                    db.query(`UPDATE [playjeeto].[dbo].[CLIENTLOGIN] set CLIENTPASSWORD ='${request["newpassword"]}' where CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data) => {

                        resolve({ "message": "passwordupdated" })
                    })
                        .catch((err) => {

                            reject({ "message": "failed because" + err });
                        })


                }

            }).catch((err) => {
                reject({ "message": "failed because-" + err })
            })

        }
        )
    }
}