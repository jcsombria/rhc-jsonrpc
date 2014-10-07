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

var HardwareInterface = require('./HardwareInterface');

function RealTimeLoop() {
	this.periodInMillis = 100;

	this.hardware = new HardwareInterface();
}

RealTimeLoop.prototype.run = function() {
	setInterval(this.tic.bind(this), this.periodInMillis);
}

RealTimeLoop.prototype.tic = function() {
//	var start = new Date().getMilliseconds();
	var sensorsReading = this.hardware.readAllInputs();

//	var controlAction = controller.update(sensorsReading);
	controlAction = { 'output1':Math.random(), 'output2':Math.random() };
	this.hardware.writeAllOutputs(controlAction);

//	var end = new Date().getMilliseconds();
//	var time = end - start;
//	console.log('Elapsed Time: '+time);
	console.log(sensorsReading);
	console.log(controlAction);
}


rtloop = new RealTimeLoop();
rtloop.run();
