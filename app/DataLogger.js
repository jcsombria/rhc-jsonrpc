/**
 * DataLogger
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

var net = require('net');
var http = require('http');

function Data(measurement, tags, fields) {
  this.measurement = measurement;
  this.tags = tags;
  this.fields = fields;
  this.timestamp = Date.now();
}

//Data.prototype.addField = function(name, value) {
//  this.fields[name] = value;
//}

//Data.prototype.addTag = function(name, value) {
//  this.tags[name] = value;
//}

Data.prototype.toString = function() {
  var message = this.measurement;
  for(var tag in this.tags) {
    message += ',' + tag + '=' + this.tags[tag];
  }
  var first = true, sep = ' ';
  for(var field in this.fields) {
    message += sep + field + '=' + this.fields[field];
    if(first) {
      first = false;
      sep = ',';
    }
  }
  message += ' ' + this.timestamp + '\n';
  return message;
}

function DataLogger() {
  this.last = 0;
  this.data = [];
  this.periodInMillis = 2000;

  this.tags = {'session': 1, 'period': 100};
  this.measurement = 'levitador';

  this.log = function(fields) {
    var timestamp = fields.timestamp;
    var fieldsWithoutTimestamp = fields;
    delete fieldsWithoutTimestamp.timestamp;
    data = new Data(this.measurement, this.tags, fieldsWithoutTimestamp, timestamp);
    this.data.push(data);
  }

  this.flush = function(measure, timestamp) {
    var point = this.data.shift();
    if(point == undefined) {
      return;
    }
    var message = [];
    while(point != undefined) {
      message += point.toString();
      point = this.data.shift();
    }
    var options = {
      host: '10.195.2.208',
      port: '8086',
      path: '/write?db=mydb&precision=ms',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(message)
      }
    };

    // Send points to data server
//    var req = http.request(options);
//    req.write(message);
//    req.end();
  };

  this.run = function() {
    setInterval(this.flush.bind(this), this.periodInMillis);
  }
}

dataLogger = new DataLogger();
dataLogger.run();

module.exports = dataLogger;
