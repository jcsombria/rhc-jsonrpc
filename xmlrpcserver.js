var xmlrpc = require('xmlrpc')

var elem = {name: 'v1', type: 'double', value: 0.7};
var vars = new Array(elem);

// Creates an XML-RPC server to listen to XML-RPC method calls
var options = {
	host: '127.0.0.1',
	port: 2055,
	headers: {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Request-Method': 'POST, PUT',
		'Content-Type': 'text/xml'
	}
};

var server = xmlrpc.createServer(options);

// Handle methods not found
server.on('NotFound', function(method, params) {
  console.log('Method ' + method + ' does not exist');
	console.log(params);
})

// Handle method connect
server.on('connect', function (err, params, callback) {
  console.log('Method call params for \'connect\': ' + params);

	var message = 'invalid';
	var error = null;
	if(params[0] == 'jchacon') {
		console.log('hola jefe');
		message = 'user ' + params[0] + ' logged in';
	} else {
		console.log('me acuerdo de ti, tío mierda');
		message = 'incorrect user';
		error = 'invalid user';
	}

  callback(null, message);
})

// Handle method setValue
server.on('setValue', function (err, params, callback) {
  console.log('Method call params for \'setValue\': ' + params);

	var varname = params[0], toReturn = 'Not Found';
	for (var i=0; i<vars.length; i++) {
		if(vars[i].name == params[0]) {
			toReturn = vars[i].value;
		};
	}

  // Send a method response with a value
  callback(null, 'Ok');
})

// Handle method getValue
server.on('getValue', function (err, params, callback) {
  console.log('Method call params for \'getValue\': ' + params);

	var varname = params[0], toReturn = 'Not Found';
	for (var i=0; i<vars.length; i++) {
		if(vars[i].name == params[0]) {
			toReturn = vars[i].value;
		};
	}

  // Send a method response with a value
  callback(null, toReturn);
})

// Handle method disconnect
server.on('disconnect', function (err, params, callback) {
  console.log('User ' + params[0] + ' logged out');

  // Send a method response with a value
  callback(null, 'Ok.');
})

console.log('XML-RPC server listening on port '+options.port);





// Waits briefly to give the XML-RPC server time to start up and start
// listening
/*setTimeout(function () {
  // Creates an XML-RPC client. Passes the host information on where to
  // make the XML-RPC calls.
  var client = xmlrpc.createClient({ host: 'localhost', port: 9090, path: '/'});

  // Sends a method call to the XML-RPC server
  client.methodCall('connect', ['jchacon'], function (error, value) {
    // Results of the method response
    console.log('Method response for \'connect\': ' + value);
		console.log('Error:'+error);
  });

  client.methodCall('getValue', ['v1'], function (error, value) {
    // Results of the method response
    console.log('Method response for \'getValue\': ' + value);
  });

  client.methodCall('disconnect', ['jchacon'], function (error, value) {
    // Results of the method response
    console.log('Method response for \'disconnect\': ' + value);
  });
}, 1000);*/