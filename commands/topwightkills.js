const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "topwightkills",
  description: "says topwightkills!",
  execute(message, args) {
    //topwightkills
    Money.find({ guildID: message.guild.id })
      .sort([["wightkills", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Wight Kills Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/swordice.png"])
          embed.setThumbnail("attachment://swordice.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Wight Kills**: ${res[i].wightkills}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Wight Kills**: ${res[i].wightkills}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/swordice.png"])
          embed.setThumbnail("attachment://swordice.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Wight Kills**: ${res[i].wightkills}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Wight Kills**: ${res[i].wightkills}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
