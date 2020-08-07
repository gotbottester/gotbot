const Money = require("../models/profile.js");

module.exports = {
  name: "quest_braavos",
  description: "says quest_braavos!",
  execute(message, args) {
    //quest_braavos
    console.log("entered quest_braavos command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      if (member.roles.cache.has("726588449263583339")) {
        //Iron Coin
        if (
          !member.roles.cache.has("708021014977708033") || //not king
          !member.roles.cache.has("707250754020180079") || //not hand
          !member.roles.cache.has("712353382660309033") || //not small council
          !member.roles.cache.has("715783930581876806") || //not lord commander
          !member.roles.cache.has("707074053881724989") || //not nights watch
          !member.roles.cache.has("713895055252783175") || //not nights king
          !member.roles.cache.has("713901799324778587") || //not white walker
          !member.roles.cache.has("708346509367836702") //not dead
        ) {
          if (member.roles.cache.has("726614934644981881")) {
            message.reply("You are still on the Quest to Braavos.");
          } else if (
            member.roles.cache.has("713901799324778587") ||
            member.roles.cache.has("708346509367836702")
          ) {
            message.reply(
              "White Walkers nor Dead cannot go on Quests for the living!"
            );
          } else {
            return ["👍"].includes(reaction.emoji.name);
          }
        } else {
          message.reply(
            "King, Hand, Small Council, and Lord Commander plus Nights Watch are far too busy to take time to go to Braavos. If you are dead, well, you are dead."
          );
        }
      } else {
        message.reply("You need an Iron Coin to get on the Boat to Braavos.");
      }
    };
    message
      .awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          member.roles.add("726614934644981881"); //quest_braavos
          member.send(
            "Find the Boat Captain on the Channel here ->>> <#726617762096742471> and await his arrival."
          );
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send(
            "Nobody was quick enough to get to the ship before it left Port."
          );
        }
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply(
          "Nobody was quick enough to get to the ship before it left Port."
        );
        message.delete({ timeout: 15000 });
      });
  },
};
