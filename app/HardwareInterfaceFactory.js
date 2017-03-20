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

var HardwareInterfaceFactory = {
	makeTestHardwareInterface: function() {
		testHardwareInterface = new BoardInterface(Board.TestBoard);
		var variables = {
			'variable1': 'P1',
			'variable2': 'P2',
		};
		for(variable in variables) {
			var pin = variables[variable];
			testHardwareInterface.addVariable(variable, pin);
		}
		return testHardwareInterface;
	},

	makeBeagleBoneBlackHardwareInterface: function() {
		beagleBoneBlackInterface = new BoardInterface(Board.BeagleBoneBlack);
		var variables = [
			{ 'name': 'ball_height', 'pin': 'P9_36', 'type': 'in' },
			{ 'name': 'fan_control', 'pin': 'P9_14', 'type': 'out' },
			{ 'name': 'servo_control', 'pin': 'P9_22', 'type': 'out' },
			{ 'name': 'setpoint', 'type': 'in_out' },
			{ 'name': 'kp', 'type': 'in_out' },
			{ 'name': 'ki', 'type': 'in_out' },
			{ 'name': 'kd', 'type': 'in_out' },
		];
		for(var i=0; i<variables.length; i++) {
			var variable = variables[i];
			beagleBoneBlackInterface.addVariable(variable['name'], variable['pin']);
			switch(variable['type']) {
				case 'in':
					beagleBoneBlackInterface.setReadable(variable['name']);
					break;
				case 'in_out':
					beagleBoneBlackInterface.setReadableWritable(variable['name']);
					break;
				case 'out':
					beagleBoneBlackInterface.setWritable(variable['name']);
					break;
			}
		}
		beagleBoneBlackInterface.write('setpoint', 10);
		beagleBoneBlackInterface.write('kp', 0.6);
		beagleBoneBlackInterface.write('ki', 0.005);
		beagleBoneBlackInterface.write('kd', 0.5);
//		beagleBoneBlackInterface.write('servo_control', 0.2);
		return beagleBoneBlackInterface;
	},

	makeArduinoInterface: function() {
		var RTLoop = require('../app/RealTimeLoopArduino');
		var Arduino = require('../board/Arduino');
		var arduinoInterface = new BoardInterface(Arduino);
		var variables = [
			{ 'name': 'ball_height', 'pin': 'ball_height', 'type': 'in' },
			{ 'name': 'fan_control', 'pin': 'fan_control', 'type': 'out' },
			{ 'name': 'servo', 'pin': 'servo', 'type': 'out' },
			{ 'name': 'setpoint', 'pin': 'setpoint', 'type': 'in_out' },
			{ 'name': 'kp', 'pin':'kp', 'type': 'in_out' },
			{ 'name': 'ki', 'pin':'ki', 'type': 'in_out' },
			{ 'name': 'kd', 'pin':'kd', 'type': 'in_out' },
			{ 'name': 'u', 'pin':'u', 'type': 'in_out' },
			{ 'name': 'mode', 'pin':'mode', 'type': 'in_out' },
			{ 'name': 'fan_min', 'pin':'fan_min', 'type': 'in_out' },
			{ 'name': 'fan_max', 'pin':'fan_max', 'type': 'in_out' },
		];
		for(var i=0; i<variables.length; i++) {
			var variable = variables[i];
			arduinoInterface.addVariable(variable['name'], variable['pin']);
			switch(variable['type']) {
				case 'in':
					arduinoInterface.setReadable(variable['name']);
					break;
				case 'in_out':
					arduinoInterface.setReadableWritable(variable['name']);
					break;
				case 'out':
					arduinoInterface.setWritable(variable['name']);
					break;
			}
		}
		// Caca
		arduinoInterface.board.userOnConnect = function() {
			console.log('connecting people');
			setTimeout(function() {
		//		arduinoInterface.write('setpoint', 10);
		//		arduinoInterface.write('kp', 0.6);
		//		arduinoInterface.write('ki', 0.005);
		//		arduinoInterface.write('kd', 0.5);
		//		arduinoInterface.write('servo_control', 0.0);
				arduinoInterface.write('mode', 'auto');
				arduinoInterface.write('fan_min', 0.5);
				arduinoInterface.write('fan_max', 1.0);
			}, 5000);
		}
		rtloop.setBoard(arduinoInterface);
		//rtloop.run();
		return arduinoInterface;
	},

}

module.exports = HardwareInterfaceFactory;
