/**
 * HIL Remote Protocol - Boards Interface definition
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
var Boards = require('./Boards');
var Variable = require('./Variable');

function BoardInterface() {
	this.board = Boards.BeagleBoneBlack;

	this.vars = {};
	this.pinToVar = {};
	this.varToPin = {};
}

BoardInterface.prototype.bindVariableToPin = function(variable, pin) {
	if(this.hasVariable(variable) && this.board.hasPin(pin)) {
		this.pinToVar[pin] = variable;
		this.varToPin[variable] = pin;
		variable.setRange(this.board.pinRange(pin));
	}
}

BoardInterface.prototype.addVariable = function(name, pin) {
	if(this.board.hasPin(pin)) {			
		this.vars[name] = new Variable(name);
	}
};

BoardInterface.prototype.removeVariable = function(variable) {
	this.vars[variable] = undefined;
};

BoardInterface.prototype.hasVariable = function(variable) {
	if(this.vars[variable]) {
		return true;
	} else {
		return false;
	}
};

BoardInterface.prototype.setValue = function(variable, value) {
	if(this.hasVariable(variable)) {
		this.vars[variable].setValue(value);
	}
};

BoardInterface.prototype.getValue = function(variable) {
	if(this.hasVariable(variable)) {
		return this.vars[variable].getValue();
	}
};

//	this.vars = {
//		'led': { pin: "P9_14", value: 0},
//		'input2': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
//		'input3': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
//		'input4': {type: ioDir.IN, range: {min:0, max:1.8}, value: 0},
//		'output1': {type: ioDir.OUT, range: {min:0, max:3.3}, value: 0},
//		'output2': {type: ioDir.OUT, range: {min:0, max:3.3}, value: 0}
//	};

module.exports = BoardInterface;
