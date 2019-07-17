'use strict';

var express = require('express'); // do not change this line
var app = express();

var port = Number(process.env.PORT) || 8080;
var hostname = 'localhost';

app.get('/attributes', function (request, response) {
    console.log(request);
    var qy = request.query;

    var str = '<!DOCTYPE html>' +
        '<html>' +
        '<body>' +
        '<table border="1">';
    for (var key in qy) {
        str += '<tr><td>' + key + '</td><td>' + qy[key] + '</td></tr>';
    }
    str += '</table></body></html>';
    response.send(str);
});


app.get('/lorem', function (req, res) {

    res.send('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
});

app.use('/test', function (req, res) {
    res.set({ 'content-type': 'text/plain' });
    res.send('you have accessed "' + req.url.substring(1) + '" within test');
});

app.get('/', function (req, res) {
    res.set({ 'content-type': 'text/plain' });
    res.send('you have accessed the root');
});

// A route match any path
// will be used as the final choice
app.use(function (req, res, next) {
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