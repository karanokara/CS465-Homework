'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

var app = express();

var port = Number(process.env.PORT) || 8080;
var hostname = 'localhost';


app.use(function (a, b, c, d) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);

});


// A route match any path
// will be used as the final choice
app.use(function (req, res) {

    console.log('Last Fallback Called');

    res.send('');
});

app.listen(port, hostname, function () {

    console.log(`Example app listening on port ${port}!`);

});


// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser store and submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise it should prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise it should prompt for the username and password
