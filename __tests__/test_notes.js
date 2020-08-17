'use strict';

require('@code-fellows/supergoose');

const Notes = require('../lib/notes.js');

const notes = new Notes();
jest.spyOn(notes, 'add');
jest.spyOn(notes, 'list');
jest.spyOn(notes, 'delete');

describe('Notes Module', () => {

    it('execute() invalid commands give and throwing ecseption ', async () => {
     let res = await notes.execute({actions: []});
        expect(res).toBe('Invalid command');
    });

    it('execute() gives valid command but no contenxt and throwing ecseption ', async () => {
        let res= await notes.execute({actions: [{action: 'add', payload: true}]})
        expect(res).toBe("Need to add text");
    });
    
    it("execute(), should invoce add()",
    async () => {
        let response = await notes.execute({actions: [{action: 'add', payload: "test", categiry: "general"}]});
        expect(response.text === "test" && response.category === "general" && response._id != null).toBe(true);
        expect(notes.add).toHaveBeenCalled();
    });

    it("add()returned you an object with an ID",
    async () => {
        let response = await notes.add({actions: 'add', payload:'test', category:'test'});
        expect(response.text === "test" && response.category === "test" && response._id != null).toBe(true);
    });

    it('list() return list of notes', async () => {
        let response = await notes.list();
        expect(response.length > 0).toBe(true);
    });

    it('execute(), should invoce list()', async () => {
        let response = await notes.execute({actions: [{action: 'list'}]});
        expect(response.length > 0).toBe(true);
        expect(notes.list).toHaveBeenCalled();
    });

    it('delete() delete note from collection', async () => {
        let note = await notes.add({actions: 'add', payload:'test', category:'test'});
        let deleted = await notes.delete(note._id);
        expect(deleted).toBe(`Deleted Note ${note._id}`);
    });

    it('execute(), should invoce delete()', async () => {
        let note = await notes.add({actions: 'add', payload:'test', category:'test'});
        let response = await notes.execute({actions: [{action: 'delete', payload: note._id}]});
        expect(response).toBe(`Deleted Note ${note._id}`);
        expect(notes.delete).toHaveBeenCalled();
    });
  

});

