CouchNode-CRUD-Sample
=====================

This is a simple application that demonstrates how to use Couchbase in a Node.js application

Installation
------------

Be sure you have installed the Node.js Couchbase Client Library (aka Couchnode), I have documented this here:
http://tugdualgrall.blogspot.fr/2012/09/create-simple-nodejs-and-couchbase.html

Once this is done, go to your project folder and enter:
	
	> npm install
	
This will install all the modules used by the application:
- Socket.io : Websocket support
- Express : Web framework
- Couchnode : to connect to your Couchbase server
- BaseView : to call Couchbase view from your application


Then start the application
	
	> node app.js
	

