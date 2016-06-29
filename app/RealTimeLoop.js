/**
 * "Real Time" Loop
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

function RealTimeLoop() {
}

RealTimeLoop.prototype.setBoard = function(boardInterface) {
	this.hardware = boardInterface;
	controller.setBoard(this.hardware);
}

RealTimeLoop.prototype.run = function() {
	setInterval(this.tic.bind(this), controller.period / controller.oversampling);
}

RealTimeLoop.prototype.tic = function() {
	controller.update();
}

var controller = {
	SETPOINT: 'setpoint',
	INPUT1_NAME: 'ball_height',
	OUTPUT1_NAME: 'fan_control',
	u: 0,
	y: 0,
	c: 1/100,
	kp: 0.6 * this.c,
	ki: 0.005 * this.c,
	kd: 0.5 * this.c,
	I: 0,
	u0: 0.65,
	e: 0,
	e_prev: 0,
	I_prev: 0,
	setpoint: 10.0,
	period: 200,
	oversampling: 4,
	sensor: 0,
	step: 0,
	
	setBoard: function(board) {
		this.hardware = board;
	},

	read: function() {
	    this.sensor += this.hardware.read(this.INPUT1_NAME) / this.oversampling;
		//10*Math.exp(2.7*(this.sensor-0.3));
        this.setpoint = this.hardware.read(this.SETPOINT);
        this.kp = this.hardware.read('kp') * this.c;
        this.ki = this.hardware.read('ki') * this.c;
        this.kd = this.hardware.read('kd') * this.c;
 	},
	
	update: function (y) {
		this.read();
        if((++this.step) == this.oversampling) {
		    var x = this.sensor;
			var h = 5.5e2*Math.pow(x, 3) - 9.2e2*Math.pow(x, 2) + 5.3e2*x - 94.5;
			this.y = this.sat(h, 0, 35);
            this.step = 0;
            this.sensor = 0;
            this.e_prev = this.e;
            this.e = this.setpoint - this.y;
            // PID
            var P = this.kp*this.e;
            this.I_prev = this.I;
            this.I += (this.ki*this.e)/(this.period/1000);
            var D = this.kd*(this.e - this.e_prev)/(this.period/1000);
            var v = this.u0 + P + this.I + D;
            // Conditional integration
            this.u = this.sat(v, 0, 1);
            if((this.u - v) * this.e < 0) {
                this.I = this.I_prev;
            }
//            console.log('output = '+ Math.round(100*this.u)/100 + ', setpoint  = ' + this.setpoint + ', input  = ' + Math.round(100*this.y)/100);
    		this.write();
        }
	},
	
	write: function() {
		this.hardware.write(this.OUTPUT1_NAME, this.u);
	},

	sat: function(value, min, max) {
    if(value < min) {
        return min;
    }
    if(value > max) {
        return max;
    }
    return value;
	}
}


module.exports = RealTimeLoop;
