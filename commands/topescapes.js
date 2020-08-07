const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "topescapes",
  description: "says topescapes!",
  execute(message, args) {
    //topescapes
    Money.find({ guildID: message.guild.id })
      .sort([["escapes", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Black Cell Escapes Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/escape.png"])
          embed.setThumbnail("attachment://escape.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Escapes**: ${res[i].escapes}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Escapes**: ${res[i].escapes}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/escape.png"])
          embed.setThumbnail("attachment://escape.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Escapes**: ${res[i].escapes}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Escapes**: ${res[i].escapes}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
