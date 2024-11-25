module.exports=
{
    getalluserbyname:function(db,json)
    {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * from  [CLIENTLOGIN] where (CLIENTDIST='${json["username"]}' OR CLIENTSUPDIST='${json["username"]}' OR CLIENTADMIN='${json["username"]}')`)
            .then((data)=>{

                if(data.recordset.length>0)
                {
                    slavelist=[]

                    data.recordset.forEach(element => {
                        var slavedata = {
                            id:element["INTNUMBER"],
                            userid:element["CLIENTID"],
                            username:element["CLIENTUSERNAME"],
                            ownername:`${json["username"]}`,
                            email:"",
                            type:"TN",
                            revenue:element["CLIENTNETTOPAY"],
                            credit:element["CLIENTBALANCE"]
                        }
                        slavelist.push(slavedata);
                    });


                    resolve(slavelist);
                }
                else
                {
                    reject({"error":"white boi got no slave"});

                }
            })
            .catch((err)=>
            {
                    reject({"error":err});

            })
        })
    }
}




//super stockist
/*limit,reset(approval)*/
//stockist
//* limit ,reset*/
