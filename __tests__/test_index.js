'use strict';

jest.mock('minimist');
const minimist = require('minimist');

minimist.mockImplementation(() => {
    return {
        a: 'This is a note',
    };
});

const Input = require('../lib/input.js');

describe('Input Module', () => {

    it('parsActions() creates a good object', () => {
        let options = new Input();
        let command = options.parsActions({ a: 'test' });
        expect(command[0].action).toBe('a');
        expect(command[0].payload).toBe('test');
    });

    it('gives more than 1 arg', () => {
        let options = new Input();
        let command = options.parsActions({ a: 'test' , add: "test2"});
        expect(command[0].action).toBe('a');
        expect(command[0].payload).toBe('test');
        expect(command[1].action).toBe('add');
        expect(command[1].payload).toBe('test2');
    });

    it('gives ivalid arg', () => {
        let options = new Input();
        let command = options.parsActions({ b: ' '});
        expect(command.length === 0).toBe(true)
    });
});

const Notes = require('../lib/notes.js');

describe('Notes Module', () => {

    it('execute() invalid commands give and throwing ecseption ', () => {
        const notes = new Notes();
        expect(() => notes.execute({actions: []})).toThrowError(new Error('Invalid command'));
    });

    it('execute() gives valid command but no contenxt and throwing ecseption ', () => {
        const notes = new Notes();
        expect(() => notes.execute({actions: [{action: 'add', payload: true}]})).toThrowError(new Error('Need to add text'));
    });

    it('execute() valis command and context ', () => {
        const notes = new Notes();
        expect(notes.execute({actions: [{action: 'add', payload: 'text'}]})).toBe(`Adding Note: text`);
    });
});

