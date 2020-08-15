const Money = require("../models/profile.js");
const Discord = require("discord.js");
const roles = require("../helper_functions/rolesremover");
const wincoins = 30;

module.exports = {
  name: "quest_beyondwall_white",
  description: "says quest_beyondwall_white!",
  execute(message, args) {
    //quest_beyondwall_white
    console.log("entered quest_beyondwall_white command");
    var member;
    var coinchance = Math.floor(Math.random() * 10);

    console.log("see beyond wall white options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(async (collected) => {
        const reaction = collected.first();
        // var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        var chan = message.guild.channels.cache.get("707102776215208008"); //test
        var chan_questbeyond = message.guild.channels.cache.get(
          "728742583790075904"
        ); //

        let embeda = new Discord.MessageEmbed()
          .setTitle(
            member.user.username +
              " has encountered a powerful White Walker between him and the Cave!"
          )
          .setColor("WHITE")
          .setTimestamp()
          .attachFiles(["./assets/whiteintheway.png"])
          .setThumbnail("attachment://whiteintheway.png");
        chan.send(embeda);
        message.reply(embeda);
        if (reaction.emoji.name === "1️⃣") {
          //fight head on, if no valyrian dagger you lose instantly.
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 3);
          console.log("chance " + chance);
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
          switch (dagger) {
            case 0:
              message.channel.send(
                member.user.username +
                  " attempted to fight the White Walker without Valyrian Steel and lost! He was turned into a White Walker!"
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
              //remove all roles by calling rolesremover
              await roles.RolesRemover(member);

              member.roles.add("713901799324778587").catch(console.error); //white walker role
              member.roles.remove("728742102275457076"); //remove quest beyond wall 4.2 role

              member.send(
                "You died fighting the powerful White Walker without Valyrian Steel!"
              );
              let embed4 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " tried to fight the White Walker without Valyrian Steel and was turned into a White Walker!"
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/whitewins.png"])
                .setThumbnail("attachment://whitewins.png");
              chan.send(embed4);
              message.reply(embed4);
              break;
            case 1: //1 in 4 chance white walker kills you still
              let chance = Math.floor(Math.random() * 4);
              switch (chance) {
                case 0:
                case 2:
                case 3:
                  message.channel.send(
                    member.user.username +
                      " struck down the White Walker with his Valyrian Dagger and killed it! You should head back to Castle Black, or Continue on your Quest. -->>> <#728832044695552000>"
                  );
                  //give kill to member
                  Money.findOne(
                    {
                      userID: member.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.kills = money.kills + 1;
                      if (coinchance < 3) {
                        money.coins = money.coins + wincoins;
                        member.send(
                          "You looted " +
                            wincoins +
                            " coins from the Thenns stash!"
                        );
                      }
                      money.save().catch((err) => console.log(err));
                    }
                  );
                  let embed5 = new Discord.MessageEmbed()
                    .setTitle(
                      member.user.username +
                        " encountered a White Walker on his path. He struck it down with his Valyrian Dagger and continues onto a Cave he saw in the distance."
                    )
                    .setColor("WHITE")
                    .setTimestamp()
                    .attachFiles(["./assets/whitekilled.png"])
                    .setThumbnail("attachment://whitekilled.png");
                  chan.send(embed5);
                  message.reply(embed5);
                  //
                  setTimeout(function () {
                    let embed5_1 = new Discord.MessageEmbed()
                      .setTitle(
                        member.user.username +
                          " made it past the White Walker and into the Cave in the distance!"
                      )
                      .setColor("WHITE")
                      .setTimestamp()
                      .attachFiles(["./assets/cave.png"])
                      .setThumbnail("attachment://cave.png");
                    chan.send(embed5_1);
                    message.reply(embed5_1);
                  }, 15 * 1000);
                  //
                  setTimeout(function () {
                    chan_questbeyond.send(
                      "**Enter the Cave by reacting with 👍**"
                    );
                  }, 20 * 1000);
                  break;
                case 1:
                  message.channel.send(
                    member.user.username +
                      " fought the White Walker Bravely with his Valyrian Dagger, but this was no ordinary White Walker. This was the Night King's General himself!"
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
                  //remove all roles by calling rolesremover
                  await roles.RolesRemover(member);

                  member.roles.add("713901799324778587").catch(console.error); //white walker role
                  member.roles.remove("728742102275457076"); //remove quest beyond wall 4.2 role

                  member.send(
                    "You fought hard with your Valyrian Steel, however this was the General of the Night's King and he turned you!"
                  );
                  let embed4 = new Discord.MessageEmbed()
                    .setTitle(
                      member.user.username +
                        " fought the White Walker Bravely with his Valyrian Dagger, but this was no ordinary White Walker. This was the Night King's General himself!"
                    )
                    .setColor("WHITE")
                    .setTimestamp()
                    .attachFiles(["./assets/whitewins.png"])
                    .setThumbnail("attachment://whitewins.png");
                  chan.send(embed4);
                  message.reply(embed4);
                  break;
              }
              break;
          }
        } else if (reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          let chance = Math.floor(Math.random() * 2);
          console.log("chance " + chance);
          switch (chance) {
            case 0: //WIN
              chance = 1;
              message.channel.send(
                member.user.username +
                  " ran through cover of large rocks and made it to the Cave without the White Walker spotting him."
              );
              member.send(
                "You ran through cover of large rocks and made it to the cave without being spotted. Continue Quest here ->>> <#728832044695552000>"
              );
              let embed4 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " made it past the White Walker undetected and into the Cave in the distance!"
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/cave.png"])
                .setThumbnail("attachment://cave.png");
              chan.send(embed4);
              message.reply(embed4);
              setTimeout(function () {
                chan_questbeyond.send("**Enter the Cave by reacting with 👍**");
              }, 15 * 1000);
              break;
            case 1: //LOSE
              chance = 0; //chance nights watch died so go to next steps to remove roles and kill, but he keeps dagger
              break;
          }
          if (chance == 0) {
            //remove all roles by calling rolesremover
            await roles.RolesRemover(member);
            member.roles.add("713901799324778587").catch(console.error); //white walker role
            member.roles.remove("728742102275457076"); //remove quest beyond wall 4.2 role
            member.send(
              "You were bitten by the White Walker and turned into a White Walker!"
            );
            message.channel.send(
              member.user.username +
                " was bitten by the White Walker and turned into a White Walker!"
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
                  " was killed by the powerful White Walker in his path and turned into a White Walker!"
              )
              .setDescription(
                "Beware, for The Quest Beyond the Wall is rewarding but also very perilous."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/whitewins.png"])
              .setThumbnail("attachment://whitewins.png");
            chan.send(embed6);
            message.reply(embed6);
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
          console.log(
            "--------quest timeout POWERFUL WHITE WALKER entered----------"
          );
          member.roles.remove("728742102275457076");
          // chan.send(member.user.username + " took longer than 1 minute to answer the Powerfull White question and was booted from the Quest.");
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
