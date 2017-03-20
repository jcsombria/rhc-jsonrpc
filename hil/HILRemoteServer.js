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
var cp = require('child_process');
var spawnSync = cp.spawnSync;
var fs = require('fs');

var JsonRpcServer = require('../jsonrpc/JsonRpcServer');
var HardwareInterfaceFactory = require('../app/HardwareInterfaceFactory');
var RIPImpl = new JsonRpcServer();


RIPImpl.init = function() {
	this.on('connect', 0, RIPImpl.connect.bind(this));
	this.on('get', 1, RIPImpl.get.bind(this));
	this.on('set', 2, RIPImpl.set.bind(this));
	this.on('load', 1, RIPImpl.load.bind(this));
	this.on('disconnect', 0, RIPImpl.disconnect.bind(this));
	this.hardwareInterface = HardwareInterfaceFactory.makeArduinoInterface();
}

RIPImpl.connect = function() {
	return {
		methods: ['connect', 'set', 'get', 'disconnect'],
		readable: this.hardwareInterface.getReadableVariables(),
		writable: this.hardwareInterface.getWritableVariables(),
	};
}
	
RIPImpl.get = function(variables) {
	result = [];
	for (var i=0; i<variables.length; i++) {
		var value = this.hardwareInterface.read(variables[i])
		result.push(value);
	}
	return result;
}

RIPImpl.set = function(variables, values) {
	for(var i=0; i<variables.length; i++) {
		this.hardwareInterface.write(variables[i], values[i]);
	}
}


RIPImpl.load = function(controller) {
	this.hardwareInterface.disconnect(function() {
		this._generate(controller, function() {
			this._upload();
			this.hardwareInterface.connect();
		}.bind(this));
	}.bind(this));
}

RIPImpl._upload = function() {
	try {
		const result = spawnSync('make', ['upload', '-C','tmp'], {
			stdio: 'inherit',
		});
		console.log('controller uploaded');
	} catch(error) {
		console.log(error);
	}
}

RIPImpl._generate = function(controller, callback) {
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

RIPImpl._build = function() {
	try {
		const result = spawnSync('make', ['-C','tmp'], {
			cwd: process.env.PWD,
			stdio: 'inherit',
		});
	} catch(error) {
		console.log(error);
	}	
}

RIPImpl.disconnect = function() {
	return 'disconnect';
}

RIPImpl.init();
module.exports = RIPImpl;