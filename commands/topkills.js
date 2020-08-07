const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;
var winratio;
var fixedwinratio;

module.exports = {
  name: "topkills",
  description: "says topkills!",
  execute(message, args) {
    //topkills
    Money.find({ guildID: message.guild.id })
      .sort([["kills", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Kills Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/swordfire.png"])
          embed.setThumbnail("attachment://swordfire.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Kills**: ${res[i].kills}`
              );
            } else {
              winratio = res[i].wins / (res[i].wins + res[i].loss);
              fixedwinratio = winratio.toFixed(2);
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Kills**: ${res[i].kills} - *Kills Ratio*: ${fixedwinratio}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/swordfire.png"])
          embed.setThumbnail("attachment://swordfire.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Kills**: ${res[i].kills}`
              );
            } else {
              winratio = res[i].wins / (res[i].wins + res[i].loss);
              fixedwinratio = winratio.toFixed(2);
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Kills**: ${res[i].kills} - *Win Ratio*: ${fixedwinratio}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
