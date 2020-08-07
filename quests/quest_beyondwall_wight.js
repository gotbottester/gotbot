const Money = require("../models/profile.js");
const Discord = require("discord.js");
const wincoins = 30;

module.exports = {
  name: "quest_beyondwall_wight",
  description: "says quest_beyondwall_wight!",
  execute(message, args) {
    //quest_beyondwall_wight
    console.log("entered quest_beyondwall_wight command");
    var member;
    var coinchance = Math.floor(Math.random() * 10);

    console.log("see beyond wall wight options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣", "4️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var chan = message.guild.channels.cache.get("714201504583516211"); //test
        var chan_questbeyondwall = message.guild.channels.cache.get(
          "728718626344927252"
        ); //quest beyond wall
        if (reaction.emoji.name === "1️⃣") {
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 2); //WITHOUT VALYRIAN DAGGER 1 IN 2 CHANCE U GET TURNED
          let chance2 = Math.floor(Math.random() * 4); //WITH VALYRIAN DAGGER 1 IN 4 CHANCE U GET TURNED
          console.log("chance " + chance);
          console.log("chance " + chance2);
          var dagger = 0;
          //have dagger?
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "719083010091253770" //dagger
            ) {
              dagger = 1;
            }
          });
          if (!dagger) {
            switch (chance) {
              case 0:
              case 2:
                chance = 1;
                message.channel.send(
                  member.user.username +
                    " used his sword 🗡 against the White Walker and survived the Fight."
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
                        "You looted " + wincoins + " coins from the wight!"
                      );
                    }
                    money.wightkills = money.wightkills + 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                member.roles.remove("727677376191791105"); //remove quest beyond wall role
                member.roles.add("727748751522922499"); //ranger role
                member.roles.add("728720420273913857"); //next quest
                member.send(
                  "You used your sword 🗡 against the White Walker and survived the Fight. Continue Quest here ->>> <#728718626344927252>"
                );
                let embed = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " killed a Wight on his Quest Beyond the Wall! The Ranger continues on through the Haunted Forest."
                  )

                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/killedwight.png"])
                  .setThumbnail("attachment://killedwight.png");
                chan.send(embed);
                message.reply(embed);
                chan_questbeyondwall.send(
                  "**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 1️⃣ to ask Craster for Permission to stay the night\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest"
                );
                setTimeout(function () {
                  console.log("--------quest timeout WIGHT entered----------");
                  member.roles.remove("728720420273913857");
                  // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Path question and was booted from the Quest.");
                }, 120 * 1000);
                break;
              case 1:
                chance = 0; //chance nights watch died so go to next steps to remove roles and kill, but he keeps dagger
                break;
            }
          } else {
            switch (chance2) {
              case 0:
              case 1:
              case 3:
                chance2 = 1;
                message.channel.send(
                  member.user.username +
                    " used his sword 🗡 against the White Walker and survived the Fight."
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
                        "You looted " + wincoins + " coins from the wight!"
                      );
                    }
                    money.wightkills = money.wightkills + 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                member.roles.remove("727677376191791105"); //remove quest beyond wall role
                member.roles.add("727748751522922499"); //ranger role
                member.roles.add("728720420273913857"); //next quest
                member.send(
                  "You used your sword 🗡 against the White Walker and survived the Fight. Continue Quest here ->>> <#728718626344927252>"
                );
                let embed0 = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " killed a Wight on his Quest Beyond the Wall! The Ranger continues on through the Haunted Forest."
                  )

                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/killedwight.png"])
                  .setThumbnail("attachment://killedwight.png");
                chan.send(embed0);
                message.reply(embed0);
                chan_questbeyondwall.send(
                  "**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 1️⃣ to ask Craster for Permission to stay the night\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest"
                );
                setTimeout(function () {
                  console.log("--------quest timeout WIGHT entered----------");
                  member.roles.remove("728720420273913857");
                  // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Path question and was booted from the Quest.");
                }, 120 * 1000);
                break;
              case 2:
                chance2 = 0; //chance nights watch died so go to next steps to remove roles and kill, but he keeps dagger
                break;
            }
          }
          if (chance == 0 && chance2 == 0) {
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
            member.roles.remove("727748751522922499"); //remove quest beyond wall role
            member.send(
              "You were bitten by the Wight Beyond the Wall and turned into a White Walker!"
            );
            message.channel.send(
              member.user.username +
                " was bitten by the Wight Beyond the Wall and turned into a White Walker!"
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
                  " was killed by a Wight on his Quest Beyond the Wall and has turned into a White Walker!"
              )
              .setDescription(
                "Beware, for The Quest Beyond the Wall is rewarding but also very perilous."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embed3);
            message.reply(embed3);
          }
        } else if (reaction.emoji.name === "2️⃣") {
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
                  " ran behind a tree and struck down the Wight using his sword 🗡 and survived the Fight."
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
                      "You looted " + wincoins + " coins from the wight!"
                    );
                  }
                  money.wightkills = money.wightkills + 1;
                  money.save().catch((err) => console.log(err));
                }
              );
              member.roles.remove("727677376191791105"); //remove quest beyond wall role
              member.roles.add("727748751522922499"); //ranger role
              member.roles.add("728720420273913857"); //next quest
              member.send(
                "You ran behind a tree and struck down the Wight using his sword 🗡 and survived the Fight. Continue Quest here ->>> <#728718626344927252>"
              );
              let embed4 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " killed a Wight on his Quest Beyond the Wall! The Ranger continues on through the Haunted Forest."
                )
                .setDescription(
                  "Beyond the Wall Quests are available only as a Nights Watchmen. You can become a Ranger, or even a First Ranger by completing Quests Beyond the Wall. There is also a chance of looting coins and grabbing special Items you cannot purchase."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/killedwight.png"])
                .setThumbnail("attachment://killedwight.png");
              chan.send(embed4);
              message.reply(embed4);
              chan_questbeyondwall.send(
                "**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 1️⃣ to ask Craster for Permission to stay the night\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest"
              );
              setTimeout(function () {
                console.log("--------quest timeout WIGHT entered----------");
                member.roles.remove("728720420273913857");
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
            member.roles.remove("727677376191791105"); //remove quest beyond wall role
            member.send(
              "You were bitten by the Wight Beyond the Wall and turned into a White Walker!"
            );
            message.channel.send(
              member.user.username +
                " was bitten by the Wight Beyond the Wall and turned into a White Walker!"
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
                  " was killed by a Wight on his Quest Beyond the Wall and has turned into a White Walker!"
              )
              .setDescription(
                "Beware, for The Quest Beyond the Wall is rewarding but also very perilous."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embed6);
            message.reply(embed6);
          }
        } else if (reaction.emoji.name === "3️⃣") {
          message.reply(member.user.username + " reacted with 3️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 3);
          console.log("chance " + chance);
          switch (chance) {
            case 0:
            case 2:
              chance = 1;
              message.channel.send(
                member.user.username +
                  " was able to get his archers on the wall to help kill the Wight and make it back to Castle Black."
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
                      "You looted " + wincoins + " coins from the wight!"
                    );
                  }
                  money.wightkills = money.wightkills + 1;
                  money.save().catch((err) => console.log(err));
                }
              );
              member.roles.remove("727677376191791105"); //remove quest beyond wall role
              member.roles.add("727748751522922499"); //ranger role
              member.roles.add("728720420273913857"); //next quest
              member.send(
                "You were able to get his archers on the wall to help kill the Wight and make it back to Castle Black."
              );
              let embed7 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " killed a Wight on his Quest Beyond the Wall! The Ranger continues on through the Haunted Forest. Continue Quest here ->>> <#728718626344927252>"
                )
                .setDescription(
                  "Lord Commander of the Nights Watch can grant Nights Watch Members permission to go Beyond the Wall. Chances of running into a Wight are great so beware. If you kill a Wight you have a 1 in 3 chance of gaining 30 coins. You will gain a Ranger badge. The Ranger badge will be required for bigger quests Beyond the Wall."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/killedwight.png"])
                .setThumbnail("attachment://killedwight.png");
              chan.send(embed7);
              message.reply(embed7);
              chan_questbeyondwall.send(
                "**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 1️⃣ to ask Craster for Permission to stay the night\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest"
              );
              setTimeout(function () {
                console.log("--------quest timeout WIGHT entered----------");
                member.roles.remove("728720420273913857");
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
            member.roles.remove("727677376191791105"); //remove quest beyond wall role
            member.send(
              "The Wight was much faster than you and jumped on your back and bit you. You are now a White Walker!"
            );
            message.channel.send(
              member.user.username +
                " was chased down by a fast Wight and turned into a White Walker!"
            );
            //give death to member
            Money.findOne(
              {
                userID: member.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.deaths = money.deaths + 1;
                money.items.forEach((entry) => {
                  money.items.pull(entry);
                });
                money.save().catch((err) => console.log(err));
              }
            );
            let embed9 = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " was killed by a Wight on his Quest Beyond the Wall and has turned into a White Walker!"
              )
              .setDescription(
                "Beware, for The Quest Beyond the Wall is rewarding but also very perilous."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embed9);
            message.reply(embed9);
          }
        } else if (reaction.emoji.name === "4️⃣") {
          //return to castle black quit quest
          member.roles.remove("727677376191791105"); //remove quest beyond wall role
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
