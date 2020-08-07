const Money = require("../models/profile.js");
const Discord = require("discord.js");
var sellprice = 20;

module.exports = {
  name: "sell_longsword",
  description: "says sell_longsword!",
  execute(message, args) {
    //sell longsword - anyone that has longsword
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "739192096669302795") { //blacksmith
      if (
        message.member.roles.cache.has("737497464852054026") //longsword
      ) {
        let member = message.member;

        console.log("entered sell longsword command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "737497464852054026"
        );
        message.member.roles.remove(role).catch(console.error); //remove shield from self
        message.channel.send(
          message.member.user.username +
            " has sold his Longsword to the Blacksmith"
        );
        Money.findOne(
          {
            userID: message.member.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            money.coins = money.coins + sellprice;
            money.items.forEach((entry) => {
              if(entry == "Longsword") { 
                money.items.pull(entry);
              }
            });
            money.save().catch((err) => console.log(err));
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${member.user.username} Sold his Longsword to the Blacksmith for ${sellprice} coins.`
              )
              .setColor("YELLOW")
              .attachFiles(["./assets/merchant.png"])
              .setThumbnail("attachment://merchant.png");
              chan.send(embed);
          }
        );
      } else {
        console.log("You must have a Shield to sell!");
        message.channel.send("You must have a Shield to sell!");
      }
    } else {
      message.reply(
        "You must be in the Blacksmith Channel to sell items."
      );
    }
  },
};
