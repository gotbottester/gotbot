//729178790923862105 greensight activated

const Discord = require("discord.js");
var cooldowngreensight = new Set();
var cdseconds = 1800;

module.exports = {
  name: "greensight",
  description: "says greensight!",
  execute(message, args) {
    var member = message.member;
    var chan = message.guild.channels.cache.get("738552223243567214"); //whispers
    if (cooldowngreensight.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("Greensight is already activated.");
    }
    if (message.channel == "738552223243567214") {
      // greensight channel
      if (message.member.roles.cache.has("729097386982375435")) {
        //greensight
        if (!message.member.roles.cache.has("729178790923862105")) {
          console.log("entered greensight command");
          let greensightactivated = message.guild.roles.cache.find(
            (r) => r.id === "729178790923862105"
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(member.user.username + " has activated Greensight!")
            .setDescription(
              "He who activates Greensight can see all hidden House channels for 30 minutes"
            )
            .setColor("GREEN")
            .setTimestamp()
            .attachFiles(["./assets/greensightactive.png"])
            .setThumbnail("attachment://greensightactive.png");
          chan.send(embed);
          member.roles.add(greensightactivated).catch(console.error);
          setTimeout(() => {
            cooldowngreensight.delete(message.author.id);
            console.log("Cooldown greensight finished " + message.author.id);
            message.author.send(
              "greensight cooldown ended. You may greensight yourself anytime."
            );
            member.roles.remove(greensightactivated).catch(console.error);
          }, cdseconds * 1000);
        } else {
          console.log("you already activated it!!!");
          message.channel.send("Greensight is already activated.");
        }
      } else {
        console.log("you do not have permission!!!");
        message.channel.send("Must have Greensight Role.");
      }
    } else {
      console.log("you do not have permission!!!");
      message.author.send(
        "Shhhhh, you do not want others to see that you are viewing their house channels. Use the greensight activated channel."
      );
    }
  },
};
