module.exports = {
    cancel: function (req, sql) {
        return new Promise((resolve, reject) => {
            // Update query to cancel the bet if it's currently 'NOTWIN' or 'WIN'
            sql.query(`
                UPDATE [TICKET99]
                SET TARMINALCLS = 'CANCEL'
                WHERE TICKETNUMBER = '${req["barcode"]}'
                AND TARMINALCLS IN ('NOTWIN', 'WIN')
            `)
            .then((updateResult) => {
                // Check if any rows were updated
                if (updateResult.rowsAffected > 0) {
                    // Fetch the updated ticket data
                    sql.query(`
                        SELECT * FROM [TICKET99]
                        WHERE TICKETNUMBER = '${req["barcode"]}'
                    `)
                    .then((balancedata) => {
                        // Check if ticket data was found
                        if (balancedata.recordset.length > 0) {
                            // Extract balance to add and username
                            var balancetoadd = balancedata.recordset[0]["TICKETTOTALRS"];
                            var username = balancedata.recordset[0]["TARMINALID"];
                            
                            // Update CLIENTLOGIN with the refunded balance
                            sql.query(`
                                UPDATE [CLIENTLOGIN]
                                SET CLIENTBALANCE = CLIENTBALANCE + ${balancetoadd}
                                WHERE CLIENTUSERNAME = '${username}'
                            `)
                            .then(() => {
                                resolve({ "message": "canceled bet" });
                            })
                            .catch((err) => {
                                reject({ "error": "failed to add balance back due to :" + err });
                            });
                        } else {
                            reject({ "error": "failed to find ticket data" });
                        }
                    })
                    .catch((err) => {
                        reject({ "error": "failed to retrieve ticket data: " + err });
                    });
                } else {
                    reject({ "error": "bet was not canceled, possibly already canceled" });
                }
            })
            .catch((err) => {
                reject({ "error": "failed to cancel bet: " + err });
            });
        });
    }
}
