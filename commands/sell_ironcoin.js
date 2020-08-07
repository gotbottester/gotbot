const Money = require("../models/profile.js");
const Discord = require("discord.js");
var sellprice = 100;

module.exports = {
  name: "sell_ironcoin",
  description: "says sell_ironcoin!",
  execute(message, args) {
    //sell ironcoin - anyone that has ironcoin
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "729521244642476154") {
      if (
        message.member.roles.cache.has("726588449263583339") //ironcoin
      ) {
        let member = message.member;

        console.log("entered sell ironcoin command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "726588449263583339"
        );
        //   console.log("role " + role);
        //   console.log("member " + member);
        // console.log("you gave " + member + " role " + role);
        message.member.roles.remove(role).catch(console.error); //remove ironcoin from self
        message.channel.send(
          message.member.user.username +
            " has sold his Valyrian ironcoin to the Wandering Merchant"
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
              if(entry == "Iron Coin") { 
                money.items.pull(entry);
              }
            });
            money.save().catch((err) => console.log(err));
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${member.user.username} Sold an Iron Coin to the Wandering Merchant for ${sellprice} coins.`
              )
              .setColor("YELLOW")
              .attachFiles(["./assets/merchant.png"])
              .setThumbnail("attachment://merchant.png");
              chan.send(embed);
          }
        );
      } else {
        console.log("You must have an Iron Coin to sell!");
        message.channel.send("You must have an Iron Coin to sell!");
      }
    } else {
      message.reply(
        "You must be in the Merchant's Wagon Channel to sell items."
      );
    }
  },
};
