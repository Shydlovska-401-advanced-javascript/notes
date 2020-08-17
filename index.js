#!/usr/bin/env node
'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notesy', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const options = new Input();
const notes = new Notes();
// () => 
notes.execute(options).then(()=> mongoose.disconnect());