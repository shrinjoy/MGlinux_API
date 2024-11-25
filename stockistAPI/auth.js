module.exports=
{
    canlogin: function(db,json){
        return new Promise((resolve,reject)=>{
           db.query(`SELECT * from  [CLIENTLOGIN] where CLIENTUSERNAME='${json["username"]}' and CLIENTPASSWORD='${json["password"]}' and level<3`).then((data)=>{
                console.log(`SELECT * from  [CLIENTLOGIN] where CLIENTUSERNAME='${json["username"]}' and CLIENTPASSWORD='${json["password"]}' and level<3`);
                console.log(data.recordset.length);
                var entries = data.recordset.length;
                if(entries <1)
                {
                    reject({"error":"fake nigga"})

                }
                else 
                {
                    resolve({
                        "message":"nigga real OG",
                        "userid":data.recordset[0].CLIENTID,
                        "username":data.recordset[0].CLIENTUSERNAME,
                        "balance":data.recordset[0].CLIENTBALANCE,
                        "level":data.recordset[0].level
                    });
                }
            }).catch((err)=>{
                reject({"error":`nigga be  spitting facts bruh check this error out ${err}`})

            })
          
        })
    }
}