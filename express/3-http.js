'use strict';

var express = require('express'); // do not change this line
var app = express();

var port = Number(process.env.PORT) || 8080;
var hostname = 'localhost';

// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
app.get('/missing', function (req, res) {
    res.status(404);
    res.set('content-type', 'text/plain');
    res.send('your princess is in another castle');
});

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
app.get('/redirect', function (req, res) {
    var redirected = '/redirected';
    res.set('content-type', 'text/plain');
    res.redirect(redirected);
});

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
app.get('/cache', function (req, res) {
    res.set({
        'content-type': 'text/plain',
        'cache-control': 'max-age=' + 24 * 60 * 60, // in second
    });
    res.send('cache this resource');
});

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
app.get('/cookie', function (req, res) {
    res.set({
        'content-type': 'text/plain',
        'set-cookie': ['hello=world'],
    });
    res.send('i gave you a cookie');

});

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
app.get('/check', function (req, res) {
    var cookie = req.headers['cookie'];
    res.set('content-type', 'text/plain');

    if (cookie && cookie.includes('hello')) {
        res.send('yes');
    }
    else {
        res.send('no');
    }

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


// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie