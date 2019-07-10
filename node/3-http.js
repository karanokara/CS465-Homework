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
        response.statusCode = 302;
        response.setHeader('content-type', 'text/plain');
        response.write('you have accessed "' + thisURL.pathname.replace('/test/', '') + '" within test');
    }
    // http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
    else if (thisURL.pathname === '/cache') {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.setHeader('content-type', 'text/html');
        var qy = thisURL.query;

        var str = '<!DOCTYPE html>' +
            '<html>' +
            '<body>' +
            '<table border="1">';
        for (var key in qy) {
            str += '<tr><td>' + key + '</td><td>' + qy[key] + '</td></tr>';
        }
        str += '</table></body></html>';
        response.write(str);
    }
    // http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
    else if (thisURL.pathname == '/cookie') {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
    }
    // http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
    else if (thisURL.pathname == '/check') {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
    }
    else {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
    }

    response.end();

}).listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});


