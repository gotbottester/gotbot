const Money = require("../models/profile.js");
const Discord = require("discord.js");
var buyprice = 30;

module.exports = {
  name: "buy_longsword",
  description: "says buy_longsword!",
  execute(message, args) {
    //buy longsword - anyone that has longsword
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "739192096669302795") {
      if (
        !message.member.roles.cache.has("737497464852054026") //longsword
      ) {
        let member = message.member;

        console.log("entered buy longsword command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "737497464852054026"
        );

        Money.findOne(
          {
            userID: message.member.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.coins >= buyprice) {
              message.member.roles.add(role).catch(console.error); //add longsword
              money.coins = money.coins - buyprice;
              money.items.push("Longsword");
              money.save().catch((err) => console.log(err));
              message.reply(member.user.username + " bought a Longsword");
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} Bought a Longsword from the Blacksmith for ${buyprice} coins.`
                )
                .setColor("GREEN")
                .attachFiles(["./assets/longsword.png"])
                .setThumbnail("attachment://longsword.png")
                .addField(
                  "Purpose: ",
                  "Gives you an extra chance of winning when fighting Duel Battles."
                );
              chan.send(embed);

            } else {
              message.channel.send(
                "You need at least " +
                  buyprice +
                  " coins to buy a Longsword."
              );
            }
          }
        );
      } else {
        console.log(
          "You already have a Longsword, cannot have carry more."
        );
        message.channel.send(
          "You already have a Longsword, cannot have carry more."
        );
      }
    } else {
      message.reply(
        "You must be in the Blacksmith Channel to buy Weapons."
      );
    }
  },
};
