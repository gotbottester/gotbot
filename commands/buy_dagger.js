const Money = require("../models/profile.js");
const Discord = require("discord.js");
var buyprice = 20;

module.exports = {
  name: "buy_dagger",
  description: "says buy_dagger!",
  execute(message, args) {
    //buy DAGGER - anyone that has dagger
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "729521244642476154") {
      if (
        !message.member.roles.cache.has("719083010091253770") //dagger
      ) {
        let member = message.member;

        console.log("entered buy dagger command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "719083010091253770"
        );
        //   console.log("role " + role);
        //   console.log("member " + member);
        // console.log("you gave " + member + " role " + role);
        message.member.roles.add(role).catch(console.error); //add dagger from self
        Money.findOne(
          {
            userID: message.member.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.coins >= buyprice) {
              money.coins = money.coins - buyprice;
              money.items.push("Valyrian Dagger");
              money.save().catch((err) => console.log(err));
              message.reply(member.user.username + " bought a Valyrian Dagger");
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} Bought a Valryian Dagger from the Wandering Merchant for ${buyprice} coins.`
                )
                embed.addField(
                  "Purpose: ",
                  "Useful in Quests Beyond the Wall and for Nights Watch to help against being bit by White Walkers at the Wall. Gives you 1/2 chance of surviving a White Walker bite."
                )
                .setColor("GREEN")
                .attachFiles(["./assets/valyriandagger.png"])
                .setThumbnail("attachment://valyriandagger.png");
              chan.send(embed);
            } else {
              message.channel.send(
                "You need at least " +
                  buyprice +
                  " coins to buy a Valyrian Dagger."
              );
            }
          }
        );
      } else {
        console.log(
          "You already have a Valyarian Dagger, cannot have carry more."
        );
        message.channel.send(
          "You already have a Valyarian Dagger, cannot have carry more."
        );
      }
    } else {
      message.reply(
        "You must be in the Merchant's Wagon Channel to buy/sell items."
      );
    }
  },
};
