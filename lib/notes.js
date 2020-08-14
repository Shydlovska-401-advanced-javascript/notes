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
        if (actionItem.payload === true) {
            throw new Error('Need to add text')
        }
        const note = new noteModel({category: actionItem.category, text:actionItem.payload});
        return note.save((err, data) => {
            if(err) {
                throw new Error('Something bad happened'); 
            } else {
            mongoose.disconnect();
            console.log(`Saved Note: ${actionItem.payload}`)
            return data;
        }
    });
    }

    list(){
       return noteModel.find()
       .then(data => {
        let modeData = data.map(item=> `${item.text} \nCategory: ${item.category} ID: ${item._id}`).join("\n-------------------------\n");
        console.log(modeData);
        mongoose.disconnect()
        return modeData;
       });

    }

    delete(id){
       return noteModel.deleteOne({id:id}).then(()=> {
            let deletedData =`Deleted Note ${id}`;
            console.log(deletedData);
            mongoose.disconnect()
            return deletedData;
        });
    }
}

module.exports = Notes;