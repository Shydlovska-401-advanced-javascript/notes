'use strict';

// 3rd party libraries to pars arguments
const minimist = require('minimist');


function Input() {
  // Get the -x style of arguments from the user
  const args = minimist(process.argv.slice(2));

  // Use the args to create our properties with helper methods
  this.action = this.getAction(Object.keys(args)[1]);
  this.payload = this.getPayload(Object.values(args)[1]);
 
}

Input.prototype.getAction = function (action = '') {
  let validAction = /add|a/i;
  return validAction.test(action) ? action : 'ERROR';
};

Input.prototype.getPayload = function (payload = '') {
  return payload ? payload : undefined;
};

module.exports = Input;
