const Discord = require("discord.js");
const Money = require("../models/profile.js");
var chance = 0;
var reward = 10;

module.exports = {
  name: "bet_coin",
  description: "says bet_coin!",
  execute(message, args) {
    //bet_coin - tourney of the hand
    console.log("entered bet_coin command");
    var member2 = message.mentions.members.first();
    var challenger = message.member;
    if (member2 == null) {
      console.log("NO @MEMBER FOUND");
      message.reply(
        "you need to specify a member after the command: @membername"
      );
      return;
    } else {
      message.reply(
        "You have sent a Coin Toss Bet to " +
          member2.user.username +
          ". Winner receives 10 coin. Loser loses 10 coin. Challenger always plays Tails."
      );

      console.log("saw coin toss message");
      const filter = (reaction, user) => {
        challenger = message.member; //get person who challenged
        // member2 = message.mentions.members.first(); //get person mentioned in challenge
        console.log(
          "member 1 " +
            challenger.user.username +
            " member 2 " +
            member2.user.id +
            " reactor " +
            user.id
        );
        if (member2.id == user.id) {
          return ["👍"].includes(reaction.emoji.name);
        } else {
          message.reply("Only the mentioned user can accept the Challenge.");
        }
      };
      message
        .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
        .then((collected1) => {
          const reaction = collected1.first();
          if (reaction.emoji.name === "👍") {
            message.reply(
              member2.user.username + " Accepted Tourney of the Hand Challenge"
            );
            // setTimeout(function () {
            //   message.channel.send("Take your Bets (You have 30 seconds to bet on a fighter):\n React with 1️⃣ to bet 10 coins on"+challenger.user.username+"\n React with 2️⃣ to bet 10 coins on"+member2.user.username); //send it to whatever channel the bot has permissions to send on
            //   console.log("sent take bets message");
            // }, 5 * 1000);
            let question = Math.floor(Math.random() * 2);
            console.log("question " + question);
            switch (question) {
              case 0:
                message.channel.send(
                  "Tails Wins"
                );
                console.log("winner: " + challenger.user.username);
                //win Coins
                Money.findOne(
                  {
                    userID: challenger.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + reward;
                    money.save().catch((err) => console.log(err));
                    let embed = new Discord.MessageEmbed()
                      .setColor("YELLOW")
                      .setTimestamp()
                      .attachFiles(["./assets/coins.png"])
                      .setThumbnail("attachment://coins.png")
                      .setAuthor(
                        `${challenger.user.username}` +
                          " received " +
                          reward +
                          " coins for winning Coin Toss. - " +
                          `${member2.user.username}` +
                          " Lost " +
                          reward +
                          " coins."
                      );
                    embed.addField(
                      `${challenger.user.username}` + " Total Coins",
                      money.coins,
                      true
                    );
                    return message.channel.send(embed);
                  }
                );
                //give death to mentioned member
                Money.findOne(
                  {
                    userID: member2.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins - reward;
                    money.save().catch((err) => console.log(err));
                  }
                );
                break;
              case 1:
                message.channel.send(
                  "Heads Wins"
                );
                console.log("winner: " + member2.user.username);
                //win coins
                Money.findOne(
                  {
                    userID: member2.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + reward;
                    money.save().catch((err) => console.log(err));
                    let embed = new Discord.MessageEmbed()
                      .setColor("YELLOW")
                      .setTimestamp()
                      .attachFiles(["./assets/coins.png"])
                      .setThumbnail("attachment://coins.png")
                      .setAuthor(
                        `${member2.user.username}` +
                          " received " +
                          reward +
                          " coins for winning Coin Toss. - " +
                          `${challenger.user.username}` +
                          " Lost " +
                          reward +
                          " coins."
                      );
                    embed.addField(
                      `${member2.user.username}` + " Total Coins",
                      money.coins,
                      true
                    );
                    return message.channel.send(embed);
                  }
                );
                //give death to mentioned member
                Money.findOne(
                  {
                    userID: challenger.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins - reward;
                    money.save().catch((err) => console.log(err));
                  }
                );
                break;
            }
            // message.delete({ timeout: 3000 });
          } else {
            message.reply("You must react with 👍 to accept the Bet");
            // message.delete({ timeout: 3000 });
          }
        })
        .catch((collected1) => {
          console.log(
            `After a minute, only ${collected1.size} out of reacted.`
          );
          message.reply(
            member2.user.username + " did not accept your Bet!"
          );
          // message.delete({ timeout: 3000 });
        });
    }
  },
};
