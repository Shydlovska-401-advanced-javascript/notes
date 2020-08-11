'use strict';

// 3rd party libraries to pars arguments
const minimist = require('minimist');

class Action{
  constructor(action, payload){
    this.action = action;
    this.payload = payload;
  }
}

class Input {
  constructor(){
 // Get the -x style of arguments from the user
 const args = minimist(process.argv.slice(2));

 // Use the args to create our properties with helper methods
 this.actions = this.parsActions(args);
//  this.payload = this.getPayload(Object.values(args)[1]);
  }
 
  parsActions(args) {
    let map ={
      a: 'add',
      add: 'add',
    };
    return Object.entries(args).filter(keyval => map[keyval[0]]).map(entry => new Action(entry[0], entry[1]))
  };
  


 
}




module.exports = Input;
