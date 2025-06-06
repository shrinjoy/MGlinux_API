module.exports = {
    //userid,startdate,enddate
    
    getsalesdetails: async function(db, req) {
        try {
            // Query to get playpoint and cancelpoint
            const salesData = await db.query(`
                SELECT 
                    ISNULL(SUM(CASE WHEN TICKET99.TARMINALCLS <> '' THEN TICKETTOTALRS ELSE 0 END), 0) AS playpoint,
                    ISNULL(SUM(CASE WHEN TICKET99.TARMINALCLS = 'CANCEL' THEN TICKETTOTALRS ELSE 0 END), 0) AS cancelpoint
                FROM TICKET99
                WHERE TICKET99.TARMINALID = '${req["userid"]}'
                  AND TICKET99.GAMEDATE BETWEEN '${req["startdate"]}' AND '${req["enddate"]}'
            `);
            const salesData1 = await db.query(`
                SELECT 
                    ISNULL(SUM(CASE WHEN TICKET12CARD.TARMINALCLS <> '' THEN TICKETTOTALRS ELSE 0 END), 0) AS playpoint,
                    ISNULL(SUM(CASE WHEN TICKET12CARD.TARMINALCLS = 'CANCEL' THEN TICKETTOTALRS ELSE 0 END), 0) AS cancelpoint
                FROM TICKET12CARD
                WHERE TICKET12CARD.TARMINALID = '${req["userid"]}'
                  AND TICKET12CARD.GAMEDATE BETWEEN '${req["startdate"]}' AND '${req["enddate"]}'
            `);
            console.log(salesData);
    
            const clientData = await db.query(`
                SELECT * FROM [CLIENTLOGIN] WHERE CLIENTUSERNAME = '${req['userid']}'
            `);
                console.log(`SELECT * FROM [CLIENTLOGIN] WHERE CLIENTUSERNAME = '${req['userid']}'`);
            // Query to get claimpoints
            const claimData = await db.query(`
                SELECT ISNULL(SUM(WINRS), 0) AS claimpoint
                FROM TICKET99
                WHERE TARMINALID = '${req['userid']}'
                  AND claimdate BETWEEN '${req["startdate"]}' AND '${req["enddate"]} '
            `);
            const claimData1 = await db.query(`
                SELECT ISNULL(SUM(WINRS), 0) AS claimpoint
                FROM TICKET12CARD
                WHERE TARMINALID = '${req['userid']}'
                  AND claimdate BETWEEN '${req["startdate"]}' AND '${req["enddate"]} '
            `);
            const claimpoints = (claimData.recordset[0]["claimpoint"] || 0)+(claimData1.recordset[0]["claimpoint"] || 0);
            var percetange =(clientData.recordset[0]["CLIENTPARSENT"] / 100);
            // Calculate discountpoints, netplay, and prepare finaldata object
        
            const discountpoints = (((salesData.recordset[0]["playpoint"] - salesData.recordset[0]["cancelpoint"]) ) * percetange)+(((salesData1.recordset[0]["playpoint"] - salesData1.recordset[0]["cancelpoint"]) ) * percetange);
            const netplay =(((salesData.recordset[0]["playpoint"] - salesData.recordset[0]["cancelpoint"]))+((salesData1.recordset[0]["playpoint"] - salesData1.recordset[0]["cancelpoint"]) )- claimpoints) - discountpoints;
    
            const finaldata = {
                "playpoint": salesData.recordset[0]["playpoint"]+salesData1.recordset[0]["playpoint"],
                "cancelpoint": salesData.recordset[0]["cancelpoint"]+salesData1.recordset[0]["cancelpoint"],
                "netpoint": (salesData.recordset[0]["playpoint"] - salesData.recordset[0]["cancelpoint"])+(salesData1.recordset[0]["playpoint"] - salesData1.recordset[0]["cancelpoint"]),
                "claimpoints": claimpoints,
                "optpoints": ((salesData.recordset[0]["playpoint"] - salesData.recordset[0]["cancelpoint"])+(salesData1.recordset[0]["playpoint"] - salesData1.recordset[0]["cancelpoint"])) - claimpoints,
                "discountpoints": discountpoints,
                "netplaypoints":netplay
            };
    
            return finaldata;
        } catch (err) {
            console.error(err);
            throw err; // Re-throw the error to handle it further up the call stack
        }
    }
    ,
    getsalesreport: function (db, request) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT  SUM(TICKETTOTALRS) as played,SUM(WINRS) as win ,(SUM(TICKETTOTALRS)-SUM(WINRS)) as endamount  from TICKET99 WHERE  GAMEDATE  BETWEEN  '${request["startdate"]}'and '${request["enddate"]}' and TARMINALID ='${request["username"]}'`).then((data) => {
                if (data.recordset.length < 1) {
                    reject({ "message": "unable to find user with the provided creds" })
                }
                else if (data.recordset.length > 0) {

                    resolve({
                        "win": data.recordset[0].win,
                        "endamount": data.recordset[0].endamount,
                        "played": data.recordset[0].played
                    })
                }
            }).catch((err) => {
                reject({ "message": "unable to find user with the provided creds because -" + err })

            })
        });


    }
}