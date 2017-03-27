/**
 * JSON-RPC Server & HIL Remote Protocol - Dummy Server
 * author: Jesús Chacón <jcsombria@gmail.com>
 *
 * Copyright (C) 2014 Jesús Chacón
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

var JsonRpcServer = require('../jsonrpc/JsonRpcServer');
var DummyServer = new JsonRpcServer();

DummyServer.init = function() {
	this.on('connect', 0, DummyServer.connect.bind(this));
	this.on('disconnect', 0, DummyServer.disconnect.bind(this));
	this.on('open', 0, DummyServer.open.bind(this));
	this.on('close', 0, DummyServer.stop.bind(this));
	this.on('run', 0, DummyServer.run.bind(this));
	this.on('stop', 0, DummyServer.stop.bind(this));
	this.on('get', 2, DummyServer.get.bind(this));
	this.on('set', 1, DummyServer.set.bind(this));
	this.on('getValue', 1, DummyServer.getValue.bind(this));
	this.on('setValue', 2, DummyServer.setValue.bind(this));
}

DummyServer.setHardwareInterface = function(hardwareInterface) {
  this.hardwareInterface = hardwareInterface;
}

DummyServer.connect = function() {
//	return {'session-id': UUID()};
  return {
    info: {
  	  name: 'Air Levitator System Lab',
  	  description: 'Air Levitator System Lab',
	  },
    methods: {
		  'connect': {
		    'purpose': 'To establish a connection with the lab.',
        'params': {}
		  },
		  'set': {
		    'purpose': 'To write a server variable',
        'params': {
            'variables': '[string]',
            'values': '[]',
		    },
 		  },
		  'get': {
		    'purpose': 'To read a server variable',
        'params': {
            'variables': '[string]',
            'values': '[]',
		    },
		  },
		  'disconnect': {
		    'purpose': 'To finish the connection with the lab.',
		    'params': {},
		  },
		},
    readable: this.hardwareInterface.getReadableVariables(),
		writable: this.hardwareInterface.getWritableVariables(),
	};
}

function UUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

DummyServer.setTransport = function(transport) {
  this.transport = transport;
}

DummyServer.open = function() {
return {
	  info: {
  	  name: 'Air Levitator System Lab',
  	  description: 'Air Levitator System Lab',
	  },
//methods: ['connect', 'disconnect', 'open', 'close', 'run', 'stop', 'get', 'set', 'getValue', 'setValue'],
		methods: {
		  'connect': {
		    'purpose': 'To establish a connection with the lab.',
        'params': {},
		  },
		  'set': {
		    'purpose': 'To write a server variable',
        'params': {
            'variables': '[string]',
            'values': '[]',
		    },
 		  },
		  'get': {
		    'purpose': 'To read a server variable',
        'params': {
            'variables': '[string]',
            'values': '[]',
		    },
		  },
		  'disconnect': {
		    'purpose': 'To finish the connection with the lab.',
		    'params': '',
		  },
		},
		readable: this.hardwareInterface.getReadableVariables(),
		writable: this.hardwareInterface.getWritableVariables(),
	};
}

DummyServer.run = function() {
	return {'state':'running'};
}

DummyServer.get = function(params) {
	var variables = [params[0]];
	var condition = [params[1]];
	var result = {};
	for (i=0; i<variables.length; i++) { 
	  result[variables[i]] = this.hardwareInterface.read(variables[i]);
	}
	setTimeout(function(){
	  var result = this.get(params);
	  this.transport.send(JSON.stringify(result));
	}.bind(this), 1000);
	  
	return result;
}

DummyServer._notify = function(result) {
  this.transport.send(result);
}

DummyServer.set = function(params) {
	var variables = params;
	var result = {};
	for(item in variables) {
	  name = item;
	  value = variables[item];
	  result[item] = value;
	  this.hardwareInterface.write(name, value)
	}
	return result;
}

DummyServer.getValue = function(params) {
	var variable = [params[0]];
	var result = {};
	var value = this.hardwareInterface.read(variable);	
	result[variable] = value;
	return result;
}

DummyServer.setValue = function(params) {
	var variable = params[0];
	var value = params[1];
	this.hardwareInterface.write(variable, value);
	var result = {};
	result[variable] = value;
	return result;
}

DummyServer.close = function() {
	return {close:'not implemented'};
}

DummyServer.stop = function() {
	return {stop:'not implemented'};
}

DummyServer.disconnect = function() {
	return {disconnect:'not implemented'};
}

DummyServer.init();
module.exports = DummyServer;
