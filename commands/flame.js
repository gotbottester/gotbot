const Money = require("../models/profile.js");
const Discord = require("discord.js");
const roles = require("../helper_functions/rolesremover");

var cooldownflame = new Set();
var cdseconds = 14400;

module.exports = {
  name: "flame",
  description: "says flame!",
  execute(message, args) {
    //FLAME
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (cooldownflame.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 4 hour cooldown on using your Flaming Sword on a White Walker."
      );
    }
    console.log("entered flame command");
    //MUST HAVE Flaming Sword ROLE
    if (message.member.roles.cache.has("743971539732660224")) {
      var member = message.mentions.members.first();
      var member2 = message.member;
      let wightrole = member.roles.cache.find(
        (r) => r.id === "713901799324778587"
      );
      let nightrole = member.roles.cache.find(
        (r) => r.id === "713895055252783175"
      );

      if (
        wightrole && //white walkers
        !nightrole
      ) {
        //remove all roles except everyone and Old Gods and White Walkers and Night King
        roles.RolesRemover(member);
        cooldownflame.add(message.author.id);
        // member.roles.add("742098398169268304").catch(console.error); //add limbo
        member.send(
          "You have been killed by being struck by a Flaming Sword, full of bloodmagic."
        );
        let embed = new Discord.MessageEmbed()
          .setTitle(
            `${member.user.username} has struck down by ${message.member.user.username}'s Flaming Sword!`
          )
          .setDescription("You gained 30 coins for that kill.")
          .setColor("ORANGE")
          .attachFiles(["./assets/flame.png"])
          .setImage("attachment://flame.png");
        chan.send(embed);
        //give kill to author
        Money.findOne(
          {
            userID: message.author.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            money.flamekill = money.flamekill + 1;
            money.coins += 30;
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
            money.save().catch((err) => console.log(err));
          }
        );
        setTimeout(() => {
          cooldownflame.delete(message.author.id);
          console.log("Cooldown Flaming Sword finished " + message.author.id);
          message.author.send(
            "Flaming Sword cooldown ended. You may Flaming Sword again anytime."
          );
        }, cdseconds * 1000);
      } else {
        message.channel.send(
          "Flaming Sword can only Kill White Walkers, excluding Night King and General."
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "You need to have a Flaming Sword. Flaming Sword can only be given to you by a Red Priestess."
      );
    }
  },
};
