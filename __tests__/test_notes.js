'use strict';

require('@code-fellows/supergoose');

const mongoose = require('mongoose');

const Notes = require('../lib/notes.js');
const model = require('../mongoose/schema.js');

const notes = new Notes(model);

let connection;

describe('Notes Module', () => {


    beforeAll(async () => {
        connection = await mongoose.connect('mongodb://localhost:27017/notesy', 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await connection.dissconect();
    })


    it('execute() invalid commands give and throwing ecseption ', () => {
        expect(() => notes.execute({actions: []})).toThrowError(new Error('Invalid command'));
    });

    it('execute() gives valid command but no contenxt and throwing ecseption ', () => {
        expect(() => notes.execute({actions: [{action: 'add', payload: true}]})).toThrowError(new Error('Need to add text'));
    });
    
    it('notes() can add a note', async () => {
        let res = notes.add({action: "add", payload: "test"});
        await res;

        // return notes.add({action: "add", payload: "test"})
        // .then(results => console.log(results));
        expect(res).toBe('peanut butter');
    });


    it('notes() can list all notes', async () => {
        // let add = notes.add({action: "add", payload: "test"})
        //     .then(results => {
        //         expect(results._id === "").toBe(true);
        //     })
        return notes.list()
        .then(results => {
            expect(results.length !== 0).toBe(true);
        })
    });



    // it('notes() can delete existed note', () => {
    //     return notes.list()
    //     .then(results => results.split("ID: ")[0].split("\n")[0])
    //     .then(id => notes.delete(id))
    //     .then(res => {
    //         expect(res.contains("Deleted Note")).toBe(true)
    //     })
    // });
  

});

