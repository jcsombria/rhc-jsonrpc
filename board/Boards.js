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
const ioType = {
  ANALOG:"analog", 
	DIGITAL:"digital"
};

const ioDir = {
	IN:"in", 
	OUT:"out", 
	IN_OUT:"in_out"
};	

function GenericBoard() {
	this.name = "Generic Board";
}

GenericBoard.prototype.hasPin = function(pin) {
	if(this.hwio[pin]) {
		return true;
	} else {
		return false;
	}	
};

GenericBoard.prototype.isInput = function(pin) {	
	var isInput = this.hasPin(pin) && this.hwio[pin].current_dir == ioDir.IN;
	return isInput;
}

GenericBoard.prototype.isOutput = function(pin) {
	var isOutput = this.hasPin(pin) && this.hwio[pin].current_dir == ioDir.OUT;
	return isOutput;
}

GenericBoard.prototype.isInputOutput = function(pin) {
	return (this.hasPin(pin) && this.hwio[pin].dir == ioDir.IN_OUT);
}

GenericBoard.prototype.pinRange = function(pin) {
	if(this.hasPin(pin)) {
		return this.hwio[pin].range;
	} else {
		var defaultPinRange = { min:0, max:0 };
		return defaultPinRange;
	}
}

GenericBoard.prototype.inRange = function(pin, value) {
  return value > this.hwio[pin].range.min && value < this.hwio[pin].range.max;
}

GenericBoard.prototype.read = function(pin) {
	if(this.isReadable(pin)) {
		return this.hwio[pin].value;
	}
}

GenericBoard.prototype.isReadable = function(pin) {
  return this.hwio[pin] != undefined && (this.hwio[pin].dir == ioDir.IN
      || this.hwio[pin].dir == ioDir.IN_OUT);
}

GenericBoard.prototype.write = function(pin, value) {
  if(this.isWritable(pin) && this.inRange(pin, value)) {
	  this.hwio[pin].value = value;
	}
}

GenericBoard.prototype.isWritable = function(pin) {
  return (this.hwio[pin] != undefined) && (this.hwio[pin].dir == ioDir.OUT
      || this.hwio[pin].dir == ioDir.IN_OUT);
}

GenericBoard.prototype.pinRange = function(pin) {
	if(this.hasPin(pin)) {
		return this.hwio[pin].range;
	} else {
		var defaultPinRange = { min:0, max:0 };
		return defaultPinRange;
	}
}

GenericBoard.prototype.setInputMode = function(pin) {
	if(this.isInputOutput(pin)) {
		this.hwio[pin].current_dir = ioDir.IN;
	}
}

GenericBoard.prototype.setOutputMode = function(pin) {
	if(this.isInputOutput(pin)) {
		this.hwio[pin].current_dir = ioDir.OUT;
	}
}

GenericBoard.prototype.setInputOutputMode = function(pin) {
	if(this.isInputOutput(pin)) {
		this.hwio[pin].current_dir = ioDir.IN_OUT;
	}
}

// Test dummy board
function TestBoard() {
	this.name = "Test Board";

	this.hwio = {
		'P1': {	name:'IO1', range: {min:0.0, max:5.0}, dir:ioDir.IN_OUT, value: 0.0 },
		'P2': {	name:'IO2', range: {min:5.0, max:5.0}, dir:ioDir.IN_OUT, value: 0.0	},
		'P3': {	name:'IO3', range: {min:0.0, max:5.0}, dir:ioDir.IN_OUT,  value: 0.0 },
		'P4': {	name:'IO4', range: {min:0.0, max:5.0}, dir:ioDir.IN_OUT, value: 0.0 },
	}
}

TestBoard.prototype = GenericBoard.prototype;

// Module Exports
module.exports.ioDir = ioDir;
module.exports.ioType = ioType;
module.exports.GenericBoard = GenericBoard;
module.exports.TestBoard = new TestBoard();
