module.exports = {
    placebet: function (db, req) {
        return new Promise((resolve, reject) => {
            userdata = db
                .query(
                    `SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                )
                .then((data) => {
                    //check if user has enough balance;
                    if (data.recordset[0].CLIENTBALANCE > req["totalbet"]) {
                        //deduct balance from user wallet
                        db.query(
                            `UPDATE [playjeeto].[dbo].[CLIENTLOGIN]  set CLIENTBALANCE  = CLIENTBALANCE -${req["totalbet"]}`
                        )
                            .then((data) => {
                                
                                 db.query("SELECT FORMAT(GETDATE(), 'yyyyMMddHHmmssfff') as barcode")
                                .then((data) => {
                                    var barcodedata =  data.recordset[0]["barcode"];
                                    var querystring = `INSERT INTO [playjeeto].[dbo].[TICKET99] (TICKETNUMBER,TICKETDETAILS,TICKETRS,TICKETTOTALRS,GAMEDATE,GAMETIME,TARMINALID,GAMEID) 
                                    VALUES ('${barcodedata}','${req["tickets"]}',1,${req["totalbet"]},FORMAT(GETDATE(), 'yyyy-MM-dd'),FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm:ss'),'${req["username"]}','${req["gameid"]}');`;
                                    db.query(querystring)
                                        .then((data) => {
                                            resolve({ "barcode": barcodedata,"message":"placed bet "});
                                        })
                                        .catch((err) => {
                                            reject({ error: `${err}` });
                                        });

                                })
                                .catch((err) => {
                                reject({ error: `${err}` });
                                })
                            })
                            .catch((err) => {
                                reject({ message: "failed to place bet because- " + err });
                            });
                    } else {
                        reject({ message: "failed to place bet because of low balance" });
                    }
                })
                .catch((err) => {
                    reject({ message: "failed to place bets because " + err });
                });
        });
    },
};
