const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_braavos1",
  description: "says quest_braavos1!",
  execute(message, args) {
    //quest_braavos1
    console.log("entered quest_braavos1 command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 100 })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        // const reaction = collected.first();
        // var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // // var question = Math.floor(Math.random() * 4);
        // if (reaction.emoji.name === "1️⃣") {
        //   message.reply(member.user.username + " reacted with 1️⃣");
        //   let chance = Math.floor(Math.random() * 10);
        //   console.log("REACTED CORRECTLY");
        //   if (chance < 5) {
        //     member.send(
        //       "Be Alert in the Braavos Channel here ->>> <#726622989386252339>, you will find Jaqen again in due time to begin your training..."
        //     );
        //     member.roles.add("726618751797166145"); //braavos traveler role
        //     member.roles.remove("726614934644981881"); //quest_braavos
        //     member.roles.remove("726588449263583339"); //iron coin
        //     let embed = new Discord.MessageEmbed()
        //       .setTitle(member.user.username + " has made it to Braavos!")
        //       .setDescription(
        //         "You can train to become a Faceless Man in Braavos which gets you the ability to assasinate using 3 masks Goodluck!"
        //       )
        //       .setColor("WHITE")
        //       .setTimestamp()
        //       .attachFiles(["./assets/braavos.png"])
        //       .setThumbnail("attachment://braavos.png");
        //     chan.send(embed);
        //     Money.findOne(
        //       {
        //         userID: member.id,
        //         guildID: message.guild.id,
        //       },
        //       (err, money) => {
        //         if (err) console.log(err);
        //         money.quests = money.quests + 1;
        //         money.save().catch((err) => console.log(err));
        //       }
        //     );
        //   } else {
        //     member.send("Boat Captain: Sorry, I do not have room for you today. Come back again and we shall see.");
        //     member.roles.remove("726614934644981881"); //quest_braavos
        //   }
        //   message.delete({ timeout: 10000 });
        // } else {
        //   console.log("REACTED INCORRECTLY");
        //   message.delete({ timeout: 10000 });
        //   message.channel.send("A girl is not ready for this quest.");
        //   member.send("A girl is not ready for this quest.");
        //   member.roles.remove("726614934644981881");
        // }
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("You took too long and the Boat Captain sailed away.");
        member.roles.remove("726614934644981881");
        message.delete({ timeout: 10000 });
      });
  },
};
