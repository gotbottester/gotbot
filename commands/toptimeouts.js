const Discord = require("discord.js");
const Money = require("../models/profile.js");
const { aggregate } = require("../models/profile.js");
var top = 5;

module.exports = {
  name: "toptimeouts",
  description: "says toptimeouts!",
  execute(message, args) {
    //toptimeouts
    Money.find({ guildID: message.guild.id })
      .sort([["timeouts", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.MessageEmbed().setTitle("Shamed Top " + top);

        if (res.length == 0) {
          embed.setColor("RED");
          embed.addField("No data found");
        } else if (res.length < top) {
          embed.setColor("PURPLE");
          embed.attachFiles(["./assets/dunce.png"])
          embed.setThumbnail("attachment://dunce.png")
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
                `**Timeouts**: ${res[i].timeouts}`
              );
            }
          }
        } else {
          embed.setColor("PURPLE");
          embed.attachFiles(["./assets/dunce.png"])
          embed.setThumbnail("attachment://dunce.png")
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
                `**Timeouts**: ${res[i].timeouts}`
              );
            }
          }
        }

        message.channel.send(embed);

      });
  },
};
