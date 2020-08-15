const Money = require("../models/profile.js");
const Discord = require("discord.js");
const helper_functions = require("../helper_functions/rolesremover");

var cooldownlance = new Set();
var cdseconds = 3600;

module.exports = {
  name: "lance",
  description: "says lance!",
  execute(message, args) {
    //Lance - HAS IT

    if (cooldownlance.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 1 hour cooldown on using Lance on a White Walker."
      );
    }
    console.log("entered lance command");
    //MUST HAVE Lance ROLE
    if (message.member.roles.cache.has("729097195722244176")) {
      var member = message.mentions.members.first();
      var member2 = message.member;
      let wightrole = member.roles.cache.find(
        (r) => r.id === "713901799324778587"
      );
      let nightrole = member.roles.cache.find(
        (r) => r.id === "713895055252783175"
      );
      let nightKINGrole = member.roles.cache.find(
        (r) => r.id === "716878672820306003"
      );
      let generalrole = member.roles.cache.find(
        (r) => r.id === "720335392653443163"
      );

      if (
        wightrole && //white walkers
        !nightrole && //night king
        !nightKINGrole && //night king of westeros
        !generalrole
      ) {
        //remove all roles except everyone and Old Gods and White Walkers and Night King
        helper_functions.RolesRemover(member);
        cooldownlance.add(message.author.id);
        //729891478565945436 protected by children of the forest role
        // member.roles.add("729891478565945436").catch(console.error);
        // member.roles.add("742098398169268304").catch(console.error); //add limbo
        member.send(
          "You have been killed by Obsidian Lance and set free from the Night King. Go choose a new House or join the Night's Watch if you please. <#707028783059697686>"
        );
        let embed = new Discord.MessageEmbed()
          .setTitle(
            member.user.username +
              " was killed and set free by Obsidian Lance. 30 Coins were looted from the White Walker."
          )
          .setDescription(
            "30 Coin was looted from the White Walker."
          )
          .setColor("BLACK")
          .setTimestamp()
          .attachFiles(["./assets/lance.png"])
          .setThumbnail("attachment://lance.png");
        message.channel.send(embed);
        //give kill to author
        Money.findOne(
          {
            userID: message.author.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            money.wightkills = money.wightkills + 1;
            money.coins = money.coins + 30;
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
            money.coins = money.coins - 30;
            money.save().catch((err) => console.log(err));
          }
        );
        setTimeout(() => {
          cooldownlance.delete(message.author.id);
          console.log("Cooldown Lance finished " + message.author.id);
          message.author.send(
            "Lance cooldown ended. You may Lance again anytime."
          );
        }, cdseconds * 1000);
      } else {
        message.channel.send(
          "Lance can only Kill White Walkers, excluding Night King and General."
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "You need to have an Obsidian Lance. (Beyond the Wall Quest)"
      );
    }
  },
};
