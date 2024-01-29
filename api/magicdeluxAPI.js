//FOR REST API WE ARE USING FASTIFY
//FOR SQL QUERIES WE ARE USING MSSQL DRIVER 
//PLEASE RUN   ----> 'npm install'<----- in the root directory of package.json  TO GET ALL THE PACKAGES NEEDED INSTALLED 
var fastifyserver = require('fastify');
var app = fastifyserver({});
const sql = require('mssql');
var login = require('./login')
var getallresult = require('./getalllastresults')
var getalluserdata = require('./getalluserdata')
var getresultbyid = require('./getgameresultbyID')
var placebet = require('./placebet')
const sqlConfig = {
    user: 'playjeeto',
    password: 'Playjeeto@2023',
    database: 'playjeeto',
    server: '103.162.120.114',
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


app.post('/getresultbyid', async function (req, res) {
   await getresultbyid.getresultbyidofanygame(sql,req.body)
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>{
        res.status(404).send(err);
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


app.post('/canlogin', function (req, res) {
    login.canlogin(sql, req.body).then((data) => {

        res.status(200).send({ data })
    })
        .catch((err) => {
            res.status(400).send({ err })
        })
});
app.post('/getalluserdata', function (req, res) {

    try {
        getalluserdata.getdata(sql, req.body).then((data) => {

            res.status(200).send({ data })
        })
            .catch((err) => {
                res.status(400).send({ err })
            })
    }
    catch (err) {
        res.status(400).send({ err })
    }
});
app.post('/placebet',async function (req, res) {
  await  placebet.placebet(sql,req.body).then((data)=>{
        res.status(200).send({data})
    })
    .catch((error)=>{

        res.status(404).send({error})

    })
})
app.get('/', function (req, res) {
    res.status(200).send({ "message": "welcome to the root of magic deluxe api" })
})
app.get('/timeleft', async function (req, res) {
    try {
        var data = await sql.query(`SELECT GAMEID,TARMINALDATE AS NEXTGAMEDATE,TARMINALTIME AS NEXTGAMETIME,NEXTDRAW,DATEDIFF(SECOND,  GETDATE(),CONVERT(DATETIME, NEXTDRAW, 109)) AS timer FROM dbo.TARMINALTIMEZONE;`)
        res.status(200).send({ "time": data.recordset[0].timer, "gameid": data.recordset[0].GAMEID,"nextgamedate":data.recordset[0].NEXTGAMEDATE,"nextgametime":data.recordset[0].NEXTGAMETIME })

    } catch (err) {
        res.status(400).send({ "message": "failed to get time because -" + err })
    }
})
app.listen({ port: 3000 }, (err) => {
    if (err) {
        console.log("error occured:" + err);
    }
})