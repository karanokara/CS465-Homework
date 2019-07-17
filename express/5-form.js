'use strict';

var express = require('express'); // do not change this line
var parser = require('body-parser'); // do not change this line
var app = express();

var port = Number(process.env.PORT) || 8080;
var hostname = 'localhost';

var msg = [];

//app.use(express.json()); // for parsing application/json
//app.use(express.urlencoded({ extended: true })); // for parsing 
// above == below
app.use(parser.urlencoded({ extended: false }));

app.get('/form', function (req, res) {
    var str = '<!DOCTYPE html><html><body><form action="/new" method="post"><input type="text" name="name"><input type="text" name="message"><input type="submit" value="submit"></form></body></html>';
    res.send(str);
});

app.post('/new', function (req, res) {
    //console.log(req);
    //console.log(req.body);
    msg.push(req.body);
    console.log(msg);
    // res.json(req.body);      // res.send() is called inside this fnc
    res.set('content-type', 'text/plain');
    res.send('thank you for your message');
});

app.get('/list', function (req, res) {
    var str = '';
    for (var i = 0; i < msg.length; ++i) {
        str += msg[i]['name'] + ': ' + msg[i]['message'];
        if (i != (msg.length - 1))
            str += '\n';
    }

    res.set('content-type', 'text/plain');
    res.send(str);
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

// preface: use the body-parser middleware that helps you retrieve and parse the post data from the form

// http://localhost:8080/form should return the form as shown below
//   res.status(200);
//   
//   res.set({
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

// http://localhost:8080/new should retrieve the post data using the body parser, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text