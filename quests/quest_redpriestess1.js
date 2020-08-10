const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_redpriestess1",
  description: "says quest_redpriestess1!",
  execute(message, args) {
    //quest_redpriestess1
    console.log("entered quest_redpriestess1 command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
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
              money.meli = money.meli + 1;
              money.bloodmagicxp = 0;
              money.meliage = 0;
              money.shadowuse = 1;
              money.save().catch((err) => console.log(err));
            }
          );
          member.send(
            "The night is dark and full of terrors. You have become a Red Priestess!"
          );
          member.roles.add("713409866764517517");
          member.roles.remove("736100797972086837");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " has been chosen by the Lord of Light to become a Red Priestess!"
            )
            .setDescription(
              "A Red Priestess only lasts 5 days Maximum. You have the ability to ^shadow @user and ^revive @user and Give 2 Amulets using ^give_amulet. Read up on ^rolehelp for more info"
            )
            .setColor("RED")
            .setTimestamp()
            .attachFiles(["./assets/redpriestess.png"])
            .setThumbnail("attachment://redpriestess.png");
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
              money.meli = money.meli + 1;
              money.shadowuse = 0;
              money.meliage = 0;
              money.save().catch((err) => console.log(err));
            }
          );
          member.send(
            "The night is dark and full of terrors. You have become a Red Priestess!"
          );
          member.roles.add("713409866764517517");
          member.roles.remove("736100797972086837");
          var chan = message.guild.channels.cache.get("707102776215208008");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " has been chosen by the Lord of Light to become a Red Priestess!"
            )
            .setDescription(
              "A Red Priestess only lasts 5 days Maximum. You have the ability to ^shadow @user and ^revive @user . However, you are limited to 3 Shadows. Read up on ^rolehelp for more info"
            )
            .setColor("RED")
            .setTimestamp()
            .attachFiles(["./assets/redpriestess.png"])
            .setThumbnail("attachment://redpriestess.png");
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
              money.meli = money.meli + 1;
              money.shadowuse = 0;
              money.meliage = 0;
              money.save().catch((err) => console.log(err));
            }
          );
          member.send(
            "The night is dark and full of terrors. You have become a Red Priestess!"
          );
          member.roles.add("713409866764517517");
          member.roles.remove("736100797972086837");
          var chan = message.guild.channels.cache.get("707102776215208008");
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username + " has been chosen by the Lord of Light to become a Red Priestess!"
            )
            .setDescription(
              "A Red Priestess only lasts 5 days Maximum. You have the ability to ^shadow @user and ^revive @user . However, you are limited to 3 Shadows. Read up on ^rolehelp for more info"
            )
            .setColor("RED")
            .setTimestamp()
            .attachFiles(["./assets/redpriestess.png"])
            .setThumbnail("attachment://redpriestess.png");
          chan.send(embed);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 10000 });
          message.channel.send("The Lord of Light deems you not ready for the art of Blood Magic.");
          member.roles.remove("736100797972086837");
          let embed = new Discord.MessageEmbed()
            .setTitle(member.user.username + " , the Lord of Light deems you not ready for the art of Blood Magic.")
            .setDescription(
              "Only those who pray true can learn the dark arts."
            )
            .setColor("RED")
            .setTimestamp()
            .attachFiles(["./assets/redpriestessnotready.png"])
            .setThumbnail("attachment://redpriestessnotready.png");
          chan.send(embed);
        }
      })
      .catch((collected) => {
        message.delete({ timeout: 10000 });
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("question 1 you didn't react in time with an answer.");
        member.roles.remove("736100797972086837");
        message.delete({ timeout: 10000 });
      });
  },
};
