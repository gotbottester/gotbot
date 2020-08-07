const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_braavos2",
  description: "says quest_braavos2!",
  execute(message, args) {
    //quest_braavos2
    console.log("entered quest_braavos2 command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1 })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        var question = Math.floor(Math.random() * 3);
        if (question == 0 && reaction.emoji.name === "1️⃣") {
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          message.delete({ timeout: 10000 });
          member.send(
            "If the day comes when you must find me again, just give that coin to any man from braavos and say these words to him: Valar Morghulis"
          );
          member.roles.add("726588449263583339");
          member.roles.remove("726599861730017311");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " got an Iron Coin of the Faceless Men!"
            )
            .setDescription(
              "The Iron Coin will allow you to get on a Boat to Braavos and train to be a Faceless Man. Keep it safe."
            )
            .setColor("GREY")
            .setTimestamp()
            .attachFiles(["./assets/facelesscoin.png"])
            .setThumbnail("attachment://facelesscoin.png");
          chan.send(embed);
        } else if (question == 1 && reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          member.send(
            "If the day comes when you must find me again, just give that coin to any man from braavos and say these words to him: Valar Morghulis"
          );
          member.roles.add("726588449263583339");
          member.roles.remove("726599861730017311");
          var chan = message.guild.channels.cache.get("707102776215208008");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " got an Iron Coin of the Faceless Men!"
            )
            .setDescription(
              "The Iron Coin will allow you to get on a Boat to Braavos and train to be a Faceless Man. Keep it safe."
            )
            .setColor("GREY")
            .setTimestamp()
            .attachFiles(["./assets/facelesscoin.png"])
            .setThumbnail("attachment://facelesscoin.png");
          chan.send(embed);
        } else if (question == 2 && reaction.emoji.name === "3️⃣") {
          message.reply(member.user.username + " reacted with 3️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          member.send(
            "If the day comes when you must find me again, just give that coin to any man from braavos and say these words to him: Valar Morghulis"
          );
          member.roles.add("726588449263583339");
          member.roles.remove("726599861730017311");
          var chan = message.guild.channels.cache.get("707102776215208008");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " got an Iron Coin of the Faceless Men!"
            )
            .setDescription(
              "The Iron Coin will allow you to get on a Boat to Braavos and train to be a Faceless Man. Keep it safe."
            )
            .setColor("GREY")
            .setTimestamp()
            .attachFiles(["./assets/facelesscoin.png"])
            .setThumbnail("attachment://facelesscoin.png");
          chan.send(embed);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 10000 });
          message.channel.send("A girl is not ready for this quest.");
          member.send("A girl is not ready for this quest.");
          member.roles.remove("726599861730017311");
        }
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("question 1 you didn't react in time with an answer.");
        member.roles.remove("726599861730017311");
        message.delete({ timeout: 10000 });
      });
  },
};
