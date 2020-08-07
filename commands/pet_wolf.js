const Discord = require("discord.js");
const Money = require("../models/profile.js");
//732050744466997340 dire wolf role

module.exports = {
  name: "pet_wolf",
  description: "says pet_wolf!",
  execute(message, args) {
    var member = message.member;
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("732050744466997340")) {
      var wolfage;
      //pet_wolfr
      console.log("entered pet_wolf command");
      Money.findOne(
        {
          userID: message.member.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);
          wolfage = money.wolfage;
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
              .attachFiles(["./assets/pup.png"])
              .setThumbnail("attachment://pup.png");
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
              .attachFiles(["./assets/juvenile.png"])
              .setThumbnail("attachment://juvenile.png");
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
              .attachFiles(["./assets/adolescent.png"])
              .setThumbnail("attachment://adolescent.png");
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
              .attachFiles(["./assets/adulthood.png"])
              .setThumbnail("attachment://adulthood.png");
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
