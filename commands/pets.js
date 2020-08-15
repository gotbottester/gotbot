const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "pets",
  description: "says pets!",
  async execute(message, args) {
    console.log("entered pets command");
    var member = message.member;
    if (message.member.roles.cache.has("734148371308216332")) {
      var wolfage;
      //pets
      await Money.findOne(
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
              .setTitle(
                `${message.member.user.username}'s Ghost Dire Wolf: Pup`
              )
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
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Ghost Dire Wolf: Adolescence`
              )
              .setDescription("The Dire Wolf is growing but still a Juvenile.")
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostjuv.png"])
              .setThumbnail("attachment://ghostjuv.png");
            message.channel.send(embed);
          } else if (wolfage > 10 && wolfage <= 15) {
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Ghost Dire Wolf: Adolescence`
              )
              .setDescription(
                "The Dire Wolf is growing and learning to trust you."
              )
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostadult.png"])
              .setThumbnail("attachment://ghostadult.png");
            message.channel.send(embed);
          } else if (wolfage >= 16) {
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${message.member.user.username}'s Ghost Dire Wolf: Adulthood`
              )
              .setDescription(
                "The Dire Wolf is now an adult and will be handy in future Quests."
              )
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/ghostmature.png"])
              .setThumbnail("attachment://ghostmature.png");
            message.channel.send(embed);
          }
        }
      );
    }
    if (message.member.roles.cache.has("732050744466997340")) {
      var wolfage;
      //pet_wolf
      await Money.findOne(
        {
          userID: message.member.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);
          wolfage = money.wolfage;
          console.log(wolfage);
          if (wolfage <= 5) {
            let embed1 = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Dire Wolf: Pup`)
              .setDescription(
                "The Dire Wolf is still a pup and cannot be used in battle."
              )
              .addField("Age", `${wolfage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/pup.png"])
              .setThumbnail("attachment://pup.png");
            message.channel.send(embed1);
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
            let embed1 = new Discord.MessageEmbed()
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
            message.channel.send(embed1);
          }
        }
      );
    }
    if (message.member.roles.cache.has("734148516800233502")) {
      var shadowcatage;
      //pet_shadowcatr
      await Money.findOne(
        {
          userID: message.member.id,
          guildID: message.guild.id,
        },
        (err, money) => {
          if (err) console.log(err);
          shadowcatage = money.shadowcatage;
          console.log(shadowcatage);
          if (shadowcatage <= 5) {
            let embed2 = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Shadowcat: Kitten`)
              .setDescription(
                "The Shadowcat is still a Kitten and cannot be used in battle."
              )
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatkit.png"])
              .setThumbnail("attachment://shadowcatkit.png");
            message.channel.send(embed2);
          } else if (shadowcatage > 5 && shadowcatage <= 10) {
            let embed2 = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Shadowcat: Juvenile`)
              .setDescription("The Shadowcat is growing but still a Juvenile.")
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatjuv.png"])
              .setThumbnail("attachment://shadowcatjuv.png");
            message.channel.send(embed2);
          } else if (shadowcatage > 10 && shadowcatage <= 15) {
            let embed2 = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Shadowcat: Adult`)
              .setDescription(
                "The Shadowcat is growing and learning to trust you."
              )
              .addField("Age", `${shadowcatage}`)
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/shadowcatadult.png"])
              .setThumbnail("attachment://shadowcatadult.png");
            message.channel.send(embed2);
          } else if (shadowcatage >= 16) {
            let embed2 = new Discord.MessageEmbed()
              .setTitle(`${message.member.user.username}'s Shadowcat: Mature`)
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
    }
  },
};
