'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notesy', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const noteModel = require('../mongoose/schema.js');


class Notes {
    constructor() {
    }

    execute(note) {

        console.log('here is',note )
        if (note.actions.length === 0) {
            throw new Error('Invalid command')
        }
        for (let item in note.actions) {
            if (note.actions[item].action === "add"  ) {
                return this.add(note.actions[item]);
            }else if(note.actions[item].action === "delete"){
                return this.delete(note.actions[item].payload)
            }else if(note.actions[item].action === "list" ){
                return this.list()
            }
        }
    }

    add(actionItem){
        // console.log('action item inside add()', actionItem)
        if (actionItem.payload === true) {
            throw new Error('Need to add text')
        }
        const note = new noteModel({category: actionItem.category, text:actionItem.payload});
        // console.log('created new noteModel', note)
        return note.save()
        .then(() => console.log(`Saved Note: ${actionItem.payload}`))
        .then(() => mongoose.disconnect());
    }

    async list(){
        console.log('inside list()')
       return noteModel.find()
       .then(data => console.log(data))
       .then(() => mongoose.disconnect());

    }

    delete(id){
        console.log('inside delete()')
        noteModel.deleteOne({id:id}).then(()=> mongoose.disconnect()).then(() => console.log(`Deleted ID`));
    }
}
  

module.exports = Notes;