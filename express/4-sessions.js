'use strict';

var express = require('express'); // do not change this line
var session = require('express-session'); // do not change this line
var app = express();


var port = Number(process.env.PORT) || 8080;
var hostname = 'localhost';


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,      // can be true if using https, 
    }                       // otherwise, must be false
}));

// A route match any path
// will be used as the final choice
app.use(function (req, res) {
    console.log(req.session);

    res.set('content-type', 'text/plain');
    if (req.session.lastview) {
        var lastview = req.session.lastview;
        req.session.lastview += '\n  ' + req.url;
        res.send('your history:\n  ' + lastview);
    }
    else {
        req.session.lastview = req.url;
        res.send('you must be new');
    }
    console.log(req.session);
});

app.listen(port, hostname, function () {

    console.log(`Example app listening on port ${port}!`);

});

// preface: use the express-session middleware with the memorystore session storage which should make this task rather easy

// http://localhost:8080/hello should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/test should return 'your history:\n  /hello' in plain text

// http://localhost:8080/world should return 'your history:\n  /hello\n  /test' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/moshimoshi should return 'your history:\n  /lorem' in plain text

// http://localhost:8080/ipsum should return 'your history:\n  /lorem\n  /moshimoshi' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'your history:\n  /hello\n  /test\n /world' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware
