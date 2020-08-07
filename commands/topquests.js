const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "topquests",
  description: "says topquests!",
  execute(message, args) {
    //topquests
    Money.find({ guildID: message.guild.id })
      .sort([["quests", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Quests Accepted Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/map.png"])
          embed.setThumbnail("attachment://map.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Quests**: ${res[i].quests}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Quests**: ${res[i].quests}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/map.png"])
          embed.setThumbnail("attachment://map.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Quests**: ${res[i].death}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Quests**: ${res[i].quests}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
