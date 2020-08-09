const Discord = require("discord.js");
const Money = require("../models/profile.js");
var costtorevive = 50;
var cooldownrevive = new Set();
var cdseconds = 3600;

module.exports = {
  name: "buy_revive",
  description: "says buy_revive!",
  execute(message, args) {
    //BUY REVIVE - anyone dead (not white walker)
    if (cooldownrevive.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown on buying a Revive.");
    }
    if (message.member.roles.cache.has("708346509367836702")) {
      let member = message.member;
      console.log("entered buy_revive command");
      let deadrole = message.member.roles.cache.find(
        (r) => r.id === "708346509367836702"
      );
      let deserterrole = message.member.roles.cache.find(
        (r) => r.id === "715781455560573001"
      );
      //find how much money person has, if enough to revive
      Money.findOne(
        {
          userID: message.member.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);
          if (money.coins >= costtorevive) {
            cooldownrevive.add(message.author.id);
            member.roles.remove(deadrole).catch(console.error);
            member.roles.remove(deserterrole).catch(console.error);
            member.roles.remove("737165136040689757").catch(console.error); //remove shadowmarked
            member.roles.add("742098398169268304").catch(console.error); //add limbo
            money.coins = money.coins - costtorevive;
            money.save().catch((err) => console.log(err));
            message.channel.send(
              member.user.username + " has used "+ costtorevive +" coins to Revive himself."
            );
            setTimeout(() => {
              cooldownrevive.delete(message.author.id);
              console.log("Cooldown Revive finished " + message.author.id);
              message.author.send(
                "Revive cooldown ended. You may Revive yourself anytime."
              );
            }, cdseconds * 1000);
          } else {
            message.channel.send("You need at least "+costtorevive+" coins to buy a Revive.");
          }
        }
      );
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only The Dead can by a revive.");
    }
  },
};
