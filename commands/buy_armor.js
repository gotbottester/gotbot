const Discord = require("discord.js");
const Money = require("../models/profile.js");
var costtobuy = 30;

module.exports = {
  name: "buy_armor",
  description: "says buy_armor!",
  execute(message, args) {
    //BUY ARMOR - anyone living (not white walker)
    //
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.channel == "739192096669302795") {
      if (!message.member.roles.cache.has("726663217950097458")) {
        if (
          !message.member.roles.cache.has("708346509367836702") || //not dead
          !message.member.roles.cache.has("713901799324778587") || //not white walker
          !message.member.roles.cache.has("716878672820306003") || //night king of westeros
          !message.member.roles.cache.has("720335392653443163") || //general white walker
          !message.member.roles.cache.has("713895055252783175") //night king regular
        ) {
          let member = message.member;
          console.log("entered buy_armor command");
          let armorrole = "726663217950097458";
          //find how much money person has, if enough to buy
          Money.findOne(
            {
              userID: message.member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              if (money.coins >= costtobuy) {
                member.roles.add(armorrole).catch(console.error);
                money.coins = money.coins - costtobuy;
                money.items.push("Chainmail Armor");
                money.save().catch((err) => console.log(err));
                message.reply(member.user.username  + " bought Chainmail Armor");
                let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} Bought Chainmail Armor from the Blacksmith for ${costtobuy} coins.`
                )
                  .setColor("GREEN")
                  .attachFiles(["./assets/armor.png"])
                  .setThumbnail("attachment://armor.png")
                  .addField(
                    "Purpose: ",
                    "Gives you an extra chance of winning when fighting Duel Battles. Also used for Beyond the Wall Quests."
                  );
                  chan.send(embed);
              } else {
                message.channel.send(
                  "You need at least " +
                    costtobuy +
                    " coins to buy Chainmail Armor."
                );
              }
            }
          );
        } else {
          console.log("you do not have permission!!!");
          message.channel.send("Only the living can buy Chainmail Armor.");
        }
      } else {
        message.channel.send("You already have Chainmail Armor.");
      }
    } else {
      message.reply(
        "You must be in the Blacksmith Channel to buy Weapons."
      );
    }
  },
};
