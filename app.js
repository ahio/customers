var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('client'));

app.get('/users', function(req, res) {
   fs.readFile('./users/users.json', 'utf8', function (err, result) {
      if(err) {res.send(err);}
      else {
         res.json(JSON.parse(result));
      }
   });
});

app.post('/save', function (req, res) {
   var body = "";
   req.on('data', function (data) {
      body += data;
   });
   req.on('end', function () {
      fs.writeFile('./users/users.json', body, function (err) {
         if (err) throw err;
         console.log('It\'s saved!');
      });
   })
});

app.listen(3000);