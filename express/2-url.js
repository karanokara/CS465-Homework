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