module.exports = {
    claim: function (sql, req) {
        return new ((resolve, reject) => {
            sql.query(`SELECT * FROM "TICKET99" where "TICKETNUMBER"='${req["barcode"]}' and "TARMINALCLS"='WIN' and TARMINAL='${req["userid"]}'`)
                .then((data) => {
                    if (data.recordset.length < 1) {
                        reject({ "message": "invalid barcode" });
                    }
                    else {
                        winrs = data.recordset[0]["WINRS"];
                        sql.query(`UPDATE "TICKET99" SET "TARMINALCLS"='CLAIMED' where "TICKETNUMBER"='${req["barcode"]}' and TARMINAL='${req["userid"]}'`)
                            .then((data) => {
                                sql.query(`UPDATE "CLIENTLOGIN" SET CLIENTBALANCE = CLIENTBALANCE+${parseInt(winrs) || 0} where "CLIENTID"='${req["userid"]}'`).then((data) => {
                                    resolve({ "message": "added balance", "amount": winrs, "userid": `${req["userid"]}` })
                                })
                                .catch((err)=>{
                                 reject({"error":err});

                                })

                            })
                            .catch((err) => {

                            })
                    }
                })
                .catch((err) => {

                })

        })
    }
}