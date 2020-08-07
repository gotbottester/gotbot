const Discord = require("discord.js");
const Money = require("../models/profile.js");
var countitems = 0;

module.exports = {
  name: "inventory",
  description: "says inventory!",
  execute(message, args) {
    //inventory
    Money.findOne(
      {
        userID: message.member.id,
        guildID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        if (money.items === null) {
          countitems = 0;
          console.log("has no items");
          let embed0 = new Discord.MessageEmbed()
            .setTitle(message.member.user.username + "'s Inventory")
            .setColor("AQUA")
            .attachFiles(["./assets/inventory.png"])
            .setThumbnail("attachment://inventory.png");
          embed.setDescription(`Total Items: ${countitems}`);
          return message.channel.send(embed0);
        } else {
          countitems = 0;
          console.log("has items");
          let embed = new Discord.MessageEmbed()
            .setTitle(message.member.user.username + "'s Inventory")
            .setColor("AQUA")
            .attachFiles(["./assets/inventory.png"])
            .setThumbnail("attachment://inventory.png");
          money.items.forEach((entry) => {
            embed.addField("Item", entry);
            countitems++;
          });
          embed.setDescription(`Total Items: ${countitems}`);
          return message.channel.send(embed);
        }
      }
    );
  },
};
