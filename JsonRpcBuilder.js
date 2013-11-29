/**
 * JSON-RPC Builder
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

var JsonRpcBuilder = {
	/** ID for rpc calls */
//	id: 0,
	/** List of method calls to process in batch mode*/
//	batch: [],
	/** List of method calls sent to the server */
//	sent: [],
	/** List of method responses from the server */
//	response: [],	

	/** JSON-RPC Templates */
	template: {
		METHOD: '${METHOD}',
		PARAMS: '${PARAMS}',
		ID: '${ID}',
		REQUEST: '{jsonrpc: "2.0", method: ${METHOD}, params: ${PARAMS}, id: ${ID}}',
		RESPONSE_OK: '{jsonrpc: "2.0", result: ${RESULT}, params: ${PARAMS}, id: ${ID}}',
		RESPONSE_ERROR: '{jsonrpc: "2.0", method: ${METHOD}, params: ${PARAMS}, id: ${ID}}',
		ERROR: '{code: "2.0", message: ${MESSAGE}, data: ${DATA}}'
	},

	/**
	 * Build a JSON-RPC request object
	 *
	 * @param {string} method - The method to call
	 * @param {array|object} params - The params either by position (array) or 
     *                                by name (object).
	 * @param {string|integer} id - The id of the call
	 */
	request: function(method, params, id) {
		if(params && !(params instanceof Array)) throw new InvalidParamsException();
//		var pars = (params && !(params instanceof Array)) ? [params] : params;
		var request = {jsonrpc: '2.0', method: method};
		if(params!==undefined) request.params = params;
		if(id!==undefined) request.id = id;

		return request;
	},

	/**
	 * Build a JSON-RPC response object
	 *
	 * @param {object} result - The result to return
	 * @param {string|integer} id - The id of the call
	 */
	response: function(result, id) {
		return {
			jsonrpc: '2.0',
			result: result,
			id: id
		}
	},

	/**
	 * Build a JSON-RPC error response object
	 *
	 * @param {object} error - The error object
	 * @param {string|integer} id - The id of the call
	 */
	responseWithError: function(error, id) {
		return {
			jsonrpc: '2.0',
			error: error,
			id: id
		};
	},

	/**
	 * Build a JSON-RPC error object
	 *
	 * @param {integer} code - The result to return
	 * @param {string} message - The error description message 
	 * @param {object} data - Additional data
   */
	error: function(code, message, data) {
		return {
			code: code, 
			message: message, 
			data: data
		};
	},

	/**
	 * Send method calls in batch list
	 *
	 * @param {string} resString - The response in JSON-RPC format
   */
	parseResponse: function(resString) {
		var response = null;
		try {
			response = JSON.parse(resString);
/*			if(this.sent[response.id]) {
				var method = this.sent[response.id].method;
				this.response[method] = response;
			}*/
		} catch(error) {
			console.log(error);
		}
		return (response != null) ? response.result : null;
	}
}

module.exports = JsonRpcBuilder;