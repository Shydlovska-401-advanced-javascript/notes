'use strict';

// Bring in some 3rd party libraries to help us out
const isUrl = require('is-url');
const minimist = require('minimist');


function Input() {
  // Get the -x style of arguments from the user
  const args = minimist(process.argv.slice(2));

  // Use the args to create our properties with helper methods
  this.action = this.getMethod(args.m);
  this.payload = this.getURL(args.u);
}

Input.prototype.getMethod = function (action = '') {
  let validMethods = /get|put|patch|post|delete/i;
  return validMethods.test(action) ? action : 'GET';
};

Input.prototype.getURL = function (payload = '') {
  return isUrl(payload) ? payload : undefined;
};

module.exports = Input;
