module.exports = {
    getuserdatabyID:function(db,json)
    {
        return new Promise((resolve,reject)=>{


            db.query(`SELECT * FROM [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTID='${json["targetid"]}' and (CLIENTDIST='${json["username"]}' or CLIENTSUPDIST='${json["username"]}' or CLIENTADMIN='${json["username"]}')`).then((data)=>{
            

                if(data.recordset.length<1)
                {
                    reject({"error":"no user with such userid"})
                }
                else
                {   
                    console.log(data);
                    resolve({"data":data.recordset[0]})
                }

            }).catch((err)=>{
                reject({"error":err})
            })

        })
       
    },
    getuserdatabyName:function(db,json)
    {
        return new Promise((resolve,reject)=>{


            db.query(`SELECT * FROM [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME='${json["targetusername"]}' and (CLIENTDIST='${json["username"]}' or CLIENTSUPDIST='${json["username"]}' or CLIENTADMIN='${json["username"]}')`).then((data)=>{
            
                if(data.recordset.length<1)
                {
                    reject({"error":"no user with such userid"})
                }
                else
                {
                    resolve({"data":data.recordset[0]})
                }

            }).catch((err)=>{
                reject({"error":err})
            })

        })
       
    }
}
