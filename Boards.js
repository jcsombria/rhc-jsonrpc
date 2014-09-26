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

// Generic board
var board = function() {
	this.name = "Generic Board";
}

var BeagleBoneBlack = function() {
	this.name = "BeagleBone Black Board";

	this.hwio = {
		"P9_1": {
			name:'DGND',
			range: {min:0.0, max:1.8},
			dir:ioDir.OUT
		},
		"P9_2": {
			name:'DGND',
			range: {min:0.0, max:1.8},
			dir:ioDir.OUT
		},
		"P9_3": {
			name:'VDD_5V',
			range: {min:0.0, max:1.8},
			dir:ioDir.OUT
		},
		"P9_4": { name:'VDD_5V', range: {min:5.0, max:5.0}, dir:ioDir.OUT
		},
		"P9_5": { name:'SYS_5V', range: {min:5.0, max:5.0}, dir:ioDir.OUT
		},
		"P9_6": { name:'SYS_5V', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		},
		"P9_7": { name:'PWR_BUT', range: {min:0.0, max:0.0}
		},
		"P9_8": { name:'SYS_RESETn', range: {min:0.0, max:0.0}
		},
		"P9_9": { name:'GPIO_30', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_10": { name:'GPIO_60', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_11": { name:'GPIO_31', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_12": { name:'GPIO_40', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_13": { name:'GPIO_48', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_14": { name:'GPIO_51', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_15": { name:'GPIO_4', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_16": { name:'GPIO_5', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_17": { name:'I2C2_SCL', range: {min:0.0, max:1.8}
		},
		"P9_18": { name:'I2C2_SDA', range: {min:0.0, max:1.8}
		},
		"P9_19": { name:'GPIO_3', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_20": { name:'GPIO_2', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_21": { name:'GPIO_49', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_22": { name:'GPIO_15', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_23": { name:'GPIO_117', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_24": { name:'GPIO_14', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_25": { name:'GPIO_125', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_26": { name:'GPIO_123', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_27": { name:'GPIO_121', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_28": { name:'GPIO_122', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_29": { name:'GPIO_120', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_30": { name:'VDD_ACC', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		},
		"P9_31": { name:'AIN4', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_32": { name:'GNDA_ADC', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		},
		"P9_33": { name:'AIN6', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_34": { name:'AIN5', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_35": { name:'AIN2', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_36": { name:'AIN3', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_37": { name:'AIN0', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_38": { name:'AIN1', range: {min:0.0, max:1.8}, dir:ioDir.IN
		},
		"P9_39": { name:'GPIO_20', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_40": { name:'GPIO_7', range: {min:0.0, max:1.8}, dir:ioDir.IN_OUT
		},
		"P9_41": { name:'DGND', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		},
		"P9_42": { name:'DGND', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		},
		"P9_43": { name:'DGND', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		},
		"P9_44": { name:'DGND', range: {min:0.0, max:1.8}, dir:ioDir.OUT
		}
	};

//	this.io = [ 
//		{name:"GPIO_30", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}},
//		{name:"input1", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}},
//		{name:"input2", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}}
//		{name:"input3", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}},
//		{name:"input4", dir:ioDir.IN, type:ioType.ANALOG, range:{min:0, max:1.8}}
//	]

}

BeagleBoneBlack.prototype.hasPin = function(pin) {
	if(this.hwio[pin]) {
		return true;
	} else {
		return false;
	}	
};

BeagleBoneBlack.prototype.pinRange = function(pin) {
	if(this.hasPin(pin)) {
		return this.hwio[pin].range;
	} else {
		var defaultPinRange = { min:0, max:0 };
		return defaultPinRange;
	}
}


// Module Exports
module.exports.ioDir = ioDir;
module.exports.ioType = ioType;
module.exports.Board = board;
module.exports.BeagleBoneBlack = new BeagleBoneBlack();
