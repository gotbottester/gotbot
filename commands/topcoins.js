const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");

module.exports = {
  name: "topcoins",
  description: "says topcoins!",
  execute(message, args) {
    //topcoins
    Money.find({ guildID: message.guild.id })
      .sort([["coins", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Coins Leaderboard Top 10");

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < 10) {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/coins.png"])
          embed.setThumbnail("attachment://coins.png")
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Coins**: ${Math.floor(res[i].coins)}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Coins**: ${Math.floor(res[i].coins)}`
              );
            }
          }
        } else {
          embed.setColor("GOLD");
          embed.attachFiles(["./assets/coins.png"])
          embed.setThumbnail("attachment://coins.png")
          for (i = 0; i < 10; i++) {
            let member =
              message.guild.members.cache.get(res[i].userID) || "User Left (Rage Quitter)";
            if (member == "User Left (Rage Quitter)") {
              embed.addField(
                `${i + 1}. ${member}`,
                `**Coins**: ${Math.floor(res[i].coins)}`
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Coins**: ${Math.floor(res[i].coins)}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
