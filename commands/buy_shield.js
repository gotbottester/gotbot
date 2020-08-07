const Money = require("../models/profile.js");
const Discord = require("discord.js");
var buyprice = 20;

module.exports = {
  name: "buy_shield",
  description: "says buy_shield!",
  execute(message, args) {
    //buy shield - anyone that has shield
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "739192096669302795") {
      if (
        !message.member.roles.cache.has("737497341250109500") //Shield
      ) {
        let member = message.member;

        console.log("entered buy Shield command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "737497341250109500"
        );

        Money.findOne(
          {
            userID: message.member.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.coins >= buyprice) {
              message.member.roles.add(role).catch(console.error); //add shield
              money.coins = money.coins - buyprice;
              money.items.push("Shield");
              money.save().catch((err) => console.log(err));
              message.reply(member.user.username + " bought a Shield");
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} Bought a Shield from the Blacksmith for ${buyprice} coins.`
                )
                .setColor("GREEN")
                .attachFiles(["./assets/shield.png"])
                .setThumbnail("attachment://shield.png")
                .addField(
                  "Purpose: ",
                  "Gives you an extra chance of winning when fighting Duel Battles."
                );
              chan.send(embed);
            } else {
              message.channel.send(
                "You need at least " +
                  buyprice +
                  " coins to buy a Shield."
              );
            }
          }
        );
      } else {
        console.log(
          "You already have a Shield, cannot have carry more."
        );
        message.channel.send(
          "You already have a Shield, cannot have carry more."
        );
      }
    } else {
      message.reply(
        "You must be in the Blacksmith Channel to buy Weapons."
      );
    }
  },
};
