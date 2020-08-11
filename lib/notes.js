'use strict';

class Note {
    constructor(id, property) {
        this.id = id;
        this.property = property;
    }
}

class Notes {
    constructor() {
        this.currentNotes = [];
    }

    execute(note) {
        // console.log(note)
        if (note.actions.length === 0) {
            throw new Error('Invalid command')
        }
        for (let item in note.actions) {
            if (note.actions[item].action === "add" || note.actions[item].action === "a") {
                return this.add(note.actions[item].payload);
            }
        }
    }

    add(notePayload){
        if (notePayload === true) {
            throw new Error('Need to add text')
        }
        this.currentNotes.push(new Note(123, notePayload));
        console.log(`Adding Note: ${notePayload}`);
        }

    }
  
 


module.exports = Notes;