/**
 * JSON-RPC Server & Client Tester
 * author: Jesús Chacón <jcsombria@gmail.com>
 *
 * Copyright (C) 2013 Jesús Chacón
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var server = require('./JsonRpcServer');
var http = require('http');

//process.env.PORT = 2055;
//process.env.IP = 2055;

// Create the http server
http.createServer(onRequest).listen(process.env.PORT, process.env.IP, function() {
	console.log('Server listening on ' + process.env.IP + ':'+ process.env.PORT);
});

// Handle the http requests
function onRequest(request, response) {
		var headers = {
			'Content-Type': 'application/json', 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
		}
	var body = '';
//  request.setEncoding('utf8');
  request.on('data', function (chunk) {
    body += chunk;
  })

  request.on('end', function () {
		response.writeHead(200, headers);
		response.write(JSON.stringify(server.parse(body)));
		response.end();
	});
}




