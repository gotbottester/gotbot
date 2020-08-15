//**You arrive at the First of the First Men to find a Giant at the top of the Hill. He spots you, it is too late to run.**\n React with 1️⃣ to offer some jerky from your bag of food\n React with 2️⃣ to give him your Chainmail Armor to allow you to pass in peace\n React with 3️⃣ to Quit Quest

const Money = require("../models/profile.js");
const Discord = require("discord.js");
const roles = require("../helper_functions/rolesremover");
const db = require("../helper_functions/db_functions");
const wincoins = 30;

module.exports = {
  name: "quest_beyondwall_fistmen",
  description: "says quest_beyondwall_fistmen!",
  execute(message, args) {
    //quest_beyondwall_fistmen
    console.log("entered quest_beyondwall_fistmen command");
    var member;
    var coinchance = Math.floor(Math.random() * 10);

    console.log("see beyond wall fistmen options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(async (collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var chan = message.guild.channels.cache.get("714201504583516211"); //test
        //728742583790075904
        var chan_questbeyond = message.guild.channels.cache.get(
          "728742583790075904"
        ); //
        if (reaction.emoji.name === "1️⃣") {
          //1 in 3 chance giant does not accept your food offering
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 3);
          console.log("chance " + chance);
          switch (chance) {
            case 0:
            case 2:
              chance = 1;
              message.channel.send(
                member.user.username +
                  " offered Jerky to the Giant and he enjoyed it very much. He left you in peace."
              );
              member.send(
                "You offered the Giant some food and he let you pass. However the road ahead is trecherous, you should head back. If you wish, Continue on your Quest. -->>> <#728742583790075904>"
              );
              //give coins only to member
              db.givedeath(member);
              if (coinchance < 3) {
                money.coins = money.coins + wincoins;
                member.send(
                  "You snuck out " +
                    wincoins +
                    " coins from the Giants pile, while he turned his back."
                );
                db.givecoin(member, wincoins);
              }
              // Money.findOne(
              //   {
              //     userID: member.id,
              //     guildID: message.guild.id,
              //   },
              //   (err, money) => {
              //     if (err) console.log(err);
              //     if (coinchance < 3) {
              //       money.coins = money.coins + wincoins;
              //       member.send(
              //         "You snuck out " +
              //           wincoins +
              //           " coins from the Giants pile, while he turned his back."
              //       );
              //     }
              //     money.save().catch((err) => console.log(err));
              //   }
              // );
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " encountered a Giant at the First of the First Men! He offered the Giant some food and left him in peace. The Ranger continues on his Quest."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/pastfistmen.png"])
                .setThumbnail("attachment://pastfistmen.png");
              chan.send(embed);
              message.reply(embed);
              setTimeout(function () {
                chan_questbeyond.send(
                  "**You spot a Cave in the distance. A powerful White Walker on a Dead Horse is in your way!**\n React with 1️⃣ to run right at him and strike with a mighty blow!\n React with 2️⃣ to run through cover trying to get to the Cave\n React with 3️⃣ to Quit Quest"
                );
              }, 15 * 1000);
              break;
            case 1:
              chance = 0; //chance craster kills you while you sleep
              break;
          }
          if (chance == 0) {
            //remove all roles by calling rolesremover
            await roles.RolesRemover(member);
            console.log("member " + member);
            member.roles.add("708346509367836702").catch(console.error); //dead role
            member.roles.remove("728742102275457076"); //remove quest beyond wall 4.2 role
            member.send("You killed by the Giant! He prefers shiny objects!");
            message.channel.send(
              member.user.username +
                " was killed by the Giant for he prefers shiny objects!"
            );
            //give death to member
            db.givedeath(member);
            // Money.findOne(
            //   {
            //     userID: member.id,
            //     guildID: message.guild.id,
            //   },
            //   (err, money) => {
            //     if (err) console.log(err);
            //     money.items.forEach((entry) => {
            //       money.items.pull(entry);
            //     });
            //     money.deaths = money.deaths + 1;
            //     money.save().catch((err) => console.log(err));
            //   }
            // );
            let embed3 = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " encountered a Giant at the Fist of the First Men. He offered some food, but the Giant was in no mood and crushed him dead!"
              )
              .setDescription(
                "Next time you might be wise to offer the Giant a shiny object..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/giant.png"])
              .setThumbnail("attachment://giant.png");
            chan.send(embed3);
            message.reply(embed3);
          }
        } else if (reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          let armor = 0;
          //have armor?
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "726663217950097458" //armor
            ) {
              armor = 1;
            }
          });
          switch (armor) {
            case 0:
              chance = 1;
              message.channel.send(
                member.user.username +
                  " does not have a Chainmail armor to give! The Giant instantly crushes you!"
              );
              //give death to member
              db.givedeath(member);
              // Money.findOne(
              //   {
              //     userID: member.id,
              //     guildID: message.guild.id,
              //   },
              //   (err, money) => {
              //     if (err) console.log(err);
              //     money.items.forEach((entry) => {
              //       money.items.pull(entry);
              //     });
              //     money.deaths = money.deaths + 1;
              //     money.save().catch((err) => console.log(err));
              //   }
              // );
              //remove all roles by calling rolesremover
              await roles.RolesRemover(member);
              console.log("member " + member);
              member.roles.add("708346509367836702").catch(console.error); //dead role
              member.roles.remove("728742102275457076"); //remove quest beyond wall 4.2 role

              member.send(
                "You offered a Chainmail armor to the Giant but did not have one! They killed you!"
              );
              let embed4 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " offered a Chainmail armor to the Giant to pass in peace but did not have a armor with him! He was crushed instantly!"
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/giant.png"])
                .setThumbnail("attachment://giant.png");
              chan.send(embed4);
              message.reply(embed4);
              break;
            case 1:
              chance = 1;
              message.channel.send(
                member.user.username +
                  " gifted a Chainmail armor to the Giant. Giants love shiny objects not found in the North. Continue on your Quest. -->>> <#728742583790075904>"
              );
              member.roles.remove("726663217950097458"); //remove Chainmail armor
              member.send(
                "You gave the Giant your Chainmail armor and he let you pass in peace, however the roads are treacherous ahead, you should return home. If you rather go on, Continue on your Quest. -->>> <#728742583790075904>"
              );
              let embed5 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " encountered a Giant at the Fist of the First Men. He gave him his Chainmail Armor and the Giant was quite delighted. The Ranger continues on his Quest."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/pastfistmen.png"])
                .setThumbnail("attachment://pastfistmen.png");
              chan.send(embed5);
              message.reply(embed5);
              setTimeout(function () {
                chan_questbeyond.send(
                  "**You spot a Cave in the distance. A powerful White Walker on a Dead Horse is in your way!**\n React with 1️⃣ to run right at him and strike with a mighty blow!\n React with 2️⃣ to run through cover trying to get to the Cave\n React with 3️⃣ to Quit Quest"
                );
              }, 15 * 1000);
              break;
          }
        } else if (reaction.emoji.name === "3️⃣") {
          //return to castle black quit quest
          member.roles.remove("728742102275457076"); //remove quest beyond wall 4.2 role
          member.send("You quit the Quest and returned back to Castle Black");
          let embed10 = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " has quit his Quest Beyond the wall and returned to Castle Black."
            )
            .setDescription("Was he afraid to continue...")
            .setColor("WHITE")
            .setTimestamp()
            .attachFiles(["./assets/returnedtocastleblack.png"])
            .setThumbnail("attachment://returnedtocastleblack.png");
          chan.send(embed10);
          message.reply(embed10);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 3000 });
          member.send("You did not react with the right emoji!");
        }
        setTimeout(function () {
          console.log("--------quest timeout FIRST OF MEN entered----------");
          member.roles.remove("728742102275457076");
          // chan.send(member.user.username + " took longer than 1 minute to answer the Giant question and was booted from the Quest.");
        }, 60 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question beyond wall wight After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("You didn't react in time with an answer.");
        message.delete({ timeout: 10000 });
      });
  },
};
