/**
 * JSON-RPC Server
 * author: Jesús Chacón <jcsombria@gmail.com>
 *
 * Copyright (C) 2013 Jesús Chacón
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

var board = require('./board');
var myboard = new board.BeagleBone();

// JsonRpcServer Class
function JsonRpcServer() {
}

var JsonRpcServer = {
	errors: [
		{code: -32700, message: 'Parse error'},
		{code: -32600, message: 'Invalid request'},
		{code: -32601, message: 'Method not found'},
		{code: -32602, message: 'Invalid params'},
		{code: -32603, message: 'Internal error'}
	],

	/**
	 * Handle a JSON-RPC call (one method/notification or a batch)
	 */
	parse: function(jsonrpc) {
		var methodCall = JSON.parse(jsonrpc);
		// Check whether request is in batch mode
		var result;
		if(methodCall instanceof Array) {
			result = [];
			for(var i=0, j=0, len=methodCall.length; i<len; i++) {
				result[j] = this.process(methodCall[i]);
				if(result[j]) j++;
			}	
		} else {
			result = this.process(methodCall);
		}
		return result;
	},

	/**
	 * Process a JSON-RPC request
	 */
	process: function(request) {
		var method = this[request.method];
		var result;
		if(method) {
			var len = (request.params instanceof Array) ? request.params.length : 1;
			var nparams = request.params ? len : 0;
			if(nparams != method.nparams && !len)
				return this.responseWithError(request.id, -32602, 'Invalid params');
            result = method.handler(request.params);
            if(request.id !== undefined)
                return this.response(result, request.id);
            else
                return this.response(result);
       	} else {
			return this.responseWithError(request.id, -32601, 'Method not found');
		}
		return result;
	},

	/**
	 * Bind a method name with a function
	 */
	on: function(method, nparams, handler) {		
		this[method] = {nparams: nparams, handler: handler};
	},

	/**
	 * Create error message
	 */
	responseWithError: function(id, code, message, data) {
		return {
			jsonrpc: '2.0',
			error: {
				code: code,
				message: message,
				data: data
			},
			id: id
		};
	},

	/**
	 * Create response
	 */
	response: function(result, id) {
		var response = {jsonrpc: '2.0',	result: result};

		if(id!==undefined) response.id = id;
		return response;
	}
}

module.exports = JsonRpcServer;
