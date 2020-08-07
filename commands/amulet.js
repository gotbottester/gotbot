const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "amulet",
  description: "says amulet!",
  execute(message, args) {
    //USE AMULET - anyone dead (not white walker)
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("739206804310982751")) {
      let member = message.member;
      console.log("entered amulet command");
      let deadrole = message.member.roles.cache.find(
        (r) => r.id === "708346509367836702"
      );
      let deserterrole = message.member.roles.cache.find(
        (r) => r.id === "715781455560573001"
      );
      if (deadrole) {
        member.roles.remove(deadrole).catch(console.error);
        if (message.member.roles.cache.has("deserterrole")) {
          member.roles.remove(deserterrole).catch(console.error);
        } else if (message.member.roles.cache.has("737165136040689757")) {
          //remove shadowmarked
          member.roles.remove("737165136040689757").catch(console.error);
        }
        message.channel.send(
          member.user.username +
            " has used the Ruby Amulet to Revive himself. +2 Blood Magic XP to the Red Priestess with each use."
        );
        message.guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("713409866764517517")) {
            console.log("FOUND RED PRIESTESS " + membs.user.username);
            //add bloodmagicxp
            Money.findOne(
              {
                userID: membs.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                var tally_bloodmagicxp = money.bloodmagicxp + 2; //its taking into effect the 2xp added in this call and not saved to the very end
                if (tally_bloodmagicxp != 0 && tally_bloodmagicxp % 6 == 0) {
                  money.shadowuse += 1;
                  let embed = new Discord.MessageEmbed()
                    .setTitle(
                      `The Red Priestess has enough Blood Magic XP through Amulet use for another Shadow now!`
                    )
                    .setColor("RED")
                    .attachFiles(["./assets/melirevives.png"])
                    .setThumbnail("attachment://melirevives.png");
                  chan.send(embed);
                }
                money.bloodmagicxp += 2;
                money.save().catch((err) => console.log(err));
              }
            );
          }
        });
      } else {
        message.channel.send("You must be dead to use Amulet.");
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only those gifted the Revive Amulet can use it.");
    }
  },
};
