const Discord = require("discord.js");
const Money = require("../models/profile.js");
//734148371308216332 dire wolf role

module.exports = {
  name: "pet_wolfghost",
  description: "says pet_wolfghost!",
  execute(message, args) {
    var member = message.member;
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("734148371308216332")) {
      var wolfage;
      //pet_wolfghostr
      console.log("entered pet_wolfghost command");
      Money.findOne(
        {
          userID: message.member.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);
          wolfage = money.wolfghostage;
          console.log(wolfage);
          if (wolfage <= 5) {
            let embed = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Dire Wolf: Pup`)
              .setDescription(
                "The Dire Wolf is still a pup and cannot be used in battle."
              )
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostpup.png"])
              .setThumbnail("attachment://ghostpup.png");
            message.channel.send(embed);
          } else if (wolfage > 5 && wolfage <= 10) {
            let embed1 = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Dire Wolf: Adolescence`
              )
              .setDescription("The Dire Wolf is growing but still a Juvenile.")
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostjuv.png"])
              .setThumbnail("attachment://ghostjuv.png");
            message.channel.send(embed1);
          } else if (wolfage > 10 && wolfage <= 15) {
            let embed1 = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Dire Wolf: Adolescence`
              )
              .setDescription(
                "The Dire Wolf is growing and learning to trust you."
              )
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostadult.png"])
              .setThumbnail("attachment://ghostadult.png");
            message.channel.send(embed1);
          } else if (wolfage >= 16) {
            let embed2 = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Dire Wolf: Adulthood`
              )
              .setDescription(
                "The Dire Wolf is now an adult and will be handy in future Quests."
              )
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostmature.png"])
              .setThumbnail("attachment://ghostmature.png");
            message.channel.send(embed2);
          }
        }
      );
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("You do not have a pet Dire Wolf.");
    }
  },
};
