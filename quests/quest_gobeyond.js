const Money = require("../models/profile.js");
const Discord = require("discord.js");
var cooldown = new Set();
var cdseconds = 3600;

module.exports = {
  name: "quest_gobeyond",
  description: "says quest_gobeyond!",
  execute(message, args) {
    //quest_gobeyond
    if (cooldown.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown going beyond the wall.");
    }
    console.log("entered quest_gobeyond command");
    var member = message.member;
    //707288311596711958
    if (message.channel == "707288311596711958") {
      if (member.roles.cache.has("728750595904897106")) {
        cooldown.add(message.author.id);
        //first ranger verification
        //message to whispers showing the quest is on
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        var chan_questbeyondwall3 = message.guild.channels.cache.get(
          "728738536534048869"
        ); //quest beyond wall
        let embed0 = new Discord.MessageEmbed()
          .setTitle(
            member.user.username +
              " is a First Ranger and went Beyond the Wall."
          )
          .setDescription(
            "First Rangers can go beyond the wall at anytime using the command ^go_beyond within the Nights Watch Channel."
          )
          .setColor("WHITE")
          .setTimestamp()
          .attachFiles(["./assets/wall.png"])
          .setThumbnail("attachment://wall.png");
        chan.send(embed0);
        //-------end of message to whispers
        let embed2 = new Discord.MessageEmbed()
          .setTitle(
            member.user.username +
              " is a dying breed of First Rangers. He knows his way past the Haunted Forest and doesn't need to rest at Crasters Keep."
          )
          .setColor("WHITE")
          .setTimestamp()
          .attachFiles(["./assets/firstrangergobeyond.png"])
          .setThumbnail("attachment://firstrangergobeyond.png");
        chan.send(embed2);

        member.roles.add("728725245149839420"); //quest 3
        member.send(
          "Find your Quest Beyond the Wall here ->>> <#728738536534048869>"
        );
        chan_questbeyondwall3.send(
          "**You must now decide a path. Towards the Fist of the First Men or towards Frostfangs?**\n React with 1️⃣ to go towards the Fist of the First Men\n React with 2️⃣ to go towards Frostfangs\n React with 3️⃣ to Quit Quest"
        );
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("728725245149839420");
        }, 60 * 1000);
        setTimeout(() => {
          cooldown.delete(message.author.id);
          console.log(
            "Cooldown beyond the wall finished " + message.author.id
          );
          message.author.send(
            "Beyond the Wall cooldown ended. You may go anytime."
          );
        }, cdseconds * 1000);
      }
    } else {
      message.reply("Must be in the Nights Watch Channel to use this command");
    }
  },
};
