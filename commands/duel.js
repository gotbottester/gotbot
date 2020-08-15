const Discord = require("discord.js");
const Money = require("../models/profile.js");
var reward = 20;
var member1bonus = 0;
var mentionbonus = 0;
var winratio;
var fixedwinratio;
var cooldownduel = new Set();
var cdseconds = 600;

module.exports = {
  name: "duel",
  description: "says duel!",
  execute(message, args) {
    //duel - Duel
    if (cooldownduel.has(message.author.id)) {
      message.delete();
      console.log("STILL cooldownduel");
      return message.reply("There is a 10 minute cooldownduel Duels.");
    }
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    console.log("entered duel command");
    var member2 = message.mentions.members.first();
    var member1 = message.member;
    if (message.channel == "728353086971576351") {
      if (member2 == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (
        member1.roles.cache.has("708346509367836702") ||
        member1.roles.cache.has("713901799324778587") ||
        member1.roles.cache.has("713895055252783175") ||
        member1.roles.cache.has("716878672820306003") ||
        member1.roles.cache.has("708021014977708033") ||
        member1.roles.cache.has("722932439743463524") ||
        member1.roles.cache.has("742098398169268304")
      ) {
        //dead, white walker, night king, night king of westeros, king, black cell 722932439743463524
        message.reply("Only the living (and Not King) can use ^duel");
        return;
      } else if (
        member2.roles.cache.has("708346509367836702") ||
        member2.roles.cache.has("713901799324778587") ||
        member2.roles.cache.has("713895055252783175") ||
        member2.roles.cache.has("716878672820306003") ||
        member2.roles.cache.has("708021014977708033") ||
        member2.roles.cache.has("722932439743463524") ||
        member2.roles.cache.has("740747121707450401") ||
        member1.roles.cache.has("742098398169268304")
      ) {
        //dead
        message.reply(
          "You can only challenge the Living (and Not King or Bannerless) to ^duel"
        );
        return;
      } else if (member1.id == member2.id) {
        console.log("You cannot duel yourself!");
        message.reply("You cannot duel yourself.");
      } else {
        chan.send(
          member1.user.username +
            " has challenged " +
            member2.user.username +
            " to a Duel. Will he accept or be a branded a coward?"
        );
        console.log("saw duel message");
        message.mentions.members
          .first()
          .send(
            `You received a Friendly Duel challenge. If you win you gain ${reward} coins. If you lose you lose ${reward} coins. It is best to have more Weapons in your arsenal to help your chances of winning. If you wish to accept, react with 👍 on ^duel line in the Channel here ->>> <#728353086971576351>.`
          );
        const filter = (reaction, user) => {
          member1 = message.member; //get person who challenged
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
              cooldownduel.add(message.author.id);
              message.reply(member2.user.username + " Accepted Duel Challenge");
              var member1CombatScore = Math.random();
              var member2CombatScore = Math.random();

              console.log(
                "STARTING member1 and member2 combat scores " +
                  member1CombatScore +
                  " and " +
                  member2CombatScore
              );

              // //find sword stat to increment member1
              // Money.findOne(
              //   {
              //     userID: member1.id,
              //     guildID: message.guild.id,
              //   },
              //   (err, money) => {
              //     if (err) console.log(err);
              //     if (money.swordsmanxp > 5) {
              //       member1CombatScore += 0.1;
              //     } else if (money.swordsmanxp > 10) {
              //       member1CombatScore += 0.2;
              //     } else if (money.swordsmanxp > 15) {
              //       member1CombatScore += 0.3;
              //     } else if (money.swordsmanxp > 20) {
              //       member1CombatScore += 0.4;
              //     }

              //   }
              // );
              // console.log("bonus xp "+member1CombatScore);

              //member1 combat score tally
              if (member1.roles.cache.has("726663217950097458")) {
                //armor role
                member1CombatScore += 0.2;
              }
              // if (member1.roles.cache.has("732050744466997340")) {
              //   //pet direwolf
              //   member1CombatScore += 0.2;
              // }
              // if (member1.roles.cache.has("734148371308216332")) {
              //   //pet ghostwolf
              //   member1CombatScore += 0.3;
              // }
              // if (member1.roles.cache.has("734148516800233502")) {
              //   //pet shadowcat
              //   member1CombatScore += 0.4;
              // }
              if (member1.roles.cache.has("719083010091253770")) {
                //val dagger
                member1CombatScore += 0.1;
              }
              if (member1.roles.cache.has("737497341250109500")) {
                //shield
                member1CombatScore += 0.1;
              }
              if (member1.roles.cache.has("737497464852054026")) {
                //longsword
                member1CombatScore += 0.2;
              }
              if (member1.roles.cache.has("741145157885493251")) {
                //broadsword
                member1CombatScore += 0.2;
              }
              //lord items
              if (member1.roles.cache.has("742497869126434927")) {
                //widows wail
                member1CombatScore += 0.3;
              }
              if (member1.roles.cache.has("742489354911350955")) {
                //ice
                member1CombatScore += 0.3;
              }
              if (member1.roles.cache.has("742496368572235776")) {
                //war hammer
                member1CombatScore += 0.3;
              }
              if (member1.roles.cache.has("742494956895076564")) {
                //heartsbane
                member1CombatScore += 0.3;
              }
              if (member1.roles.cache.has("742496809108373515")) {
                //lady forlorn
                member1CombatScore += 0.3;
              }
              if (member1.roles.cache.has("743971539732660224")) {
                //flaming sword
                member1CombatScore += 0.5;
              }
              // //find sword stat to increment member2
              // Money.findOne(
              //   {
              //     userID: member2.id,
              //     guildID: message.guild.id,
              //   },
              //   (err, money) => {
              //     if (err) console.log(err);
              //     if (money.swordsmanxp > 5) {
              //       member2CombatScore += 0.1;
              //     } else if (money.swordsmanxp > 10) {
              //       member2CombatScore += 0.2;
              //     } else if (money.swordsmanxp > 15) {
              //       member2CombatScore += 0.3;
              //     } else if (money.swordsmanxp > 20) {
              //       member2CombatScore += 0.4;
              //     }
              //   }
              // );

              //member2 combat score tally
              if (member2.roles.cache.has("726663217950097458")) {
                //armor role
                member2CombatScore += 0.2;
              }
              // if (member2.roles.cache.has("732050744466997340")) {
              //   //pet direwolf
              //   member2CombatScore += 0.2;
              // }
              // if (member2.roles.cache.has("732050744466997340")) {
              //   //pet ghostwolf
              //   member2CombatScore += 0.3;
              // }
              // if (member2.roles.cache.has("732050744466997340")) {
              //   //pet shadowcat
              //   member2CombatScore += 0.4;
              // }
              if (member2.roles.cache.has("719083010091253770")) {
                //val dagger
                member2CombatScore += 0.1;
              }
              if (member2.roles.cache.has("737497341250109500")) {
                //shield
                member2CombatScore += 0.1;
              }
              if (member2.roles.cache.has("737497464852054026")) {
                //longsword
                member2CombatScore += 0.2;
              }
              if (member2.roles.cache.has("741145157885493251")) {
                //broadsword
                member2CombatScore += 0.2;
              }
              //lord items
              if (member2.roles.cache.has("742497869126434927")) {
                //widows wail
                member2CombatScore += 0.3;
              }
              if (member2.roles.cache.has("742489354911350955")) {
                //ice
                member2CombatScore += 0.3;
              }
              if (member2.roles.cache.has("742496368572235776")) {
                //war hammer
                member2CombatScore += 0.3;
              }
              if (member2.roles.cache.has("742494956895076564")) {
                //heartsbane
                member2CombatScore += 0.3;
              }
              if (member2.roles.cache.has("742496809108373515")) {
                //lady forlorn
                member2CombatScore += 0.3;
              }
              if (member2.roles.cache.has("743971539732660224")) {
                //flaming sword
                member2CombatScore += 0.5;
              }

              if (member1CombatScore > member2CombatScore) {
                console.log(
                  "member 1 wins battle " +
                    member1CombatScore +
                    " to " +
                    member2CombatScore
                );
                //win Coins
                Money.findOne(
                  {
                    userID: member1.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.swordsmanxp += 2;
                    money.coins += reward;
                    money.wins += 1;
                    money.save().catch((err) => console.log(err));
                    //calculate bonus items
                    winratio = money.wins / (money.wins + money.loss);
                    fixedwinratio = winratio.toFixed(2);
                    if (money.swordsmanxp > 100 && fixedwinratio >= 0.55 && !member1.roles.cache.has("741145157885493251")) {
                      //get broadsword
                      member1.roles.add("741145157885493251");
                      let embed = new Discord.MessageEmbed()
                        .setColor("NAVY")
                        .setTimestamp()
                        .attachFiles(["./assets/xp.png"])
                        .setThumbnail("attachment://xp.png")
                        .setTitle(
                          `${member1.user.username} is the Victor and gained a new Item at 100xp!`
                        )
                        .setDescription(
                          `${member1.user.username}` +
                            " received " +
                            reward +
                            " coins for winning the Duel. \n" +
                            `${member2.user.username}` +
                            " Lost " +
                            reward +
                            " coins for losing.\n\n***Hidden Item Gained***: You have gotten an elusive Broadsword for reaching 100xp and having over .55% Win Ratio! It provides +20 chance points in Duels."
                        );
                      embed.addField(`Combat Wins:`, money.wins, true);
                      embed.addField(`Swordsman XP:`, money.swordsmanxp, true);
                      return chan.send(embed);
                    } else {
                      let embed = new Discord.MessageEmbed()
                        .setColor("NAVY")
                        .setTimestamp()
                        .attachFiles(["./assets/melee.png"])
                        .setThumbnail("attachment://melee.png")
                        .setTitle(`${member1.user.username} is the Victor!`)
                        .setDescription(
                          `${member1.user.username}` +
                            " received " +
                            reward +
                            " coins for winning the Duel. \n" +
                            `${member2.user.username}` +
                            " Lost " +
                            reward +
                            " coins for losing.\n\n***How to Duel***: Type ^duel @membername to challenge someone within the combat channel only. They must react to your challenge message with :thumbsup:"
                        );
                      embed.addField(`Combat Wins:`, money.wins, true);
                      embed.addField(`Swordsman XP:`, money.swordsmanxp, true);
                      return chan.send(embed);
                    }
                  }
                );
                //give loss to mentioned member
                Money.findOne(
                  {
                    userID: member2.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.swordsmanxp -= 1;
                    money.coins -= reward;
                    money.loss += 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                setTimeout(() => {
                  cooldownduel.delete(message.author.id);
                  console.log("Cooldown duel finished " + message.author.id);
                  message.author.send(
                    "Duel cooldown ended. You may duel anytime."
                  );
                }, cdseconds * 1000);
              } else {
                console.log(
                  "member 2 wins battle " +
                    member1CombatScore +
                    " to " +
                    member2CombatScore
                );
                //win coins
                Money.findOne(
                  {
                    userID: member2.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.swordsmanxp += 2;
                    money.coins += reward;
                    money.wins += 1;
                    money.save().catch((err) => console.log(err));
                    //calculate bonus items
                    winratio = money.wins / (money.wins + money.loss);
                    fixedwinratio = winratio.toFixed(2);
                    if (money.swordsmanxp > 100 && fixedwinratio >= 0.55 && !member2.roles.cache.has("741145157885493251")) {
                      //get broadsword
                      member2.roles.add("741145157885493251");
                      let embed = new Discord.MessageEmbed()
                        .setColor("NAVY")
                        .setTimestamp()
                        .attachFiles(["./assets/xp.png"])
                        .setThumbnail("attachment://xp.png")
                        .setTitle(
                          `${member2.user.username} is the Victor and gained a new Item at 100xp!`
                        )
                        .setDescription(
                          `${member2.user.username}` +
                            " received " +
                            reward +
                            " coins for winning the Duel. \n" +
                            `${member1.user.username}` +
                            " Lost " +
                            reward +
                            " coins for losing.\n\n***Hidden Item Gained***: You have gotten an elusive Broadsword for reaching 100xp and having over .55% Win Ratio! It provides +20 chance points in Duels."
                        );
                      embed.addField(`Combat Wins:`, money.wins, true);
                      embed.addField(`Swordsman XP:`, money.swordsmanxp, true);
                      return chan.send(embed);
                    } else {
                      let embed = new Discord.MessageEmbed()
                        .setColor("NAVY")
                        .attachFiles(["./assets/duel.png"])
                        .setThumbnail("attachment://duel.png")
                        .setTitle(`${member2.user.username} is the Victor!`)
                        .setDescription(
                          `${member2.user.username}` +
                            " received " +
                            reward +
                            " coins for winning the Duel. \n" +
                            `${member1.user.username}` +
                            " Lost  " +
                            reward +
                            " coins for losing.\n\n***How to Duel***: Type ^duel @membername to challenge someone within the combat channel only. They must react to your challenge message with :thumbsup:"
                        );
                      embed.addField(`Combat Wins:`, money.wins, true);
                      embed.addField(`Swordsman XP:`, money.swordsmanxp, true);
                      return chan.send(embed);
                    }
                  }
                );
                //give loss to mentioned member
                Money.findOne(
                  {
                    userID: member1.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.swordsmanxp -= 1;
                    money.coins -= reward;
                    money.loss += 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                setTimeout(() => {
                  cooldownduel.delete(message.author.id);
                  console.log("Cooldown duel finished " + message.author.id);
                  message.author.send(
                    "Duel cooldown ended. You may duel anytime."
                  );
                }, cdseconds * 1000);
              }
            } else {
              message.reply("You must react with 👍 to accept the Duel");
            }
          })
          .catch((collected1) => {
            console.log(
              `After a minute, only ${collected1.size} out of reacted.`
            );
            message.reply(
              member2.user.username + " did not accept your challenge!"
            );
          });
      }
    } else {
      message.reply(
        "You must be in the Combat Channel in order to use ^duel. Channel Here <#728353086971576351>"
      );
    }
  },
};
