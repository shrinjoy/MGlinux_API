module.exports=
{
    canlogin: function(db,json){
        return new Promise((resolve,reject)=>{
           db.query(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME='${json["username"]}' and CLIENTPASSWORD='${json["password"]}' and level<3`).then((data)=>{
                console.log(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME='${json["username"]}' and CLIENTPASSWORD='${json["password"]}' and level<3`);
                console.log(data.recordset.length);
                var entries = data.recordset.length;
                if(entries <1)
                {
                    reject({"error":"fake nigga"})

                }
                else 
                {
                    resolve({"message":"nigga real OG"});
                }
            }).catch((err)=>{
                reject({"error":`nigga be  spitting facts bruh check this error out ${err}`})

            })
          
        })
    }
}