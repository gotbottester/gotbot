const Money = require("../models/profile.js");

var cooldowndragonglass = new Set();
var cdseconds = 3600;

module.exports = {
  name: "dragonglass",
  description: "says dragonglass!",
  execute(message, args) {
    //DRAGON GLASS - HAS IT

    if (cooldowndragonglass.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 1 hour cooldown on using Dragon Glass on a White Walker."
      );
    }
    console.log("entered dragonglass command");
    //MUST HAVE Dragon Glass ROLE
    if (message.member.roles.cache.has("724761294246248469") && message.member.roles.cache.has("707074053881724989")) {
      var member = message.mentions.members.first();
      var member2 = message.member;
      let dragonglassrole = message.guild.roles.cache.find(
        (r) => r.id === "724761294246248469"
      );
      let wightrole = member.roles.cache.find(
        (r) => r.id === "713901799324778587"
      );
      let nightrole = member.roles.cache.find(
        (r) => r.id === "713895055252783175"
      );
      let nightKINGrole = member.roles.cache.find(
        (r) => r.id === "716878672820306003"
      );
      // let generalrole = member.roles.cache.find(
      //   (r) => r.id === "720335392653443163"
      // );

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
              role != "708346509367836702" //amulet
            ) {
              member.roles.remove(role).catch(console.error);
            }
          });
          cooldowndragonglass.add(message.author.id);

          member2.roles.remove(dragonglassrole).catch(console.error); //remove dragon glass from author
          message.channel.send(
            member.user.username + " was killed and set free by Dragon Glass"
          );
          member.send(
            "You have been killed by Dragon Glass and set free from the Night King. Go choose a new House or join the Night's Watch if you please. <#707028783059697686>"
          );
          //give kill to author
          Money.findOne(
            {
              userID: message.author.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.wightkills = money.wightkills + 1;
              money.items.pull("Dragon Glass");
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
            cooldowndragonglass.delete(message.author.id);
            console.log("Cooldown Dragon Glass finished " + message.author.id);
            message.author.send(
              "Dragon Glass cooldown ended. You may Dragon Glass again anytime."
            );
          }, cdseconds * 1000);
        } else {
          message.channel.send(
            "Dragon Glass can only Kill White Walkers, excluding Night King and General."
          );
        }
      } else {
        message.channel.send("User must be online.");
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "You need to be a Nights Watch and have Dragon Glass. Dragon Glass can be purchased at the Trade Merchant."
      );
    }
  },
};
