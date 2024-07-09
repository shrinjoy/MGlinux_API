module.exports = {
    cancel: function (req, sql) {
        return new Promise((resolve, reject) => {
            // Update query to cancel the bet if it's currently 'NOTWIN' or 'WIN'
            sql.query(`SELECT * FROM TICKET99 WHERE TICKETNUMBER='${req["barcode"]}'`).then((data) => {



                if (data.recordset.length < 1) {
                    console.log("found no ticket");
                    reject({ "error": "no barcode found" });
                }
                else {
                    console.log("found a ticket");
              


                    if (data.recordset[0]["TARMINALCLS"] !== "WIN" && data.recordset[0]["TARMINALCLS"] !== "NOTWIN" && data.recordset[0]["TARMINALCLS"] !== "CLAIMED" && data.recordset[0]["TARMINALCLS"] !== 'CANCEL') {
                       
                    console.log("found a ticket that is cool to use");
                       
                        var playedamount = data.recordset[0]["TICKETTOTALRS"];
                        var userid = data.recordset[0]["TARMINALID"];
                        sql.query(`UPDATE TICKET99 SET TARMINALCLS='CANCEL' WHERE TICKETNUMBER='${req["barcode"]}' AND TARMINALID='${userid}'`)
                            .then((data) => {

                    console.log("updated ticket status");


                                sql.query(`UPDATE CLIENTLOGIN SET CLIENTBALANCE=CLIENTBALANCE+${playedamount}  where CLIENTUSERNAME='${userid}' `).then((data) => {
                    console.log("updated account  status");
                                    
                                    resolve({"message":"canceled bet"});
                                })
                                    .catch((err) => { 
                    console.log("didnt update account  status");

                                        reject({"error":"failed to update user balance"+err});

                                    })
                            })
                            .catch((err) => { 

                    console.log("failed to update ticket status");
                                
                                reject({"error":"failed to update ticket status"+err});

                            })
                    }
                    else {
                    console.log("found a ticket that is  not cool to use");

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