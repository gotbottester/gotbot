const Money = require("../models/profile.js");
const Discord = require("discord.js");
const helper_functions = require("../helper_functions/rolesremover");
var cooldownspear = new Set();
var cdseconds = 7200;
var loot = 30;

module.exports = {
  name: "spear",
  description: "says spear!",
  async execute(message, args) {
    //SPEAR - NIGHT KING OF WESTEROS (takover)

    if (cooldownspear.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 2 hour cooldown on Ice Spears.");
    }
    console.log("entered spear command");
    //MUST HAVE NIGHT KING OF WESTEROS ROLE OR GENERAL
    if (
      message.member.roles.cache.has("716878672820306003") ||
      message.member.roles.cache.has("720335392653443163")
    ) {
      //night king of Westeros or general
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("spear command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "713901799324778587"
        );
        let deadrole = member.roles.cache.find(
          (r) => r.id === "708346509367836702"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.id === "708021014977708033"
        );
        let Bots = member.roles.cache.find(
          (r) => r.id === "715061597944545312"
        );
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let essosrole = member.roles.cache.find(
          (r) => r.id === "714598666857349132"
        );
        let wightrole = member.roles.cache.find(
          (r) => r.id === "713901799324778587"
        );
        let nightswatch = member.roles.cache.find(
          (r) => r.id === "707074053881724989"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );
        let lordcommander = member.roles.cache.find(
          (r) => r.id === "715783930581876806"
        );
        //729891478565945436 protected by children of the forest role
        let protectedrole = member.roles.cache.find(
          (r) => r.id === "729891478565945436"
        );
        let skinchangerole = member.roles.cache.find(
          (r) => r.id === "729182524185509929"
        );

        if (!member.roles.cache.has("742098398169268304")) { //limbo
          if (
            !wightrole &&
            !kingrole &&
            !Bots &&
            !deadrole &&
            !smallrole &&
            !melirole &&
            !essosrole &&
            !nightswatch &&
            !lordcommander &&
            !protectedrole &&
            !skinchangerole
          ) {
            console.log("spear command");
            //remove all roles except everyone and Old Gods and White Walkers and Night King
            await helper_functions.RolesRemover(member);
            member.roles.add(role).catch(console.error);
            cooldownspear.add(message.author.id);
            let embed = new Discord.MessageEmbed()
              .setTitle(
                "The Night King has Ice Speared " +
                  member.user.username +
                  " and turned him into a White Walker! He also looted " +
                  loot +
                  " from the living..."
              )
              .setColor("BLUE")
              .setTimestamp()
              .attachFiles(["./assets/spear.png"])
              .setThumbnail("attachment://spear.png");
            message.channel.send(embed);
            //give loot to Night King
            Money.findOne(
              {
                userID: message.member.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.coins += loot;
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
                money.items.forEach((entry) => {
                  money.items.pull(entry);
                });
                money.deaths = money.deaths + 1;
                money.coins -= loot;
                money.save().catch((err) => console.log(err));
              }
            );
            setTimeout(() => {
              cooldownspear.delete(message.author.id);
              console.log(
                "Cooldown to Ice Spear has finished " + message.author.id
              );
              message.author.send(
                "Ice Spear cooldown ended. You may Rise another anytime."
              );
            }, cdseconds * 1000);
          } else {
            message.channel.send(
              "The Night King cannot kill the King, Small Council, Essos Exiles, Melisandre, Protected by Children of the Forest, or the Nights Watch.."
            );
          }
        } else {
          message.channel.send("User cannot be Bannerless.");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the Night King of Westeros can ice spear!");
    }
  },
};
