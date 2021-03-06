//#!/usr/bin/env node

const W3CWebSocket = require('websocket').w3cwebsocket;

const client = new W3CWebSocket('ws://192.168.0.20:80/ws');

client.onerror = function() {
	console.log('Connection Error');
};

client.onopen = function () {
	console.log('WebSocket Connected');
};

client.onclose = function (e) {
	console.log('Client Closed', e);
};

client.onmessage = function(e) {
	if (typeof e.data === 'string') {
		process.stdout.write(e.data);
	} else {
		const string = String.fromCharCode.apply("", new Uint8Array(e.data))
		process.stdout.write(string);
		// console.log(typeof e.data, e.data);
	}
};

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
	if ( chunk === '\u0003' ) {
		process.exit();
	}
	client.send(chunk);
});

console.log('C-c to exit');
