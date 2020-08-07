const Discord = require("discord.js");
const Money = require("../models/profile.js");
//734148516800233502 shadowcat role

module.exports = {
  name: "pet_shadowcat",
  description: "says pet_shadowcat!",
  execute(message, args) {
    var member = message.member;
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("734148516800233502")) {
      var shadowcatage;
      //pet_shadowcatr
      console.log("entered pet_shadowcat command");
      Money.findOne(
        {
          userID: message.member.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);
          shadowcatage = money.shadowcatage;
          console.log(shadowcatage);
          if (shadowcatage <= 5) {
            let embed = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Shadowcat: Kitten`)
              .setDescription(
                "The Shadowcat is still a Kitten and cannot be used in battle."
              )
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatkit.png"])
              .setThumbnail("attachment://shadowcatkit.png");
            message.channel.send(embed);
          } else if (shadowcatage > 5 && shadowcatage <= 10) {
            let embed1 = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Shadowcat: Juvenile`
              )
              .setDescription("The Shadowcat is growing but still a Juvenile.")
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatjuv.png"])
              .setThumbnail("attachment://shadowcatjuv.png");
            message.channel.send(embed1);
          } else if (shadowcatage > 10 && shadowcatage <= 15) {
            let embed1 = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Shadowcat: Adult`
              )
              .setDescription(
                "The Shadowcat is growing and learning to trust you."
              )
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatadult.png"])
              .setThumbnail("attachment://shadowcatadult.png");
            message.channel.send(embed1);
          } else if (shadowcatage >= 16) {
            let embed2 = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Shadowcat: Mature`
              )
              .setDescription(
                "The Shadowcat is now an adult and will be handy in future Quests."
              )
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatmature.png"])
              .setThumbnail("attachment://shadowcatmature.png");
            message.channel.send(embed2);
          }
        }
      );
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("You do not have a pet Shadowcat.");
    }
  },
};
