var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var driver = require('couchbase');
var baseview = require('baseview')('http://127.0.0.1:8092');

var cb = new driver.Couchbase("127.0.0.1:8091", null, null, "default");

server.listen(8080);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function(socket) {

	socket.on('getEmployees', function(data) {
		var params = {
			'descending': 'true',
			'include_docs': 'true'
		};
		baseview.view('design_employees', 'basic_list', params, function(error, data) {
			for (var i = data.rows.length - 1, length = data.rows.length; i >= 0; i--) {
				var emp = data.rows[i].doc.json;
				io.sockets.emit('sendEmployee', emp);		
			}
		});
	});

	socket.on('deleteEmployee', function(data) {
		cb.delete(
		    data,
		    null,
		    function (data, error, key) { console.log(error); },
		    ""
		);
	});

	socket.on('setEmployee', function(data) {
		cb.set(
		    JSON.stringify(data.id),
		    JSON.stringify(data),
		    0,
		    null,
		    function (data, error, key, cas) { console.log(error); },
		    ""
		);
	});

});

