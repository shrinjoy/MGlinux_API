module.exports = {
    canlogin:function (db,request)
    {
        return new Promise((resolve ,reject)=>{
           db.query(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data)=>{
               if(data.recordset.length<1)
               {
                   reject({"message":"no user found with the provided creds"});
               }
               else
               {
                    if(data.recordset.CLIENTMAC === request["macid"])
                    {
                        resolve({"message": "good to log in "})
                    }
                  else if(data.recordset.CLIENTMAC !== request["macid"])
                    {
                        reject({"message":"contact office"})

                    }

               }

           }).catch((err)=>{
               reject({"message":"failed because-"+err})
           })
        })
    }
}