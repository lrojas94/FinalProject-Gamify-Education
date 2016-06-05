var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('client/'));
app.use(express.static('bower_components/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api',function(req,res){
	console.log(req.query); //<- This is for a GET
	res.send({"data" : "Working"});
});

app.post('/api',function(req,res){
	console.log(req.body); //<- This is for a Post
	res.send({"data" : "Working"});
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + './../client/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
