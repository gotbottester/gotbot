var cooldownrevive = new Set();
const Discord = require("discord.js");
const helper_functions = require("../helper_functions/rolesremover");
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
          //remove all roles
          helper_functions.RolesRemover(member);
          member.roles.remove(role).catch(console.error);
          member.roles.add("742098398169268304").catch(console.error); //add limbo
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
        "Only The Red Priestess can revive the Dead or White Walkers!"
      );
    }
  },
};
