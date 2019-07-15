'use strict';

var http = require('http'); // do not change this line
var url = require('url');


var port = Number(process.env.PORT);
var hostname = 'localhost';


http.createServer(function (request, response) {
    var thisURL = url.parse(request.url, true),
        cookie = request.headers['cookie'];

    //var requestH = request.
    // console.log('<request>:');
    // console.log(request);
    // console.log('<response>:');
    // console.log(response);
    console.log(request.headers);

    if (thisURL.pathname === '/favicon.ico') {
        response.statusCode = 200;
        response.setHeader('content-type', 'image/x-icon');
        response.end();
        return;
    }

    if (cookie) {
        var cookies = cookie.split(';'),
            lastPath = cookies[1].split('=')[1];

        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.setHeader('set-cookie', ['hello=wor=ld', 'visited=' + thisURL.pathname]);
        response.write('last time you visited "' + lastPath + '"');
        response.end();
    }
    else {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.setHeader('set-cookie', ['hello=wor=ld', 'visited=' + thisURL.pathname]);
        response.write('you must be new');
        response.end();
    }


}).listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});


// note: handling for the requests should be generic and your server should appropriately respond to any path, including ones not listed below

// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie
// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text
// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie
// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text
// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie
