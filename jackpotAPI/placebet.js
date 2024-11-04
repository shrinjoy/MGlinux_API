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
        return new Promise(async (resolve, reject) => {

            var timedata =await this.gettime(db);

            console.log(timedata);
           await db.query(`SELECT GAMENUM FROM RESULT99 WHERE GAMEDATE=CONVERT(varchar,GETDATE(), 23) AND GAMENUM='${req["gameid"]}';`)
                .then(async (data) => {
                    console.log("step 1 good");
                    if (data.recordset.length < 1) {
                       
                    await    db.query(
                            `SELECT * from [CLIENTLOGIN] where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                        )
                            .then(async(data) => {
                                console.log("user found"+data.recordset[0]);
                                //check if user has enough balance
                                if (data.recordset[0].CLIENTBALANCE > req["totalbet"]) {
                                    //deduct balance from user wallet
                                await    db.query(
                                        `UPDATE [CLIENTLOGIN] set CLIENTBALANCE = CLIENTBALANCE -${req["totalbet"]} where CLIENTUSERNAME ='${req["username"]}' and CLIENTPASSWORD='${req["password"]}'`
                                    )
                                        .then(async () => {
                                            console.log("deducted client balance");
    
                                         await   db.query("SELECT LEFT(REPLACE(CAST(ABS(CAST(CHECKSUM(NEWID()) AS BIGINT) * CAST(RAND() * 1000000 AS BIGINT)) AS VARCHAR), '.', ''), 9) AS barcode")
                                                .then(async(data) => {
                                                   
                                                    var barcodedata = "B" + generateRandomNoise(6) + data.recordset[0]["barcode"];
                                                    barcodedata = barcodedata.slice(0, 16);
                                                    var querystring = `INSERT INTO [TICKET99] (TICKETNUMBER,TICKETDETAILS,TICKETRS,TICKETTOTALRS,GAMEDATE,GAMETIME,TARMINALID,GAMEID,TARMINALCLS,DROWTIME) 
                                                    VALUES ('${barcodedata}','${req["tickets"]}',1,${req["totalbet"]},FORMAT(GETDATE(), 'yyyy-MM-dd'),FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm:ss'),'${req["username"]}','${req["gameid"]}','PENDING','${timedata.nextgametime}');`;
                                                  await  db.query(querystring)
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
    },
    gettime: function(sql){
        return new Promise(async (resolve,reject)=>{
            try {
                var data = await sql.query(`SELECT 
            [INTNUMBER],
            [TARMINALDATE],
            [TARMINALTIME],
            [TARMINALCLS],
            [NEXTDRAW],
            [GAMEID],
            DATEDIFF(SECOND, CONVERT(DATETIME, [TARMINALDATE] + ' ' + [TARMINALTIME], 113), CONVERT(DATETIME, [NEXTDRAW], 109)) AS timer
        FROM 
            [TARMINALTIMEZONE]`);
                resolve({ "time": data.recordset[0].timer , 
                    "gameid": data.recordset[0].GAMEID, 
                    "nextgamedate": data.recordset[0].NEXTDRAW,
                     "nextgametime": data.recordset[0].NEXTDRAW });
        
            } catch (err) {
                reject({ "message": "failed to get time because -" + err });
            }
        })
    }


}

//SELECT DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;
//sql.query(`SELECT GAMEID,TARMINALDATE AS NEXTGAMEDATE,TARMINALTIME AS NEXTGAMETIME,NEXTDRAW,DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;`)