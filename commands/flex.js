const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "flex",
  description: "says flex!",
  execute(message, args) {
    //flex
    let member1 = message.member;
    let rolescount = 0;
    Money.findOne(
      {
        userID: message.member.id,
        guildID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        //count all roles
        member1.roles.cache.forEach((role) => {
          if (
            role != "733903953523376138" &&
            role != "736382370592325643" &&
            role != "707028782522826782" &&
            role != "736430150454870024"
          ) {
            rolescount++;
          }
        });
        var total_coins = Math.floor(money.coins);
        if (member1.roles.cache.has("713409866764517517")) {
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member1.user.username + "'s Stats are full of Blood Magic"
            )
            .setColor("AQUA")
            .attachFiles(["./assets/redpriestess.png"])
            .setThumbnail("attachment://redpriestess.png");
          embed.addField("Total Coins: ", total_coins, true);
          embed.addField("Total Roles: ", rolescount, true);
          embed.addField("Swordsman XP: ", money.swordsmanxp, true);
          embed.addField("Total Kills: ", money.kills, true);
          embed.addField("Duel Wins: ", money.wins, true);
          embed.addField("Shadows left: ", money.shadowuse, true);
          embed.addField("Amulets Used: ", money.amuletuse - 1, true);
          embed.addField("Flaming Swords left: ", money.flamingsword, true);
          embed.addField("Blood Magic XP: ", money.bloodmagicxp, true);
          embed.addField("Days as Priestess: ", money.meliage, true);
          return message.channel.send(embed);
        } else {
          if (money.swordsmanxp < 1) {
            let embed = new Discord.MessageEmbed()
              .setTitle(member1.user.username + "'s Stats are Weak")
              .setColor("AQUA")
              .attachFiles(["./assets/flexweak.png"])
              .setThumbnail("attachment://flexweak.png");
            embed.addField("Total Coins: ", total_coins, true);
            embed.addField("Total Roles: ", rolescount, true);
            embed.addField("Swordsman XP: ", money.swordsmanxp, true);
            embed.addField("Total Kills: ", money.kills, true);
            embed.addField("Duel Wins: ", money.wins, true);
            return message.channel.send(embed);
          } else {
            let embed = new Discord.MessageEmbed()
              .setTitle(member1.user.username + "'s Stats are Strong")
              .setColor("AQUA")
              .attachFiles(["./assets/flex.png"])
              .setThumbnail("attachment://flex.png");
            embed.addField("Total Coins: ", total_coins, true);
            embed.addField("Total Roles: ", rolescount, true);
            embed.addField("Swordsman XP: ", money.swordsmanxp, true);
            embed.addField("Total Kills: ", money.kills, true);
            embed.addField("Duel Wins: ", money.wins, true);
            return message.channel.send(embed);
          }
        }
      }
    );
  },
};
