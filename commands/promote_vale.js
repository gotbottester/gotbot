const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "promote_vale",
  description: "says promote_vale!",
  execute(message, args) {
    //PROMOTE HOUSE MEMBER TO LORD - KING
    console.log("entered promote_vale command");
    if (message.member.roles.cache.has("708021014977708033")) {
      let author = message.member;
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (author.roles.cache.has("707073800474198078")) {
        message.reply("Cannot promote a Lord within your House, only others.");
        return;
      } else if (!member.roles.cache.has("707073800474198078")) {
        message.reply("They must be a member of House Vale");
        return;
      } else {
        const chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        let role = message.guild.roles.cache.find(
          (r) => r.id === "742482606658158624"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("742482606658158624").catch(console.error);
          member.roles.add("742496809108373515").catch(console.error);
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Lord Protector of the Vale by the King himself!`
            )
            .setDescription(
              "The Lord Protector of the Vale now carries the Valyrian Sword Lady Forlorn."
            )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King can promote a Lord");
    }
  },
};
