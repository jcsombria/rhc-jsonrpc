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

var HardwareInterface = require('./HardwareInterface');
var BoardInterface = require('./BoardInterface');
var Boards = require('./Boards');

var HardwareInterfaceFactory = {
	makeTestHardwareInterface: function() {
		testHardwareInterface = new HardwareInterface(Boards.TestBoard);
		var variables = {	
			'input1': 'P1',
			'input2': 'P2',
			'output1': 'P3'
		};
		testHardwareInterface.addVariables(variables);
		return testHardwareInterface;
	},

	makeBeagleBoneBlackHardwareInterface: function() {
		beagleBoneBlackInterface = new BoardInterface(Boards.BeagleBoneBlack);
		var readable = {
			'motor1_speed': 'P9_35',
			'motor2_speed': 'P9_36',
			'pulley_speed': 'P9_37',
			'belt_tension': 'P9_38'
		};
		var writable = {
			'motor1_control': 'P9_13',
			'motor2_control': 'P9_14',
		};
		for(variable in readable) {
			var pin = readable[variable];
			beagleBoneBlackInterface.addVariable(variable, pin);
			beagleBoneBlackInterface.setReadable(variable);
		}
		for(variable in writable) {
			var pin = writable[variable];
			beagleBoneBlackInterface.addVariable(variable, pin);
			beagleBoneBlackInterface.setWritable(variable);
		}
		return beagleBoneBlackInterface;
	},
}

module.exports = HardwareInterfaceFactory;
