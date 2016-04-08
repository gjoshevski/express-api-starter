/*jslint node: true */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	express = require('express'),
	config = require('./config'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),	
	path = require('path');
    
     
module.exports = function() {
   
    // Initialize express app
	var app = express();
    
    // Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});
    
   
    
    // Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
    
     // Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
    
    
    
    // Globbing routing files
	config.getGlobbedFiles('./routes/*.js').forEach(function(routePath) {       
		require(path.resolve(routePath))(app);
	});
    
    
    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});
    
    console.log("Export express");
    return app;
};