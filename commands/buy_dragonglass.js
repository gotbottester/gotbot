const Discord = require("discord.js");
const Money = require("../models/profile.js");
var costtobuy = 50;

module.exports = {
  name: "buy_dragonglass",
  description: "says buy_dragonglass!",
  execute(message, args) {
    //BUY DRAGONGLASS - anyone living (not white walker)
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "729521244642476154") {
      if (!message.member.roles.cache.has("724761294246248469")) {
        //not have dragonglass already
        if (
          !message.member.roles.cache.has("708346509367836702") && //not dead
          !message.member.roles.cache.has("713901799324778587") && //not white walker
          !message.member.roles.cache.has("716878672820306003") && //night king of westeros
          !message.member.roles.cache.has("713895055252783175") //night king regular
        ) {
          let member = message.member;
          console.log("entered buy_dragonglass command");
          let dragonglassrole = "724761294246248469";
          //find how much money person has, if enough to buy
          Money.findOne(
            {
              userID: message.member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              if (money.coins >= costtobuy) {
                member.roles.add(dragonglassrole).catch(console.error);
                money.coins = money.coins - costtobuy;
                money.items.push("Dragon Glass");
                money.save().catch((err) => console.log(err));
                message.reply(member.user.username + " bought Dragon Glass");
                let embed = new Discord.MessageEmbed().setTitle(
                  `${member.user.username} Purchased Dragon Glass`
                );
                embed.setColor("GOLD");
                embed.attachFiles(["./assets/dragonglass.png"]);
                embed.setThumbnail("attachment://dragonglass.png");
                embed.addField(
                  "Purpose: ",
                  "Use ^dragonglass @user (Must be White Walker)"
                );
                chan.send(embed);
              } else {
                message.channel.send(
                  "You need at least " +
                    costtobuy +
                    " coins to buy Dragon Glass."
                );
              }
            }
          );
        } else {
          console.log("you do not have permission!!!");
          message.channel.send("Only the living can buy Dragon Glass.");
        }
      } else {
        message.channel.send("You already have Dragon Glass.");
      }
    } else {
      message.reply(
        "You must be in the Merchant's Wagon Channel to buy/sell items."
      );
    }
  },
};
