'use strict';

const mongoose = require('mongoose');

class Notes {
    constructor(noteModel) {
        this.noteModel = noteModel;
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
        const note = new this.noteModel({category: actionItem.category, text:actionItem.payload});
        let request = () => note.save((err, data) => {
            console.log("tree");
            if(err) {
                throw new Error('Something bad happened'); 
            } else {
                console.log(`Saved Note: ${actionItem.payload}`)
                return data;
        }
    });
        return this.executeRequest(request);
    }

    list(){
        let request = () => this.noteModel.find()
        .then(data => {
         let modeData = data.map(item=> `${item.text} \nCategory: ${item.category} ID: ${item._id}`).join("\n-------------------------\n");
         return modeData;
        });
       return this.executeRequest(request);
    }

    delete(id){
       return this.noteModel.deleteOne({id:id}).then(()=> {
            let deletedData =`Deleted Note ${id}`;
            return deletedData;
        });
    }

    executeRequest(callBack){
        mongoose.connect('mongodb://localhost:27017/notesy', 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        let resp = callBack();
        mongoose.disconnect();
        return resp;
    }
}
  

module.exports = Notes;