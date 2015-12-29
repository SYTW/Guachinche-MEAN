var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routesApi = require('./server/routes/apiroutes')
    
    
var mongoose = require('mongoose')

//BD URL variable
console.log("User: " + process.env["USER"])
var bdUrl = "mongodb://carlota-proyecto_stw-2311157:27017/test"
if(process.env["USER"] == "davidcr")
    bdUrl = "mongodb://davidcr-proyecto-stw-2294520:27017/test"

mongoose.connect(bdUrl, function(err) {
    if(err) {
        console.log('connection error', err)
    } else {
        console.log('connection successful')
    }
})

app.use(express.static(__dirname + '/client'))
app.use(express.static(__dirname + '/server/public'))
app.use(bodyParser.json())

// Activacion de Cors para que cualquier cliente acceda a la API
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/', routesApi)

app.get('*', function(req, res){
  res.sendFile('/client/index.html' , { root : __dirname})
});

console.log("https://proyecto-stw-carlota.c9users.io")
console.log("https://proyecto-stw-davidcr.c9users.io")
console.log(process.env.IP + ":" + process.env.PORT)
app.listen(process.env.PORT || 8081, process.env.IP)
