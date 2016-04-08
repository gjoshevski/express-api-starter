'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    app = require('../server'),
    agent = request.agent(app);
	

/**
 * Globals
 */
var time;

/**
 * Unit tests
 */
describe('Core API Unit Tests:', function() {
  
    
    it('should get response on / request', function(done) {
        
        agent.get('/')
            .end(function(err, getRes) {
                
                if (err) done(err);
                
                var resBody = getRes.body;
                (resBody !=='').should.be.ok;
                done();                
            });
    });
	
      it('should get response on / with Ok core', function(done) {
        
        agent.get('/')
            .end(function(err, getRes) {
                
                if (err) done(err);
                
                var resBody = getRes.text;                
                (resBody =='Ok core').should.be.ok;
                done();                
            });
    });	

    
});