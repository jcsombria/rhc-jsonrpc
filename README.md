RHI Server
==========

Server implementation of the Remote Hardware Interface (RHI) protocol, in Node.js using JSON-RPC and WebSockets. The protocol allow to interoperate external softare with hardware such as Beaglebone Black or Raspberry PI, and it is mainly focused on remote labs development.

## Introduction

Sofwarelinks is a set of libraries that add Easy Java Simulations interoperability with external engineering software. The aim is to have a platform/software-independent API to control remote simulations or real systems to develop remote/virtual labs. The rhi-server is one of several software components which work together to create the connection between JAVA/EJS and Node.js:
- The Node.js JSON-RPC server (contained in this repo):
- The RHI-Connector EJS Element (https://github.com/UNEDLabs/ejs-element_jim): An EJS plugin implementing the RHI protocol in JAVA.

The interoperability API provides several primitive methods which are commonly needed to communicate with remote labs:

- connect(): Creates a new connection.
- disconnect(): Terminates an existent connection.
- eval(command): Evaluates a Matlab code.
- set(variable, value): Set/define the value of a Matlab variable into the Matlab workspace.
- get(variable): Get the value of a variable from the Matlab workspace.
