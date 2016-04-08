/*jslint node: true */

'use strict';

module.exports = {
	app: {
		title: 'MakeLight-SPA',
		description: 'api for sound plus animation makelight'		
	},
	port: process.env.PORT || 3000,	
	assets: {
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/tests/*.js'
		]
	}
};
