module.exports =
{
    getlastresults_all_bydate: function (db,json) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM [playjeeto].[dbo].[RESULT] WHERE CONVERT(DATE,GAMEDATE) = CONVERT(DATE,'${json["date"]}'); `).then((data) => {
                if (data.recordset.length < 0) {
                    reject({ "error": "no data found" });
                }
                else if (data.recordset.length > 0) {
                    var alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                    try{
                        var filteredresultdata = "{"
                    for (x = 0; x < alphabets.length; x++) {
                        for (y = 0; y < 12; y++) {
                            if (y < 10) {

                                var datax = data.recordset[0][`${alphabets[x]}0${y}`]

                                if(datax === null)
                                {
                                    datax= "    "

                                }
                                filteredresultdata+=(`"${alphabets[x]}0${y}"`+":"+`"${datax}"`)
                                filteredresultdata+=","
                            }
                            else {
                                var datax = data.recordset[0][`${alphabets[x]}${y}`]

                                if(datax=== null)
                                {
                                    datax= "    "



                                }
                                filteredresultdata+=(`"${alphabets[x]}${y}"`+":"+`"${datax}"`)

                                if(x==alphabets.length-1 && y == 11)
                                {
                                filteredresultdata+="}"

                                }
                                else
                                {
                                filteredresultdata+=","
                                }

                            }
                        }
                    }
                    resolve(filteredresultdata);

                }
                catch(err)
                {
                    reject({"message":"failed to filter"+err})
                }
                }
            })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}