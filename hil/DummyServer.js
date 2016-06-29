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
var HardwareInterfaceFactory = require('../app/HardwareInterfaceFactory');
var RIPImpl = new JsonRpcServer();

RIPImpl.hardwareInterface = HardwareInterfaceFactory.makeTestHardwareInterface();

RIPImpl.init = function() {
	this.on('connect', 0, RIPImpl.connect.bind(this));
	this.on('getMetadata', 0, RIPImpl.getMetadata.bind(this));
	this.on('get', 1, RIPImpl.get.bind(this));
	this.on('set', 2, RIPImpl.set.bind(this));
	this.on('disconnect', 0, RIPImpl.disconnect.bind(this));
}

RIPImpl.connect = function() {
  return true;
}

RIPImpl.getMetadata = function() {
	var meta= {
		methods: ['connect', 'set', 'get', 'disconnect'],
		readable: this.hardwareInterface.getReadableVariables(),
		writable: this.hardwareInterface.getWritableVariables(),
	};
	return meta;
}
	
RIPImpl.get = function(variables) {
	result = [];
	for (var i=0; i<variables.length; i++) {
		result.push(this.hardwareInterface.read(variables[i]));
	}
	return result;
}

RIPImpl.set = function(variables, values) {
	for(var i=0; i<variables.length; i++) {
		this.hardwareInterface.write(variables[i], values[i]);
	}
}

RIPImpl.disconnect = function() {
	return true;
}

RIPImpl.init();
module.exports = RIPImpl;
