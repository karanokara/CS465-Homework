'use strict';

var express = require('express'); // do not change this line
var app = express();

var port = Number(process.env.PORT);
var hostname = 'localhost';

app.get('/lorem', function (req, res) {

    res.send('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
});

app.listen(port, function () {

    console.log(`Example app listening on port ${port}!`);

});

// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html