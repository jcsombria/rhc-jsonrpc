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

var Conf = require('./Configuration')
var BoardInterface = require('../board/BoardInterface');
var Boards = require('../board/Boards');

if(Conf.BeagleBoneBlack == true) {
  var Boards = require('../board/Boards');
}

var HardwareInterfaceFactory = {
	makeTestHardwareInterface: function() {
		testHardwareInterface = new BoardInterface(Boards.TestBoard);
		var variables = {
			'variable1': 'P1',
			'variable2': 'P2',
		};
		for(variable in variables) {
			var pin = variables[variable];
			testHardwareInterface.addVariable(variable, pin);
			testHardwareInterface.setReadableWritable(variable);
		}
		return testHardwareInterface;
	},

	makeBeagleBoneBlackHardwareInterface: function() {
		beagleBoneBlackInterface = new BoardInterface(Board.BeagleBoneBlack);
		var variables = [
			{ 'name': 'ball_height', 'pin': 'P9_36', 'type': 'in' },
			{ 'name': 'fan_control', 'pin': 'P9_14', 'type': 'out' },
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
		return beagleBoneBlackInterface;
	},
}

module.exports = HardwareInterfaceFactory;
