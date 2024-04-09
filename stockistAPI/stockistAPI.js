var fastify = require("fastify");
var app = fastify({});
const sql = require('mssql');
const fastifyCors = require('@fastify/cors');

var canlogin = require('./auth')

app.register(fastifyCors);
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
    console.log("connected to database ");

} catch (err) {
    console.log(err);
}

app.post("/nigga_pass", async function(req,res){

   await canlogin.canlogin(sql,req.body).then((data)=>{
        res.status(200).send(data); 
    })
    .catch((err)=>{
        res.status(400).send(err);

    })
    

})








app.get("/",function(req,res){
    res.send({"data":"root"});
})

app.listen({  host: "0.0.0.0",port: 3003 }, (err) => {
    if (err) {
        console.log("error occured:" + err);
    }
})