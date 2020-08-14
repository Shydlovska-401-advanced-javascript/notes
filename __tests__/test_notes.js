'use strict';

require('@code-fellows/supergoose');

const Notes = require('../lib/notes.js');

const notes = new Notes();
jest.spyOn(notes, 'add');

describe('Notes Module', () => {

    // it('execute() invalid commands give and throwing ecseption ', async () => {
    //     expect(() => await notes.execute({actions: []})).toThrowError(new Error('Invalid command'));
    // });

    // it('execute() gives valid command but no contenxt and throwing ecseption ', async () => {
    //     return notes.execute({actions: [{action: 'add', payload: true}]}).catch((e) => expect(e.message)).toBe("Need to add text");
    // });
    
    it("add()returned you an object with an ID",
    async () => {
        let response = await notes.add({actions: 'add', payload:'test', category:'test'});
        expect(response.text === "test" && response.category === "test" && response._id != null).toBe(true);
    });

    it('list() return list of notes', async () => {
        let response = await notes.list();
        expect(response.length > 0).toBe(true);
    });

    it('delete() delete note from collection', async () => {
        let note = await notes.add({actions: 'add', payload:'test', category:'test'});
        let deleted = await notes.delete(note._id);
        expect(deleted).toBe(`Deleted Note ${note._id}`);
    });
  

});

