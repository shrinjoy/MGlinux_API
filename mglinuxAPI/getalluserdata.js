module.exports = {
    getdata:function (db,request)
    {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * from [nrdeluxe].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`).then((data)=>{
                if(data.recordset.length<1)
                {
                    reject({"message":"unable to find user with the provided creds"})
                }
                else if(data.recordset.length >0)
                {
                   
                    resolve({
                        "userid":data.recordset[0].CLIENTID,
                        "username":data.recordset[0].CLIENTUSERNAME,
                        "password":data.recordset[0].CLIENTPASSWORD,
                        "status":data.recordset[0].CLIENTSTATUS,
                        "balance":data.recordset[0].CLIENTBALANCE
                    })
                }
            }).catch((err)=>{
                reject({"message":"unable to find user with the provided creds because -"+err})

            })
        });


    }
}