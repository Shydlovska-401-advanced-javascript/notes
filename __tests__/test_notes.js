'use strict';

require('@code-fellows/supergoose');

const Notes = require('../lib/notes.js');

const notes = new Notes();
jest.spyOn(notes, 'add');

describe('Notes Module', () => {

    it('execute() invalid commands give and throwing ecseption ', () => {
        expect(() => notes.execute({actions: []})).toThrowError(new Error('Invalid command'));
    });

    it('execute() gives valid command but no contenxt and throwing ecseption ', () => {
        expect(() => notes.execute({actions: [{action: 'add', payload: true}]})).toThrowError(new Error('Need to add text'));
    });
    
    it("add()returned you an object with an ID",
    () => {
        let response = notes.add({actions: 'add', payload:'test', category:'test'});
        expect(() => response.text === "test" && response.category === "test" && response._id != null).toBe(true);
    });

    it('notes() can add a note', () => {
        const action = 'add';
        const payload = 'test note';
        return notes.execute({ action, payload })
        .then(results => {
            expect(notes.add).toHaveBeenCalled();
        })
    });
  

});

