//729182524185509929 skinchanger activated


const Discord = require("discord.js");
var cooldownskinchanger = new Set();
var cdseconds = 3600;

module.exports = {
  name: "skinchange",
  description: "says skinchange!",
  execute(message, args) {
    var member = message.member;
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (cooldownskinchanger.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown on using Skinchange.");
    }
    if (message.member.roles.cache.has("729097440082526279")) {
      //skinchanger
      console.log("entered skinchanger command");
      let skinchangeractivated = message.guild.roles.cache.find((r) => r.id === "729182524185509929");
      let embed = new Discord.MessageEmbed()
      .setTitle(
        member.user.username +
          " has activated Skinchanger!"
      )
      .setDescription(
        "He who activates Skinchanger cannot die while it is on."
      )
      .setColor("GREEN")
      .setTimestamp()
      .attachFiles(["./assets/skinchanger.png"])
      .setThumbnail("attachment://skinchanger.png");
    chan.send(embed);
      member.roles.add(skinchangeractivated).catch(console.error);
      setTimeout(() => {
        cooldownskinchanger.delete(message.author.id);
        console.log("Cooldown skinchanger finished " + message.author.id);
        message.author.send(
          "Skinchanger cooldown ended. You may skinchanger yourself anytime."
        );
        member.roles.remove(skinchangeractivated).catch(console.error);
      }, cdseconds * 1000);
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("You need the Skin Changer Role found in Beyond the Wall Quest.");
    }
  },
};
