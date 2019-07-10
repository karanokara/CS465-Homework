'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line


var port = Number(process.env.PORT);
var hostname = 'localhost';


var server = http.createServer(function (request, response) {
    var thisURL = url.parse(request.url, true);
    response.statusCode = 200;
    response.setHeader('content-type', 'text/plain');

    if (thisURL.pathname === '/') {
        response.write('you have accessed the root');
    }
    else if (thisURL.pathname.includes('/test/')) {
        response.write('you have accessed "' + thisURL.pathname.replace('/test/', '') + '" within test');
    }
    else if (request.url.includes('/attributes')) {
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

    response.end();

});

server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});


// http://localhost:8080/ should return 'you have accessed the root' in plain text

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>