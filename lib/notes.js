'use strict';


const noteModel = require('../mongoose/schema.js');
const Collection = require('./model/note-collections.js')

class Notes {
    constructor() {
        this.collection = new Collection();
    }

    async execute(note) {
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

    async add(actionItem){
        if (actionItem.payload === true) {
            throw new Error('Need to add text')
        }
        const res = await this.collection.create({category: actionItem.category, text:actionItem.payload});
        console.log(`Saved Note ${res.text}`);
        return res;
    }

    async list(){
        let res = await this.collection.get();
        let modeData = res.map(item=> `${item.text} \nCategory: ${item.category} ID: ${item._id}`).join("\n-------------------------\n");
        console.log(modeData);
        return res;
    }

    async delete(id){
        await this.collection.delete(id);
        let deletedData =`Deleted Note ${id}`;
        console.log(deletedData);
        return deletedData;
        }
}

module.exports = Notes;