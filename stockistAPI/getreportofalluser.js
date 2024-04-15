/*
SELECT
    CLIENTLOGIN.CLIENTUSERNAME,
    CLIENTLOGIN.INTNUMBER,
    CLIENTLOGIN.CLIENTDIST,
    CLIENTLOGIN.CLIENTSUPDIST,
    CLIENTLOGIN.CLIENTADMIN,
    CLIENTLOGIN.CLIENTBALANCE,
    SUM(TICKET99.TICKETTOTALRS) AS Paid,
	SUM(TICKET99.WINRS) AS won,
	( SUM(TICKET99.TICKETTOTALRS)-SUM(TICKET99.WINRS)) as revenue
FROM
    [playjeeto].[dbo].[CLIENTLOGIN]
JOIN
    [playjeeto].[dbo].[TICKET99]
ON 
    CLIENTLOGIN.CLIENTUSERNAME = TICKET99.TARMINALID
	where  CLIENTLOGIN.CLIENTDIST='spark' and TICKET99.GAMEDATE='2024/06/26'
GROUP BY
    CLIENTLOGIN.CLIENTUSERNAME,
    CLIENTLOGIN.INTNUMBER,
    CLIENTLOGIN.CLIENTDIST,
    CLIENTLOGIN.CLIENTSUPDIST,
    CLIENTLOGIN.CLIENTADMIN,
    CLIENTLOGIN.CLIENTBALANCE;

*/


module.exports=
{
    getreportofalluser: function(db,json){
        return new Promise((resolve,reject)=>{
           db.query(`SELECT
           CLIENTLOGIN.CLIENTUSERNAME,
           CLIENTLOGIN.INTNUMBER,
           CLIENTLOGIN.CLIENTDIST,
           CLIENTLOGIN.CLIENTSUPDIST,
           CLIENTLOGIN.CLIENTADMIN,
           CLIENTLOGIN.CLIENTBALANCE,
           SUM(TICKET99.TICKETTOTALRS) AS Paid,
           SUM(TICKET99.WINRS) AS won,
           ( SUM(TICKET99.TICKETTOTALRS)-SUM(TICKET99.WINRS)) as revenue
       FROM
           [playjeeto].[dbo].[CLIENTLOGIN]
       JOIN
           [playjeeto].[dbo].[TICKET99]
       ON 
           CLIENTLOGIN.CLIENTUSERNAME = TICKET99.TARMINALID
           where  (CLIENTLOGIN.CLIENTDIST='${json["username"]}' or CLIENTLOGIN.CLIENTSUPDIST='${json["username"]}' or CLIENTLOGIN.CLIENTADMIN='${json["username"]}') 
       GROUP BY
           CLIENTLOGIN.CLIENTUSERNAME,
           CLIENTLOGIN.INTNUMBER,
           CLIENTLOGIN.CLIENTDIST,
           CLIENTLOGIN.CLIENTSUPDIST,
           CLIENTLOGIN.CLIENTADMIN,
           CLIENTLOGIN.CLIENTBALANCE;
        `).then((data)=>{

            if(data.recordset.length <1)
            {
                reject({"error":"no data found under this user"})
            }
            else
            {
                resolve({"message":data});
            }
            
           })
           .catch((err)=>{

           })
        
          
        })
    }
}