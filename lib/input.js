'use strict';

// 3rd party libraries to pars arguments
const minimist = require('minimist');

class Action{
  constructor(action, payload, category = 'general'){
    this.action = action;
    this.payload = payload;
    this.category = category;
  }
}

class Input {
  constructor(){
 // Get the -x style of arguments from the user
 const args = minimist(process.argv.slice(2));

 // Use the args to create our properties with helper methods
 this.actions = this.parsActions(args);
  }
 
  parsActions(args) {
    let map ={
      a: 'add',
      add: 'add',
      d: 'delete',
      delete: 'delete',
      l: 'list',
      list: 'list',
      c: 'category',
      category: 'category'
    };
    let category = args.category || args.c;
   
    return Object.entries(args).filter(keyval => map[keyval[0]]).map(entry => new Action(entry[0], entry[1], category))
  }


}

module.exports = Input;
