module.exports = {
    getsalesreport:function (db,request)
    {
        return new Promise((resolve, reject) => {
            db.query(`SELECT  SUM(TICKETTOTALRS) as played,SUM(WINRS) as win ,(SUM(TICKETTOTALRS)-SUM(WINRS)) as endamount  from TICKET99 WHERE  GAMEDATE  BETWEEN  '${request["startdate"]}'and '${request["enddate"]}' and TARMINALID ='${request["username"]}'`).then((data)=>{
                if(data.recordset.length<1)
                {
                    reject({"message":"unable to find user with the provided creds"})
                }
                else if(data.recordset.length >0)
                {
                   
                    resolve({
                        "win":data.recordset[0].win,
                        "endamount":data.recordset[0].endamount,
                        "played":data.recordset[0].played
                    })
                }
            }).catch((err)=>{
                reject({"message":"unable to find user with the provided creds because -"+err})

            })
        });


    }
}