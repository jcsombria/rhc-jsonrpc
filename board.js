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
