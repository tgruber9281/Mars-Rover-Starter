const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it('throws error if a name is NOT passed into the constructor as the first parameter', ()=> {
        expect(() => {
            new Message();
        }).toThrow(new Error('Name of message required.'));
    })

    it('constructor sets name', () => {
        let result = new Message('name of message');
        expect(result.name).toBe('name of message');
    });

    it('contains a commands array passed into the constructor as the 2nd argument', () => {
        let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let result = new Message('name', testCommands);
        expect(Array.isArray(result.commands)).toBe(true);
        expect(result.commands[0].commandType).toBe('MODE_CHANGE')
    });
});
