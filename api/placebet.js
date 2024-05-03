//username
//password
//tickets
//totalbet
//gameid


//SELECT "INTNUMBER","GAMERESULT","GAMEDATE","GAMEID","GAMETIME","GAMENUM","GAMECLS","GAMEREL","GAMERELDATE" FROM "RESULT99" WHERE "GAMEDATE"=CONVERT(varchar, getdate(), 23) AND "GAMENUM"='A00';

const crypto = require('crypto');

function generateRandomNoise(length) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString('hex');
}



module.exports = {
    placebet: function (db, req) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT "GAMENUM" FROM "RESULT99" WHERE "GAMEDATE"=CONVERT(varchar, getdate(), 23) AND "GAMENUM"='${req["gameid"]}';`).then((data)=>{
            if(data.recordset.length <1){
            db.query(`SELECT DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;`)
                .then((data) => {

                    if ((data.recordset[0].timer - 10) > 12) {
                        console.log("time left:" + data.recordset[0].timer - 10)
                        userdata = db
                            .query(
                                `SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                            )
                            .then((data) => {
                                console.log("user found")
                                //check if user has enough balance;
                                if (data.recordset[0].CLIENTBALANCE > req["totalbet"]) {
                                    //deduct balance from user wallet
                                    db.query(
                                        `UPDATE [playjeeto].[dbo].[CLIENTLOGIN]  set CLIENTBALANCE  = CLIENTBALANCE -${req["totalbet"]} where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                                    )
                                        .then((data) => {
                                            console.log("deducted client balance");

                                            db.query("SELECT REPLACE(CAST(ABS(CAST(CHECKSUM(NEWID()) AS BIGINT) * CAST(RAND() * 1000000 AS BIGINT)) AS VARCHAR), '.', '') as barcode")
                                                .then((data) => {
                                                    var barcodedata = "B" + data.recordset[0]["barcode"]+generateRandomNoise(3);

                                                    var querystring = `INSERT INTO [playjeeto].[dbo].[TICKET99] (TICKETNUMBER,TICKETDETAILS,TICKETRS,TICKETTOTALRS,GAMEDATE,GAMETIME,TARMINALID,GAMEID) 
                                    VALUES ('${barcodedata}','${req["tickets"]}',1,${req["totalbet"]},FORMAT(GETDATE(), 'yyyy-MM-dd'),FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm:ss'),'${req["username"]}','${req["gameid"]}');`;
                                                    db.query(querystring)
                                                        .then((data) => {
                                                            resolve({ "barcode": barcodedata, "message": "placed bet " });
                                                            console.log("placed bet");

                                                        })
                                                        .catch((err) => {
                                                            console.log("failed to place bet");

                                                            reject({ error: `${err}` });
                                                        });

                                                })
                                                .catch((err) => {
                                                    reject({ error: `${err}` });
                                                })
                                        })
                                        .catch((err) => {
                                            console.log("failed to deduct client balance");

                                            reject({ message: "failed to place bet because- " + err });
                                        });
                                } else {
                                    reject({ message: "failed to place bet because of low balance" });
                                }
                            })
                            .catch((err) => {
                                reject({ message: "failed to place bets because " + err });
                            });
                    }
                    else {
                        reject({ message: "times up " + err });

                    }
                })
                .catch((err) => {
                    console.log("times up")
                    reject({ message: "times up " + err });

                })
            }
            else
            {
                reject({"message":"result already out for this data"})
            }
            }
            )
            .catch((err)=>{
                reject({"message":"failed to place bet"});
            })

        })


    },
}
//SELECT DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;
//sql.query(`SELECT GAMEID,TARMINALDATE AS NEXTGAMEDATE,TARMINALTIME AS NEXTGAMETIME,NEXTDRAW,DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;`)