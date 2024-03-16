module.exports={

    gerreportbydate:function(db,sql)
    {
        return new Promise((resolve,reject)=>{
            db.query(`Select  [GAMEID],[TICKETTOTALRS],[TICKETTOTALRS],[TICKETNUMBER],[GAMETIME],[WINRS],[GAMERESULT] from ticket99 where gamedate=CONVERT(DATE,'${sql['date']}') and tarminalid='${sql['username']}'  order by INTNUMBER DESC`).then((data)=>{
              arraydata = []
              data.recordsets.forEach(element => {
                arraydata.push(element);
              });
              
              resolve(arraydata);
            })
            .catch((err)=>{
                    reject(err);
                }
            )

        })
    },
    getreportbydateandid:function(db,sql)
    {
        return new Promise((resolve,reject)=>{
            db.query(`Select  [GAMEID],[TICKETTOTALRS],[TICKETTOTALRS],[TICKETNUMBER],[GAMETIME],[WINRS],[GAMERESULT]from ticket99 where GAMEID='${sql['gameid']}' and gamedate=CONVERT(DATE,'${sql['date']}') and tarminalid='${sql['username']}'  order by INTNUMBER DESC`).then((data)=>{
              arraydata = []
              data.recordsets.forEach(element => {
                arraydata.push(element);
              });
              
              resolve(arraydata);
            })
            .catch((err)=>{
                    reject(err);
                }
            )

        })
    }

}
//get result by date for all 
//Select ticketnumber,gamedate,DROWTIME,gametime,tickettotalrs,tarminalcls from ticket99 where gamedate=CONVERT(DATE,'2024-03-13') and tarminalid='ADMIN' order by INTNUMBER DESC 
