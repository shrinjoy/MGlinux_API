module.exports = {
    getresultbyidofanygame: function (db, jsondata) {
        return new Promise((resolve, reject) => {

           
            console.log(`SELECT ${jsondata["gameid"]} as result FROM [nrdeluxe].[dbo].[RESULT] WHERE GAMEDATE = FORMAT(GETDATE(), 'yyyy-MM-dd')`)
            db.query(`SELECT ${jsondata["gameid"]} as result FROM [nrdeluxe].[dbo].[RESULT] WHERE GAMEDATE = FORMAT(GETDATE(), 'yyyy-MM-dd')`)
                .then((data) => {
                    if(data.recordset[0]["result"]===null||data.recordset[0].length <1 ||data.recordset[0]["result"]==="null"||data.recordset[0]["result"]==='null')
                    {
                        console.log(`result not found by id and gamedate `)

                        reject({"error":"no data found for the ID and date"});
                    }
                    else
                    {
                        console.log(`found result ${data.recordset[0]["result"]}`)
                        resolve({"result":`${data.recordset[0]["result"]}`})
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
