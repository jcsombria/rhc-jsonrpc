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
var Variable = require('./Variable');

function BoardInterface(board) {
	this.vars = {};
	this.board = board;
}

/*BoardInterface.prototype.bindVariableToPin = function(variable, pin) {
	if(this.hasVariable(variable) && this.board.hasPin(pin)) {
		this.pinToVar[pin] = variable;
		this.varToPin[variable] = pin;
		variable.setRange(this.board.pinRange(pin));
		if(this.board.isInput(pin)) {
			this.inputs[variable] = pin;
		} else {
			this.outputs[variable] = pin;
		}
	}
}*/

BoardInterface.prototype.read = function(variable) {
	if(this.hasVariable(variable)) {
		var pin = this.vars[variable].getPin();
		var value = this.board.read(pin);
		return value;
	}
	return 0;
};

BoardInterface.prototype.write = function(variable, value) {
	if(this.hasVariable(variable)) {
		this.vars[variable].setValue(value);
		this.board.write(this.vars[variable].getPin(), value);
	}
};

BoardInterface.prototype.addVariable = function(name, pin) {
	if(this.board.hasPin(pin)) {
		var variable = new Variable(name);
		variable.setPin(pin);
		var range = this.board.pinRange;
		variable.setRange(range['min'], range['max']);
		this.vars[name] = variable;
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

BoardInterface.prototype.addReadableVariable = function(name, pin) {
	if(this.board.isOutput(pin)) {
		this.addVariable(name, pin);
	} else if(this.board.isInputOutput(pin)) {
		this.addVariable(name, pin);
		this.board.setInputMode(pin);
	}
}

BoardInterface.prototype.setReadable = function(variable) {	
	if(this.hasVariable(variable)) {
		var pin =	this.vars[variable].getPin();
		if(this.board.isInputOutput(pin)) {
			this.board.setInputMode(pin);
		};
	}
}

BoardInterface.prototype.addWritableVariable = function(name, pin) {
	if(this.board.isOutput(pin)) {
		this.addVariable(name, pin);
	} else if(this.board.isInputOutput(pin)) {
		this.addVariable(name, pin);
		this.board.setOutputMode(pin);
	}
}

BoardInterface.prototype.setWritable = function(variable) {
	if(this.hasVariable(variable)) {
		var pin =	this.vars[variable].getPin();
		if(this.board.isInputOutput(pin)) {
			this.board.setOutputMode(pin);
		};
	}
}

BoardInterface.prototype.getReadableVariables = function() {
	var listOfInputVariables = [];
	for(variable in this.vars) {
		var pin = this.vars[variable].getPin();
		if(this.board.isInput(pin)) {
			listOfInputVariables.push(variable);
		}
	}
	return listOfInputVariables;
}

BoardInterface.prototype.getWritableVariables = function() {
	var listOfOutputVariables = [];
	for(variable in this.vars) {
		var pin = this.vars[variable].getPin();
		if(this.board.isOutput(pin)) {
			listOfOutputVariables.push(variable);
		}
	}
	return listOfOutputVariables;
}

module.exports = BoardInterface;
