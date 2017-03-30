/**
 * JSON-RPC Server & HIL Remote Protocol - BeagleBone Implementation
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
//var cp = require('child_process');
var spawnSync = cp.spawnSync;
var fs = require('fs');

var JsonRpcServer = require('../jsonrpc/JsonRpcServer');
var ArduinoRipServer = new JsonRpcServer();

ArduinoRipServer.init = function() {
	this.on('connect', 0, ArduinoRipServer.connect.bind(this));
	this.on('get', 1, ArduinoRipServer.get.bind(this));
	this.on('set', 2, ArduinoRipServer.set.bind(this));
	this.on('load', 1, ArduinoRipServer.load.bind(this));
	this.on('disconnect', 0, ArduinoRipServer.disconnect.bind(this));
}

ArduinoRIPServer.setHardwareInterface = function(hardwareInterface) {
  this.hardwareInterface = hardwareInterface;
}

ArduinoRipServer.connect = function() {
	return {
	  info: {
  	  name: 'Air Levitator System Lab',
  	  description: 'Air Levitator System Lab',
	  },
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
		    'params': {},
		  },
		},
		readable: this.hardwareInterface.getReadableVariables(),
		writable: this.hardwareInterface.getWritableVariables(),
	};
}
	
ArduinoRipServer.get = function(variables) {
	result = [];
	for (var i=0; i<variables.length; i++) {
		var value = this.hardwareInterface.read(variables[i])
		result.push(value);
	}
	return result;
}

ArduinoRipServer.set = function(variables, values) {
	for(var i=0; i<variables.length; i++) {
		this.hardwareInterface.write(variables[i], values[i]);
	}
}


ArduinoRipServer.load = function(controller) {
	this.hardwareInterface.disconnect(function() {
		this._generate(controller, function() {
			this._upload();
			this.hardwareInterface.connect();
		}.bind(this));
	}.bind(this));
}

ArduinoRipServer._upload = function() {
	try {
		const result = spawnSync('make', ['upload', '-C','tmp'], {
			stdio: 'inherit',
		});
		console.log('controller uploaded');
	} catch(error) {
		console.log(error);
	}
}

ArduinoRipServer._generate = function(controller, callback) {
	var code = 'double PID::update(double y) {\n' + controller + '}';
	var input = fs.createReadStream(process.env.PWD + '/arduino_code/levitador.ino');
	var output = fs.createWriteStream(process.env.PWD + '/tmp/levitador.ino');
	input.pipe(output);
	output.on('close', function() {
		fs.appendFileSync(process.env.PWD +'/tmp/levitador.ino', code);
		if(callback != undefined) {
			callback();
		}
	});
}

ArduinoRipServer._build = function() {
	try {
		const result = spawnSync('make', ['-C','tmp'], {
			cwd: process.env.PWD,
			stdio: 'inherit',
		});
	} catch(error) {
		console.log(error);
	}	
}

ArduinoRipServer.disconnect = function() {
	return 'disconnect';
}

ArduinoRipServer.init();
module.exports = ArduinoRipServer;
