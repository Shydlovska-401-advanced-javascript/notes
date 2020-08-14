#!/usr/bin/env node
'use strict';





const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const options = new Input();
const notes = new Notes();




notes.execute(options);