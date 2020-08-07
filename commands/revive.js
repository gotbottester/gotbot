var cooldownrevive = new Set();
const Discord = require("discord.js");
var cdseconds = 3600;

module.exports = {
  name: "revive",
  description: "says revive!",
  execute(message, args) {
    //REVIVE THE DEAD - MELISANDRE

    if (cooldownrevive.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown on reviving The Dead.");
    }
    console.log("entered revive command");
    //MUST HAVE MELISANDRE ROLE
    if (message.member.roles.cache.has("713409866764517517")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (member.roles.cache.has("737165136040689757")) {
        // has been shadowed
        message.reply(
          "You cannot revive a shadow marked person. They must buy their own revive."
        );
      } else {
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        let role = message.guild.roles.cache.find((r) => r.name === "The Dead");
        console.log("role " + role);
        let deadrole = member.roles.cache.find((r) => r.name === "The Dead");

        if (deadrole == "708346509367836702") {
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
              role != "739206804310982751" //amulet
            ) {
              member.roles.remove(role).catch(console.error);
            }
          });

          console.log("member " + member);
          member.roles.remove(role).catch(console.error);
          console.log("you removed " + member + " role " + role);
          // message.channel.send(
          //   "The Red Witch has revived " + member.user.username + "! 🖤 "
          // );
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been revived by the Red Priestess ${message.member.user.username}!`
            )
            .setColor("RED")
            .attachFiles(["./assets/melirevives.png"])
            .setThumbnail("attachment://melirevives.png");
          chan.send(embed);
          cooldownrevive.add(message.author.id);
          setTimeout(() => {
            cooldownrevive.delete(message.author.id);
            console.log("Cooldown Revive finished " + message.author.id);
            message.author.send(
              "Revive cooldown ended. You may Revive another anytime."
            );
          }, cdseconds * 1000);
        } else {
          message.channel.send("Only The Dead can be revived!");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only Melisandre can revive the Dead or White Walkers!"
      );
    }
  },
};
