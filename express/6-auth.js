'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

var app = express();

var port = Number(process.env.PORT) || 8080;
var hostname = 'localhost';



// http://localhost:8080/hello should return 'accessible to everyone' in plain text
app.get('/hello', function (req, res) {

    res.set('content-type', 'text/plain');
    res.send('accessible to everyone');

});

// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser store and submit the username and the password at each request

// configure strategy to be used for passport
passport.use(new strategy.BasicStrategy(
    function (username, password, done) {
        console.log(username);
        console.log(password);
        console.log(done);
        if (username == 'test' && password == 'logmein')
            done(null, true);
        else
            done(null, false);
    }
));

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise it should prompt for the username and password
// http://localhost:8080/test should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise it should prompt for the username and password
app.get('/world',
    passport.authenticate('basic', { session: false }),
    function (req, res) {
        // If this fnc is called, authentication was successful

        res.set('content-type', 'text/plain');
        res.send('only accessible when logged in');

    }
);

app.get('/test',
    passport.authenticate('basic', { session: false }),
    function (req, res) {

        res.set('content-type', 'text/plain');
        res.send('only accessible when logged in');

    }
);


// A route match any path
// will be used as the final choice
app.use(function (req, res) {

    console.log('Last Fallback Called');

    res.send('');
});

app.listen(port, hostname, function () {

    console.log(`Example app listening on port ${port}!`);

});    
