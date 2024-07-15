module.exports = {
    claim: function (sql, req) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM "TICKET99" where "TICKETNUMBER"='${req["barcode"]}' and "TARMINALCLS"='WIN' and TARMINALID='${req["userid"]}'`)
                .then((data) => {
                    if (data.recordset.length < 1) {
                        reject({ "message": "invalid barcode" });
                    }
                    else {
                        const winrs = data.recordset[0]["WINRS"];
                        sql.query(`UPDATE "TICKET99" SET "TARMINALCLS"='CLAIMED' ,claimdate =GETDATE() where "TICKETNUMBER"='${req["barcode"]}' and TARMINALID='${req["userid"]}'`)
                            .then(() => {
                                sql.query(`UPDATE "CLIENTLOGIN" SET CLIENTBALANCE = CLIENTBALANCE+${parseInt(winrs) || 0} where "CLIENTID"='${req["userid"]}'`)
                                    .then(() => {
                                        sql.query(`SELECT * FROM "TICKET99" where "TICKETNUMBER"='${req["barcode"]}' and TARMINALID='${req["userid"]}'`)
                                        .then((data)=>{
                                            resolve(data.recordset[0]);
                                        }).
                                        catch((err)=>{
                                            reject(err)
                                        })
                                        //resolve({ "message": "added balance", "amount": winrs, "userid": `${req["userid"]}` });
                                    })
                                    .catch((err) => {
                                        console.log("failed to update client balance", err);
                                        reject({ "error": err });
                                    });
                            })
                            .catch((err) => {
                                console.log("failed to update status", err);
                                reject({ "error": err });
                            });
                    }
                })
                .catch((err) => {
                    console.log("failed to find barcode", err);
                    reject({ "error": err });
                });
        });
    }
};
