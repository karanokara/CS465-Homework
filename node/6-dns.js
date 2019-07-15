'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line
var url = require('url');


var port = Number(process.env.PORT);
var hostname = 'localhost';


http.createServer(function (request, response) {
    var thisURL = url.parse(request.url, true);


    if (thisURL.pathname === '/favicon.ico') {
        response.statusCode = 200;
        response.setHeader('content-type', 'image/x-icon');
        response.end();
        return;
    }

    if (thisURL.pathname === '/') {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.end();
        return;
    }

    var domain = thisURL.pathname.substring(1);

    if (dns.lookup) {

        dns.resolve4(domain, function (error, addresses) {
            //console.log(error);
            //console.log(addresses);
            //console.log(family);
            if (error) {
                response.write('error');

            }
            else {
                for (var i = 0; i < addresses.length; ++i) {
                    response.write(addresses[i]);
                    if (i != (addresses.length - 1))
                        response.write('\n');
                }

            }
            response.end();

        });
    }


    // need to sent header first, then call fnc on 
    // "dns.lookup" above to end response
    response.setHeader('content-type', 'text/plain');
    response.statusCode = 200;

}).listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});



// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text