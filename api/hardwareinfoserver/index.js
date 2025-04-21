var fastify = require('fastify')
var app = fastify({})

const { machineId, machineIdSync } = require('node-machine-id');
app.get("/getserial",function(req,res){
    machineId().then(id => {res.send({"serial":id})})
})



app.listen({ host: "0.0.0.0", port: 3022 }, (err) => {
    if (err) {
        console.log("error occured:" + err);
    }
})

//4e67e14b6299919eed2a343f69e6086e288178f658320adb246d05122645cbd3
//4e67e14b6299919eed2a343f69e6086e288178f658320adb246d05122645cbd3