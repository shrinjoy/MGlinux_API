module.exports = {
    cancel: function (req, sql) {

        return new Promise((resolve, reject) => {

            sql.query(`UPDATE [TICKET99] set TARMINALCLS = 'CANCEL' where TICKETNUMBER= '${req["barcode"]}' and TARMINALCLS !='NOTWIN' and TARMINALCLS !='WIN' and TARMINALID='${username}'`)
                .then((data) => {


                    console.log(`SELECT * FROM [TICKET99] where TICKETNUMBER ='${req["barcode"]}'`);
                    sql.query(`SELECT * FROM [TICKET99] where TICKETNUMBER ='${req["barcode"]}' and TARMINALID='${username}`).then((balancedata) => {
                        if (balancedata.recordset.length > 0) {
                            console.log(data);
                            var balancetoadd = balancedata.recordset[0]["TICKETTOTALRS"];
                            console.log("adding this balance:" + balancedata);
                            var username = balancedata.recordset[0]["TARMINALID"];
                            sql.query(`UPDATE [CLIENTLOGIN] set CLIENTBALANCE  = CLIENTBALANCE+${balancetoadd} where CLIENTUSERNAME='${username}'`).then((data) => {
                                console.log("added this balance:" + balancedata);
                                sql.query(`UPDATE [TICKET99] set TARMINALCLS = 'CANCEL' where TICKETNUMBER= '${req["barcode"]}' and TARMINALID='${username}`).then((d2)=>{
                                resolve({ "message": "canceled bet" });

                                })
                                .catch((err) => {
                                    reject({ "error": "failed to add balance back due to :" + err })
                                })
                            })
                                .catch((err) => {
                                    reject({ "error": "failed to add balance back due to :" + err })
                                })
                        }

                        else {


                            console.log("no user found");
                            reject({ "error": "failed to find userid " })

                        }


                    })
                        .catch((err) => {

                            reject({ "error": "failed to retrive balance of player due  to :" + err })

                        })

                })
                .catch((err) => {
                    reject({ "error": "failed to cancel bet  due  to :" + err })

                })


        })



    }


}
