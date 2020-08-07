const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;
var winratio;
var fixedwinratio;

module.exports = {
  name: "topwins",
  description: "says topwins!",
  execute(message, args) {
    //topwins
    Money.find({ guildID: message.guild.id })
      .sort([["wins", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Tourney of the Hand Wins Leaderboard Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/medal.png"])
          embed.setThumbnail("attachment://medal.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left";
            if (member == "User Left") {
              // embed.addField(
              //   `${i + 1}. ${member}`,
              //   `**Wins**: ${res[i].wins}`
              // );
            } else {
              winratio = res[i].wins / (res[i].wins + res[i].loss);
              fixedwinratio = winratio.toFixed(2);
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Wins**: ${res[i].wins} - *Win Ratio*: ${fixedwinratio}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/medal.png"])
          embed.setThumbnail("attachment://medal.png")
          for (i = 0; i < top; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left";
            if (member == "User Left") {
              // embed.addField(
              //   `${i + 1}. ${member}`,
              //   `**Wins**: ${res[i].wins}`
              // );
            } else {
              winratio = res[i].wins / (res[i].wins + res[i].loss);
              fixedwinratio = winratio.toFixed(2);
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Wins**: ${res[i].wins} - *Win Ratio*: ${fixedwinratio}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
