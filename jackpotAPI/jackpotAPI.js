//FOR REST API WE ARE USING FASTIFY
//FOR SQL QUERIES WE ARE USING MSSQL DRIVER 
//PLEASE RUN   ----> 'npm install'<----- in the root directory of package.json  TO GET ALL THE PACKAGES NEEDED INSTALLED 
var fastifyserver = require('fastify');
var app = fastifyserver({});
const sql = require('mssql');
var login = require('./login')
var getallresult = require('./getalllastresults')
var getalluserdata = require('./getalluserdata')
var gameanal = require('./gameanal');
var getresultbyid = require('./getgameresultbyID')
var placebet = require('./placebet')
var cancelticket = require('./cancelbybarcode')
var getallresultbydate = require("./getalllastresults_bydate");
var changepasswordbyuser = require("./changepassword");
var getreport = require('./getreport');
var getsalesreport = require('./getsalesreport');
var claimbybar = require('./claimbybarcode');
var firstlogin = require('./firstlogin')
const fastifyCors = require('@fastify/cors');
/*
Data Source=103.162.120.114;Initial Catalog=nrdeluxe; User Id=nrdeluxe; Password=Nr@Deluxe@987654321
*/
// Enable CORS
app.register(fastifyCors);
const sqlConfig = {
    user: 'mgdeluxe',
    password: 'Mgdeluxe@999999',
    database: 'mgdeluxe',
    server: '103.162.120.116',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
console.log("connecting to database...");
try {
    sql.connect(sqlConfig);
} catch (err) {
    console.log(err);
}

console.log("connected to database ");

app.post('/checkifuserhasmac', async function (req, res) {

    await firstlogin.checkifmacthere(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(404).send(err);
        })

})
app.post('/checkifuserhasmac_bymac', async function (req, res) {

    await firstlogin.checkifmacthere_bymac(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(404).send(err);
        })

})
app.post('/forcesetmac', async function (req, res) {

    await firstlogin.forcesetmacid(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(404).send(err);
        })

})


app.post('/getresultbyid', async function (req, res) {
    await getresultbyid.getresultbyidofanygame(sql, req.body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        })
})

app.post('/claimbybarcode', function (req, res) {
    claimbybar.claim(sql, req.body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        })
})
app.post('/cancelbybarcode', function (req, res) {
    cancelticket.cancel(req.body, sql).then((data) => {

        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(404).send(err);
        })
})

app.post('/changepassword', async function (req, res) {

    await changepasswordbyuser.changepassword(req.body, sql).then((data) => {
        res.status(200).send(data);

    })
        .catch((err) => {
            res.status(400).send({ err });

        })

})


app.post('/getsalesreport', async function (req, res) {
    await getsalesreport.getsalesreport(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(400).send({ err });
        })

})

app.post('/getsalesdetails', async function (req, res) {
    await getsalesreport.getsalesdetails(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(400).send({ err });
        })

})
app.post('/getallresultbydate', async function (req, res) {
    await getallresultbydate.getlastresults_all_bydate(sql, req.body).then((data) => {
        res.status(200).send(data);

    })
        .catch((err) => {
            res.status(400).send({ err });

        })

})

app.post('/getallresultwithxbydate', async function (req, res) {
    await getallresultbydate.getlastresultswithx_all_bydate(sql, req.body).then((data) => {
        res.status(200).send(data);

    })
        .catch((err) => {
            res.status(400).send({ err });

        })

})


app.post('/getreportfromdatetodate', async function (req, res) {
    await getreport.getreportfromdatetilldate(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(400).send({ err });
        })

})

// getlastresultsinfo
app.get('/getallresultinfo', async function (req, res) {
    await getallresult.getlastresultsinfo(sql).then((data) => {
        res.status(200).send(data);

    })
        .catch((err) => {
            res.status(400).send({ err });

        })

})
app.get('/getallresult', async function (req, res) {
    await getallresult.getlastresults_all(sql).then((data) => {
        res.status(200).send(data);

    })
        .catch((err) => {
            res.status(400).send({ err });

        })

})
app.get('/getallresultsofar', async function (req, res) {
    await getallresult.getlastresults_all_sofar(sql).then((data) => {
        res.status(200).send(data);

    })
        .catch((err) => {
            res.status(400).send({ err });

        })

})

app.post('/canlogin', function (req, res) {
    login.canlogin(sql, req.body).then((data) => {

        res.status(200).send({ data })
    })
        .catch((err) => {
            res.status(400).send({ err })
        })
});
app.post('/canlogin_macid', function (req, res) {
    login.canlogin_macid(sql, req.body).then((data) => {

        res.status(200).send({ data })
    })
        .catch((err) => {
            res.status(400).send({ err })
        })
});
app.post('/getalluserdata', function (req, res) {

    try {
        getalluserdata.getdata(sql, req.body).then((data) => {

            res.status(200).send(data)
        })
            .catch((err) => {
                res.status(400).send({ err })
            })
    }
    catch (err) {
        res.status(400).send({ err })
    }
});
app.post('/placebet', async function (req, res) {
    await placebet.placebet(sql, req.body).then((data) => {
        res.status(200).send(data)
    })
        .catch((error) => {
            console.log(error);
            res.status(404).send(error)

        })
})

app.post('/getreportbydate', function (req, res) {
    getreport.gerreportbydate(sql, req.body).then((data) => {
        res.status(200).send({ data });
    })
        .catch((err) => {
            res.status(400).send({ err });
        })
})
app.post('/getreportbydateandid', function (req, res) {
    getreport.getreportbydateandid(sql, req.body).then((data) => {
        res.status(200).send({ data });
    })
        .catch((err) => {
            res.status(400).send({ err });
        })
})

app.post('/getticketbybarcode', function (req, res) {
    getreport.getticketbybarcode(sql, req.body).then((data) => {
        res.status(200).send({ data });
    })
        .catch((err) => {
            res.status(400).send({ err });
        })
})
app.get('/getallresultwithmultiplier', function (req, res) {
    getallresult.getallresultwithmultiplier(sql).then((data) => {
        res.status(200).send({ data });
    })
        .catch((err) => {
            res.status(400).send({ err });
        })
})
app.post('/getlastresultwithmultiplier', function (req, res) {
    getallresult.getlastresultwithmultiplier(sql, req.body).then((data) => {
        res.status(200).send({ data });
    })
        .catch((err) => {
            res.status(400).send({ err });
        })
})
app.post('/result_multiplier_last', function (req, res) {
    getallresult.getonlylastresultwithmultiplier(sql, req.body).then((data) => {
        res.status(200).send({ data });
    })
        .catch((err) => {
            res.status(400).send({ err });
        })
})
app.get('/', function (req, res) {
    res.status(200).send({ "message": "welcome to the root of magic deluxe api:jackpot :D feel free to hack or crash the server lololz" })
})
app.get('/timeleft', async function (req, res) {
    try {
        var data = await sql.query(`SELECT 
    [INTNUMBER],
    [TARMINALDATE],
    [TARMINALTIME],
    [TARMINALCLS],
    [NEXTDRAW],
    [GAMEID],
    DATEDIFF(SECOND, CONVERT(DATETIME, [TARMINALDATE] + ' ' + [TARMINALTIME], 113), CONVERT(DATETIME, [NEXTDRAW], 109)) AS timer
FROM 
    [TARMINALTIMEZONE]`)
        res.status(200).send({ "time": data.recordset[0].timer , 
            "gameid": data.recordset[0].GAMEID, 
            "currenttime":data.recordset[0].TARMINALTIME,
            "nextgamedate": data.recordset[0].NEXTDRAW,
             "nextgametime": data.recordset[0].NEXTDRAW })

    } catch (err) {
        res.status(400).send({ "message": "failed to get time because -" + err })
    }
})

app.post('/setgamestart', async function (req, res) {
    await gameanal.setgame_start(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(404).send(err);
        })

})
app.post('/setgameend', async function (req, res) {
    await gameanal.setgame_end(sql, req.body).then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
            res.status(404).send(err);
        })
})
app.listen({ host: "0.0.0.0", port: 3025 }, (err) => {
    if (err) {
        console.log("error occured:" + err);
    }
})