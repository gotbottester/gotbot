const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "topxp",
  description: "says topxp!",
  execute(message, args) {
    //topxp
    Money.find({ guildID: message.guild.id })
      .sort([["swordsmanxp", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Swordsman XP Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/xp.png"])
          embed.setThumbnail("attachment://xp.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left";
            if (member == "User Left") {
              // embed.addField(
              //   `${i + 1}. ${member}`,
              //   `**Wins**: ${res[i].wins}`
              // );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Swordsman XP**: ${res[i].swordsmanxp}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/xp.png"])
          embed.setThumbnail("attachment://xp.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left";
            if (member == "User Left") {
              // embed.addField(
              //   `${i + 1}. ${member}`,
              //   `**Wins**: ${res[i].wins}`
              // );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Swordsman XP**: ${res[i].swordsmanxp}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
