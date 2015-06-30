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
var Board = require('../board/Board');

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
