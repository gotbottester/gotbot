const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "coins",
  description: "says coins!",
  execute(message, args) {
    //coins
      Money.findOne(
        {
          userID: message.author.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);

          let embed = new Discord.MessageEmbed()
          .setColor("GOLD")
          .attachFiles(["./assets/coinbag.png"])
          .setThumbnail("attachment://coinbag.png")
          .setAuthor(
            `${message.member.user.username}`
          );
          if (!money) {
            embed.addField("Total Coins", "0", true);
            return message.channel.send(embed);
          } else {
            embed.addField("Total Coins", Math.floor(money.coins), true);
            return message.channel.send(embed);
          }
        }
      );

  },
};
