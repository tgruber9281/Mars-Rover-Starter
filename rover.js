class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let messageResponse = {
      message: message.name,
      results: [],
    };
    for (const i of message.commands) {
      if (i.commandType === "MODE_CHANGE") {
        this.mode = i.value;
        messageResponse.results.push({ completed: true });
      } else if (i.commandType === "STATUS_CHECK") {
        messageResponse.results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else if (i.commandType === "MOVE") {
        if (this.mode === "NORMAL") {
          this.position = i.value;
          messageResponse.results.push({ completed: true });
        } else {
          messageResponse.results.push({ completed: false });
        }
      }
    }
    return messageResponse;
  }
}
/* Message object

Message {
  name: 'this is a test message',
  commands: [
    Command { commandType: 'MODE_CHANGE', value: 'LOW_POWER' },
    Command { commandType: 'STATUS_CHECK', value: undefined }
  ]
}
*/

module.exports = Rover;
