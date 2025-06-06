var fastify = require("fastify");
var app = fastify({});
const sql = require('mssql');
const fastifyCors = require('@fastify/cors');
var getuserdata= require('./getuserdata')
var canlogin = require('./auth')
var transferamount = require('./moneytrasnfer');
var getalluserdata= require('./getalluserdata');
var getreportofalluser = require('./getreportofalluser')
app.register(fastifyCors);
const sqlConfig = {
     user: 'nrdeluxex',
    password: 'Nr@Deluxe@987654321',
    database: 'nrdeluxe',
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
    console.log("connected to database ");

} catch (err) {
    console.log(err);
}


app.post("/transfermoney",async function(req,res){
    await transferamount.sendmoney(sql,req.body).then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})
app.post("/adjustmoney",async function(req,res){
    await transferamount.takemoney(sql,req.body).then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);

    })
})
app.post("/get_all_niggas_byname",async function(req,res){

   await getalluserdata.getalluserbyname(sql,req.body).then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(404).send(err);
    })

})

app.post("/getniggabyid",async function(req,res){
await getuserdata.getuserdatabyID(sql,req.body).then((data)=>{

res.status(200).send(data)

})
.catch((err)=>{
res.status(400).send(err)

})
})

app.post("/getniggabyname",async function(req,res){
  await  getuserdata.getuserdatabyName(sql,req.body).then((data)=>{
    
    res.status(200).send(data)
    
    })
    .catch((err)=>{
    res.status(400).send(err)
    
    })
})



app.post("/nigga_pass", async function(req,res){

   await canlogin.canlogin(sql,req.body).then((data)=>{
        res.status(200).send(data); 
    })
    .catch((err)=>{
        res.status(400).send(err);

    })
    

})

app.post("/getreportbydate", async function(req,res){

    await getreportofalluser.getreportofalluser(sql,req.body).then((data)=>{
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
