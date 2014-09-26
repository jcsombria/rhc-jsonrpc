/**
 * JSON-RPC Server & HIL Remote Protocol - Implementation for BeagleBone
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

var JsonRpcServer = require('./JsonRpcServer');
var Board = require("./board");
var rpcserver = new JsonRpcServer();
var myboard = new Board.BeagleBone();

rpcserver.setBoard = function(board) {
	console.log(board.vars):
	this.board = board;
};

rpcserver.on('connect', 0, function(params) {
	return 'connect';
});

rpcserver.on('open', 0, function(params) {
console.log(myboard);
	return {
		methods: ['connect', 'open', 'run', 'getValue', 'setValue', 'sync', 'stop', 'disconnect'],
		vars: myboard.vars
	};
});

rpcserver.on('run', 0, function(params) {
	return 'run';
});

rpcserver.on('getValue', 1, function(params) {
	var name = params[0];
	var variable = myboard.vars[name];
	if(variable && variable.type != Board.ioDir.OUT) {
		return variable.value;
	}
});

rpcserver.on('setValue', 2, function(params) {
	var name = params[0];
	var value = params[1];

	var variable = myboard.vars[name];
	if(variable && variable.type != Board.ioDir.IN) {
		variable.value = value;
	}
	return 'Variable '+name+' updated with value '+value;
});

rpcserver.on('sync', 0, function(params) {
	return 'sync';
});

rpcserver.on('stop', 0, function(params) {
	return 'stop';
});

rpcserver.on('disconnect', 0, function(params) {
	return 'disconnect';
});

module.exports = rpcserver;
