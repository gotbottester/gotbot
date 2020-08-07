const Money = require("../models/profile.js");
const Discord = require("discord.js");
const wincoins = 30;

module.exports = {
  name: "quest_beyondwall_crasters",
  description: "says quest_beyondwall_crasters!",
  execute(message, args) {
    //quest_beyondwall_crasters
    console.log("entered quest_beyondwall_crasters command");
    var member;
    var coinchance = Math.floor(Math.random() * 10);

    console.log("see beyond wall crasters options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var chan = message.guild.channels.cache.get("714201504583516211"); //test
        var chan_questbeyondwall = message.guild.channels.cache.get(
          "728738536534048869"
        ); //quest beyond wall
        if (reaction.emoji.name === "1️⃣") {
          // 1 in 4 chance you die while sleeping at crasters keep
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 4);
          console.log("chance " + chance);
          switch (chance) {
            case 0:
            case 1:
            case 3:
              chance = 1;
              message.channel.send(
                member.user.username +
                  " asked Craster Permission to stay and rest for the night. Craster agreed. After a good nights sleep, you move along out of the Haunted Forest finally and Continue Quest here ->>> <#728738536534048869>."
              );

              //give coins only to member
              Money.findOne(
                {
                  userID: member.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  if (coinchance < 3) {
                    money.coins = money.coins + wincoins;
                    member.send(
                      "You were given " +
                        wincoins +
                        " coins from Craster to help you on your Quest!"
                    );
                  }

                  money.save().catch((err) => console.log(err));
                }
              );
              member.roles.remove("728720420273913857"); //remove quest beyond wall role
              member.roles.add("728725245149839420"); //quest3 role
              member.send(
                "You got some needed rest and made it past the Haunted Forest. Continue Quest here ->>> <#728738536534048869>"
              );
              let embed0 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " spent the night at Crasters Keep, ate like a King, fondled his wives, and is now continuing his Quest Beyond the Wall!"
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/beyondwallquest2.png"])
                .setThumbnail("attachment://beyondwallquest2.png");
              chan.send(embed0);
              chan_questbeyondwall.send(
                "**You must now decide a path. Towards the Fist of the First Men or towards Frostfangs?**\n React with 1️⃣ to go towards the Fist of the First Men\n React with 2️⃣ to go towards Frostfangs\n React with 3️⃣ to Quit Quest"
              );
              setTimeout(function () {
                console.log("--------quest timeout CRASTER entered----------");
                member.roles.remove("728725245149839420");
                // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Path question and was booted from the Quest.");
              }, 120 * 1000);
              break;
            case 2:
              chance = 0; //chance craster kills you while you sleep
              break;
          }
          if (chance == 0) {
            //remove all roles except everyone and Old Gods and White Walkers and Night King
            member.roles.cache.forEach((role) => {
              console.log("each role " + role.name);
              if (
                role != "707028782522826782" && //everyone
                role != "707032148493991947" && //old gods
                role != "712005922578366494" && //mod
                role != "730319761908563970" && //mod2
                role != "707094276458414143" && //lords of westeros
                role != "732050744466997340" && //direwolf
                role != "734148371308216332" && //direwolfghost
                role != "734148516800233502" && //shadowcat
                role != "739206804310982751" && //amulet
                role != "741145157885493251" //broadsword
              ) {
                member.roles.remove(role).catch(console.error);
              }
            });
            console.log("member " + member);
            member.roles.add("708346509367836702").catch(console.error); //dead role
            member.roles.remove("728720420273913857"); //remove quest beyond wall role
            member.send(
              "You were murdered by Craster during the night! He did not like the way you looked at his wives at dinner."
            );
            message.channel.send(
              member.user.username +
                " was murdered by Craster during the night! He did not like the way you looked at his wives at dinner."
            );
            //give death to member
            Money.findOne(
              {
                userID: member.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.items.forEach((entry) => {
                  money.items.pull(entry);
                });
                money.deaths = money.deaths + 1;
                money.save().catch((err) => console.log(err));
              }
            );
            let embed3 = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " slept at Crasters Keep but was murdered by Craster himself for jealousy over his wives! RIP Ranger."
              )
              .setDescription(
                "Next time do not look at his wives and sleep with one eye open..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/craster.png"])
              .setThumbnail("attachment://craster.png");
            chan.send(embed3);
          }
        } else if (reaction.emoji.name === "2️⃣") {
          //1 in 3 chance you die when attacking craster
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 3);
          console.log("chance " + chance);

          switch (chance) {
            case 0:
            case 2:
              chance = 1;
              message.channel.send(
                member.user.username +
                  " good choice. Craster was plotting to kill you that night anyways. He does not like Strangers near his wives."
              );

              //give kill to member
              Money.findOne(
                {
                  userID: member.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  if (coinchance < 3) {
                    money.coins = money.coins + wincoins;
                    member.send(
                      "You looted " +
                        wincoins +
                        " coins from Craster before burning his house down!"
                    );
                  }
                  money.kills = money.kills + 1;
                  money.save().catch((err) => console.log(err));
                }
              );
              member.roles.remove("728720420273913857"); //remove quest beyond wall role
              member.roles.add("728725245149839420"); //quest beyond wall 3 role
              member.send(
                "You killed Craster and burned his house down, smart move. He was going to kill you tonight. Continue Quest here ->>> <#728738536534048869>."
              );
              let embed4 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " killed Craster and burned his Keep down. He did not trust him enough to stay that night and rest. He continues on his Quest Beyond the Wall. "
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/craster2.png"])
                .setThumbnail("attachment://craster2.png");
              chan.send(embed4);
              chan_questbeyondwall.send(
                "**You must now decide a path. Towards the Fist of the First Men or towards Frostfangs?**\n React with 1️⃣ to go towards the Fist of the First Men\n React with 2️⃣ to go towards Frostfangs\n React with 3️⃣ to Quit Quest"
              );
              setTimeout(function () {
                console.log("--------quest timeout CRASTER entered----------");
                member.roles.remove("728725245149839420");
                // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Path question and was booted from the Quest.");
              }, 120 * 1000);
              break;
            case 1:
              chance = 0; //chance nights watch died so go to next steps to remove roles and kill, but he keeps dagger
              break;
          }

          if (chance == 0) {
            //remove all roles except everyone and Old Gods and White Walkers and Night King
            member.roles.cache.forEach((role) => {
              console.log("each role " + role.name);
              if (
                role != "707028782522826782" && //everyone
                role != "707032148493991947" && //old gods
                role != "712005922578366494" && //mod
                role != "730319761908563970" && //mod2
                role != "707094276458414143" && //lords of westeros
                role != "732050744466997340" && //direwolf
                role != "734148371308216332" && //direwolfghost
                role != "734148516800233502" && //shadowcat
                role != "739206804310982751" && //amulet
                role != "741145157885493251" //broadsword
              ) {
                member.roles.remove(role).catch(console.error);
              }
            });
            console.log("member " + member);
            member.roles.add("713901799324778587").catch(console.error); //white walker role
            member.roles.remove("728720420273913857"); //remove quest beyond wall role
            member.send(
              "The fire brought the attention of Wights and you were turned into a White Walker!"
            );
            message.channel.send(
              member.user.username +
                " with the large Fire, wights appeared and you were bitten and turned into a White Walker!"
            );
            //give death to member
            Money.findOne(
              {
                userID: member.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.items.forEach((entry) => {
                  money.items.pull(entry);
                });
                money.deaths = money.deaths + 1;
                money.save().catch((err) => console.log(err));
              }
            );
            let embed6 = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " murdered Craster and burned his house down! However, the large fire was seen from far and Wights surrounded him and bit him. He is now a White Walker!"
              )
              .setDescription(
                "Beware, for The Quest Beyond the Wall is rewarding but also very perilous."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embed6);
          }
        } else if (reaction.emoji.name === "3️⃣") {
          //return to castle black quit quest
          member.roles.remove("728720420273913857"); //remove quest beyond wall role
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
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 3000 });
          member.send("You did not react with the right emoji!");
        }
        // setTimeout(function () {
        //   console.log("--------quest timeout entered----------");
        //   member.roles.remove("728720420273913857");
        //   chan.send(member.user.username + " took longer than 1 minute to answer the Quest question and was booted from the Quest.");
        // }, 120 * 1000);
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
