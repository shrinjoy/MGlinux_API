module.exports = {
    getsalesdetails: function (db, req) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT 
        ISNULL(SUM([TICKETTOTALRS]), 0) AS playpoint,
        ISNULL(SUM(CASE WHEN [TARMINALCLS] = 'CANCEL' THEN [TICKETTOTALRS] ELSE 0 END), 0) AS cancelpoint,

        ISNULL(SUM([TICKETTOTALRS]), 0)
        - ISNULL(SUM(CASE WHEN [TARMINALCLS] = 'CANCEL' THEN [TICKETTOTALRS] ELSE 0 END), 0) AS netpoint,
        ISNULL(SUM(CASE WHEN [TARMINALCLS] = 'CLAIMED' THEN [WINRS] ELSE 0 END), 0) AS claimpoints,
        ISNULL(SUM([TICKETTOTALRS]), 0)
        - ISNULL(SUM(CASE WHEN [TARMINALCLS] = 'CANCEL' THEN [TICKETTOTALRS] ELSE 0 END), 0)
        - ISNULL(SUM(CASE WHEN [TARMINALCLS] = 'CLAIMED' THEN [WINRS] ELSE 0 END), 0) AS netplaypoints
        FROM TICKET99
        WHERE 
        TARMINALID = '${req['userid']}' 
        AND GAMEDATE BETWEEN '${req['startdate']}'  AND '${req['enddate']}' ;`)
                .then((data) => {
                    resolve(data.recordsets[0]);
                })
                .catch((err) => {

                    reject(err);

                })
        });
    },
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