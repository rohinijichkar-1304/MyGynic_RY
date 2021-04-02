var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors()); 


var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/images/')); //


const db = require('./app/config/db.config.js');    

db.sequelize.sync({force: false, alter: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
  });

  require('./app/route/route.js')(app);

  var server = app.listen(8080, '0.0.0.0', function () {
 
  
    var host = server.address().address
    var port = server.address().port
   
    console.log("App listening  port number:", host, port)
  })
