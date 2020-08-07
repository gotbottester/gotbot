//732050744466997340
const Money = require("../models/profile.js");
const Discord = require("discord.js");
var buyprice = 500;

module.exports = {
  name: "buy_wolf",
  description: "says buy_wolf!",
  execute(message, args) {
    //buy WOLF - anyone that has wolf
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "729521244642476154") {
      if (
        !message.member.roles.cache.has("732050744466997340") //wolf
      ) {
        let member = message.member;

        console.log("entered buy wolf command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "732050744466997340"
        );
        message.channel.send(
          message.member.user.username +
            " has bought a Dire Wolf pup from the Wandering Merchant"
        );
        Money.findOne(
          {
            userID: message.member.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.coins >= buyprice) {
              member.roles.add(role).catch(console.error);
              money.coins = money.coins - buyprice;
              money.save().catch((err) => console.log(err));
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} Bought a Dire Wolf Pup from the Wandering Merchant for ${buyprice} coins.`
                )
                .setDescription(
                  "Use ^pet_wolf to see your Wolf grow up. Age: 0-5 Pup, 6-10 Juvenile, 11-19 Adolescent, 16+ Adulthood. Keep the wolf safe, if you die, you lose him. It will be valuable on future Quests (must be Adult). It cannot be used to attack members."
                )
                .setColor("GREEN")
                .attachFiles(["./assets/pup.png"])
                .setThumbnail("attachment://pup.png");
              chan.send(embed);
            } else {
              message.channel.send(
                "You need at least " +
                  buyprice +
                  " coins to buy the Dire Wolf Pup."
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
