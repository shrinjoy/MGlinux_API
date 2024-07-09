module.exports = {
    cancel: function (req, sql) {
        return new Promise((resolve, reject) => {
            // Update query to cancel the bet if it's currently 'NOTWIN' or 'WIN'
            sql.query(`SELECT * FROM TICKET99 WHERE TICKETNUMBER='${req["barcode"]}'`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "error": "no barcode found" });
                }
                else {
                    if (data.recordset[0]["TARMINALCLS"] != "WIN" || data.recordset[0]["TARMINALCLS"] != "NOTWIN" || data.recordset[0]["TARMINALCLS"] != "CLAIMED" || data.recordset[0]["TARMINALCLS"] != "CANCEL") {
                        var playedamount = data.recordset[0]["TICKETTOTALRS"];
                        var userid = data.recordset[0]["TARMINALID"];
                        sql.query(`UPDATE TICKET99 SET TARMINALCLS='CANCEL' WHERE TICKETNUMBER='${req["barcode"]}' AND TARMINALID='${userid}'`)
                            .then((data) => {
                                sql.query(`UPDATE CLIENTLOGIN SET CLIENTBALANCE=CLIENTBALANCE+${playedamount}  where CLIENTUSERNAME='${userid}' `).then((data) => {
                                    resolve({"message":"canceled bet"});
                                })
                                    .catch((err) => { 
                                        reject({"error":"failed to update user balance"+err});

                                    })
                            })
                            .catch((err) => { 

                                
                                reject({"error":"failed to update ticket status"+err});

                            })
                    }
                    else {
                        reject({ "error": "no barcode found" });

                    }
                }
            })
            .catch((err) => { 

                                
                reject({"error":"failed to  find a ticket"+err});

            })
        }
        )
    }
}