/**
 * JSON-RPC Server Tester
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
var WebSocketServer = require('ws').Server
   , net = require('net')
   , http = require('http')
   , express = require('express')
   , app = express()
var rpcserver = require('./hil/HILRemoteServer');

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(2055);

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {

  rpcserver.setTransport(ws);

  ws.on('open', function() {
    console.log('Server: connection opened');
  });

  ws.on('close', function(code, message) {
    console.log('Server: connection closed with code: ' + code + ', ' + message);
  });
  
  ws.on('message', function(data, flags) {
    console.log(data);
    try {
      var result = rpcserver.parse(data);
      var response = JSON.stringify(result);
    } catch(error) {
      console.log('Server: '+error);
    }
    ws.send(response);
  });

  ws.on('error', function(error) {
    console.log('Server: error ' + error);
  });


  var notify = function() {
    console.log('Server: message sent {"t":10}');
 	  ws.send('{"t":10}');
  }

});
