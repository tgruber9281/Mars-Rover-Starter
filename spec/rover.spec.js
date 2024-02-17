const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {

  it('constructor sets position and default values for mode and generatorWatts', () => {
    let result = new Rover(12345);
    expect(result.position).toBe(12345);
    expect(result.mode).toBe('NORMAL');
    expect(result.generatorWatts).toBe(110);
  });

  it('response returned by receiveMessage contains the name of the message', () => {
    let marsRover = new Rover(12345);
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with two commands', testCommands)
    let response = marsRover.receiveMessage(testMessage)
    expect(response.message).toBe('Test message with two commands');
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', () => {
    let marsRover = new Rover(12345);
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with two commands', testCommands)
    let response = marsRover.receiveMessage(testMessage);
    expect(response.results.length).toBe(2);
  });

  it('responds correctly to the status check command', () => {
    let marsRover = new Rover(12345);
    let statusMessage = new Message('Status Check', [new Command('STATUS_CHECK')]);
    let response =  marsRover.receiveMessage(statusMessage);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(12345);
  });

  it('responds correctly to the mode change command', () => {
    let marsRover = new Rover(12345);
    let modeMessage = new Message('Mode Change', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]);
    let response = marsRover.receiveMessage(modeMessage);
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[1].roverStatus.mode).toBe('LOW_POWER');
    expect(marsRover.mode).toBe('LOW_POWER');
  });

  it('responds with a false completed value when attempting to move in LOW_POWER mode', () => {
    let marsRover = new Rover(12345);
    let testMessage = new Message('move in low power mode', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 23456)]);
    let response = marsRover.receiveMessage(testMessage);
    expect(response.results[1].completed).toBeFalsy();
    expect(marsRover.position).toBe(12345);
  });

  it('responds with the position for the move command', () => {
    let marsRover = new Rover(12345);
    let testMessage = new Message('move', [new Command('MOVE', 23456)]);
    let response = marsRover.receiveMessage(testMessage);
    expect(response.results[0].completed).toBeTruthy();
    expect(marsRover.position).toBe(23456);    
  });

});
