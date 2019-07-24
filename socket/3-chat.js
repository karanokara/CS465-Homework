'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

var getClientObj = function (io) {
	var clientObj = {
		strClients: [],
	};

	for (var clientId in io.sockets.sockets) {
		clientObj.strClients.push(clientId);
	}

	console.log(clientObj);

	return clientObj;
};

io.on('connection', function (objectSocket) {
	// send everyone the 'clients' event, containing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }

	// console.log(objectSocket.id);
	// console.log(io);
	// console.log(io.engine.clientsCount);
	// console.log(io.engine.clients);
	// console.log(io.sockets.sockets);

	// to everyone
	io.emit('clients', getClientObj(io));

	// Send event to all other clients this socket itself
	io.emit('message', { 'strFrom': 'server', 'strTo': 'everyone', 'strMessage': objectSocket.id + ' connected' });

	// listen an event to this new socket from client
	objectSocket.on('message', function (objectData) {
		// if the message should be received by everyone, broadcast it accordingly, to everyone
		if (objectData['strTo'] === 'everyone')
			io.emit('message', { 'strFrom': objectSocket.id, 'strTo': 'everyone', 'strMessage': objectData['strMessage'] });
		// if the message has a single target, send it to this target as well as to the origin
		else {
			// to target
			objectSocket.to(objectData['strTo']).emit('message', { 'strFrom': objectSocket.id, 'strTo': objectData['strTo'], 'strMessage': objectData['strMessage'] });
			// to itself
			objectSocket.emit('message', { 'strFrom': objectSocket.id, 'strTo': objectData['strTo'], 'strMessage': objectData['strMessage'] });
		}
	});

	objectSocket.on('disconnect', function () {
		// send everyone the 'clients' event, containing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }

		io.emit('clients', getClientObj(io));

		// Send event to all other clients this socket itself
		objectSocket.broadcast.emit('message', { 'strFrom': 'server', 'strTo': 'everyone', 'strMessage': objectSocket.id + ' disconnected' });
	});

	// Send an event to only this client
	// objectSocket.emit('new_event',{});

	// Send event to all connection
	// io.emit('broadcast',{});

	// Send event to all other clients this socket itself
	// objectSocket.broadcast.emit('event', {});

	// objectSocket.to('one-room').emit();
	// objectSocket.to('room1').to('room2').emit();
	// objectSocket.to('another-socket-id').emit('event', 'hey');
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');