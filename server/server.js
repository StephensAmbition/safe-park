var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;

app.get('/', function(req, res) {
    res.send("hello");
});

app.get('/parking', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.listen(3000);
