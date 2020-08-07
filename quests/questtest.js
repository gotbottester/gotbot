const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_test",
  description: "says quest_test!",
  execute(message, args) {
    //quest_test
    console.log("entered quest_test command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["👍"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          var chan = message.guild.channels.cache.get("736330307548217415"); //test
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          member.roles.add("726237877423439882");
          chan.send("TEST:\n React with 1️⃣ \n React with 2️⃣ \n React with 3️⃣");
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send("Nobody was quick enough to get test.");
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("726237877423439882");
        }, 60 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        // console.log("user "+ member.user.username);
        message.reply("Nobody was quick enough to get test.");
        message.delete({ timeout: 15000 });
      });
  },
};
