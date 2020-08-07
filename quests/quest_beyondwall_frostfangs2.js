//**As you continue to a frozen wasteland, you are all of the sudden surrounded by a group of Wights.**\n React with 1️⃣ to fight the group head on\n React with 2️⃣ to strike a couple down and run back to Castle Black

const Money = require("../models/profile.js");
const Discord = require("discord.js");
const wincoins = 30;

module.exports = {
  name: "quest_beyondwall_frostfangs2",
  description: "says quest_beyondwall_frostfangs2!",
  execute(message, args) {
    //quest_beyondwall_frostfangs
    console.log("entered quest_beyondwall_frostfangs2 command");
    var member;
    var coinchance = Math.floor(Math.random() * 10);

    console.log("see beyond wall frostfangs2 options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var chan = message.guild.channels.cache.get("714201504583516211"); //test
        if (reaction.emoji.name === "1️⃣") {
          //if you have dragonglass or obsidian u pass, else u die
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");

          //---------------------------------------------------
          //tracks
          //see if you have obsidian, skinchange, weirwood bow
          //---------------------------------------------------
          //FIND IF THEY HAVE ANY ITEMS ALREADY TO FLAG
          var obsidian = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097195722244176" //obsidian
            ) {
              obsidian = 1;
            }
          });
          var dragonglass = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "724761294246248469" //dragonglass
            ) {
              dragonglass = 1;
            }
          });
          //have skinchange?
          var skinchange = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097440082526279" //skinchange
            ) {
              skinchange = 1;
            }
          });
          var chance = Math.floor(Math.random() * 3);
          if (obsidian || dragonglass) {
            switch (chance) {
              case 0:
              case 2:
                //survive
                let embedA = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " was surrounded by a group of wights but managed to kill them all using Dragonglass and tore them to shreds as a warning to other wights."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/surroundedwin.png"])
                  .setThumbnail("attachment://surroundedwin.png");
                chan.send(embedA);
                message.reply(embedA);
                message.channel.send(
                  "You managed to kill all group of Wights with your valuable weapons. You continue on your quest"
                );
                //send next quest message
                setTimeout(function () {
                  let embed5_1 = new Discord.MessageEmbed()
                    .setTitle(
                      member.user.username +
                        " continued past the dead wights and after a few miles, is confronted by a group of Freefolk. There seems to be a misunderstanding..."
                    )
                    .setColor("WHITE")
                    .setTimestamp()
                    .attachFiles(["./assets/freefolkfind.png"])
                    .setThumbnail("attachment://freefolkfind.png");
                  chan.send(embed5_1);
                  message.reply(embed5_1);
                }, 15 * 1000);
                setTimeout(function () {
                  message.channel.send(
                    "**After kill the group of Wights you head past a Valley. There you run into a large gathering of Freefolk. One of them is huge with a Red Beard. He appears to hate Crows.**\n React with 1️⃣ to give your Chainmail Armour and Dragonglass as a gift against the White Walkers\n React with 2️⃣ to run back to Castle Black instead and report the gathering"
                  );
                }, 30 * 1000);
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
                        "You looted " +
                          wincoins +
                          " coins from the group of Wights!"
                      );
                    }
                    money.wightkills = money.wightkills + 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                break;
              case 1:
                //die
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
                member.roles.remove("728729459263406080"); //remove quest beyond wall role
                member.send("You were turned by the group of Wights!");
                message.channel.send(
                  member.user.username + " was turned by the group of Wights!"
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
                let embedB_1 = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " was carrying the weapons needed to kill Wights however the Group was too large he was Turned."
                  )
                  .setDescription(
                    "Careful with larger groups of Wights, they overpower you regardless of your weaopns..."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/turnedwight.png"])
                  .setThumbnail("attachment://turnedwight.png");
                chan.send(embedB_1);
                message.reply(embedB_1);
                break;
            }
          } else {
            //die
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
            member.roles.remove("728729459263406080"); //remove quest beyond wall role
            member.send("You were turned by the group of Wights!");
            message.channel.send(
              member.user.username + " was turned by the group of Wights!"
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
            let embedB = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " did not have any weapons that could kill the Wights and was turned."
              )
              .setDescription(
                "You should always carry a weapon that can kill Wights while Beyond the wall..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embedB);
            message.reply(embedB);
          }
        } else if (reaction.emoji.name === "2️⃣") {
          //must have skinchange or dies instantly
          message.reply(member.user.username + " reacted with 2️⃣");
          //have skinchange?
          var skinchange = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097440082526279" //skinchange
            ) {
              skinchange = 1;
            }
          });
          console.log("REACTED TEST");
          if (skinchange) {
            //survive
            let embedC = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " used his Skinchange ability to turn into a Dire Wolf and run past the group of Wights."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/skinchangewolf.png"])
              .setThumbnail("attachment://skinchangewolf.png");
            chan.send(embedC);
            message.reply(embedC);
            message.channel.send(
              "You managed to use your Skinchange ability to turn into a Dire Wolf and run past the group of Wights. You continue on your quest"
            );
            setTimeout(function () {
              message.channel.send(
                "**After dealing with the group of Wights you head past a Valley. There you run into a large gathering of Freefolk. One of them is huge with a Red Beard. He appears to hate Crows.**\n React with 1️⃣ to give your Chainmail Armour and Dragonglass as a gift against the White Walkers\n React with 2️⃣ to run back to Castle Black instead and report the gathering"
              );
            }, 30 * 1000);
          } else {
            //marker death
            //die
            //remove all roles except everyone and Old Gods and White Walkers and Night King
            member.roles.cache.forEach((role) => {
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
            member.roles.add("713901799324778587").catch(console.error); //white walker role
            member.roles.remove("728729459263406080"); //remove quest beyond wall role
            member.send("You were turned by the group of Wights!");
            message.channel.send(
              member.user.username + " was turned by the group of Wights!"
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
            let embedB = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " tried running from the Wights but did not make it."
              )
              .setDescription(
                "You should always carry a weapon that can kill Wights while Beyond the wall or if you run, make sure you have the speed of a Wolf..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embedB);
            message.reply(embedB);
          }
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
