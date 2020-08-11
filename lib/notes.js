'use strict';

// function Note(id, property){
//   this.id = id;
//   this.property = property;
// }

// function Notes(){
//     this.currentNotes =[];
// }

// Notes.prototype.execute = function(note){
//     if(note.action === "add" || note.action === "a"){
//         return this.add(note.payload);
//     }else if(note.action === 'ERROR'){
//         throw new Error('Invalid command')
//     }
// }

// Notes.prototype.add = function(notePayload){
//     this.currentNotes.push(new Note(123, notePayload));
//     console.log(`Adding Note: ${notePayload}`);
// }

class Note{
    constructor(id, property){
    this.id = id;
    this.property = property;
  }
}

  class Notes{
      constructor(){
        this.currentNotes =[];
      }

      execute(note){
        if(note.action === "add" || note.action === "a"){
            return this.add(note.payload);
        }else if(note.action === 'ERROR'){
            throw new Error('Invalid command')
        }
    }
    
    add (notePayload){
        this.currentNotes.push(new Note(123, notePayload));
        console.log(`Adding Note: ${notePayload}`);
    }
      
  }
  
 


module.exports = Notes;