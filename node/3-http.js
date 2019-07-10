'use strict';

var http = require('http'); // do not change this line
var url = require('url');


var port = Number(process.env.PORT);
var hostname = 'localhost';


http.createServer(function (request, response) {
    var thisURL = url.parse(request.url, true);


    // http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
    if (thisURL.pathname === '/missing') {
        response.statusCode = 404;
        response.setHeader('content-type', 'text/plain');
        response.write('your princess is in another castle');
    }
    // http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
    else if (thisURL.pathname === '/redirect') {
        var redirected = '/redirected';
        response.statusCode = 302;
        response.setHeader('content-type', 'text/plain');
        response.setHeader('location', redirected);

    }
    // http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
    else if (thisURL.pathname === '/cache') {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.setHeader('cache-control', 'max-age=' + 24 * 60 * 60); // in second
        response.write('cache this resource');
    }
    // http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
    else if (thisURL.pathname == '/cookie') {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.setHeader('set-cookie', ['hello=world']);

        response.write('i gave you a cookie');

    }
    // http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
    else if (thisURL.pathname == '/check') {
        //var requestH = request.
        // console.log('<request>:');
        // console.log(request);
        // console.log('<response>:');
        // console.log(response);
        var cookie = request.headers['cookie'];
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');

        if (cookie && cookie.includes('hello')) {
            response.write('yes');
        }
        else {
            response.write('no');
        }

    }
    else {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
    }

    response.end();

}).listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});


