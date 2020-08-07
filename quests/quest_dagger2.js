const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_dagger2",
  description: "says quest_dagger2!",
  execute(message, args) {
    //quest_dagger2
    console.log("entered quest_dagger2 command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣", "4️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var question = Math.floor(Math.random() * 4);
        if (reaction.emoji.name === "4️⃣") {
          message.reply(member.user.username + " reacted with 4️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          member.send("You got a Valyrian Dagger!");
          member.roles.add("719083010091253770");
          member.roles.remove("721211126582476832");
          let embed = new Discord.MessageEmbed()
            .setTitle(member.user.username + " has gotten a Valyrian Dagger!")
            .setDescription(
              "You can use Daggers to Kill White Walkers when being Bitten. Save it for Winter is Coming."
            )
            .setColor("GREY")
            .setTimestamp()
            .attachFiles(["./assets/valyriandagger.png"])
            .setThumbnail("attachment://valyriandagger.png");
          chan.send(embed);
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              // let daggerchance = Math.floor(Math.random() * 3);
              // money.quests = money.quests + 1;
              // if (daggerchance == 0 || daggerchance == 2) {
                money.coins = money.coins + 10;
                member.send(
                  "You were fortunate to find 10 coin during this Quest! You now have " +
                    money.coins +
                    " Total Coins"
                );
              // }
              money.items.push("Valyrian Dagger");
              money.save().catch((err) => console.log(err));
            }
          );
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 10000 });
          message.channel.send(
            "Wrong Answer! You failed your Quest for Valyrian Dagger."
          );
          member.send(
            "Wrong Answer! You failed your Quest for Valyrian Dagger."
          );
          member.roles.remove("721211126582476832"); //quest dagger role
        }
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("You didn't react in time with an answer.");
        message.delete({ timeout: 10000 });
      });
  },
};
