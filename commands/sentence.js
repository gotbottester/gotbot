const Money = require("../models/profile.js");
const Discord = require("discord.js");
const helper_functions = require("../helper_functions/rolesremover");
const loot = 10;

module.exports = {
  name: "sentence",
  description: "says sentence!",
  execute(message, args) {
    //SENTENCE - LORD COMMANDER
    console.log("entered sentence command");
    //MUST HAVE LORD COMMANDER ROLE
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("715783930581876806")) {
      //lord commander
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered setence command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "708346509367836702"
        ); //the dead

        let nightrole = member.roles.cache.find(
          (r) => r.id === "713895055252783175"
        );
        let deserterrole = member.roles.cache.find(
          (r) => r.id === "715781455560573001"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.id === "708021014977708033"
        );
        let essosrole = member.roles.cache.find(
          (r) => r.id === "714598666857349132"
        );
        let handrole = member.roles.cache.find(
          (r) => r.id === "707250754020180079"
        );
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let guardrole = member.roles.cache.find(
          (r) => r.id === "735281180521398292"
        );
        let skinchange = member.roles.cache.find(
          (r) => r.id === "729097440082526279"
        );
        let dead = member.roles.cache.find(
          (r) => r.id === "708346509367836702"
        );
        let whitewalker = member.roles.cache.find(
          (r) => r.id === "713901799324778587"
        );
        if (
          deserterrole &&
          !nightrole &&
          !kingrole &&
          !essosrole &&
          !handrole &&
          !smallrole &&
          !guardrole &&
          !skinchange &&
          !dead &&
          !whitewalker
        ) {
          //remove all roles except everyone and Old Gods and White Walkers and Night King
          helper_functions.RolesRemover(member);
          //add The Dead role
          member.roles.add(role).catch(console.error);
          message.channel.send(
            "The Lord Commander of the NightsWatch has sentenced " +
              member.user.username +
              " to Death!"
          );
          member.send(
            "The Lord Commander of the Nights WAtch sentenced you to death for deserting the Watch and received a loot from the member of " +
              loot +
              " coins!"
          );
          //give kill to author
          Money.findOne(
            {
              userID: message.author.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.kills = money.kills + 1;
              money.coins = money.coins + loot;
              money.save().catch((err) => console.log(err));
            }
          );
          //give death to mentioned member
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.deaths = money.deaths + 1;
              money.coins = money.coins - loot;
              money.save().catch((err) => console.log(err));
            }
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been Sentenced to Death by the Lord Commander ${message.member.user.username}!`
            )
            .setColor("BLACK")
            .attachFiles(["./assets/sentenced.png"])
            .setImage("attachment://sentenced.png");
          chan.send(embed);
        } else {
          message.channel.send(
            "Only those marked with Deserters role can be sentenced to death. (Cannot be Hand, Small Council, Kingsguard, Essos Exiles)"
          );
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the Lord Commander of the NightsWatch can sentence Deserters to death!"
      );
    }
  },
};
