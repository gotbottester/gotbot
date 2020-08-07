const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "quest_blackcell3_2",
  description: "says quest_blackcell3_2!",
  execute(message, args) {
    //quest_blackcell3_2
    console.log("entered quest_blackcell3_2 command");
    var member;
    console.log("see varys options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣"].includes(reaction.emoji.name);
    };
    var question = Math.floor(Math.random() * 2);
    console.log("question 3 " + question);
    message
      .awaitReactions(filter, { max: 1 })
      .then((collected) => {
        const reaction = collected.first();
        if (question == 0 && reaction.emoji.name === "1️⃣") {
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send(
            "**Varys:** YOU ESCAPED AND FOUND A SMUGGLER IS TAKING YOU TO ESSOS WHERE YOU WILL BE SAFE FROM THE KING!"
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(member.user.username + " Escaped the Black Cell!")
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/escape.png"])
            .setThumbnail("attachment://escape.png");
          message.channel.send(embed);
          member.roles.remove("725406142670569502"); //remove quest channel
          member.roles.remove("722932439743463524"); //remove black cell
          member.roles.add("714598666857349132"); //add essos exile
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.escapes = money.escapes + 1;
              money.save().catch((err) => console.log(err));
            }
          );
        } else if (question == 1 && reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send(
            "**Varys:** YOU ESCAPED AND FOUND A SMUGGLER IS TAKING YOU TO ESSOS WHERE YOU WILL BE SAFE FROM THE KING!"
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(member.user.username + " Escaped the Black Cell!")
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/escape.png"])
            .setThumbnail("attachment://escape.png");
          message.channel.send(embed);
          member.roles.remove("725406142670569502"); //remove quest channel
          member.roles.remove("722932439743463524"); //remove black cell
          member.roles.add("714598666857349132"); //add essos exile
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.escapes = money.escapes + 1;
              money.save().catch((err) => console.log(err));
            }
          );
        } else {
          console.log("REACTED INCORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send(
            "The Guards found you and preventing your escape. Just hope Varys returns..."
          );
        }
      })
      .catch((collected) => {
        console.log(
          `question 2 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("question 2 you didn't react in time with an answer.");
        // member.roles.remove("725406142670569502");
        message.delete({ timeout: 10000 });
      });
  },
};
