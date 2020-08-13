#!/usr/bin/env node
'use strict';
const noteModel = require('./mongoose/schema.js');


const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const options = new Input();
const notes = new Notes(noteModel);

notes.execute(options);