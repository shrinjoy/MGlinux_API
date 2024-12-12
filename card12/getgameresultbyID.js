module.exports = {
    getresultbyidofanygame: function (db, jsondata) {
        return new Promise((resolve, reject) => {

           
            console.log(`SELECT * FROM [RESULT12CARDWITHX] WHERE GAMEDATE = FORMAT(GETDATE(), 'yyyy-MM-dd') and gameid='${jsondata["gameid"]}'`)
            db.query(`SELECT *  FROM [RESULT12CARDWITHX] WHERE GAMEDATE = FORMAT(GETDATE(), 'yyyy-MM-dd') and gameid='${jsondata["gameid"]}'`)
                .then((data) => {
                    if(data.recordset[0]["gameresult"]===null||data.recordset[0].length <1 ||data.recordset[0]["gameresult"]==="null"||data.recordset[0]["gameresult"]==='null')
                    {
                        console.log(`result not found by id and gamedate `)

                        reject({"error":"no data found for the ID and date"});
                    }
                    else
                    {
                        console.log(`found result ${data.recordset[0]["gameresult"]}`)
                        resolve({"result":`${data.recordset[0]["gameresult"]}`,"xresult":`${data.recordset[0]["xresult"]}`})
                    }
                }
                )
                .catch((err) => {

                    console.log(`result not found due to sql error ${err} `)


                    reject({"error":`issue with sql query ${err}` });

                }
                )
        }
        )
    }

};
