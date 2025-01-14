module.exports
=
{
    setgame_start: async function(db, req) {

        return new Promise(async (resolve,reject)=>{
               await db.query(`UPDATE CLIENTLOGIN SET GameStartTime = '${req["game_start_time"]}',CurrentGamePlaying  = '${req["game_name"]}' where CLIENTUSERNAME = '${req["username"]}' and CLIENTPASSWORD = '${req["password"]}'`).then((data)=>{
                console.log(`UPDATE CLIENTLOGIN SET GameStartTime = '${req["game_start_time"]}',CurrentGamePlaying  = '${req["game_name"]}' where CLIENTUSERNAME = '${req["username"]}' and CLIENTPASSWORD = '${req["password"]}'`);   
                
                console.log(data);    
                resolve({"message":"updated game time"});
                })
                .catch((err)=>{
                    reject({"message":"error RAW_ERROR->"+err});
                })
        })
    },
    setgame_end: async function(db, req) {

        return new Promise(async (resolve,reject)=>{
            await    db.query(`UPDATE CLIENTLOGIN SET GameEndTime = '${req["game_end_time"]}',CurrentGamePlaying  = '${req["game_name"]}' where CLIENTUSERNAME = '${req["username"]}' and CLIENTPASSWORD = '${req["password"]}'`).then((data)=>{
                    resolve({"message":"updated game time"});
                })
                .catch((err)=>{
                    reject({"message":"error RAW_ERROR->"+err});
                })
        })
    }
}