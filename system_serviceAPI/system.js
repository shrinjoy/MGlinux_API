var fastify = require('fastify')
var app = fastify({});

var macaddress = require('node-macaddress');
const { exec } = require('child_process');

app.get('/getmac',function(req,res){
    macaddress.one(function (err, mac) {
        if(err)
        {
            res.send({"message":err})
        }
        else
        {
            res.send({"mac":mac})
        }
      });
})



app.post('/exec',function(req,res){

    var comm = req.body;
    console.log(comm);

    console.log(comm["command"]);
    exec(`${comm["command"]}`,(er,stdo)=>{
        if(er)
        {
            res.send({"error":er})
        }
        else
        {
            res.send({"message":stdo});
        }
    }
)
})


app.get('/shutdown',function(req,res){
    exec('shutdown -h +0',(er,stdo,stde)=>{
        if(er)
        {
            res.send({"error":er})
        }
        else
        {
            res.send({"message":stdo});
        }
    }
)
})

app.get('/restart',function(req,res){
    exec('shutdown -h +0',(er,stdo,stde)=>{
        if(er)
        {
            res.send({"error":er})
        }
        else
        {
            res.send({"message":stdo});
        }

    })
})

app.listen({ host: "127.0.0.1", port: 3000 }, (err) => {
    if (err) {
        console.log("error occured:" + err);
    }
})