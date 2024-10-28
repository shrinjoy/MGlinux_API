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
            db.query(`SELECT "GAMENUM" FROM "RESULT99" WHERE "GAMEDATE"=CONVERT(varchar, getdate(), 23) AND "GAMENUM"='${req["gameid"]}';`)
                .then((data) => {
                    if (data.recordset.length < 1) {
                       
                        db.query(
                            `SELECT * from [CLIENTLOGIN] where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                        )
                            .then((data) => {
                                console.log("user found");
                                //check if user has enough balance
                                if (data.recordset[0].CLIENTBALANCE > req["totalbet"]) {
                                    //deduct balance from user wallet
                                    db.query(
                                        `UPDATE [CLIENTLOGIN] set CLIENTBALANCE = CLIENTBALANCE -${req["totalbet"]} where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                                    )
                                        .then(() => {
                                            console.log("deducted client balance");
    
                                            db.query("SELECT LEFT(REPLACE(CAST(ABS(CAST(CHECKSUM(NEWID()) AS BIGINT) * CAST(RAND() * 1000000 AS BIGINT)) AS VARCHAR), '.', ''), 9) AS barcode")
                                                .then((data) => {
                                                    var barcodedata = "B" + generateRandomNoise(6) + data.recordset[0]["barcode"];
                                                    barcodedata = barcodedata.slice(0, 16);
                                                    var querystring = `INSERT INTO [TICKET99] (TICKETNUMBER,TICKETDETAILS,TICKETRS,TICKETTOTALRS,GAMEDATE,GAMETIME,TARMINALID,GAMEID,TARMINALCLS) 
                                                    VALUES ('${barcodedata}','${req["tickets"]}',1,${req["totalbet"]},FORMAT(GETDATE(), 'yyyy-MM-dd'),FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm:ss'),'${req["username"]}','${req["gameid"]}','PENDING');`;
                                                    db.query(querystring)
                                                        .then(() => {
                                                            resolve({ "barcode": barcodedata, "message": "placed bet" });
                                                            console.log("placed bet");
                                                        })
                                                        .catch((err) => {
                                                            console.log("failed to place bet");
                                                            reject({ error: `${err}` });
                                                        });
                                                })
                                                .catch((err) => {
                                                    reject({ error: `${err}` });
                                                });
                                        })
                                        .catch((err) => {
                                            console.log("failed to deduct client balance");
                                            reject({ message: "failed to place bet because - " + err });
                                        });
                                } else {
                                    reject({ message: "failed to place bet because of low balance" });
                                }
                            })
                            .catch((err) => {
                                reject({ message: "failed to place bet because " + err });
                            });
                    }
                })
                .catch((err) => {
                    console.log("times up");
                    reject({ message: "times up " + err });
                });
        });
    }
    


}

//SELECT DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;
//sql.query(`SELECT GAMEID,TARMINALDATE AS NEXTGAMEDATE,TARMINALTIME AS NEXTGAMETIME,NEXTDRAW,DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;`)