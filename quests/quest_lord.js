const Money = require("../models/profile.js");

module.exports = {
  name: "quest_lord",
  description: "says quest_lord!",
  execute(message, args) {
    //quest_lord
    console.log("entered quest_lord command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      if (member.roles.cache.has("728750595904897106")) { //first ranger
        return ["👍"].includes(reaction.emoji.name);
      } else {
        message.reply(
          "You must be a First Ranger to become Lord Commander of the Nights Watch. Go on Quests Beyond the Wall and past the Frost Fangs to become a First Ranger."
        );
      }
    };
    message
      .awaitReactions(filter, { max: 1, time: 360000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          var chan = message.guild.channels.cache.get("738587462460375040"); //lord quest
          member.roles.add("738587504634101841"); //quest lord role
          member.send(
            "The Nights Watch are holding Elections in the Channel HERE ->>> <#738587462460375040>."
          );
          chan.send(
            "Why should you be appointed the Lord Commander of the Nights Watch?\n React with 1️⃣ Because I am an experienced Ranger\n React with 2️⃣ Because I was born to be one\n React with 3️⃣ Because I want to protect the realm"
          );
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send(
            "Everyone missed the Election to become Lord Commander."
          );
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("738587504634101841");
        }, 120 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("Everyone missed the Election to become Lord Commander.");
        message.delete({ timeout: 15000 });
      });
  },
};
