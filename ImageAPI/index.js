var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mathmode = require('mathmode');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(bodyParser());
app.use(express.static('savedImages/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.get('/', function (req, res) {
  res.json({status: "received"});
});

app.get('/api/latex', function(req,res) {
  //conver to latex :)
  const latex = req.query.latex;
  mathmode(latex).pipe(fs.createWriteStream(`savedImages/${latex}.png`));
  res.json({status: "success"});
})

app.post('/api/latex', function(req,res) {
  //conver to latex :)
  const latex = req.body.latex;
  mathmode(latex).pipe(fs.createWriteStream(`savedImages/${latex}.png`));
  res.json({status: "success"});
})

app.get('/api/:imgLatex',function(req,res){
  res.sendFile(path.join(__dirname,`./savedImages/${req.params.imgLatex}.png`));
});

app.listen(process.env.PORT || 3001, function () {
  console.log(`'Example app listening on port ${process.env.PORT || 3001}!`);
});
