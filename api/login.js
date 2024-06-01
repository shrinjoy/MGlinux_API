module.exports = {
    canlogin:function (db,request)
    {
        return new Promise((resolve ,reject)=>{
           db.query(`SELECT * from [CLIENTLOGIN] where CLIENTID ='${request["userid"]}' and CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data)=>{
               if(data.recordset.length<1)
               {
                   reject({"message":"no user found with the provided creds"});
               }
               else
               {
                 
                        resolve({"message": "good to log in "})
                    
                    
               }

           }).catch((err)=>{
               reject({"message":"failed because-"+err})
           })
        })
    },
    canlogin_macid:function (db,request)
    {
        return new Promise((resolve ,reject)=>{
           db.query(`SELECT * from [CLIENTLOGIN] where CLIENTID ='${request["userid"]}' and CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data)=>{
               
            
            
                if(data.recordset.length<1)
               {
                   reject({"message":"no user found with the provided creds"});
               }
               else
               {
                 

                if(data.recordset[0]["CLIENTMAC"]!==request["macid"])
                {
                    db.query(`UPDATE [CLIENTLOGIN] set requestedmac = '${request["macid"]}' where CLIENTID ='${request["userid"]}' and CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`)


                    resolve({"message": "macid_wrong"})

                }
                else
                {
                    resolve({"message": "good to log in "})
                    
                }
               }

           }).catch((err)=>{
               reject({"message":"failed because-"+err})
           })
        })
    }
}