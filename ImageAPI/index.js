var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mathmode = require('mathmode');
var app = express();

app.use(bodyParser());
app.use(express.static('savedImages/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.get('/', function (req, res) {
  res.json({status: "received"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`'Example app listening on port ${process.env.PORT || 3001}!`);
});
