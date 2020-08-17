'use strict';

require('@code-fellows/supergoose');

const NoteCollection =  require('../lib/model/note-collections.js');

let noteCollection  = new NoteCollection();

describe('Notes Module', () => {

it("create() should retern - sunny day",
async () => {
    let note = await noteCollection.create({text:'text', category:'category'})
    expect(note._id).toBeDefined();
});

it('get() should find list of notes', async () => {
    let response = await noteCollection.get();
    expect(response.length > 0).toBe(true);
});

it('delete() delete note from collection', async () => {
     let note = await noteCollection.create({actions: 'add', text:'test', category:'test'});
     console.log(note);
    let deleted = await noteCollection.delete({id:note._id});
    console.log(deleted)
    expect(deleted).not.toBe(null);
});

});