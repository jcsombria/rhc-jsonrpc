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
var HttpServer = require('../HttpServer');
var Arduino = require('../board/SFArduino');
var rpcserver = require('../hil/SFArduinoRIPServer');

var App = {
	start: function() {
		this.arduino = new BoardInterface(Arduino);
		this.arduino.connect(function onConnect() {
      this.initVariables();
      this.startServer();
		}.bind(this));
	},
  
  initVariables: function() {
	    var variables = [
			{ 'name': 'A0', 'pin': 'A0', 'type': 'in' },
			{ 'name': 'A1', 'pin': 'A1', 'type': 'in' },
			{ 'name': 'A2', 'pin': 'A2', 'type': 'in' },
 			{ 'name': 'A3', 'pin': 'A3', 'type': 'in' },
			{ 'name': 'A4', 'pin': 'A4', 'type': 'in' },
			{ 'name': 'A5', 'pin': 'A5', 'type': 'in' },
			{ 'name': 'D0', 'pin': 'D0', 'type': 'out' },
			{ 'name': 'D1', 'pin': 'D1', 'type': 'out' },
			{ 'name': 'D2', 'pin': 'D2', 'type': 'out' },
			{ 'name': 'D3', 'pin': 'D3', 'type': 'out' },
			{ 'name': 'D4', 'pin': 'D4', 'type': 'out' },
			{ 'name': 'D5', 'pin': 'D5', 'type': 'out' },
			{ 'name': 'D6', 'pin': 'D6', 'type': 'out' },
			{ 'name': 'D7', 'pin': 'D7', 'type': 'out' },
			{ 'name': 'D8', 'pin': 'D8', 'type': 'out' },
			{ 'name': 'D9', 'pin': 'D9', 'type': 'out' },
			{ 'name': 'D10', 'pin': 'D10', 'type': 'out' },
			{ 'name': 'D11', 'pin': 'D11', 'type': 'out' },
			{ 'name': 'D12', 'pin': 'D12', 'type': 'out' },
			{ 'name': 'D13', 'pin': 'D13', 'type': 'out' },
		];
    for(var i=0; i<variables.length; i++) {
			var variable = variables[i];
			this.arduino.addVariable(variable['name'], variable['pin']);
			switch(variable['type']) {
				case 'in':
					this.arduino.setReadable(variable['name']);
					break;
				case 'in_out':
					this.arduino.setReadableWritable(variable['name']);
					break;
				case 'out':
					this.arduino.setWritable(variable['name']);
					break;
			}
		}
		for(variable in variables) {
			var pin = variables[variable];
			this.arduino.addVariable(variable, pin);
		}
	},
	
	startServer: function() {
    rpcserver.setHardwareInterface(this.arduino);
		this.httpserver = new HttpServer();
		this.httpserver.setRPCServer(rpcserver);
		this.httpserver.start();	
	}
}

App.start();
