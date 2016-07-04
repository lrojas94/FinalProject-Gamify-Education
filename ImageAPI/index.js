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

app.post('/api/problem/create', function(req,res) {
  //conver to latex :)
  console.log(req.body);
  const data = req.body; // This itself is a problem I think.
  mathmode(data.problem).pipe(fs.createWriteStream(path.join(__dirname,`./savedImages/p${data.id}.png`)));
  data.solutions.map((solution) => {
    mathmode(solution.solution).pipe(fs.createWriteStream(path.join(__dirname,`./savedImages/p${data.id}_s${solution.id}.png`)));
  });
  res.json({
    status: 0,
    message: 'Problem created.'
  });
});

app.get('/api/:img',function(req,res){
  res.sendFile(path.join(__dirname,`./savedImages/${req.params.img}.png`));
});

app.listen(process.env.PORT || 3001, function () {
  console.log(`app listening on port ${process.env.PORT || 3001}!`);
});
