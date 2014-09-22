/**
 * HIL Remote Protocol - Boards definition
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

// Types of input/output
const ioType = {
	ANALOG:"analog", 
	DIGITAL:"digital"
};

// Type of input/output
const ioDir = {
	IN:"in", 
	OUT:"out", 
	IN_OUT:"in_out"
};	

// Generic board
var board = function() {
	this.name = "Generic Board";
}

// BeagleBone Black board
var beagleboneblack = function() {
	this.name = "BeagleBone Black Board";
//	this.io = [ 
//		{name:"input1", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}},
//		{name:"input2", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}}
//		{name:"input3", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}},
//		{name:"input4", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}}
//	]

	this.vars = {
		'input1': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
		'input2': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
		'input3': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
		'input4': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
		'output1': {type: ioDir.OUT, range: {min:0, max:3.3}, value: 0},
		'output2': {type: ioDir.OUT, range: {min:0, max:3.3}, value: 0}
	};
}

// Module Exports
module.exports.ioDir = ioDir;
module.exports.ioType = ioType;
module.exports.Board = board;
module.exports.BeagleBone = beagleboneblack;
