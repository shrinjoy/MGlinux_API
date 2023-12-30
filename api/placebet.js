module.exports = {
    placebet: function (db, req) {
        return new Promise((resolve, reject) => {
            userdata = db.query(`SELECT * from [playjeeto].[dbo].[CLIENTLOGIN] where CLIENTUSERNAME ='${request["username"]}' and CLIENTPASSWORD='${request["password"]}'`)
                .then((data) => {
                    //check if user has enough balance;
                    if(data.recordset[0].CLIENTBALANCE >req["totalbet"])
                    {
                        //deduct balance from user wallet
                        db.query(`UPDATE [playjeeto].[dbo].[CLIENTLOGIN]  set CLIENTBALANCE  = CLIENTBALANCE -${req["totalbet"]}`).then((data)=>{
                            db.query(`INSERT [playjeeto].[dbo].[TICKET99] (TICKETNUMBER,)`)
                        }).catch((err)=>{
                            reject({"message":"failed to place bet because- "+err})

                        })

                    }
                    else
                    {
                        reject({"message":"failed to place bet because of low balance"})
                    }
                })
                .catch((err) => {
                    reject({"message":"failed to place bets because "+err})
                })

        })
        /*
        * [16:17, 23/12/2023] Sukumar Bhandari: ticketdetails te   bet number ta input habe
    [16:19, 23/12/2023] Sukumar Bhandari: TICKETNUMBER     is bet ticket id
    [16:19, 23/12/2023] Sukumar Bhandari: TICKETRS bet amount
    [16:20, 23/12/2023] Sukumar Bhandari: TICKETTOTALRS    total ticket amount
    [16:20, 23/12/2023] Sukumar Bhandari: GAMEID    runing game id
    [16:21, 23/12/2023] Sukumar Bhandari: GAMEDATE   runing game date
    [16:21, 23/12/2023] Sukumar Bhandari: GAMETIME  game time
    [16:22, 23/12/2023] Sukumar Bhandari: TARMINALID  client system login id
    [16:22, 23/12/2023] Sukumar Bhandari: TARMINALDETAILS     if you add system mac
        * */
    }
}