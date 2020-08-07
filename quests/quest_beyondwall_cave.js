const Money = require("../models/profile.js");
const Discord = require("discord.js");
const wincoins = 100;

module.exports = {
  name: "quest_beyondwall_cave",
  description: "says quest_beyondwall_cave!",
  execute(message, args) {
    //quest_beyondwall_cave
    console.log("entered quest_beyondwall_cave command");
    var member;
    // var coinchance = Math.floor(Math.random() * 10);
    // let chance = Math.floor(Math.random() * 3);
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    // var chan = message.guild.channels.cache.get("714201504583516211"); //test
    var chanquest = message.guild.channels.cache.get("728742583790075904"); //4.2

    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["👍"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          //FIND IF THEY HAVE ANY ITEMS ALREADY TO FLAG
          //have obsidian?
          var obsidian = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097195722244176" //obsidian
            ) {
              obsidian = 1;
            }
          });
          //have greensight?
          var greensight = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097386982375435" //greensight
            ) {
              greensight = 1;
            }
          });
          //have weirwoodbow?
          var weirwoodbow = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097281370062881" //weirwoodbow
            ) {
              weirwoodbow = 1;
            }
          });
          //have obsidian?
          var skinchange = 0;
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "729097440082526279" //skinchange
            ) {
              skinchange = 1;
            }
          });
          //end of current item flagging
          var firstranger = 0;
          //have firstranger?
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "728750595904897106" //firstranger
            ) {
              firstranger = 1;
            }
          });
          var wargtrained = 0;
          //have wargtrained?
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "734150773327396886" //wargtrained
            ) {
              wargtrained = 1;
            }
          });
          var dragonglass = 0;
          //have dragonglass?
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "724761294246248469" //dragonglass
            ) {
              dragonglass = 1;
            }
          });
          //LOGIC
          if (firstranger == 1 && !wargtrained) {
            //send embed to quest channel CHILDREN
            let embed = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " found the Children of the Forest inside the Cave...lets see what they offer you..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/children.png"])
              .setImage("attachment://children.png")
            chanquest.send(embed);
            let embedA = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " found the Children of the Forest inside the Cave...lets see what they offer you..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/children.png"])
              .setImage("attachment://children.png")
            chan.send(embedA);
            if (dragonglass == 1 && obsidian != 1) {
              setTimeout(function () {
                //send embend to whispers channel 2
                let embed = new Discord.MessageEmbed()
                  .setTitle(
                    "The Children of the Forest noticed you are carrying Dragonglass. They have made you a Dragonglass Lance with it!"
                  )
                  .setDescription(
                    "The lance can free White Walkers from the Night King's spell using ^lance @user. That user then is protected by the magic of the Children of the Forest and immune to spears and bites for as long as the Night King exists."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/obsidianspear.png"])
                  .setImage("attachment://obsidianspear.png")
                  .addField("Quest Completion: ", `${wincoins} + Coins`);
                chan.send(embed);
                member.roles.remove("724761294246248469"); //remove dragon glass
                member.roles.add("729097195722244176"); //obsidian
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role //
                //give 100 coins to member for completing quest
                Money.findOne(
                  {
                    userID: member.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + wincoins;
                    money.items.push("Obsidian Lance");
                    money.save().catch((err) => console.log(err));
                  }
                );
              }, 30 * 1000);
            } else if (weirwoodbow != 1) {
              setTimeout(function () {
                //send embend to whispers channel 1
                let embed3 = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " was given a Weirdwood Bow by one of the Children of the Forest."
                  )
                  .setDescription(
                    "The Weirwood Bow is an item you might need on another Quest Beyond the Wall."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/weirwoodbow.png"])
                  .setImage("attachment://weirwoodbow.png")
                  .addField("Quest Completion: ", `${wincoins} + Coins`);
                chan.send(embed3);
                member.roles.add("729097281370062881"); //bow
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role
                //give 100 coins to member for completing quest
                Money.findOne(
                  {
                    userID: member.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + wincoins;
                    money.items.push("Weirwood Bow");
                    money.save().catch((err) => console.log(err));
                  }
                );
              }, 30 * 1000);
            } else if (dragonglass == 1 && obsidian == 1) {
              setTimeout(function () {
                member.send(
                  "You brought with you Dragonglass, however you already have Obsidian Lance, the Children ignored your presence!"
                );
                let embed6 = new Discord.MessageEmbed()
                  .setTitle(
                    "You brought with you Dragonglass, however you already have Obsidian Lance, the Children ignored your presence!"
                  )
                  .setDescription("First Rangers always see the Children only.")
                  .setColor("WHITE")
                  .setTimestamp()
                  .addField("Quest Completion: ", "Failed");
                chan.send(embed6);
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role
              }, 30 * 1000);
            } else if (dragonglass != 1 && weirwoodbow == 1) {
              setTimeout(function () {
                member.send(
                  "You already have a Weirwood Bow, the Children ignored your presence! They might prefer you bring something more unique along with your bow."
                );
                let embed7 = new Discord.MessageEmbed()
                  .setTitle(
                    "You already have a Weirwood Bow, the Children ignored your presence!"
                  )
                  .setDescription("First Rangers always see the Children only.")
                  .setColor("WHITE")
                  .setTimestamp()
                  .addField("Quest Completion: ", "Failed");
                chan.send(embed7);
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role
              }, 30 * 1000);
            }
          } else {
            //send embed to quest channel THREE EYED RAVEN
            let embed2 = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " found the Three Eyed Raven inside the Cave..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/threeeyedraven.png"])
              .setImage("attachment://threeeyedraven.png");
            chanquest.send(embed2);
            //send embed to quest channel THREE EYED RAVEN
            let embed2A = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " found the Three Eyed Raven inside the Cave..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/threeeyedraven.png"])
              .setImage("attachment://threeeyedraven.png");
            chan.send(embed2A);
            if (skinchange != 1) {
              //doesnt have skinchange so give him that
              setTimeout(function () {
                //send embend to whispers channel 4
                let embed5 = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " was given the Magic of Skin Changer by the Three Eyed Raven!"
                  )
                  .setDescription(
                    "Skin Changing allows you to have a certain time of immunity to death when using ^skinchange. It is also valuable in other Quests such as the path to Frostfangs Beyond the Wall."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/skinchanger.png"])
                  .setImage("attachment://skinchanger.png")
                  .addField("Quest Completion: ", `${wincoins} + Coins`);
                chan.send(embed5);
                member.roles.add("729097440082526279"); //skin changer
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role
                //give 100 coins to member for completing quest
                Money.findOne(
                  {
                    userID: member.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + wincoins;
                    money.items.push("Skinchanger");
                    money.save().catch((err) => console.log(err));
                  }
                );
              }, 30 * 1000);
            } else if (greensight != 1) {
              //has skinchange but not greensight so check to see if eligible for greensight
              if (wargtrained == 1) {
                //has wargtraining?
                setTimeout(function () {
                  //send embend to whispers channel 3
                  let embed4 = new Discord.MessageEmbed()
                    .setTitle(
                      member.user.username +
                        " has been trained as a Warg, therefore was given the Magic of Greensight by the Three Eyed Raven!"
                    )
                    .setDescription(
                      "Greensight opens up all House Channels including Small and Black Cell for the user for a certain amount of time using ^greensight"
                    )
                    .setColor("WHITE")
                    .setTimestamp()
                    .attachFiles(["./assets/greensight.png"])
                    .setImage("attachment://greensight.png")
                    .addField("Quest Completion: ", `${wincoins} + Coins`);
                  chan.send(embed4);
                  member.roles.add("729097386982375435"); //greensight
                  member.roles.remove("734150773327396886"); //remove warging
                  //remove quest - end
                  member.roles.remove("728742102275457076"); //remove quest beyond wall role

                  //give 100 coins to member for completing quest
                  Money.findOne(
                    {
                      userID: member.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.coins = money.coins + wincoins;
                      money.items.push("Greensight");
                      money.save().catch((err) => console.log(err));
                    }
                  );
                }, 30 * 1000);
              } else {
                //if no wargtraing, notify they need it to get greensight
                //send embend to whispers channel 3
                let embed9 = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " was offered to be taught the magic of Greensight but without Warg Training found past the Frostfangs, you cannot learn it."
                  )
                  .setDescription(
                    "Come back again once you have been trained as a Warg. There are rumors of a Warg master beyond the Frostfangs..."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/cave.png"])
                  .setThumbnail("attachment://cave.png")
                  .addField("Quest Completion: ", "Failed");
                chan.send(embed9);
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role
              }
            } else {
              //you have both, dont get anything new notification
              setTimeout(function () {
                member.send(
                  "You already have Greensight and Skinchanger. The Three Eyed Raven ignored your presence! Come back as a **First Ranger** to gain a different gift from the Cave."
                );
                let embed8 = new Discord.MessageEmbed()
                  .setTitle(
                    "You already have Greensight and Skinchanger, the Three Eyed Raven ignored your presence!"
                  )
                  .setDescription(
                    "Come back as a First Ranger to gain a different gift from the Cave."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .addField("Quest Completion: ", "Failed");
                chan.send(embed8);
                //remove quest - end
                member.roles.remove("728742102275457076"); //remove quest beyond wall role
              }, 30 * 1000);
            }
          }
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("728742102275457076");
          // chan.send(member.user.username + " took longer than 5 minute to answer the Cave question and was booted from the Quest.");
        }, 360 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("Could not enter cave.");
        message.delete({ timeout: 15000 });
      });
  },
};
