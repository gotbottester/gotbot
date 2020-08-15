const Money = require("../models/profile.js");

module.exports = {
  name: "quest_ironcoin",
  description: "says quest_ironcoin!",
  execute(message, args) {
    //quest_ironcoin
    console.log("entered quest_ironcoin command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      if (!member.roles.cache.has("726588449263583339")) {
        if (
          !member.roles.cache.has("713901799324778587") &&
          !member.roles.cache.has("708346509367836702") &&
          !member.roles.cache.has("718167982106345592") &&
          !member.roles.cache.has("714598666857349132") //essos
        ) {
          return ["👍"].includes(reaction.emoji.name);
        } else {
          message.reply(
            "Cannot be Dead or in Essos to  get an Iron Coin!"
          );
        }
      } else {
        message.reply("You already have an Iron Coin.");
      }
    };
    message
      .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          var chan = message.guild.channels.cache.get("735888376212750396"); //ironcoin
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          member.roles.add("726599861730017311");
          member.send(
            "To find Jaqen go to the Channel here ->>> <#735888376212750396> and await his arrival."
          );
          chan.send(
            "**Jaqen H'ghar**: Why do you seek a Man? A Man has duties be quick:\n React with 1️⃣ I want to kill people\n React with 2️⃣ I want to become a Faceless Man like you\n React with 3️⃣ I want to serve the Many Faced God of Death"
          );
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send("Nobody was quick enough to get the Iron Coin.");
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("726599861730017311");
        }, 60 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("Nobody was quick enough to get the Iron Coin.");
        // member.roles.remove("725406142670569502");
        message.delete({ timeout: 15000 });
      });
  },
};
