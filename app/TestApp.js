/**
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

var BoardInterface = require('../board/BoardInterface');
var Board = require('../board/Boards');
var HttpServer = require('../HttpServer');
var rpcserver = require('../rip/DummyServer');

var App = {
	start: function() {
		testHardwareInterface = new BoardInterface(Board.TestBoard);
    var variables = [
			{ 'name': 'ball_height', 'pin': 'P1', 'type': 'in' },
			{ 'name': 'fan_control', 'pin': 'P2', 'type': 'out' },
			{ 'name': 'servo_control', 'pin': 'P3', 'type': 'out' },
			{ 'name': 'setpoint', 'type': 'in_out' },
		];
    for(var i=0; i<variables.length; i++) {
			var variable = variables[i];
			testHardwareInterface.addVariable(variable['name'], variable['pin']);
			switch(variable['type']) {
				case 'in':
					testHardwareInterface.setReadable(variable['name']);
					break;
				case 'in_out':
					testHardwareInterface.setReadableWritable(variable['name']);
					break;
				case 'out':
					testHardwareInterface.setWritable(variable['name']);
					break;
			}
		}
    rpcserver.setHardwareInterface(testHardwareInterface);
		this.httpserver = new HttpServer();
		this.httpserver.setRPCServer(rpcserver);
		this.httpserver.start();
	},
}

App.start();
