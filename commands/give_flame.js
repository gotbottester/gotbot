const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "give_flame",
  description: "says give_flame!",
  execute(message, args) {
    //give_flame - The Red Priestess

    console.log("entered give_flame command");
    //MUST HAVE The Red Priestess ROLE
    if (message.member.roles.cache.has("713409866764517517")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (member.roles.cache.has("713409866764517517")) {
        message.reply("you cannot grant yourself the Flame.");
        return;
      } else {
        Money.findOne(
          {
            userID: message.author.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.flamingsword != 0) {
              var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
              let role = message.guild.roles.cache.find(
                (r) => r.id === "743971539732660224"
              ); //flaming sword
              member.roles.add(role).catch(console.error);
              member.send(
                "The Red Priestess has given your Sword a Flame. Use ^flame @user to kill White Walkers. It will also give you +50 points in Duels. The Flame only lasts while Priestess Exists. Once priestess is gone, you lose the flame."
              );
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} has been gifted a Flaming Sword by ${message.member.user.username}!`
                )
                .setDescription("Use ^flame @user to kill White Walkers. It will also give you +50 points in Duels. The Flame only lasts while Priestess Exists. Once priestess is gone, you lose the flame.")
                .setColor("RED")
                .attachFiles(["./assets/giveflame.png"])
                .setImage("attachment://giveflame.png");
              chan.send(embed);
              //add amulet use to author
              Money.findOne(
                {
                  userID: message.author.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.flamingsword = money.flamingsword - 1;
                  money.save().catch((err) => console.log(err));
                }
              );
            } else {
              //amulets are used up message
              message.channel.send(
                "The Red Priestess can only give out 1 Flaming Sword per 6xp Bloodmagic."
              );
            }
          }
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only The Red Priestess can give Swords a Flame!");
    }
  },
};
