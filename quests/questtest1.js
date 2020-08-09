//collected.first().author

const Money = require("../models/profile.js");
const Discord = require("discord.js");
const { collection } = require("../models/profile.js");
const helper_functions = require("../helper_functions/rolesremover");


module.exports = {
  name: "quest_test1",
  description: "says quest_test1!",
  execute(message, args) {
    //quest_test1
    console.log("entered quest_test1 command");

    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      
      .then(async (collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "1️⃣") {
          await helper_functions.RolesRemover(member);
          await helper_functions.givekill(member);
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("HELPER FINISHED");
          // message.delete({ timeout: 10000 });
          member.roles.remove("726237877423439882");
        } else if (reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          member.roles.remove("726237877423439882");
        } else if (reaction.emoji.name === "3️⃣") {
          message.reply(member.user.username + " reacted with 3️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          member.roles.remove("726237877423439882");
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 10000 });
          member.roles.remove("726237877423439882");
        }
      })
      .catch((collected) => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        message.reply("you didn't react in time with an answer.");
        // member.roles.remove("726237877423439882");
        // collected.first().author.roles.remove("726237877423439882");
        message.delete({ timeout: 10000 });
      });
  },
};

// setTimeout(function () {
//   console.log("--------timeout entered----------");
//   member.send("You were too slow to react and removed from Quest");
//   member.roles.remove("726237877423439882");
// }, 10 * 1000);
