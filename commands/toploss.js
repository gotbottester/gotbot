const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "toploss",
  description: "says toploss!",
  execute(message, args) {
    //toploss
    Money.find({ guildID: message.guild.id })
      .sort([["loss", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Tourney of the Hand Losses Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/loss.png"])
          embed.setThumbnail("attachment://loss.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              // embed.addField(
              //   `${i + 1}. ${member}`,
              //   `**Loss**: ${res[i].loss}`
              // );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Loss**: ${res[i].loss}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/loss.png"])
          embed.setThumbnail("attachment://loss.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              // embed.addField(
              //   `${i + 1}. ${member}`,
              //   `**Loss**: ${res[i].loss}`
              // );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Loss**: ${res[i].loss}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
