const Discord = require("discord.js");
const Money = require("../models/profile.js");
const helper_functions = require("../helper_functions/rolesremover");
const trialcoins = 30;

module.exports = {
  name: "trialbycombat",
  description: "says trialbycombat!",
  execute(message, args) {
    //TRIAL BY COMBAT - member and mention

    console.log("entered trialbycombat command");
    if (message.channel == "728353086971576351") {
      var member2 = message.mentions.members.first();
      var member1 = message.member;

      if (member2 == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (
        member1.roles.cache.has("708346509367836702") ||
        member1.roles.cache.has("713901799324778587") ||
        member1.roles.cache.has("713409866764517517")
      ) {
        //dead or priestess
        message.reply(
          "Only the living can use ^trialbycombat. Red Priestess cannot use this for its not the way of the Lord of Light."
        );
        return;
      } else if (
        member2.roles.cache.has("708346509367836702") ||
        member2.roles.cache.has("713901799324778587") ||
        member2.roles.cache.has("713409866764517517") ||
        member2.roles.cache.has("740747121707450401")
      ) {
        //dead or priestess
        message.reply(
          "You can only challenge the Living (not Bannerless) to ^trialbycombat. Red Priestess cannot be challenged either for they serve the Lord of Light."
        );
        return;
      } else if (member1.id == member2.id) {
        message.reply("You cannot challenge yourself to Trial By Combat.");
      } else {
        message.reply(
          "You have sent a Challenge to " +
            member2.user.username +
            ". Let us see how brave he is."
        );
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        chan.send(
          member1.user.username +
            " has challenged " +
            member2.user.username +
            " to a TRIAL BY COMBAT. This is to the DEATH! Will he accept?"
        );
        let embed1 = new Discord.MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .attachFiles(["./assets/demandtrial.png"])
          .setImage("attachment://demandtrial.png")
          .setAuthor(
            `${member1.user.username} has challenged ${member2.user.username} to a Trial by Combat!`
          )
          .setDescription(
            "Challenge a member to Trial by Combat using the command ^trialbycombat in the Combat Channel only.\nAnyone can be killed that is living and not a Red Priestess - 30 coins for Winner, Death for Loser.\nYou will also loot 20-50 coins randomly from the slain user."
          );
        chan.send(embed1);
        message.mentions.members
          .first()
          .send(
            member1.user.username +
              " challenged you to Trial by Combat. Winner gets " +
              trialcoins +
              " gold, Loser Dies. Rreact with 👍 on ^trialbycombat line to accept here ->>> <#707102776215208008> "
          );

        console.log("saw trialbycombat message");
        const filter = (reaction, user) => {
          member1 = message.member; //get person who challenged
          // member2 = message.mentions.members.first(); //get person mentioned in challenge
          console.log(
            "member 1 " +
              member1.user.username +
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
          .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
          .then((collected1) => {
            const reaction = collected1.first();
            if (reaction.emoji.name === "👍") {
              var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
              var loot = Math.floor(Math.random() * (50 - 20)) + 20;
              message.reply(
                member2.user.username + " Accepted Trial By Combat"
              );
              let deadrole = message.guild.roles.cache.find(
                (r) => r.name === "The Dead"
              );
              let question = Math.floor(Math.random() * 2);
              console.log("question " + question);
              switch (question) {
                case 0:
                  message.channel.send(
                    member1.user.username +
                      " struck down and killed " +
                      member2.user.username
                  );
                  console.log("winner: " + member1.user.username);
                  //remove all roles except everyone and Old Gods
                  //remove all roles except everyone and Old Gods and White Walkers and Night King
                  helper_functions.RolesRemover(member2);
                  //add The Dead role
                  member2.roles.add(deadrole).catch(console.error);
                  //win Coins
                  Money.findOne(
                    {
                      userID: member1.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.coins = money.coins + trialcoins;
                      money.save().catch((err) => console.log(err));
                      let embed = new Discord.MessageEmbed()
                        .setColor("YELLOW")
                        .setTimestamp()
                        .attachFiles(["./assets/trial.png"])
                        .setImage("attachment://trial.png")
                        .setAuthor(
                          `${member1.user.username}` +
                            " received " +
                            trialcoins +
                            " coins for winning the Trial By Combat. He also looted " +
                            loot +
                            " from the dead."
                        );
                      embed.addField("Total Coins", money.coins, true);
                      return message.channel.send(embed);
                    }
                  );
                  //give kill to author
                  Money.findOne(
                    {
                      userID: member1.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.kills = money.kills + 1;
                      money.coins = money.coins + loot;
                      money.save().catch((err) => console.log(err));
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
                      money.items.forEach((entry) => {
                        money.items.pull(entry);
                      });
                      money.deaths = money.deaths + 1;
                      money.coins = money.coins - loot;
                      money.save().catch((err) => console.log(err));
                    }
                  );
                  let embeda = new Discord.MessageEmbed()
                    .setTitle(
                      member1.user.username +
                        " has killed " +
                        member2.user.username +
                        " in a Trial By Combat!"
                    )
                    .setColor("RED")
                    .setTimestamp()
                    .attachFiles(["./assets/trialbycombatdeath.png"])
                    .setImage("attachment://trialbycombatdeath.png");
                  chan.send(embeda);
                  break;
                case 1:
                  message.channel.send(
                    member2.user.username +
                      " struck down and killed " +
                      member1.user.username
                  );
                  console.log("winner: " + member2.user.username);
                  //remove all roles except everyone and Old Gods
                  helper_functions.RolesRemover(member1);
                  //add The Dead role
                  member1.roles.add(deadrole).catch(console.error);
                  //win coins
                  Money.findOne(
                    {
                      userID: member2.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.coins = money.coins + trialcoins;
                      money.save().catch((err) => console.log(err));
                      let embed = new Discord.MessageEmbed()
                        .setColor("YELLOW")
                        .setTimestamp()
                        .attachFiles(["./assets/trial.png"])
                        .setImage("attachment://trial.png")
                        .setAuthor(
                          `${member2.user.username}` +
                            " received " +
                            trialcoins +
                            " coins for winning the Trial By Combat. He also looted " +
                            loot +
                            " from the dead."
                        );
                      embed.addField("Total Coins", money.coins, true);
                      return message.channel.send(embed);
                    }
                  );
                  //give kill to author
                  Money.findOne(
                    {
                      userID: member2.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.kills = money.kills + 1;
                      money.coins = money.coins + loot;
                      money.save().catch((err) => console.log(err));
                    }
                  );
                  //give death to mentioned member
                  Money.findOne(
                    {
                      userID: member1.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.items.forEach((entry) => {
                        money.items.pull(entry);
                      });
                      money.deaths = money.deaths + 1;
                      money.coins = money.coins - loot;
                      money.save().catch((err) => console.log(err));
                    }
                  );
                  let embedb = new Discord.MessageEmbed()
                    .setTitle(
                      member2.user.username +
                        " has killed " +
                        member1.user.username +
                        " in a Trial By Combat!"
                    )
                    .setColor("RED")
                    .setTimestamp()
                    .attachFiles(["./assets/trialbycombatdeath.png"])
                    .setImage("attachment://trialbycombatdeath.png");
                  chan.send(embedb);
                  break;
              }
              // message.delete({ timeout: 3000 });
            } else {
              message.reply("You must react with 👍 to accept the Duel");
              // message.delete({ timeout: 3000 });
            }
          })
          .catch((collected1) => {
            console.log(
              `After a minute, only ${collected1.size} out of reacted.`
            );
            message.reply(
              member2.user.username + " did not accept your challenge!"
            );
            // message.delete({ timeout: 3000 });
          });
      }
    } else {
      message.reply(
        "You must be in the Combat Channel in order to use ^trialbycombat. Channel Here <#728353086971576351>"
      );
    }
  },
};
