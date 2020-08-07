//**After kill the group of Wights you head past a Valley. There you run into a large gathering of Freefolk. One of them is huge with a Red Beard. He appears to hate Crows.**\n React with 1️⃣ to give your Chainmail Armour and Dragonglass as a gift against the White Walkers\n React with 2️⃣ to run back to Castle Black instead and report the gathering

//**As you continue to a frozen wasteland, you are all of the sudden surrounded by a group of Wights.**\n React with 1️⃣ to fight the group head on\n React with 2️⃣ to strike a couple down and run back to Castle Black

const Money = require("../models/profile.js");
const Discord = require("discord.js");
const wincoins = 100;

module.exports = {
  name: "quest_beyondwall_frostfangs3",
  description: "says quest_beyondwall_frostfangs3!",
  execute(message, args) {
    //quest_beyondwall_frostfangs
    console.log("entered quest_beyondwall_frostfangs3 command");
    var member;

    console.log("see beyond wall frostfangs3 options question");
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
          //1 in 3 chance when attacking you die
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");

          //---------------------------------------------------
          //tracks
          //see if you have obsidian, skinchange, weirwood bow
          //---------------------------------------------------
          //FIND IF THEY HAVE ANY ITEMS ALREADY TO FLAG
          var dragonglass = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "724761294246248469" //dragonglass
            ) {
              dragonglass = 1;
            }
          });
          var chainmail = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "726663217950097458" //chainmail
            ) {
              chainmail = 1;
            }
          });
          if (dragonglass || chainmail) {
            if (dragonglass) {
              member.roles.remove("724761294246248469");
            }
            if (chainmail) {
              member.roles.remove("726663217950097458");
            }
            member.roles.add("734267092924104735").catch(console.error); //old tongue
            let embedA = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " has decided to offer the Freefolk his Valuable White Walker weapons to help them. They take this as a sign of friendship and welcome him."
              )
              .setDescription(
                "They let him stay a while and he learns the ways of the Old Tongue of the First Men, a language that could come in handy in other quests..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/freefolkhelp.png"])
              .setImage("attachment://freefolkhelp.png")
              .addField("Quest Completion: ", `${wincoins} + Coins`);
            chan.send(embedA);
            message.reply(embedA);
            message.channel.send(
              "You managed to learn the Old Tongue from the Freefolk. Keep this ability safe for it will help you on other Quests."
            );
            setTimeout(function () {
              member.roles.remove("728729459263406080"); //remove quest beyond wall role
            }, 10 * 1000);
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
            member.send(
              "You were struck down and killed by the Freefolk for not bearing any gifts and they felt threatened!"
            );
            message.channel.send(
              member.user.username +
                " was struck down and killed by the Freefolk for not bearing any gifts and they felt threatened!"
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
                  " did not have any gifts to offer the Freefolk and they already hate Crows, so they killed you."
              )
              .setDescription(
                "You should always carry a weapon that can kill Wights while Beyond the wall, such as Valyrian Dagger of Dragonglass..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/freefolkkill.png"])
              .setImage("attachment://freefolkkill.png");
            chan.send(embedB);
            message.reply(embedB);
            setTimeout(function () {
              member.roles.remove("728729459263406080"); //remove quest beyond wall role
            }, 10 * 1000);
          }
        } else if (reaction.emoji.name === "2️⃣") {
          //return to castle black quit quest
          member.send("You quit the Quest and returned back to Castle Black");
          let embed10 = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " ran into a gathering of Freefolk but decided to run back to Castle Black to report it instead of having the courage to meet them."
            )
            .setDescription("You lost a great opportunity...")
            .setColor("WHITE")
            .setTimestamp()
            .attachFiles(["./assets/returnedtocastleblack.png"])
            .setImage("attachment://returnedtocastleblack.png");
          chan.send(embed10);
          message.reply(embed10);
          setTimeout(function () {
            member.roles.remove("728729459263406080"); //remove quest beyond wall role
          }, 10 * 1000);
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
