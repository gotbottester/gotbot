const Money = require("../models/profile.js");
const Discord = require("discord.js");
var sellprice = 10;

module.exports = {
  name: "sell_armor",
  description: "says sell_armor!",
  execute(message, args) {
    //sell armor - anyone that has armor
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "739192096669302795") {
      if (
        message.member.roles.cache.has("726663217950097458") //armor
      ) {
        let member = message.member;

        console.log("entered sell armor command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "726663217950097458"
        );
        message.member.roles.remove(role).catch(console.error); //remove armor from self
        message.channel.send(
          message.member.user.username +
            " has sold his Chainmail armor to the Blacksmith"
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
              if(entry == "Chainmail Armor") { 
                money.items.pull(entry);
              }
            });
            money.save().catch((err) => console.log(err));
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${member.user.username} Sold Chainmail armor to the Blacksmith for ${sellprice} coins.`
              )
              .setColor("YELLOW")
              .attachFiles(["./assets/merchant.png"])
              .setThumbnail("attachment://merchant.png");
              chan.send(embed);
          }
        );
      } else {
        console.log("You must have a Chainmail armor to sell!");
        message.channel.send("You must have a Chainmail armor to sell!");
      }
    } else {
      message.reply(
        "You must be in the Blacksmith Channel to sell items."
      );
    }
  },
};
