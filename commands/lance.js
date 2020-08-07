const Money = require("../models/profile.js");
const Discord = require("discord.js");

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

      if (member.user.presence.status !== "offline") {
        if (
          wightrole && //white walkers
          !nightrole && //night king
          !nightKINGrole //night king of westeros
        ) {
          //remove all roles except everyone and Old Gods and White Walkers and Night King
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role != "707028782522826782" && //everyone
              role != "707032148493991947" && //old gods
              role != "712005922578366494" && //mod
              role != "730319761908563970" && //mod2
              role != "707094276458414143" && //lords of westeros
              role != "732050744466997340" && //direwolf
              role != "734148371308216332" && //direwolfghost
              role != "734148516800233502" && //shadowcat
              role != "739206804310982751" && //amulet
              role != "741145157885493251" //broadsword
            ) {
              member.roles.remove(role).catch(console.error);
            }
          });
          cooldownlance.add(message.author.id);
          //729891478565945436 protected by children of the forest role
          // member.roles.add("729891478565945436").catch(console.error);
          member.send(
            "You have been killed by Obsidian Lance and set free from the Night King. Go choose a new House or join the Night's Watch if you please. <#707028783059697686>"
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " was killed and set free by Obsidian Lance. 30 Coins were looted from the White Walker."
            )
            .setDescription(
              "30 Coin was looted from the White Walker. They are also now Protected by the Children of the Forest and cannot be speared or bitten while Night King exists."
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
              money.kills = money.kills + 1;
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
        message.channel.send("User must be online.");
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "You need to have an Obsidian Lance. (Beyond the Wall Quest)"
      );
    }
  },
};
