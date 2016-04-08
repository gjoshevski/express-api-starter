/*jslint node: true */

'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../controllers/core.server.constroller');
    
    
	app.route('/').get(core.index);
};
