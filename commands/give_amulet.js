const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "give_amulet",
  description: "says give_amulet!",
  execute(message, args) {
    //give_amulet - The Red Priestess

    console.log("entered give_amulet command");
    //MUST HAVE The Red Priestess ROLE
    if (message.member.roles.cache.has("713409866764517517")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        //check shadowuse numbers make sure less than 3
        Money.findOne(
          {
            userID: message.author.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.amuletuse <= 2) {
              var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
              let role = message.guild.roles.cache.find(
                (r) => r.id === "739206804310982751"
              ); //ruby amulet
              member.roles.add(role).catch(console.error);
              member.roles.add("739206804310982751").catch(console.error); //add shadow marked
              member.send(
                "The Red Priestess has gifted you a Ruby Amulet. Use ^amulet to revive yourself for Free when dead."
              );
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} has been gifted a Revive Amulet by the Red Priestess ${message.member.user.username}!`
                )
                .setColor("RED")
                .attachFiles(["./assets/amulet.png"])
                .setThumbnail("attachment://amulet.png");
              chan.send(embed);
              //add amulet use to author
              Money.findOne(
                {
                  userID: message.author.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.amuletuse = money.amuletuse + 1;
                  money.save().catch((err) => console.log(err));
                }
              );
            } else {
              //amulets are used up message
              message.channel.send("The Red Priestess can only give out 2 Revive Amulets. Choose wisely.");
            }
          }
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only The Red Priestess can give Revive Amulets!");
    }
  },
};
