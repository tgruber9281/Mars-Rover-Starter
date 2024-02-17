class Message {
   constructor(name, commands = []) {
      this.name = name;
      if (!name) {
         throw Error("Name of message required.");
       }
      this.commands = commands;
   }
}

module.exports = Message;