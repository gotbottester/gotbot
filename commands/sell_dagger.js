const Money = require("../models/profile.js");
const Discord = require("discord.js");
var sellprice = 10;

module.exports = {
  name: "sell_dagger",
  description: "says sell_dagger!",
  execute(message, args) {
    //sell DAGGER - anyone that has dagger
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "729521244642476154") {
      if (
        message.member.roles.cache.has("719083010091253770") //dagger
      ) {
        let member = message.member;

        console.log("entered sell dagger command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "719083010091253770"
        );
        //   console.log("role " + role);
        //   console.log("member " + member);
        // console.log("you gave " + member + " role " + role);
        message.member.roles.remove(role).catch(console.error); //remove dagger from self
        message.channel.send(
          message.member.user.username +
            " has sold his Valyrian Dagger to the Wandering Merchant"
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
              if(entry == "Valyrian Dagger") { 
                money.items.pull(entry);
              }
            });
            money.save().catch((err) => console.log(err));
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${member.user.username} Sold Valryian Dagger to the Wandering Merchant for ${sellprice} coins.`
              )
              .setColor("YELLOW")
              .attachFiles(["./assets/merchant.png"])
              .setThumbnail("attachment://merchant.png");
              chan.send(embed);
          }
        );
      } else {
        console.log("You must have a Valyrian Dagger to sell!");
        message.channel.send("You must have a Valyrian Dagger to sell!");
      }
    } else {
      message.reply(
        "You must be in the Merchant's Wagon Channel to sell items."
      );
    }
  },
};
