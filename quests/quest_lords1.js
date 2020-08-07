const Money = require("../models/profile.js");
const Discord = require("discord.js");


module.exports = {
  name: "quest_lord1",
  description: "says quest_lord1!",
  execute(message, args) {
    //quest_lord1
    console.log("enteBLACK quest_lord1 command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var reward;
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        var question = Math.floor(Math.random() * 3);
        console.log("testing question "+question);
        if (question == 0 && reaction.emoji.name === "1️⃣") {
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 10000 });
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.coins += reward;
              money.save().catch((err) => console.log(err));
            }
          );
          member.send(
            "You have been elected as the New Lord Commander of the Nights Watch!"
          );
          member.roles.add("715783930581876806");
          member.roles.remove("738587504634101841");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " has been elected as the New Lord Commander of the Nights Watch!"
            )
            .setDescription(
              "To be elected a Lord Commander, you must be a First Ranger and await the Vote in the Nights Watch channel. It only appears when there is no Lord Commander. Lord Commanders lose their job after the Night King Takes over. Read up on ^rolehelp for more info"
            )
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/lordcommander.png"])
            .setThumbnail("attachment://lordcommander.png");
          chan.send(embed);
        } else if (question == 1 && reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.coins += reward;
              money.save().catch((err) => console.log(err));
            }
          );
          member.send(
            "You have been elected as the New Lord Commander of the Nights Watch!"
          );
          member.roles.add("715783930581876806");
          member.roles.remove("738587504634101841");
          var chan = message.guild.channels.cache.get("707102776215208008");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " has been elected as the New Lord Commander of the Nights Watch!"
            )
            .setDescription(
              "To be elected a Lord Commander, you must be a First Ranger and await the Vote in the Nights Watch channel. It only appears when there is no Lord Commander. Lord Commanders lose their job after the Night King Takes over. Read up on ^rolehelp for more info"
            )
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/lordcommander.png"])
            .setThumbnail("attachment://lordcommander.png");
          chan.send(embed);
        } else if (question == 2 && reaction.emoji.name === "3️⃣") {
          message.reply(member.user.username + " reacted with 3️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.coins += reward;
              money.save().catch((err) => console.log(err));
            }
          );
          member.send(
            "You have been elected as the New Lord Commander of the Nights Watch!"
          );
          member.roles.add("715783930581876806");
          member.roles.remove("738587504634101841");
          var chan = message.guild.channels.cache.get("707102776215208008");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " has been elected as the New Lord Commander of the Nights Watch!"
            )
            .setDescription(
              "To be elected a Lord Commander, you must be a First Ranger and await the Vote in the Nights Watch channel. It only appears when there is no Lord Commander. Lord Commanders lose their job after the Night King Takes over. Read up on ^rolehelp for more info"
            )
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/lordcommander.png"])
            .setThumbnail("attachment://lordcommander.png");
          chan.send(embed);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 10000 });
          message.channel.send("The Nights Watch has not elected you. Never give up.");
          member.roles.remove("738587504634101841");
          let embed = new Discord.MessageEmbed()
            .setTitle(member.user.username + " , was not deemed ready to become a Lord Commander. Make sure you memorize the Oath by heart.")
            .setDescription(
              "Elections are handled randomly. Goodluck First Ranger."
            )
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/lordnotready.png"])
            .setThumbnail("attachment://lordnotready.png");
          chan.send(embed);
        }
      })
      .catch((collected) => {
        message.delete({ timeout: 10000 });
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("question 1 you didn't react in time with an answer.");
        member.roles.remove("738587504634101841");
        message.delete({ timeout: 10000 });
      });
  },
};
