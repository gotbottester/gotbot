const Discord = require("discord.js");
const Money = require("../models/profile.js");
var smallcoins = 20;

module.exports = {
  name: "leave_small",
  description: "says leave_small!",
  execute(message, args) {
    //LEAVE SMALL - KING
    if (message.member.roles.cache.has("712353382660309033")) {
      let member = message.member;
      console.log("entered leave_small command");
      let role = message.guild.roles.cache.find(
        (r) => r.name === "Small Council"
      );
      member.roles.remove(role).catch(console.error);
      message.channel.send(
        member.user.username + " has left the Small Council!"
      );
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only a member of the Small Council can Leave the Small Council!"
      );
    }
  },
};
