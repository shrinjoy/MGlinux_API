module.exports = {
    canlogin:function (db,request)
    {
        return new Promise((resolve ,reject)=>{


            
           db.query(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTID ='${request["userid"].toString().trim()}'`).then((data)=>{
               if(data.recordset.length<1)
               {
                   reject({"message":"no user found with the provided creds"});
               }
               else
               {
                console.log(data.recordset[0]["CLIENTUSERNAME"].toString().trim()===request["username"].toString().trim());
                console.log(data.recordset[0]["CLIENTPASSWORD"]);
                
                if(data.recordset[0]["CLIENTUSERNAME"].toString().trim()===request["username"].toString().trim() && data.recordset[0]["CLIENTPASSWORD"].toString().trim()===request["password"].toString().trim()){
                 
                        resolve({"message": "good to log in "})
                }
                else
                {
                    reject({"message":"wrong username or password"})
                }
                    
               }

           }).catch((err)=>{
               reject({"message":"failed because-"+err})
           })
        })
    },
    canlogin_macid:function (db,request)
    {
        return new Promise((resolve ,reject)=>{
           db.query(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTID ='${request["userid"].toString().trim()}' and CLIENTUSERNAME ='${request["username"].toString().trim()}' and CLIENTPASSWORD='${request["password"].toString().trim()}'`).then((data)=>{
               
            
            
                if(data.recordset.length<1)
               {
                   reject({"message":"no user found with the provided creds"});
               }
               else
               {
                 

                if(data.recordset[0]["CLIENTMAC"]!==request["macid"])
                {
                    db.query(`UPDATE [playjeeto].[dbo].[CLIENTLOGIN] set requestedmac = '${request["macid"]}' where CLIENTID ='${request["userid"]}' and CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`)


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