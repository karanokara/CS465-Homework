'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line
var url = require('url');


var port = Number(process.env.PORT);
var hostname = 'localhost';

var msg = [];


var handle = {
    form: function (request, response, thisURL) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        response.write('<!DOCTYPE html>');
        response.write('<html>');
        response.write('<body>');
        response.write('<form action="/new" method="post">');
        response.write('<input type="text" name="name">');
        response.write('<input type="text" name="message">');
        response.write('<input type="submit" value="submit">');
        response.write('</form>');
        response.write('</body>');
        response.write('</html>');

        response.end();
    },
    new: function (request, response, thisURL) {

        //console.log(' ---------------- request ----------------------:');
        //console.log(request);

        var data = '';
        request.on('data', function (da) {
            data = decodeURIComponent(da);
        });
        request.on('end', function () {
            msg.push(querystring.parse(data));
            console.log(msg);
        });

        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');
        response.write('thank you for your message');
        response.end();

    },
    list: function (request, response, thisURL) {
        response.statusCode = 200;
        response.setHeader('content-type', 'text/plain');

        for (var i = 0; i < msg.length; ++i) {
            response.write(msg[i]['name'] + ': ' + msg[i]['message']);
            if (i != (msg.length - 1))
                response.write('\n');
        }
        response.end();
    },
    default: function (request, response) {
        response.statusCode = 404;
        response.setHeader('content-type', 'text/plain');
        response.end();
    }
};

http.createServer(function (request, response) {
    var thisURL = url.parse(request.url, true);

    // console.log('<request>:');
    // console.log(request);
    // console.log('<response>:');
    // console.log(response);
    // console.log(request.headers);

    if (thisURL.pathname === '/favicon.ico') {
        response.statusCode = 200;
        response.setHeader('content-type', 'image/x-icon');
        response.end();
        return;
    }

    var call = handle[thisURL.pathname.substring(1)].bind(handle);
    if (call) {
        call(request, response, thisURL);
    }
    else {
        handle['default'](request, response);
    }

}).listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});


// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
//   	'Content-Type': 'text/html'
//   });
//   
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//   
//   res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text