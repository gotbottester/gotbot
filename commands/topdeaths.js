const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "topdeaths",
  description: "says topdeaths!",
  execute(message, args) {
    //topdeaths
    Money.find({ guildID: message.guild.id })
      .sort([["deaths", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Deaths Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/skull.png"])
          embed.setThumbnail("attachment://skull.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Deaths**: ${res[i].deaths}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Deaths**: ${res[i].deaths}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/skull.png"])
          embed.setThumbnail("attachment://skull.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Deaths**: ${res[i].deaths}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Deaths**: ${res[i].deaths}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
