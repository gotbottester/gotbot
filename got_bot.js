////////////////////////
////////////////////////

const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config.json");
const PREFIX = "^";
const fs = require("fs");
// const Age = require("./age.json");

//Profile/Coin System
const Money = require("./models/profile.js");
const mongoose = require("mongoose");
const pardon = require("./commands/pardon");
const questdagger = require("./quests/questdagger");
mongoose.connect(
);
//used to give King 100 coins on auto feature promoting new king
const kingcoins = 100;

//Command Handler
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Quests Handler
client.quests = new Discord.Collection();
const questsFiles = fs
  .readdirSync("./quests/")
  .filter((file) => file.endsWith(".js"));
for (const file of questsFiles) {
  const question = require(`./quests/${file}`);
  client.quests.set(question.name, question);
}

// var count_all_role_members;
var rolenamesOLD = "";
var nightwatchcount;
var whitewalkercount;

//passes the custom emoji id and resturns a string value. used for reactions on custom emojis section.
function emoji(id) {
  return client.emojis.cache.get(id).toString();
}

//-------------------------------------------------------------------------
// CLIENT ON READY
//-------------------------------------------------------------------------
client.on("ready", () => {
  console.log("Connected as " + client.user.username);

  client.user.setActivity("the Game of Thrones");
  client.user.setAFK(false);

  client.guilds.cache.forEach((guild) => {
    myguild = guild.id;
    console.log(guild.name + myguild);
    // guild.channels.cache.forEach((channel) => {
    //     console.log(` Channel Name - ${channel.name} ${channel.type} ${channel.id}`)
    // })
    //
    let channel = guild.channels.cache.get("707125742210777139"); //send to old gods testing channel
    let channel_w = guild.channels.cache.get("707102776215208008"); //send to whispers channel
    let channel_v = guild.channels.cache.get("721263752015511613"); //send to quest valyrian sword channel
    let channel_T = guild.channels.cache.get("714201504583516211"); //send to testing channel
    let channel_quest_blackcell = guild.channels.cache.get(
      "725581126290243594"
    ); //send to quest black cell channel
    let channel_quest_merchant = guild.channels.cache.get("729521244642476154"); //send to quest merchant channel
    let channel_quest_ironcoin = guild.channels.cache.get("735888376212750396"); //send to quest iron coin channel
    let channel_quest_lordoflight = guild.channels.cache.get(
      "736095446409281597"
    ); //send to quest lord of light channel
    let chan_questbeyondwall = guild.channels.cache.get("728738536534048869"); //TEST
    let channel_quest_beyondNW = guild.channels.cache.get("707288311596711958"); //send to nights watch channel //714201504583516211 //707288311596711958
    //
    var randdagger = Math.round(Math.random() * (7200 - 3600)) + 3600;
    var randIron = Math.round(Math.random() * (10800 - 3600)) + 3600;
    var randpriestess = Math.round(Math.random() * (3600 - 1800)) + 1800;
    var randBeyond = Math.round(Math.random() * (3600 - 1800)) + 1800;
    var randmerchant = Math.round(Math.random() * (3600 - 1800)) + 1800;

    var melisandreexist = 0;
    //--------------------------------------------
    // CHECK STRONGEST HOUSE HOURLY
    //--------------------------------------------
    setInterval(function () {
      channel.send("gotbottest"); //send it to whatever channel the bot has permissions to send on
      console.log("sent message gotbottest");
    }, 3600 * 1000);
    //--------------------------------------------
    // TAXES
    //--------------------------------------------
    setInterval(function () {
      console.log("test time");
      var today = new Date();
      var time = today.getHours();
      var housemembers = 0;
      var stimulus = 7;
      var bonus_smallcouncil = stimulus + 2;
      var taxes = 0.25;
      var total_stimulus = 0;
      var taxed_amount;
      var taxed_amount_member = stimulus * 0.75; //give to member
      var taxtoKing;
      var taxtoHand;
      var nostimulus = 0;
      if (time == 23) {
        console.log("time 23 == " + time);
        //see if night king exists, if not push taxes.
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("716878672820306003")) {
            nostimulus = 1;
          }
        });
        if (nostimulus != 1) {
          guild.members.cache.each((membs) => {
            if (
              membs.roles.cache.has("707069333494431854") || //stark
              membs.roles.cache.has("707069479833698326") || //lannister
              membs.roles.cache.has("707073920515309639") || //targaryen
              membs.roles.cache.has("707073997933772811") || //tully
              membs.roles.cache.has("707073467283144704") || //tyrell
              membs.roles.cache.has("708351845994725418") || //greyjoy
              membs.roles.cache.has("707073800474198078") || //arryn
              membs.roles.cache.has("707073882321846355") //baratheon
            ) {
              console.log(membs.user.username + " user has house role ");
              housemembers++;
              total_stimulus = total_stimulus + stimulus;
              if (
                membs.roles.cache.has("708021014977708033") ||
                membs.roles.cache.has("707250754020180079")
              ) {
                console.log("KING OR HAND DO NOTHING!!!");
              } else if (membs.roles.cache.has("712353382660309033")) {
                Money.findOne(
                  {
                    userID: membs.id,
                    guildID: myguild,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + bonus_smallcouncil;
                    money.save().catch((err) => console.log(err));
                  }
                );
                membs.send(
                  membs.user.username +
                    " , You received " +
                    bonus_smallcouncil +
                    " Coins today for being in the Small Council. You receive no taxes on that bonus."
                );
              } else {
                // everyone tax
                Money.findOne(
                  {
                    userID: membs.id,
                    guildID: myguild,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.coins = money.coins + taxed_amount_member;
                    money.save().catch((err) => console.log(err));
                  }
                );
                membs.send(
                  membs.user.username +
                    " , You received " +
                    stimulus +
                    " Coins today for being in a House. However the King has taxed .25% of your earnings"
                );
              }
            } else {
              console.log("user does not have house role");
            }
          });
          taxed_amount = total_stimulus * taxes;
          taxtoKing = taxed_amount * 0.75;
          taxtoHand = taxed_amount - taxtoKing;
          console.log("house members count = " + housemembers);
          console.log("total stimulus count = " + total_stimulus);
          console.log("total taxed amount = " + taxed_amount);
          console.log("king taxed amount = " + taxtoKing);
          console.log("hand taxed amount = " + taxtoHand);
          //for hand and king after calculations
          guild.members.cache.each((membs) => {
            //King tax
            if (membs.roles.cache.has("708021014977708033")) {
              Money.findOne(
                {
                  userID: membs.id,
                  guildID: myguild,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins + taxtoKing;
                  money.save().catch((err) => console.log(err));
                }
              );
              membs.send(
                membs.user.username +
                  " , You received %75 of the Taxed Amount from the members of all Houses which is a total of " +
                  taxtoKing
              );
            }
            //Hand tax
            if (membs.roles.cache.has("707250754020180079")) {
              Money.findOne(
                {
                  userID: membs.id,
                  guildID: myguild,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins + taxtoHand;
                  money.save().catch((err) => console.log(err));
                }
              );
              membs.send(
                membs.user.username +
                  " , You received %25 of the Taxed Amount from the members of all Houses which is a total of " +
                  taxtoHand
              );
            }
          });
          const embed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setTimestamp()
            .attachFiles(["./assets/coinbag.png"])
            .setThumbnail("attachment://coinbag.png")
            .setTitle("Stimulus + Taxes Daily Announcement")
            .setDescription(
              `Attention House Members of Westeros. You have received ${stimulus} coins each for being in a House. Those without a House, or in Essos will not get payments.\n However, the King has taxed you .25% of your ${stimulus} coins.\n\n The King has received ${Math.floor(
                taxtoKing
              )} and his Hand ${Math.floor(
                taxtoHand
              )}.\nThe Small Council have each received a tax free amount of ${bonus_smallcouncil}`
            )
            .addField(
              `Total Amount Taxed Today:`,
              `${taxed_amount} Coins from ${housemembers} House Members`
            );
          // .addField(`Based on Total # of House Members:`, `${housemembers}`);
          channel_w.send({
            embed,
          });
        } else {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setTimestamp()
            .attachFiles(["./assets/nostimulus.png"])
            .setThumbnail("attachment://nostimulus.png")
            .setTitle("No Stimulus Announcement")
            .setDescription(
              `While the Night King has taken over Westeros, there will not be any Stimulus payments. The Economy is shut down!`
            );
          channel_w.send({
            embed,
          });
        }
      } else {
        console.log("not time");
      }
    }, 3600 * 1000);
        //--------------------------------------------
    // MARKER QUEST TEST
    //--------------------------------------------
    // setInterval(function () {
    //   channel_T.send(
    //     "Quest for TEST. (First person to react to this message with 👍 within 30 seconds gets the Quest)"
    //   );
    // }, 10 * 1000);
    //--------------------------------------------
    // BLACK CELL QUEST
    //--------------------------------------------
    setInterval(function () {
      guild.members.cache.each((membs) => {
        if (membs.roles.cache.has("722932439743463524")) {
          console.log("found user with black cell role, send quest");

          //marker //black cell quest role 725406142670569502
          membs.send(
            "Varys: " +
              membs.user.username +
              " , you wish to know where my true loyalties lie? Not With Any King Or Queen, But With The People. I believe men of talent have a part to play in the war to come. I can help you, but you must choose your own path. Go to <#725581126290243594>"
          ); //send it to whatever channel the bot has permissions to send on
          membs.roles.add("725406142670569502").catch(console.error);
          console.log("sent message valyrian steel quest to accept");
          channel_quest_blackcell.send(
            "**Varys:** Choose your Path out:\n React with 1️⃣ Use this key to unlock the cell\n React with 2️⃣ Pretend you are dying\n React with 3️⃣ Grab me as a Hostage"
          ); //send it to whatever channel the bot has permissions to send on
        }
      });
    }, randmerchant * 1000);
    //--------------------------------------------
    // RED PRIESTESS AGE - QUEST
    //--------------------------------------------
    setInterval(function () {
      var today = new Date();
      var time = today.getHours();
      console.log("time priestess variable " + time);
      if (time == 15) {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("713409866764517517")) {
            console.log("found user with red priestess");
            Money.findOne(
              {
                userID: membs.id,
                guildID: membs.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                if (money.meliage > 5) {
                  membs.roles.remove("713409866764517517");
                  channel_w.send(
                    "The Red Priestess has reached the age limit of 5 days. Be ready for the quest to become one to re-appear shortly!"
                  );
                }
                money.meliage = money.meliage + 1;
                money.bloodmagicxp = 0;
                money.amuletuse = 0;
                money.save().catch((err) => console.log(err));
              }
            );
          }
        });
      }
    }, 1800 * 1000);
    //--------------------------------------------
    // DIRE WOLF AGE - PURCHASED
    //--------------------------------------------
    setInterval(function () {
      var today = new Date();
      var time = today.getHours();
      console.log("time wolf variable " + time);
      if (time == 12) {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("732050744466997340")) {
            console.log("found user with dire wolf");
            Money.findOne(
              {
                userID: membs.id,
                guildID: membs.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.wolfage = money.wolfage + 1;
                money.save().catch((err) => console.log(err));
              }
            );
          }
        });
      }
    }, 1800 * 1000);
    //--------------------------------------------
    // DIRE WOLF AGE - GHOST QUEST
    //--------------------------------------------
    setInterval(function () {
      var today = new Date();
      var time = today.getHours();
      console.log("time wolf variable " + time);
      if (time == 12) {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("734148371308216332")) {
            console.log("found user with dire wolf -GHOST");
            Money.findOne(
              {
                userID: membs.id,
                guildID: membs.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.wolfghostage = money.wolfghostage + 1;
                money.save().catch((err) => console.log(err));
              }
            );
          }
        });
      }
    }, 1800 * 1000);
    //--------------------------------------------
    // SHADOWCAT AGE - QUEST
    //--------------------------------------------
    setInterval(function () {
      var today = new Date();
      var time = today.getHours();
      console.log("time wolf variable " + time);
      if (time == 12) {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("734148516800233502")) {
            console.log("found user with shadowcat");
            Money.findOne(
              {
                userID: membs.id,
                guildID: membs.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.shadowcatage = money.shadowcatage + 1;
                money.save().catch((err) => console.log(err));
              }
            );
          }
        });
      }
    }, 1800 * 1000);
    //--------------------------------------------
    // RED PRIESTESS 1ST QUESTION
    //--------------------------------------------
    setInterval(function () {
      melisandreexist = 0;
      guild.members.cache.each((membs) => {
        if (membs.roles.cache.has("713409866764517517")) {
          //do nothing if melisandre found
          melisandreexist = 1;
          console.log("Melisandre exists on server");
          return;
        } else {
          console.log("Melisandre DOES NOT exist on server");
        }
      });
      console.log("RED PRIESTESS ALREADY EXISTS DO NOTHING");
      if (melisandreexist == 0) {
        channel_w.send(
          "Pray to the Lord of Light to learn the powerful dark arts of Blood Magic. (First person to react to this message with 👍 within 30 seconds gets the Quest)"
        ); //send it to whatever channel the bot has permissions to send on
        console.log("sent message red priestess quest to accept");

        //find those with ruby amulets and remove it
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("739206804310982751")) {
            membs.roles.remove("739206804310982751");
          }
        });
      }
    }, randpriestess * 1000);

    //--------------------------------------------
    // LORD COMMANDER 1ST QUESTION
    //--------------------------------------------
    setInterval(function () {
      lordexist = 0;
      guild.members.cache.each((membs) => {
        if (membs.roles.cache.has("715783930581876806")) {
          //do nothing if lord found
          lordexist = 1;
          console.log("Lord Commander exists on server");
        } else {
          console.log("Lord Commander DOES NOT exist on server");
        }
      });
      console.log("LORD COMMANDER ALREADY EXISTS DO NOTHING");
      if (lordexist == 0) {
        channel_quest_beyondNW.send(
          "Elections are here for Lord Commander. Only First Rangers may apply. (First person to react to this message with 👍 within 60 seconds gets the Quest)"
        ); //send it to whatever channel the bot has permissions to send on
        console.log("sent message lord commander quest to accept");
      }
    }, 1800 * 1000);
    //--------------------------------------------
    // BEYOND WALL QUEST in NW CHANNEL - 1st question
    //--------------------------------------------
    setInterval(function () {
      channel_quest_beyondNW.send(
        "He who wants to become a Nights Watch Ranger, and go on Quests beyond the Wall, react to this message with 👍 within 5 minutes to get this Quest."
      ); //send it to whatever channel the bot has permissions to send on
      console.log("sent message beyond wall quest to accept");
    }, randBeyond * 1000);

    //////////////////////////////////////////////////////////////////
    ///////////Merchant Quest Embed///////////
    //////////////////////////////////////////////////////////////////
    setInterval(function () {
      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor("The Merchant is here!")
        .setDescription(
          "Come on into my wagon fellow Westerosi, we have rare items not found in the Westeros Blacksmith...\nJust click on the 👍 below. (Only 1 person to react gets into Wagon)\nCannot be Dead or in Essos."
        )
        .attachFiles(["./assets/wagon.png"])
        .setImage("attachment://wagon.png");
      channel_w.send(embed).then((m) => {
        m.react("👍").then((r) => {
          var membertest;
          const reactFilter = (reaction, user) => {
            reaction.emoji.name === "👍";
            membertest = reaction.message.guild.member(user);
            if (user == client.user) {
              // console.log("ignore bot reaction");
            } else if (
              membertest.roles.cache.has("713901799324778587") ||
              membertest.roles.cache.has("708346509367836702") ||
              membertest.roles.cache.has("718167982106345592") ||
              membertest.roles.cache.has("714598666857349132")
            ) {
              membertest.send(
                "Cannot be Dead or in Essos to trade with the Wandering Merchant!"
              );
            } else {
              channel_w.send(membertest.user.username + " was the First to enter the creepy Merchant Wagon.");
              return ["👍"].includes(reaction.emoji.name);
            }
          };

          m.awaitReactions(reactFilter, { max: 1 })
            .then((collected) => {
              let args = membertest;
              client.quests
                .get("questmerchantman")
                .execute(channel_quest_merchant, args);
            })
            .catch(console.error);
        });
      });
    }, randmerchant * 1000);

    //////////////////////////////////////////////////////////////////
    ///////////Iron Coin Quest Embed///////////
    //////////////////////////////////////////////////////////////////
    setInterval(function () {
      let embed = new Discord.MessageEmbed()
        .setColor("GREY")
        .setAuthor("Jaqen is offering an Iron Coin to those he deems worthy!")
        .setDescription(
          "See if Jaqen deems you ready to get an Iron Coin. It can be sold for 100 coin at the Trade Merchant, or can be used to get to Braavos...\nJust click on the 👍 below. (Only 1 person to react gets Quest)\nCannot be Dead or in Essos"
        )
        .attachFiles(["./assets/ironcoinquest.png"])
        .setImage("attachment://ironcoinquest.png");
      channel_w.send(embed).then((m) => {
        m.react("👍").then((r) => {
          var membertest;
          const reactFilter = (reaction, user) => {
            reaction.emoji.name === "👍";
            membertest = reaction.message.guild.member(user);
            if (user == client.user) {
              // console.log("ignore bot reaction");
            } else if (
              membertest.roles.cache.has("713901799324778587") ||
              membertest.roles.cache.has("708346509367836702") ||
              membertest.roles.cache.has("718167982106345592") ||
              membertest.roles.cache.has("714598666857349132")
            ) {
              membertest.send(
                "Cannot be Dead or in Essos to get an Iron Coin!"
              );
            } else if (membertest.roles.cache.has("726588449263583339")) {
              membertest.send("Already have an Iron Coin!");
            } else {
              channel_w.send(membertest.user.username + " was the First to answer Jaqen's call.");
              return ["👍"].includes(reaction.emoji.name);
            }
          };

          m.awaitReactions(reactFilter, { max: 1 })
            .then((collected) => {
              let args = membertest;
              client.quests
                .get("questironcoin")
                .execute(channel_quest_ironcoin, args);
            })
            .catch(console.error);
        });
      });
    }, randIron * 1000);

    //////////////////////////////////////////////////////////////////
    ///////////Valyrian Dagger Quest Embed///////////
    //////////////////////////////////////////////////////////////////
    setInterval(function () {
      let embed = new Discord.MessageEmbed()
        .setColor("GREY")
        .setAuthor("A Valyrian Dagger is waiting for you to find it!")
        .setDescription(
          "Let's see how much you know about Valyrian Steel and you just might get a Valyrian Dagger as a prize...\nJust click on the 👍 below. (Only 1 person to react gets Quest)\nCannot be Dead or in Essos"
        )
        .attachFiles(["./assets/daggerquest.png"])
        .setImage("attachment://daggerquest.png");
      channel_w.send(embed).then((m) => {
        m.react("👍").then((r) => {
          var membertest;
          const reactFilter = (reaction, user) => {
            reaction.emoji.name === "👍";
            membertest = reaction.message.guild.member(user);
            if (user == client.user) {
              // console.log("ignore bot reaction");
            } else if (
              membertest.roles.cache.has("713901799324778587") ||
              membertest.roles.cache.has("708346509367836702") ||
              membertest.roles.cache.has("718167982106345592") ||
              membertest.roles.cache.has("714598666857349132")
            ) {
              membertest.send(
                "Cannot be Dead or in Essos to get a Valyrian Dagger!"
              );
            } else if (membertest.roles.cache.has("719083010091253770")) {
              membertest.send("Already have Valyrian Dagger!");
            } else {
              channel_w.send(membertest.user.username + " was the First to accepted the Valyrian Dagger Quest.");
              return ["👍"].includes(reaction.emoji.name);
            }
          };

          m.awaitReactions(reactFilter, { max: 1 })
            .then((collected) => {
              let args = membertest;
              client.quests.get("questdagger").execute(channel_v, args);
            })
            .catch(console.error);
        });
      });
    }, randdagger * 1000);
  });
});
//-------------------------------------------------------------------------
// CLIENT ON GUILD MEMBER JOINS / CREATE MONGO DB PROFILE
//-------------------------------------------------------------------------
client.on("guildMemberAdd", (guildMemberAdd) => {
  guildMemberAdd.roles.add("740747121707450401"); //bannerless
  console.log("Guild Member joined");
  Money.findOne(
    {
      userID: guildMemberAdd.id,
      guildID: guildMemberAdd.guild.id,
    },
    (err, money) => {
      if (err) console.log(err);
      if (!money) {
        const newMoney = new Money({
          guildID: guildMemberAdd.guild.id,
          userID: guildMemberAdd.id,
          username: guildMemberAdd.user.username,
        });
        newMoney.save().catch((err) => console.log(err));
      } else {
        guildMemberAdd.send(
          "Leaving the Game of Thrones Server and rejoining costs you a penalty of losing ALL your coins from your last count. Now you start with 0 coins."
        );
        money.coins = 0;
        money.save().catch((err) => console.log(err));
      }
    }
  );
});

//-------------------------------------------------------------------------
// CLIENT ON COMMAND HANDLER
//-------------------------------------------------------------------------
client.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "test":
      client.commands.get("test").execute(message, args);
      break;
    case "deserters":
      client.commands.get("deserters").execute(message, args);
      break;
    case "go_beyond":
      client.quests.get("quest_gobeyond").execute(message, args);
      break;
    case "give_amulet":
      client.commands.get("give_amulet").execute(message, args);
      break;
    case "amulet":
      client.commands.get("amulet").execute(message, args);
      break;
    case "blacksmith":
      client.commands.get("blacksmith").execute(message, args);
      break;
    case "topxp":
      client.commands.get("topxp").execute(message, args);
      break;
    case "timetest":
      client.commands.get("timetest").execute(message, args);
      break;
    case "flex":
      client.commands.get("flex").execute(message, args);
      break;
    case "sell_longsword":
      client.commands.get("sell_longsword").execute(message, args);
      break;
    case "sell_shield":
      client.commands.get("sell_shield").execute(message, args);
      break;
    case "buy_longsword":
      client.commands.get("buy_longsword").execute(message, args);
      break;
    case "buy_shield":
      client.commands.get("buy_shield").execute(message, args);
      break;
    case "combatinfo":
      client.commands.get("combatinfo").execute(message, args);
      break;
    case "buy_wolf":
      client.commands.get("buy_wolf").execute(message, args);
      break;
    case "pet_shadowcat":
      client.commands.get("pet_shadowcat").execute(message, args);
      break;
    case "pet_wolfghost":
      client.commands.get("pet_wolfghost").execute(message, args);
      break;
    case "pet_wolf":
      client.commands.get("pet_wolf").execute(message, args);
      break;
    case "inventory":
      client.commands.get("inventory").execute(message, args);
      break;
    case "questroles":
      client.commands.get("questroles").execute(message, args);
      break;
    case "quests":
      client.commands.get("allquests").execute(message, args);
      break;
    case "trade":
      client.commands.get("trade").execute(message, args);
      break;
    case "buy_dagger":
      client.commands.get("buy_dagger").execute(message, args);
      break;
    case "sell_dagger":
      client.commands.get("sell_dagger").execute(message, args);
      break;
    case "sell_ironcoin":
      client.commands.get("sell_ironcoin").execute(message, args);
      break;
    case "greensight":
      client.commands.get("greensight").execute(message, args);
      break;
    case "skinchange":
      client.commands.get("skinchange").execute(message, args);
      break;
    case "lance":
      client.commands.get("lance").execute(message, args);
      break;
    case "topwightkills":
      client.commands.get("topwightkills").execute(message, args);
      break;
    case "trialbycombat":
      client.commands.get("trialbycombat").execute(message, args);
      break;
    case "give_pass":
      client.commands.get("give_pass").execute(message, args);
      break;
    case "leave_small":
      client.commands.get("leave_small").execute(message, args);
      break;
    // case "bet_coin":
    //   client.commands.get("bet_coin").execute(message, args);
    //   break;
    // case "melee_bets":
    //   client.commands.get("melee_bets").execute(message, args);
    //   break;
    case "duel":
      client.commands.get("duel").execute(message, args);
      break;
    case "buy_revive":
      client.commands.get("buy_revive").execute(message, args);
      break;
    case "sell_armor":
      client.commands.get("sell_armor").execute(message, args);
      break;
    case "sell_armour":
      client.commands.get("sell_armor").execute(message, args);
      break;
    case "buy_armor":
      client.commands.get("buy_armor").execute(message, args);
      break;
    case "buy_armour":
      client.commands.get("buy_armor").execute(message, args);
      break;
    case "coins":
      client.commands.get("coins").execute(message, args);
      break;
    case "topcoins":
      client.commands.get("topcoins").execute(message, args);
      break;
    case "pay":
      client.commands.get("pay").execute(message, args);
      break;
    case "topkills":
      client.commands.get("topkills").execute(message, args);
      break;
    case "topdeaths":
      client.commands.get("topdeaths").execute(message, args);
      break;
    case "topquests":
      client.commands.get("topquests").execute(message, args);
      break;
    case "topwins":
      client.commands.get("topwins").execute(message, args);
      break;
    case "toploss":
      client.commands.get("toploss").execute(message, args);
      break;
    case "topescapes":
      client.commands.get("topescapes").execute(message, args);
      break;
    case "wall":
      client.commands.get("wall").execute(message, args);
      break;
    case "timeout":
      client.commands.get("timeout").execute(message, args);
      break;
    case "execute":
      client.commands.get("execute").execute(message, args);
      break;
    case "sentence":
      client.commands.get("sentence").execute(message, args);
      break;
    case "pardon":
      client.commands.get("pardon").execute(message, args);
      break;
    case "shadow":
      client.commands.get("shadow").execute(message, args);
      break;
    case "rise":
      client.commands.get("rise").execute(message, args);
      break;
    case "spear":
      client.commands.get("spear").execute(message, args);
      break;
    case "add_small":
      client.commands.get("add_small").execute(message, args);
      break;
    case "remove_small":
      client.commands.get("remove_small").execute(message, args);
      break;
    case "add_hand":
      client.commands.get("add_hand").execute(message, args);
      break;
    case "remove_hand":
      client.commands.get("remove_hand").execute(message, args);
      break;
    case "add_guard":
      client.commands.get("add_guard").execute(message, args);
      break;
    case "remove_guard":
      client.commands.get("remove_guard").execute(message, args);
      break;
    // case "remove_heir":
    //   client.commands.get("remove_heir").execute(message, args);
    //   break;
    // case "add_heir":
    //   client.commands.get("add_heir").execute(message, args);
    //   break;
    case "add_general":
      client.commands.get("add_general").execute(message, args);
      break;
    // case "dracarus":
    //   client.commands.get("dracarus").execute(message, args);
    //   break;
    case "revive":
      client.commands.get("revive").execute(message, args);
      break;
    case "bite":
      client.commands.get("bite").execute(message, args);
      break;
    case "jail":
      client.commands.get("jail").execute(message, args);
      break;
    case "free":
      client.commands.get("free").execute(message, args);
      break;
    case "give_dragonglass":
      client.commands.get("give_dragonglass").execute(message, args);
      break;
    case "give_dagger":
      client.commands.get("give_dagger").execute(message, args);
      break;
    case "give_armor":
      client.commands.get("give_armor").execute(message, args);
      break;
    case "buy_dragonglass":
      client.commands.get("buy_dragonglass").execute(message, args);
      break;
    // case "dragonglass":
    //   client.commands.get("dragonglass").execute(message, args);
    //   break;
  }
});
//////---------------------END OF CLIENT READY----------------------

//-------------------------------------------------------------------------
// CLIENT ON GUILDMEMBERUPDATE - when role is updated, announce it
//-------------------------------------------------------------------------
client.on("guildMemberUpdate", function (oldMember, newMember) {
  console.error(
    `a guild member changes - i.e. new role, removed role, nickname.`
  );

  let guild = client.guilds.cache.get("707028782522826782");

  const messagechannel = oldMember.guild.channels.cache.find(
    (r) => r.id === "713928006921617410"
  );

  // console.log("TESTING " + oldMember.roles.cache.size);
  if (!messagechannel) {
    return "Channel does not exist!";
    console.log("---------channel not found");
  }

  //-------------------------------------------------------------------------
  // remove bannerless role when they join a house
  //-------------------------------------------------------------------------
  if (
    oldMember.roles.cache.has("740747121707450401") && //has bannerless
    (newMember.roles.cache.has("707069333494431854") || //stark
    newMember.roles.cache.has("707069479833698326") || //lannister
    newMember.roles.cache.has("707073920515309639") || //targaryen
    newMember.roles.cache.has("707073997933772811") || //tully
    newMember.roles.cache.has("707073467283144704") || //tyrell
    newMember.roles.cache.has("708351845994725418") || //greyjoy
    newMember.roles.cache.has("707073800474198078") || //arryn
    newMember.roles.cache.has("707073882321846355") || //baratheon
    newMember.roles.cache.has("707074053881724989") || //nightswatch
      newMember.roles.cache.has("714598666857349132")) //essos
  ) {
    //bannerless
    newMember.roles.remove("740747121707450401"); //newcomer
    newMember.roles.remove("742098398169268304"); //limbo
  }
  //-------------------------------------------------------------------------
  // add hidden roles
  //-------------------------------------------------------------------------
  if (
    !newMember.roles.cache.has("736382370592325643") &&
    !newMember.roles.cache.has("740747121707450401") &&
    !newMember.roles.cache.has("741497047638736940") &&
    !newMember.roles.cache.has("742098398169268304")
  ) {
    //not have weapons && not have bannerless or limbo
    newMember.roles.add("736382370592325643");
  }
  if (
    !newMember.roles.cache.has("737819480935366687") &&
    !newMember.roles.cache.has("740747121707450401") &&
    !newMember.roles.cache.has("741497047638736940") &&
    !newMember.roles.cache.has("742098398169268304")
  ) {
    //not pets && not have bannerless or limbo
    newMember.roles.add("737819480935366687");
  }
  if (
    !newMember.roles.cache.has("738598180509450302") &&
    !newMember.roles.cache.has("740747121707450401") &&
    !newMember.roles.cache.has("741497047638736940") &&
    !newMember.roles.cache.has("742098398169268304")
  ) {
    //not quest items && not have bannerless or limbo
    newMember.roles.add("738598180509450302");
  }

  //-------------------------------------------------------------------------
  // When a User changes their role, announce it
  //-------------------------------------------------------------------------
  if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    // console.log("----- ENTERED IF USER CHANGED ROLE");

    const embed = new Discord.MessageEmbed()
      .setColor("ORANGE")
      .setTimestamp()
      .attachFiles(["./assets/throne128.png"])
      .setThumbnail("attachment://throne128.png")
      .setAuthor(`${oldMember.user.username}` + " Has Switched Allegiance To ");
    // .addField(`Member:`, `${oldMember.user.username} (${oldMember.id})`);

    for (const role of newMember.roles.cache.map((x) => x.id)) {
      if (!oldMember.roles.cache.has(role)) {
        embed.addField(
          `New House:`,
          `${oldMember.guild.roles.cache.get(role).name}`
        );
      }
    }
    messagechannel.send({
      embed,
    });
  }

  //-------------------------------------------------------------------------
  // When a user changes from NightsWatch to something else announce it (DESERTER)
  //-------------------------------------------------------------------------
  const messagechanneldeserter = oldMember.guild.channels.cache.find(
    (r) => r.id === "707102776215208008"
  );

  const firstRole = oldMember.guild.roles.cache.find(
    (r) => r.name == "NightsWatch"
  );
  const secondRole = newMember.guild.roles.cache.find(
    (r) => r.name == "NightsWatch"
  );
  const thirdRole = newMember.guild.roles.cache.find(
    (r) => r.name == "Deserter"
  );
  const dead = newMember.guild.roles.cache.find((r) => r.name == "The Dead");
  const whitewalker = newMember.guild.roles.cache.find(
    (r) => r.name == "White Walkers"
  );
  const pardonrole = "726124627440435261";
  const deserterrole = "715781455560573001";
  const ranger = "727748751522922499";
  const firstranger = "728750595904897106";

  //-------------------------------------------------------------------------
  // Remove deserter if dead or white walker
  //-------------------------------------------------------------------------

  if (
    newMember.roles.cache.has(dead.id) ||
    newMember.roles.cache.has(whitewalker.id)
  ) {
    if (newMember.roles.cache.has(thirdRole.id)) {
      newMember.roles.remove(thirdRole.id); //loses deserter
    }
  }
  //-------------------------------------------------------------------------
  // add deserter if leaves nights watch
  //-------------------------------------------------------------------------

  if (!oldMember.roles.cache.has(pardonrole)) {
    if (
      oldMember.roles.cache.has(firstRole.id) &&
      !newMember.roles.cache.has(secondRole.id)
    ) {
      setTimeout(function () {
        if (
          !newMember.roles.cache.has(dead.id) ||
          !newMember.roles.cache.has(whitewalker.id)
        ) {
          newMember.roles.add(thirdRole.id); //gains deserter
          newMember.roles.remove(ranger); //loses ranger
          newMember.roles.remove(firstranger); //losers first ranger
          console.log("user is dead, not a deserter");
        }
      }, 10 * 1000);

      // const embed = new Discord.MessageEmbed()
      //   .setColor("BLACK")
      //   .setTimestamp()
      //   .attachFiles(["./assets/deserter.png"])
      //   .setThumbnail("attachment://deserter.png")
      //   .setAuthor(
      //     `${oldMember.user.username}` +
      //       " has Deserted the NightsWatch! He can now be executed by the Lord Commander."
      //   )
      //   .setDescription("If a First Ranger or Ranger desert the Nights Watch, they lose that role. The only safe places for Deserters are if they are protected by the King in the Small Council or Essos.")
      // messagechanneldeserter.send({
      //   embed,
      // });
    }
  } else {
    console.log("found pardon role do nothing");
  }

  //-------------------------------------------------------------------------
  // When a user joins nights watch remove Pardon role and Deserters role if exists
  //-------------------------------------------------------------------------
  if (oldMember.roles.cache.has(pardonrole)) {
    console.log("FOUND pardon role");
    if (
      !oldMember.roles.cache.has(firstRole.id) &&
      newMember.roles.cache.has(secondRole.id)
    ) {
      newMember.roles.remove(pardonrole);
    }
  } else {
    console.log("did NOT FIND pardon role do nothing");
  }
  if (oldMember.roles.cache.has(deserterrole)) {
    console.log("FOUND deserter role");
    if (
      !oldMember.roles.cache.has(firstRole.id) &&
      newMember.roles.cache.has(secondRole.id)
    ) {
      newMember.roles.remove(deserterrole);
    }
  } else {
    console.log("did NOT FIND deserter role do nothing");
  }
  //-------------------------------------------------------------------------
  // When a user goes to Essos show embed
  //-------------------------------------------------------------------------
  const essosrole = "714598666857349132";
  if (
    !oldMember.roles.cache.has(essosrole) &&
    newMember.roles.cache.has(essosrole)
  ) {
    const embedEssos = new Discord.MessageEmbed()
      .setColor("DARK_ORANGE")
      .setTitle(newMember.user.username + " has fleed to Essos!")
      .setDescription(
        "Essos Exiles cannot be Executed or Jailed by laws of Westeros. They also cannot participate in Westeros Quests."
      )
      .attachFiles("./assets/essos.png")
      .setImage("attachment://essos.png");
    client.channels.cache.get("707102776215208008").send(embedEssos);
  }
});
///------------END OF GUILDMEMBER UPDATE----------------------------------

//-------------------------------------------------------------------------
// CLIENT ON MESSAGE
//-------------------------------------------------------------------------
client.on("message", (receivedMessage) => {
  //exit if the author is the bot otherwise it loops forever
  // if (receivedMessage.author == client.user) {
  //   console.log("omg");
  //   return;
  // }
  // if (receivedMessage.content.startsWith("^addcoinsonetime")) {
  //   console.log(coinstoadd + " coins");
  //   client.guilds.cache.each((guild) => {
  //     guild.members.cache.each((membs) => {
  //       console.log("user " + membs.user.username);
  //       Money.findOne(
  //         {
  //           userID: membs.id,
  //           guildID: receivedMessage.guild.id,
  //         },
  //         (err, money) => {
  //           if (err) console.log(err);
  //           if (!money) {
  //             const newMoney = new Money({
  //               guildID: receivedMessage.guild.id,
  //               userID: membs.id,
  //               username: membs.user.username,
  //             });
  //             newMoney.save().catch((err) => console.log(err));
  //           }
  //         }
  //       );
  //     });
  //   });
  // }

  //HIDDEN COMMANDS
  // if (receivedMessage.content == "^print") {
  //   var chan = receivedMessage.guild.channels.cache.get("714201504583516211"); //test

  //   //test add to array
  //   Money.findOne(
  //     {
  //       userID: receivedMessage.member.id,
  //       guildID: receivedMessage.guild.id,
  //     },
  //     (err, money) => {
  //       if (err) console.log(err);
  //       if (money.items === null) {
  //         console.log("has no items");
  //       } else {
  //         var countitems = 0;
  //         console.log("has items");
  //         let embed = new Discord.MessageEmbed()
  //           .setTitle(receivedMessage.member.user.username + "'s Inventory")
  //           .setColor("AQUA")
  //           .attachFiles(["./assets/inventory.png"])
  //           .setThumbnail("attachment://inventory.png")
  //           money.items.forEach(entry => {
  //             embed.addField('Item',entry);
  //             countitems++;
  //           })
  //           embed.setDescription(`Total Items: ${countitems}`)
  //         chan.send(embed);
  //       }
  //     }
  //   );
  // }

  if (receivedMessage.content == "^clear") {
    //HELP WITH QUEST QUESTION DIDNT SHOW UP
    // let channel_test = client.channels.cache.get("728742532099604560"); //TEST
    // channel_test.send(
    //   "**You travel through the Frostfangs and are surrounded by a group of cannibal Thenns.**\n React with 1️⃣ to strike first and kill them all\n React with 2️⃣ to give them a Valyarian Dagger to allow you to pass in peace\n React with 3️⃣ to Quit Quest"
    // );
    let channel_test = client.channels.cache.get("707288311596711958"); //TEST
    channel_test.send(
      "He who wants to become a Nights Watch Ranger, and go on Quests beyond the Wall, react to this message with 👍 within 5 minutes to get this Quest."
    );

    // //////TESTING EMBED

    // let embed = new Discord.MessageEmbed()
    //   .setColor("GREEN")
    //   .setAuthor("The Merchant is here!")
    //   .setDescription(
    //     "Come on into my wagon follow Westerosi, we have rare items not found in the Westeros Blacksmith... Only 1 person is allowed at a time!"
    //   )
    //   .attachFiles(["./assets/wagon.png"])
    //   .setImage("attachment://wagon.png");
    // channel_test.send(embed).then((m) => {
    //   m.react("👍").then((r) => {
    //     var membertest;
    //     const reactFilter = (reaction, user) => {
    //       reaction.emoji.name === "👍";
    //       membertest = reaction.message.guild.member(user);
    //       if (user == client.user) {
    //         console.log("dontcountgotbot");
    //       } else if (membertest.roles.cache.has("707074053881724989")) {
    //         //not working
    //         channel_test.send("NO KINGS ALLOWED");
    //       } else {
    //         return ["👍"].includes(reaction.emoji.name);
    //       }
    //     };

    //     m.awaitReactions(reactFilter, { max: 1 })
    //       .then((collected) => {
    //         let args = membertest;
    //         client.commands
    //           .get("questmerchantman")
    //           .execute(receivedMessage, args);
    //         // m.delete();
    //       })
    //       .catch(console.error);
    //   });
    // });

    //////////END TESTING EMBED
  }
  //END HIDDEN COMMANDS

  //QUEST BEYOND WALL - nights watch start
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "He who wants to become a Nights Watch Ranger, and go on Quests beyond the Wall, react to this message with 👍 within 5 minutes to get this Quest."
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_beyondwall_start").execute(receivedMessage, args);
  }
  //QUEST BEYOND WALL - wight
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**As you travel through the Haunted Forest, a Wight appears and attacks you!**\n React with 1️⃣ to fight the Wight head on\n React with 2️⃣ to run for cover and get the Wight by surprise\n React with 3️⃣ retreat back to Castle Black fast\n React with 4️⃣ to Quit Quest"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_beyondwall_wight").execute(receivedMessage, args);
  }
  //**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest
  //QUEST BEYOND WALL - nights watch quest2
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 1️⃣ to ask Craster for Permission to stay the night\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest"
  ) {
    let args = receivedMessage.content;
    client.quests
      .get("quest_beyondwall_crasters")
      .execute(receivedMessage, args);
  }
  //QUEST BEYOND WALL - nights watch quest3
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**You must now decide a path. Towards the Fist of the First Men or towards Frostfangs?**\n React with 1️⃣ to go towards the Fist of the First Men\n React with 2️⃣ to go towards Frostfangs\n React with 3️⃣ to Quit Quest"
  ) {
    let args = receivedMessage.content;
    client.quests
      .get("quest_beyondwall_pathchoice")
      .execute(receivedMessage, args);
  }

  //QUEST BEYOND WALL - nights watch quest4-1
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**You travel through the Frostfangs and are surrounded by a group of cannibal Thenns.**\n React with 1️⃣ to strike first and kill them all\n React with 2️⃣ to give them a Valyarian Dagger to allow you to pass in peace\n React with 3️⃣ to Quit Quest"
  ) {
    let args = receivedMessage.content;
    client.quests
      .get("quest_beyondwall_frostfangs")
      .execute(receivedMessage, args);
  }
  //QUEST BEYOND WALL - nights watch quest4-1
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**You arrive at the First of the First Men to find a Giant at the top of the Hill. He spots you, it is too late to run.**\n React with 1️⃣ to offer some jerky from your bag of food\n React with 2️⃣ to give him your Chainmail Armor to allow you to pass in peace\n React with 3️⃣ to Quit Quest"
  ) {
    let args = receivedMessage.content;
    client.quests
      .get("quest_beyondwall_fistmen")
      .execute(receivedMessage, args);
  }
  //**You spot a Cave in the distance. A powerful White Walk on a Dead Horse is in your way!**\n React with 1️⃣ to run right at him and strike with a mighty blow!\n React with 2️⃣ to run through cover trying to get to the Cave\n React with 3️⃣ to Quit Quest
  //QUEST BEYOND WALL - nights watch quest5-0-1
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**You spot a Cave in the distance. A powerful White Walker on a Dead Horse is in your way!**\n React with 1️⃣ to run right at him and strike with a mighty blow!\n React with 2️⃣ to run through cover trying to get to the Cave\n React with 3️⃣ to Quit Quest"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_beyondwall_white").execute(receivedMessage, args);
  }
  //**Enter the Cave by reacting with **
  //QUEST BEYOND WALL - nights watch quest5-1-1
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content == "**Enter the Cave by reacting with 👍**"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_beyondwall_cave").execute(receivedMessage, args);
  }
  //after giving Thenns valyrian steel
  //"**As you continue to a frozen wasteland, you are all of the sudden surrounded by a group of Wights.**\n React with 1️⃣ to fight the group head on\n React with 2️⃣ to strike a couple down and run back to Castle Black"
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**As you continue to a frozen wasteland, you are all of the sudden surrounded by a group of Wights.**\n React with 1️⃣ to fight the group head on\n React with 2️⃣ to strike a couple down and run back to Castle Black"
  ) {
    let args = receivedMessage.content;
    client.quests
      .get("quest_beyondwall_frostfangs2")
      .execute(receivedMessage, args);
  }
  //after passing group of wights
  //**After kill the group of Wights you head past a Valley. There you run into a large gathering of Freefolk. One of them is huge with a Red Beard. He appears to hate Crows.**\n React with 1️⃣ to give your Chainmail Armour and Dragonglass as a gift against the White Walkers\n React with 2️⃣ to run back to Castle Black instead and report the gathering
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**After dealing with the group of Wights you head past a Valley. There you run into a large gathering of Freefolk. One of them is huge with a Red Beard. He appears to hate Crows.**\n React with 1️⃣ to give your Chainmail Armour and Dragonglass as a gift against the White Walkers\n React with 2️⃣ to run back to Castle Black instead and report the gathering"
  ) {
    let args = receivedMessage.content;
    client.quests
      .get("quest_beyondwall_frostfangs3")
      .execute(receivedMessage, args);
  }
  //Quest for TEST. (First person to react to this message with 👍 within 30 seconds gets the Quest)
  //QUEST TEST
  // if (
  //   receivedMessage.author == client.user &&
  //   receivedMessage.content ==
  //     "Quest for TEST. (First person to react to this message with 👍 within 30 seconds gets the Quest)"
  // ) {
  //   let args = receivedMessage.content;
  //   client.quests.get("quest_test").execute(receivedMessage, args);
  // }
  // //TEST:\n React with 1️⃣ \n React with 2️⃣ \n React with 3️⃣
  // if (
  //   receivedMessage.author == client.user &&
  //   receivedMessage.content ==
  //     "TEST:\n React with 1️⃣ \n React with 2️⃣ \n React with 3️⃣"
  // ) {
  //   let args = receivedMessage.content;
  //   client.quests.get("quest_test1").execute(receivedMessage, args);
  // }
  //QUEST IRON COIN
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Quest for Iron Coin. (First person to react to this message with 👍 within 30 seconds gets the Quest)"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_ironcoin").execute(receivedMessage, args);
  }
  //**Jaqen H'ghar**: Why do you seek a Man? A Man has duties be quick:\n React with 1️⃣ I want to kill people\n React with 2️⃣ I want to become a Faceless Man like you\n React with 3️⃣ I want to serve the Many Faced God of Death
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Jaqen H'ghar**: Why do you seek a Man? A Man has duties be quick:\n React with 1️⃣ I want to kill people\n React with 2️⃣ I want to become a Faceless Man like you\n React with 3️⃣ I want to serve the Many Faced God of Death"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_ironcoin1").execute(receivedMessage, args);
  }
  //Pray to the Lord of Light to learn the powerful dark arts of Blood Magic. (First person to react to this message with 👍 within 30 seconds gets the Quest)
  //QUEST RED PRIESTESS
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Pray to the Lord of Light to learn the powerful dark arts of Blood Magic. (First person to react to this message with 👍 within 30 seconds gets the Quest)"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_redpriestess").execute(receivedMessage, args);
  }
  //Light your flame among us, R'hllor. Show us the truth or falseness of this man. Strike him down if he is guilty, and give strength to his sword if he is true. Lord of Light, give us wisdom.:\n React with 1️⃣ Lord of Light, defend us\n React with 2️⃣ Lord of Light, shine your face upon us\n React with 3️⃣ For the night is dark and full of terrors
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Light your flame among us, R'hllor. Show us the truth or falseness of this man. Strike him down if he is guilty, and give strength to his sword if he is true. Lord of Light, give us wisdom.:\n React with 1️⃣ Lord of Light, defend us\n React with 2️⃣ Lord of Light, shine your face upon us\n React with 3️⃣ For the night is dark and full of terrors"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_redpriestess1").execute(receivedMessage, args);
  }

  //QUEST LORD COMMANDER
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Elections are here for Lord Commander. Only First Rangers may apply. (First person to react to this message with 👍 within 60 seconds gets the Quest)"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_lord").execute(receivedMessage, args);
  }
  //Why should you be appointed the Lord Commander of the Nights Watch?\n React with 1️⃣ Because I am an experienced Ranger\n React with 2️⃣ Because I was born to be one\n React with 3️⃣ Because I want to protect the realm
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Why should you be appointed the Lord Commander of the Nights Watch?\n React with 1️⃣ Because I am an experienced Ranger\n React with 2️⃣ Because I was born to be one\n React with 3️⃣ Because I want to protect the realm"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_lord1").execute(receivedMessage, args);
  }
  //QUEST BRAAVOS
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "A boat is leaving for Braavos. Hurry before it sails. (First person to react with 👍 within 10 seconds gets the Quest)"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_braavos").execute(receivedMessage, args);
  }
  //**Jaqen H'ghar**: Why do you seek a Man? A Man has duties be quick:\n React with 1️⃣ I want to kill people\n React with 2️⃣ I want to become a Faceless Man like you\n React with 3️⃣ I want to serve the Many Faced God of Death
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Boat Captain**: You have an Iron Coin!? How did you....(You say, Valar Morghulis. What does the Captain say back?):\n React with 1️⃣ Vlar Doaeris\n React with 2️⃣ V'lar Morghulis\n React with 3️⃣ Valar Doh'aris\n React with 4️⃣ V'lar D'ohaeris"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_braavos2").execute(receivedMessage, args);
  }
  //PROD
  //QUEST BLACK CELL
  //escape **Varys:** YOU ESCAPED AND FOUND A SMUGGLER IS TAKING YOU TO ESSOS WHERE YOU WILL BE SAFE FROM THE KING!
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** YOU ESCAPED AND FOUND A SMUGGLER IS TAKING YOU TO ESSOS WHERE YOU WILL BE SAFE FROM THE KING!"
  ) {
    let embed = new Discord.MessageEmbed()
      .setTitle(
        "Someone has Escaped the Black Cell! He has found his way to Essos."
      )
      .setColor("BLACK")
      .setTimestamp()
      .attachFiles(["./assets/escape.png"])
      .setThumbnail("attachment://escape.png");
    client.channels.cache.get("707102776215208008").send(embed);
  }
  //blackcell - 1st question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Choose your Path out:\n React with 1️⃣ Use this key to unlock the cell\n React with 2️⃣ Pretend you are dying\n React with 3️⃣ Grab me as a Hostage"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell").execute(receivedMessage, args); //marker
  }
  //blackcell1 - 2nd question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Take the stairs down to the tunnels\n React with 2️⃣ Take the left way through the Hall\n React with 3️⃣ Take the right way through the Hall"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell1").execute(receivedMessage, args); //marker
  }
  //blackcell2 - 2nd question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Play dead as they open cell\n React with 2️⃣ Grab guard and his dagger as a hostage\n React with 3️⃣ Knock Guard out and lock him in cell"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell2").execute(receivedMessage, args); //marker
  }
  //blackcell3 - 2nd question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Walk Varys down the left Hall\n React with 2️⃣ Walk Varys down the right Hall\n React with 3️⃣ Let Varys go and get into the tunnels"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell3").execute(receivedMessage, args); //marker
  }
  //blackcell1 - 3rd question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Go left in the Tunnel\n React with 2️⃣ Go right in the Tunnel"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell1_1").execute(receivedMessage, args); //marker
  }
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Go left in the Hall\n React with 2️⃣ Go right in the Hall"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell1_2").execute(receivedMessage, args); //marker
  }
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Go right in the Hall\n React with 2️⃣ Go left in the Hall"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell1_3").execute(receivedMessage, args); //marker
  }
  //blackcell2 - 3rd question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Run out the left Hallway\n React with 2️⃣ Run out the right Hallway"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell2_1").execute(receivedMessage, args); //marker
  }
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Kill Guard and run out\n React with 2️⃣ Use Guard as hostage and have him sneak you out"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell2_2").execute(receivedMessage, args); //marker
  }
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Wear Guards clothing and walk out\n React with 2️⃣ Run out while you can"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell2_3").execute(receivedMessage, args); //marker
  }
  //blackcell3 - 3rd question
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Kill Varys and run out as Guards are distracted\n React with 2️⃣ Have Varys cause a scene while you sneak out"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell3_1").execute(receivedMessage, args); //marker
  }
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Walk Varys down the left Hall\n React with 2️⃣ Walk Varys down the right Hall"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell3_2").execute(receivedMessage, args); //marker
  }
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "**Varys:** Take the next path:\n React with 1️⃣ Run through the tunnels fast to find a way out\n React with 2️⃣ Creep through the tunnels to find a way out"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_blackcell3_3").execute(receivedMessage, args); //marker
  }
  ////////////////////////////////////////////////

  //QUEST 719083010091253770 valyrian dagger role
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Quest for Valyrian Dagger: Helps against White Walker Bites at the Wall. (First person to react to this message with 👍 within 5 minutes gets the Quest)"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_dagger").execute(receivedMessage, args);
  }
  // //QUEST 719083010091253770 valyrian steel role QUESTION 1
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Maester: What is the name of the Valyrian Steel sword carried by Eddard Stark? (You have 30 seconds to answer)\n React with 1️⃣ Heartsbane\n React with 2️⃣ Longclaw\n React with 3️⃣ Oathkeeper\n React with 4️⃣ Ice"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_dagger1").execute(receivedMessage, args);
  }
  // // //QUEST 719083010091253770 valyrian steel role QUESTION 2
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Maester: Which of the following is not a Valyrian Sword? (You have 30 seconds to answer)\n React with 1️⃣ Blackfyre\n React with 2️⃣ Brightroar\n React with 3️⃣ Dark Sister\n React with 4️⃣ Oath Maker"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_dagger2").execute(receivedMessage, args);
  }
  // // //QUEST 719083010091253770 valyrian steel role QUESTION 3
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Maester: Where else can you find Valyrian Steel? (You have 30 seconds to answer)\n React with 1️⃣ Faceless Chain Armor\n React with 2️⃣ Maester Chain Links\n React with 3️⃣ The Crown\n React with 4️⃣ Gendry's Workshop"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_dagger3").execute(receivedMessage, args);
  }
  // // //QUEST 719083010091253770 valyrian steel role QUESTION 4
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Maester: Who gave Arya a Valyrian Dagger? (You have 30 seconds to answer)\n React with 1️⃣ Jon Snow\n React with 2️⃣ Little Finger\n React with 3️⃣ Bran\n React with 4️⃣ The Hound"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_dagger4").execute(receivedMessage, args);
  }
  // // //QUEST 719083010091253770 valyrian steel role QUESTION 5
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content ==
      "Maester: Where is Valyrian Steel from? (You have 30 seconds to answer)\n React with 1️⃣ Valyrian City\n React with 2️⃣ Essos\n React with 3️⃣ Valyrian Freehold\n React with 4️⃣ Pentos"
  ) {
    let args = receivedMessage.content;
    client.quests.get("quest_dagger5").execute(receivedMessage, args);
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //--------------BEGIN AUTO CHECK GOTBOTTEST--------------------------------
  //-------------------------------------------------------------------------
  //exit if received message from author and does not have the 'gotbottest' command
  if (
    receivedMessage.author == client.user &&
    receivedMessage.content == "gotbottest"
  ) {
    console.log("received");
    receivedMessage.delete({ timeout: 1000 });

    //-------------------------------------------------------------------------
    // GET TOP ROLE AUTO - auto when the bot sends message 'gotbotest' in testing channel
    //-------------------------------------------------------------------------

    //LEARNED FROM DEV DUNGEON
    // client.guilds.cache.each(guild => guild.roles.cache.each(role => console.log("TESTING AUTO ROLE LOOP" + role.name)));

    var rolenames = [];
    var rolesizes = [];
    var roleid = [];

    client.guilds.cache.each((guild) => {
      guild.roles.cache.each((role) => {
        // console.log("TESTING AUTO ROLE LOOP" + role.name, role.id);
        let roleID = role.id;
        let membersWithRole = guild.roles.cache.get(roleID).members;
        let roleName = role.name;
        let roleSize = membersWithRole.size;
        // console.log(
        //   "TESTING AUTO ROLE LOOP rolename " + roleName + " Count " + roleSize
        // );

        if (
          roleName == "House Lannister" ||
          roleName == "House Stark" ||
          roleName == "House Tully" ||
          roleName == "House Arryn" ||
          roleName == "House Baratheon" ||
          roleName == "House Tyrell" ||
          roleName == "House Targaryen" ||
          roleName == "House Greyjoy" ||
          roleName == "NightsWatch" ||
          roleName == "White Walkers"
        ) {
          rolenames.push(roleName);
          rolesizes.push(roleSize);
          roleid.push(roleID);
          // console.log("test " + roleName + " size " + roleSize);
        }
      });
    });

    var highScoreSoFar = 0;
    var result;
    var index;

    for (var i = 0; i < rolenames.length; i++) {
      if (rolesizes[i] > highScoreSoFar) {
        if (rolenames[i] != "NightsWatch") {
          //count NightsWatch but ignore it as top house
          result = rolesizes[i];
          highScoreSoFar = rolesizes[i];
          index = i;
        }
      }
      if (rolenames[i] == "NightsWatch") {
        //count NightsWatch for dead war
        nightwatchcount = rolesizes[i];
      }
      if (rolenames[i] == "White Walkers") {
        //count white walkers for dead war
        whitewalkercount = rolesizes[i];
      }
    }

    console.log(" TEST OLD " + rolenamesOLD);
    console.log(" TEST NEW " + rolenames[index]);
    console.log(
      " TEST MOST MEMBERS IS " + result + " of role " + rolenames[index]
    );

    var housebanner;
    switch (rolenames[index]) {
      case "House Lannister":
        housebanner = "house_lannister.png";
        break;
      case "White Walkers":
        housebanner = "nightking.png";
        break;
      // case "NightsWatch":
      //   housebanner = "nights_watch.png";
      //   break;
      case "House Stark":
        housebanner = "house_stark.png";
        break;
      case "House Tully":
        housebanner = "house_tully.png";
        break;
      case "House Greyjoy":
        housebanner = "house_greyjoy.png";
        break;
      case "House Baratheon":
        housebanner = "house_baratheon.png";
        break;
      case "House Tyrell":
        housebanner = "house_tyrell.png";
        break;
      case "House Arryn":
        housebanner = "house_arryn.png";
        break;
      case "House Targaryen":
        housebanner = "house_targaryen.png";
        break;
      default:
        housebanner = "newstronghouse.png";
    }

    /////////////////START OF NIGHT KING PROCESS/////////////////////
    //-----------------------------------------------------------------------------------------------------
    // WHITE WALKERS AND NIGHT KING RULES but nightwatch still not = white walker
    //-----------------------------------------------------------------------------------------------------
    // changes role color of white walkers to night king color
    // loops through to find current King and removes his role
    // loops through to find current Hand and removes his role
    // loops through to find current Small Council and removes his role
    // loops through to find current Kingsguard and removes his role
    // loop through Nightswatch to find new Night King and Message channel
    // loop through all NightsWatch and remove lord commander for failing
    //-----------------------------------------------------------------------------------------------------
    var countnightkingloops = 0;

    var isthereNightKingofWesteros = 0;
    client.guilds.cache.each((guild) => {
      guild.members.cache.each((membs) => {
        if (membs.roles.cache.has("713895055252783175")) {
          //night king of westeros
          isthereNightKingofWesteros = 1;
        }
      });
    });
    console.log("is there " + isthereNightKingofWesteros);
    ////// WARNING TO ALL THAT WHITE WALKERS ARE AT THE WALL
    if (
      whitewalkercount == nightwatchcount &&
      isthereNightKingofWesteros == 0
    ) {
      const embedwarning = new Discord.MessageEmbed()
        .setColor("#000000")
        .setTitle(
          "The White Walkers are at the Wall and ready to break through. The Realm needs more men at the Nights Watch before its too late!"
        )
        .setDescription(
          "When White Walkers are more than Nights Watch, they break in and the Night King is risen. The King must send his men to the wall to battle the White Walkers with Dragon Glass. It is up to the living to hold the dead back."
        )
        .attachFiles("./assets/wightsatwall.png")
        .setThumbnail("attachment://wightsatwall.png");
      client.channels.cache.get("707102776215208008").send(embedwarning);
    }
    ////// WARNING TO ALL THAT NIGHTS WATCH NEEDS 1 MORE
    if (
      whitewalkercount == nightwatchcount &&
      isthereNightKingofWesteros == 1
    ) {
      const embedwarning1 = new Discord.MessageEmbed()
        .setColor("#000000")
        .setTitle(
          "The Nights Watch just needs 1 more to push the Night King and his White Walkers back. Join fast!"
        )
        .setDescription(
          "After the Night King takes over Westeros, the only way to defeat him is to have him pushed back by having more Nights Watchmen then White Walkers."
        )
        .attachFiles("./assets/needwatchmen.png")
        .setThumbnail("attachment://needwatchmen.png");
      client.channels.cache.get("707102776215208008").send(embedwarning1);
    }
    ////// IF WHITE WALKERS TOP HOUSE, NIGHTWATCH COUNT LESS THAN WHITE WALKERS, AND NO EXISTING NIGHT KING OF WESTEROS(ONCE THERE IS, NO NEED TO GO IN AGAIN)
    if (
      whitewalkercount > nightwatchcount &&
      isthereNightKingofWesteros == 0
      // rolenames[index] == "White Walkers" &&
      // isthereNightKingofWesteros == 0
    ) {
      console.log(
        "------------------------------------------WHITE WALKERS RULE, NIGHTS LESS " +
          nightwatchcount +
          "whites " +
          whitewalkercount +
          " istherenewnightking? " +
          isthereNightKingofWesteros
      );

      //-------------------------------------------------
      // loop through and DM everyone that night king has taken over!
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          membs.send(
            "The White Walkers broke through the Wall and the Night King has taken over Westeros! The economy has shut down. The only way to stop the Night King is to have more Nights Watch banners than White Walkers."
          );
        });
      });
      //-------------------------------------------------
      // role color change for white walkers
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        var roletochange = guild.roles.cache.get("713901799324778587");
        roletochange.setColor("#00abff");
      });

      //-------------------------------------------------
      // loop through and find The King then remove his role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("708021014977708033")) {
            //king
            // console.log("MEMBS " + membs.user.username);
            membs.roles.cache.forEach((role) => {
              console.log(
                "REMOVE KING ROLE FROM KING " +
                  role.name +
                  " " +
                  membs.user.username
              );
              membs.roles.remove("708021014977708033").catch(console.error); //REMOVE KING ROLE
            });
          }
        });
      });
      //-------------------------------------------------
      // loop through and find The Hand then remove his role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("707250754020180079")) {
            membs.roles.cache.forEach((role) => {
              console.log(
                "REMOVE HAND ROLE FROM HAND " +
                  role.name +
                  " " +
                  membs.user.username
              );
              membs.roles.remove("707250754020180079").catch(console.error); //REMOVE HAND ROLE
            });
          }
        });
      });
      //-------------------------------------------------
      // loop through and find Small Council then remove their role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("712353382660309033")) {
            membs.roles.cache.forEach((role) => {
              console.log(
                "REMOVE SMALLCOUNCIL ROLE FROM SMALLCOUNCIL " +
                  role.name +
                  " " +
                  membs.user.username
              );
              membs.roles.remove("712353382660309033").catch(console.error); //REMOVE SMALLCOUNCIL ROLE
            });
          }
        });
      });

      //-------------------------------------------------
      // loop through and find Kingsguard then remove their role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("735281180521398292")) {
            membs.roles.cache.forEach((role) => {
              console.log(
                "REMOVE KINGSGUARD ROLE FROM KINGSGUARD " +
                  role.name +
                  " " +
                  membs.user.username
              );
              membs.roles.remove("735281180521398292").catch(console.error); //REMOVE KINGSGUARD ROLE
            });
          }
        });
      });

      //-------------------------------------------------
      // loop through White Walkers and promote a Night King of Westeros
      //-------------------------------------------------

      var newnightkingofwesteros;
      var loopcontrolnightking = 0;
      var guildnightking = client.guilds.cache.get("707028782522826782");
      do {
        newnightkingofwesteros = guildnightking.members.cache.random();
        if (
          newnightkingofwesteros.presence.status !== "offline" &&
          newnightkingofwesteros.roles.cache.has("713901799324778587") //white walker
        ) {
          console.log("TEST I FOUND White Walker NOT OFFLINE");
          loopcontrolnightking++;
        }
      } while (loopcontrolnightking !== 1);
      if (loopcontrolnightking == 1) {
        //night king
        console.log(
          "RANDOM MEMBER ADD KING ROLE TO NIGHT KING " +
            newnightkingofwesteros.user.username
        );
        newnightkingofwesteros.roles
          .add("716878672820306003")
          .catch(console.error); // ADD NIGHT KING OF WESTEROS ROLE
        // send message to channel that night king now rules westeros as the King of Death
        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(
            "The Night King " +
              newnightkingofwesteros.user.username +
              " has taken over Westeros!"
          )
          .setDescription(
            "The King of Westeros lost his power. The only way to stop the Night King is to join the NightsWatch and get as many banners as White Walkers! Join the Nights Watch or the Night King will rule forever! Join here: #join-a-house"
          )
          .addField("Bonus:", `Night King received ${kingcoins} coins`)
          .attachFiles("./assets/nightking2.png")
          .setThumbnail("attachment://nightking2.png")
          .attachFiles(["./assets/winterishere.png"])
          .setImage("attachment://winterishere.png");
        //give new night king coins for takeover
        Money.findOne(
          {
            userID: newnightkingofwesteros.id,
            guildID: receivedMessage.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            money.coins = money.coins + kingcoins;
            money.nightking = money.nightking + 1;
            money.save().catch((err) => console.log(err));
          }
        );

        //TEST ADMIN CHANNEL
        // client.channels.cache.get("707089149915562026").send(embed);
        //WHISPERS IN WESTEROS CHANNEL
        client.channels.cache.get("707102776215208008").send(embed);
        newnightkingofwesteros.send(
          "You have been risen as the Night King on the Game of Thrones Roleplay Server! You received 100 coins for this privilege. Go quick and ^spear the Nights Watch and ^rise the dead to stay in control!"
        );
        // console.log("entered Strongest House in Westeros embed AUTO");
      }

      //-------------------------------------------------
      // loop through and find current Lord Commander and REMOVE his role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("715783930581876806")) {
            //lord commander
            console.log("MEMBS REMOVED lord commander " + membs.user.username);
            membs.roles.remove("715783930581876806").catch(console.error); // REMOVE lord commander OF WESTEROS ROLE

            const embednewlord = new Discord.MessageEmbed()
              .setColor("#000000")
              .setTitle(
                "Since the NightsWatch failed, " +
                  membs.user.username +
                  " the current Lord Commander has been Removed of his position!"
              )
              .setDescription(
                "Send as many men to the Wall as White Walkers in order to defeat the Night King!"
              )
              .attachFiles("./assets/nights_watch.png")
              .setThumbnail("attachment://nights_watch.png");
            client.channels.cache.get("707102776215208008").send(embednewlord);
          }
        });
      });

      //SEPARATE VARIABLES
      isthereNightKingofWesteros = 0; //reset to make sure it still exists
      countnightkingloops = 1;
      //-----------------------------------------------------------------------------------------------------
      //loop through and find Night King and send out message he still rules Westeros and how to defeat him
      //-----------------------------------------------------------------------------------------------------
    } else if (nightwatchcount < whitewalkercount) {
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("713895055252783175")) {
            //night king
            // send message to channel that night king now rules westeros as the King of Death
            const embed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setTitle(
                "The Night King " +
                  membs.user.username +
                  " has taken over Westeros and is now the King of all!"
              )
              .setDescription(
                "The King of Westeros lost his power. The only way to stop the Night King is to join the NightsWatch and get as many banners as White Walkers! Join the Nights Watch or the Night King will rule forever! Join here: #join-a-house"
              )
              .attachFiles("./assets/nightking2.png")
              .setThumbnail("attachment://nightking2.png");

            //TEST ADMIN CHANNEL
            // client.channels.cache.get("707089149915562026").send(embed);
            //WHISPERS IN WESTEROS CHANNEL
            client.channels.cache.get("707102776215208008").send(embed);
            // console.log("entered Strongest House in Westeros embed AUTO");
          }
        });
      });
      countnightkingloops = 1; //force at least 1 round of night king power even though night watch has enough to defeat him
      //-----------------------------------------------------------------------------------------------------
      //if nightwatchcount EQUAL or GREATER THAN whitewalkercount REMOVE WHITE WALKERS AND MESSAGE CHANNEL THAT NightsWatch DEFEATED NIGHT KING
      //-----------------------------------------------------------------------------------------------------
      // loop through and find all white walker members then remove their roles
      // role color change for white walkers back to white
      // loop through and find Night King and remove his King Role
      // loop through and find all Deserters and remove that role
      // send message to channel that NightsWatch has guarded wall and all white walkers are freed
      // APPOINT new random Night King no message
      // APPOINT NEW RANDOM KING from the STRONGEST HOUSE - NIGHT KING PROCESS / DEFEATED and Message channel
      // -----------------------------------------------------------------------------------------------------
    } else if (
      countnightkingloops != 1 &&
      isthereNightKingofWesteros == 1 && //force at least 1 round before defeating night king
      nightwatchcount > whitewalkercount
    ) {
      console.log(
        "-------------------------------------NIGHTWATCH TOOK BACK WESTEROS " +
          nightwatchcount +
          "whites " +
          whitewalkercount
      );

      //-------------------------------------------------
      // loop through and find all white walker members then remove their roles
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("713901799324778587")) {
            //white walkers
            membs.roles.cache.forEach((role) => {
                console.log("MEMBS REMOVED white walkers " + role.name);
                membs.roles.remove(role).catch(console.error); // REMOVE WHITE WALKER ROLE
            });
          }
        });
      });

      //-------------------------------------------------
      // role color change for white walkers
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        var roletochange = guild.roles.cache.get("713901799324778587");
        roletochange.setColor("#ffffff");
      });

      //-------------------------------------------------
      // loop through and find Night King and remove his Role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("713895055252783175")) {
            //night king
            console.log("MEMBS REMOVED night king " + membs.user.username);
            membs.roles.remove("716878672820306003").catch(console.error); // REMOVE NIGHT KING OF WESTEROS ROLE
            membs.roles.remove("713895055252783175").catch(console.error); // REMOVE NIGHT KING ROLE
          }
        });
      });

      //-------------------------------------------------
      // loop through and find GENERAL and remove his Role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("720335392653443163")) {
            //general
            console.log("MEMBS REMOVED night king " + membs.user.username);
            membs.roles.remove("720335392653443163").catch(console.error); // REMOVE GENERAL ROLE
          }
        });
      });

      //-------------------------------------------------
      // loop through and find all Deserters and remove that role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (
            membs.roles.cache.has("715781455560573001") //deserters
          ) {
            console.log("MEMBS REMOVED deserter role " + membs.user.username);
            membs.roles.remove("715781455560573001").catch(console.error); // REMOVE DESERTER ROLE
          }
        });
      });

      //-------------------------------------------------
      // loop through and find all Protected by Children and remove that role
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (
            membs.roles.cache.has("729891478565945436") //protected
          ) {
            console.log(
              "MEMBS REMOVED protected by children role " + membs.user.username
            );
            membs.roles.remove("729891478565945436").catch(console.error); // REMOVE protected ROLE
          }
        });
      });

      //-------------------------------------------------
      // send message to channel that NightsWatch has guarded wall and all white walkers are freed
      //-------------------------------------------------
      const embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .setTitle(
          "The NightsWatch has pushed the Night King back beyond the Wall due to their numbers!"
        )
        .setDescription(
          "Anyone that was a White Walker has been set free to join a House. Anyone that fought at the wall is set free to rejoin the NightsWatch or Join a House."
        )
        .attachFiles("./assets/nights_watch.png")
        .setThumbnail("attachment://nights_watch.png");

      //TEST ADMIN CHANNEL
      // client.channels.cache.get("707102776215208008").send(embed);
      //WHISPERS IN WESTEROS CHANNEL
      client.channels.cache.get("707102776215208008").send(embed);
      // console.log("entered Night king pushed back embed AUTO");

      //-------------------------------------------------
      //APPOINT NEW RANDOM KING from the STRONGEST HOUSE - NIGHT KING PROCESS / DEFEATED - NEED TO FIX!!!
      //-------------------------------------------------
      // var loopcontrol = 0;
      // var guild3 = client.guilds.cache.get("707028782522826782");
      // //loop to find a random person part of house to become king
      // do {
      //   console.log("entered do loop to find random new king 2392 DEFEATED");
      //   var newkingofwesteros = guild3.members.cache.random();
      //   if (
      //     //find person in the current strong house, that is not offline, and does not have Melisandre, Lord Commander, Night King roles.
      //     newkingofwesteros.roles.cache.has(roleid[index]) &&
      //     !newkingofwesteros.roles.cache.has("713409866764517517") &&
      //     !newkingofwesteros.roles.cache.has("715783930581876806") &&
      //     !newkingofwesteros.roles.cache.has("713895055252783175")
      //   ) {
      //     console.log("TEST I FOUND SOMEONE NOT OFFLINE");
      //     loopcontrol++;
      //   }
      // } while (loopcontrol !== 1);

      // newkingofwesteros.roles.add("708021014977708033").catch(console.error); // GETS KING OF WESTEROS ROLE RANDOMLY
      // console.log(
      //   "NEW RANDOM KING OF WESTEROS CHOSEN " +
      //     newkingofwesteros.user.username +
      //     newkingofwesteros.presence.status
      // );

      // //give new king coins for becoming king
      // Money.findOne(
      //   {
      //     userID: newkingofwesteros.id,
      //     guildID: receivedMessage.guild.id,
      //   },
      //   (err, money) => {
      //     if (err) console.log(err);
      //     money.coins = money.coins + kingcoins;
      //     money.king = money.king + 1;
      //     money.save().catch((err) => console.log(err));
      //   }
      // );

      // // send message to channel that there is a new king from random
      // const embedrandom = new Discord.MessageEmbed()
      //   .setColor("#ffb400")
      //   .setTitle(
      //     `${newkingofwesteros.user.username}` +
      //       " has been Randomly Selected as the New King of Westeros! You must all bend the knee!"
      //   )
      //   .attachFiles(["./assets/throne128.png"])
      //   .setThumbnail("attachment://throne128.png");
      // embedrandom.addField("Bonus:", `King received ${kingcoins} coins`);
      // client.channels.cache.get("707102776215208008").send(embedrandom);
      // newkingofwesteros.send(
      //   "You have been promoted King of Westeros on the Game of Thrones Roleplay Server! You received 100 coins for this privilege. Go quick before the crowds try to dethrone you!"
      // );
    }

    //--------------------------------------------------------------------------------------
    ///////END OF NIGHT KING PROCESS//////////////
    //--------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------
    // AUTO CHECK FOR NEW STRONGEST HOUSE OR STILL LEADING - NON NIGHT KING
    //--------------------------------------------------------------------------------------
    //remove all burned ones if Targaryens lose control
    if (
      rolenamesOLD == "House Targaryen" &&
      rolenames[index] != "House Targaryen"
    ) {
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("717194087010140212")) {
            membs.roles.remove("717194087010140212").catch(console.error); //REMOVE burned ones role
          }
        });
      });
    }
    //start auto check process
    if (
      rolenames[index] != rolenamesOLD &&
      whitewalkercount < nightwatchcount
    ) {
      console.log("------------------------ENTERED NEW STRONGEST CHECK");
      //markerstrong
      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(
          `${rolenames[index]}` + " Is The New Strongest House of Westeros!"
        )
        .setDescription(
          "The House of Westeros with the most # of Banners rules with a King selected. If you want that King removed, you must get more banners to another House."
        )
        // .attachFiles(["./assets/newstronghouse.png"])
        // .setThumbnail("attachment://newstronghouse.png")
        .attachFiles(`./assets/${housebanner}`)
        .setThumbnail(`attachment://${housebanner}`)
        .addFields(
          { name: "House:", value: `${rolenames[index]}` },
          { name: "# of Banners:", value: `${result}` }
        );

      //TEST ADMIN CHANNEL
      // client.channels.cache.get("707089149915562026").send(embed);
      //WHISPERS IN WESTEROS CHANNEL
      client.channels.cache.get("707102776215208008").send(embed);
      // console.log("entered Strongest House in Westeros embed AUTO");

      //-------------------------------------------------
      // loop through and find The King then remove his role only happens if NEW strongest house is shown (if app restarts might mess with a king that does not have same tophouse)
      //-------------------------------------------------
      var newking = 2;

      client.guilds.cache.each((guild) => {
        console.log("entered newking check");
        guild.members.cache.each((membs) => {
          if (membs.roles.cache.has("708021014977708033")) {
            //find king member and see if he has same role as the tophouse currently (not have night king)
            membs.roles.cache.forEach((role) => {
              console.log(
                "Member " + membs.user.username + " has role " + role.name
              );
              if (role.name == rolenames[index]) {
                console.log(
                  "King has same role as tophouse so do nothing " + role.name
                );
                newking = 0;
                console.log("TEST NEWKING BECAME " + newking);
              } else if (role.name.includes("House")) {
                console.log(
                  "King does not have same role as tophouse hence promote the Heir or select random online king "
                );
                newking = 1;
                console.log("TEST NEWKING BECAME " + newking);
              }
            });
          }
        });
      });

      //need to promote new king since tophouse is different than current king house
      if (newking == 1 || newking == 2) {
        console.log("TEST ENTERED NEW KING == 1 or 2 IF");
        //-------------------------------------------------
        // loop through and find The King then remove his role
        //-------------------------------------------------
        client.guilds.cache.each((guild) => {
          guild.members.cache.each((membs) => {
            if (membs.roles.cache.has("708021014977708033")) {
              //king
              membs.roles.cache.forEach((role) => {
                if (role == "708021014977708033") {
                  console.log(
                    "REMOVE KING ROLE FROM KING " +
                      role.name +
                      " " +
                      membs.user.username
                  );
                  membs.roles.remove(role).catch(console.error); //REMOVE KING ROLE
                  membs.send(
                    "You have just lost your Crown in the Game of Thrones Server!"
                  );
                }
              });
            }
          });
        });
        //-------------------------------------------------
        //APPOINT HEIR AS NEW KING OR IF NOT FOUND APPOINT new random King of Westeros from the STRONGEST HOUSE - AUTO CHECK PROCESS
        //-------------------------------------------------
        var foundheir = 0;

        //LOOP ALL MEMBERS TO find heir first
        client.guilds.cache.each((guild) => {
          guild.members.cache.each((memberheir) => {
            console.log("LOOKING FOR HEIR!");
            if (memberheir.roles.cache.has("714586873904758836")) {
              //heir
              foundheir++;
              console.log("HEIR IS IN IF" + memberheir.user.username);
              memberheir.roles.add("708021014977708033").catch(console.error); // HEIR BECOMES KING
              memberheir.roles
                .remove("714586873904758836")
                .catch(console.error); //remove old heir role from HEIR

              //give new king coins for becoming king
              Money.findOne(
                {
                  userID: memberheir.id,
                  guildID: receivedMessage.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins + kingcoins;
                  money.save().catch((err) => console.log(err));
                }
              );

              // send message to channel that there is a new king from heir or random
              const embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle(
                  `${memberheir.user.username}` +
                    " has been promoted from Heir to King of Westeros! You must all bend the knee!"
                )
                .attachFiles(`./assets/${housebanner}`)
                .setThumbnail(`attachment://${housebanner}`);
              embed.addField("Bonus:", "The King received 100 coins");
              client.channels.cache.get("707102776215208008").send(embed);
            }
          });
          // if heir NOT found look for random
          if (foundheir == 0) {
            console.log("DID NOT FIND HEIR!");
            var loopcontrol = 0;
            var guild3 = client.guilds.cache.get("707028782522826782");
            //loop to find a random person part of house to become king
            do {
              console.log("entered do loop to find random new king 2607");
              var newkingofwesteros = guild3.members.cache.random();

              console.log(
                "TEST TEST TEST FOUND ? " +
                  newkingofwesteros.user.username +
                  " has " +
                  newkingofwesteros.roles.cache.has(roleid[index])
              );
              if (newkingofwesteros.roles.cache.has(roleid[index])) {
                console.log("TEST I FOUND SOMEONE NOT OFFLINE");
                loopcontrol++;
              }
            } while (loopcontrol !== 1);

            newkingofwesteros.roles
              .add("708021014977708033")
              .catch(console.error); // GETS KING OF WESTEROS ROLE RANDOMLY
            console.log(
              "NEW KING OF WESTEROS CHOSEN " +
                newkingofwesteros.user.username +
                newkingofwesteros.presence.status
            );
            //give new king coins for becoming king
            Money.findOne(
              {
                userID: newkingofwesteros.id,
                guildID: receivedMessage.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.coins = money.coins + kingcoins;
                money.save().catch((err) => console.log(err));
              }
            );

            // send message to channel that there is a new king from random
            const embed = new Discord.MessageEmbed()
              .setColor("#ffb400")
              .setTitle(
                `${newkingofwesteros.user.username}` +
                  " has been Randomly Selected as the New King of Westeros! You must all bend the knee!"
              )
              .attachFiles(["./assets/throne128.png"])
              .setThumbnail("attachment://throne128.png")
              .attachFiles(["./assets/ironthrone.png"])
              .setImage("attachment://ironthrone.png");
            embed.addField("Bonus:", "The King received 100 coins");

            client.channels.cache.get("707102776215208008").send(embed);
          }
        });

        //-------------------------------------------------
        // loop through and find The Hand then remove his role
        //-------------------------------------------------
        client.guilds.cache.each((guild) => {
          guild.members.cache.each((membs) => {
            if (membs.roles.cache.has("707250754020180079")) {
              membs.roles.cache.forEach((role) => {
                console.log(
                  "REMOVE HAND ROLE FROM HAND " +
                    role.name +
                    " " +
                    membs.user.username
                );
                membs.roles.remove("707250754020180079").catch(console.error); //REMOVE HAND ROLE
                membs.send(
                  "Your King has just lost his crown therefore you are no longer Hand of the King!"
                );
              });
            }
          });
        });
        //-------------------------------------------------
        // loop through and find Small Council then remove their role
        //-------------------------------------------------
        client.guilds.cache.each((guild) => {
          guild.members.cache.each((membs) => {
            if (membs.roles.cache.has("712353382660309033")) {
              membs.roles.cache.forEach((role) => {
                console.log(
                  "REMOVE SMALLCOUNCIL ROLE FROM SMALLCOUNCIL " +
                    role.name +
                    " " +
                    membs.user.username
                );
                membs.roles.remove("712353382660309033").catch(console.error); //REMOVE SMALLCOUNCIL ROLE
                membs.send(
                  "Your King has just lost his crown therefore you are no longer part of the Small Council!"
                );
              });
            }
          });
        });

        //-------------------------------------------------
        // loop through and find Kingsguard then remove their role
        //-------------------------------------------------
        client.guilds.cache.each((guild) => {
          guild.members.cache.each((membs) => {
            if (membs.roles.cache.has("735281180521398292")) {
              membs.roles.cache.forEach((role) => {
                console.log(
                  "REMOVE KINGSGUARD ROLE FROM KINGSGUARD " +
                    role.name +
                    " " +
                    membs.user.username
                );
                membs.roles.remove("735281180521398292").catch(console.error); //REMOVE KINGSGUARD ROLE
                membs.send(
                  "Your King has just lost his crown therefore you are no longer part of the Kingsguard!"
                );
              });
            }
          });
        });
      }
    } else if (
      rolenames[index] == rolenamesOLD &&
      whitewalkercount < nightwatchcount
    ) {
      console.log("------------------------ENTERED STILL LEADING CHECK");
      var newkingstill = 0;

      client.guilds.cache.each((guild) => {
        console.log("entered newkingstill check");
        guild.members.cache.each((membs) => {
          if (
            membs.roles.cache.has("708021014977708033") &&
            !membs.roles.cache.has("713895055252783175")
          ) {
            console.log("found king while checking still leading westeros");
            //if king not found
            newkingstill = 1;
          } else {
            //do nothing
          }
        });
      });

      if (newkingstill == 0) {
        //appoint new king and message
        //-------------------------------------------------
        //APPOINT HEIR AS NEW KING OR IF NOT FOUND APPOINT new random King of Westeros from the STRONGEST HOUSE - AUTO CHECK PROCESS
        //-------------------------------------------------
        var foundheir_stillleading = 0;

        //LOOP ALL MEMBERS TO find heir first
        client.guilds.cache.each((guild) => {
          guild.members.cache.each((memberheir) => {
            console.log("LOOKING FOR HEIR!");
            if (memberheir.roles.cache.has("714586873904758836")) {
              //heir
              foundheir_stillleading++;
              console.log("HEIR IS IN IF" + memberheir.user.username);
              memberheir.roles.add("708021014977708033").catch(console.error); // HEIR BECOMES KING
              memberheir.roles
                .remove("714586873904758836")
                .catch(console.error); //remove old heir role from HEIR

              //give new king coins for becoming king
              Money.findOne(
                {
                  userID: newkingofwesteros.id,
                  guildID: receivedMessage.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins + kingcoins;
                  money.save().catch((err) => console.log(err));
                }
              );

              // send message to channel that there is a new king from heir or random
              const embed = new Discord.MessageEmbed()
                .setColor("#ffb400")
                .setTitle(
                  `${memberheir.user.username}` +
                    " has been promoted from Heir to King of Westeros! You must all bend the knee!"
                )
                .attachFiles(`./assets/${housebanner}`)
                .setThumbnail(`attachment://${housebanner}`);
              embed.addField("Bonus:", "The King received 100 coins");
              client.channels.cache.get("707102776215208008").send(embed);
            }
          });
          // if heir NOT found look for random
          if (foundheir_stillleading == 0) {
            console.log("DID NOT FIND HEIR!");
            var loopcontrol_still = 0;
            var guild_still = client.guilds.cache.get("707028782522826782");
            //loop to find a random person part of house to become king
            do {
              console.log("entered do loop to find random new king 2735");
              var newking_still = guild_still.members.cache.random();
              if (
                newking_still.roles.cache.has(roleid[index]) &&
                !newking_still.roles.cache.has("707074053881724989")
              ) {
                console.log(
                  "FOUND ? " +
                    newking_still.user.username +
                    " has " +
                    newking_still.roles.cache.has(roleid[index])
                );
                console.log("TEST FOUND NEW RANDOM KING");
                loopcontrol_still++;
              }
            } while (loopcontrol_still == 0);

            newking_still.roles.add("708021014977708033").catch(console.error); // GETS KING OF WESTEROS ROLE RANDOMLY
            console.log(
              "NEW KING OF WESTEROS CHOSEN " +
                newking_still.user.username +
                newking_still.presence.status
            );
            //give new king coins for becoming king
            Money.findOne(
              {
                userID: newking_still.id,
                guildID: receivedMessage.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.coins = money.coins + kingcoins;
                money.save().catch((err) => console.log(err));
              }
            );

            // send message to channel that there is a new king from random
            const embed = new Discord.MessageEmbed()
              .setColor("#ffb400")
              .setTitle(
                `${newking_still.user.username}` +
                  " has been Randomly Selected as the New King of Westeros! You must all bend the knee!"
              )
              .attachFiles(`./assets/${housebanner}`)
              .setThumbnail(`attachment://${housebanner}`);
            embed.addField("Bonus:", "The King received 100 coins");
            client.channels.cache.get("707102776215208008").send(embed);
          }
        });
      }
      //-------------------------------------------------
      // loop through and find The King to show in Still Leads Message
      //-------------------------------------------------
      client.guilds.cache.each((guild) => {
        guild.members.cache.each((membsembed) => {
          if (membsembed.roles.cache.has("708021014977708033")) {
            //king
            const embed = new Discord.MessageEmbed()
              .setColor("GOLD")
              .setTitle(`${rolenames[index]}` + " Still Leads Westeros!")
              .setDescription(
                "The House of Westeros with the most # of Banners rules with a King selected. If you want that King removed, you must get more banners to another House."
              )
              .attachFiles(`./assets/${housebanner}`)
              .setThumbnail(`attachment://${housebanner}`)
              .addFields(
                {
                  name: "King of Westeros:",
                  value: `${membsembed.user.username}`,
                },
                { name: "# of Banners:", value: `${result}` }
              );
            //TEST ADMIN CHANNEL
            // client.channels.cache.get("707089149915562026").send(embed);
            //WHISPERS IN WESTEROS CHANNEL
            client.channels.cache.get("707102776215208008").send(embed);
            return;
          }
        });
      });
    }
    rolenamesOLD = rolenames[index];
  } else if (
    (receivedMessage.author == client.user &&
      !receivedMessage.content == "gotbottest") ||
    !receivedMessage.content == "ValyrianSteel"
  ) {
    console.log("not looking for that message");
    return;
  }

  //-------------------END OF AUTO STUFF-------------------------------------
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  // FIND CUSTOM EMOJI ID BY NAME
  //-------------------------------------------------------------------------
  // const test = client.emojis.cache.find(emoji => emoji.name === "lordoflight");
  // console.log("emoji test "+test.id);

  //-------------------------------------------------------------------------
  // REACTIONS TO CUSTOM EMOJIS
  //-------------------------------------------------------------------------
  if (
    receivedMessage.content.startsWith(emoji("707070747998421032")) &&
    receivedMessage.member.roles.cache.has("707069333494431854")
  ) {
    receivedMessage.channel.send("Winter is Coming");
  } else if (
    receivedMessage.content.startsWith(emoji("707070747520139325")) &&
    receivedMessage.member.roles.cache.has("708351845994725418")
  ) {
    receivedMessage.channel.send("What Is Dead May Never Die");
  } else if (
    receivedMessage.content.startsWith(emoji("707070747956478012")) &&
    receivedMessage.member.roles.cache.has("707073800474198078")
  ) {
    receivedMessage.channel.send("As High As Honor");
  } else if (
    receivedMessage.content.startsWith(emoji("707070747792638064")) &&
    receivedMessage.member.roles.cache.has("707073882321846355")
  ) {
    receivedMessage.channel.send("Ours Is The Fury");
  } else if (
    receivedMessage.content.startsWith(emoji("707070747155366009")) &&
    receivedMessage.member.roles.cache.has("707073997933772811")
  ) {
    receivedMessage.channel.send("Family, Duty, Honor");
  } else if (
    receivedMessage.content.startsWith(emoji("707070746706444301")) &&
    receivedMessage.member.roles.cache.has("707073467283144704")
  ) {
    receivedMessage.channel.send("Growing Strong");
  } else if (
    receivedMessage.content.startsWith(emoji("707070748023455825")) &&
    receivedMessage.member.roles.cache.has("707069479833698326")
  ) {
    receivedMessage.channel.send("Hear me Roar!");
  } else if (
    receivedMessage.content.startsWith(emoji("707070747062960153")) &&
    receivedMessage.member.roles.cache.has("707073920515309639")
  ) {
    receivedMessage.channel.send("Fire & Blood");
  } else if (
    receivedMessage.content.startsWith(emoji("707070746974748692")) &&
    receivedMessage.member.roles.cache.has("707074053881724989")
  ) {
    receivedMessage.channel.send("Night gathers, and now my watch begins");
  } else if (
    receivedMessage.content.startsWith(emoji("713933066522853377")) &&
    receivedMessage.member.roles.cache.has("713409866764517517")
  ) {
    receivedMessage.channel.send(
      "Light your flame among us, R'hllor. Show us the truth or falseness of this man. Strike him down if he is guilty, and give strength to his sword if he is true."
    );
  }

  //-------------------------------------------------------------------------
  // MAIN HELP MENU
  //-------------------------------------------------------------------------
  if (receivedMessage.content == "^help") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Help Menu")
      .attachFiles(["./assets/help.png"])
      .setThumbnail("attachment://help.png")
      .addFields(
        {
          name: "Access Store to Buy Items",
          value: "`^store`",
        },
        {
          name: "Access your Inventory",
          value: "`^inventory`",
        },
        {
          name: "Available Quests Information",
          value: "`^quests`",
        },
        {
          name: "Quest Achievable Roles",
          value: "`^questroles`",
        },
        {
          name: "Help with Leaderboards",
          value: "`^counthelp`",
        },
        {
          name: "Help with Coin System",
          value: "`^coinhelp`",
        },
        {
          name: "Special Role Commands",
          value: "`^rolehelp`",
        },
        {
          name: "See All Role Commands",
          value: "`^rolehelpall`",
        },
        {
          name: "Combat Commands",
          value: "`^combathelp`",
        },
        {
          name: "Show Your Stats",
          value: "`^flex`",
        }
      );
    receivedMessage.channel.send(embed);
    console.log("entered help menu");
  }

  //-------------------------------------------------------------------------
  // HELP MENU - ROLES
  //-------------------------------------------------------------------------
  if (receivedMessage.content == "^rolehelp") {
    if (receivedMessage.member.roles.cache.has("713409866764517517")) {
      //red priestess
      const embedRed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/redpriestess.png"])
        .setThumbnail("attachment://redpriestess.png")
        .addFields(
          {
            name:
              "A Red Priestess can revive a a member with: (Cooldown: 1 hour)",
            value: "^revive @user",
          },
          {
            name:
              "A Red Priestess can kill with a Shadow: (Cooldown: 1 hour)\nShadows can kill anyone **except** King, Hand, Lord Commander, First Rangers, and White Walkers",
            value: "^shadow @user",
          },
          {
            name:
              "A Red Priestess can gift up to 2 Amulets while Priestess.\nAmulets can be given only once and not taken back. They give the member free revives using ^amulet. Each time they use ^amulet, you will gain 2XP in Bloodmagic which you can view using the ^flex command.",
            value: "^give_amulet @user",
          }
        );
      receivedMessage.channel.send(embedRed);
      console.log("entered red priestess role help menu");
    } else if (receivedMessage.member.roles.cache.has("708021014977708033")) {
      //king
      const embedKing = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/ironthrone.png"])
        .setThumbnail("attachment://ironthrone.png")
        .addFields(
          {
            name: "King can ADD or REMOVE members to the Small Council with:",
            value: "^add_small @user or ^remove_small @user",
          },
          {
            name: "King can ADD or REMOVE a Hand of the King with:",
            value: "^add_hand @user or ^remove_hand @user",
          },
          {
            name: "King can ADD or REMOVE a up to Two Kingsguard with:",
            value: "^add_guard @user or ^remove_guard @user",
          },
          {
            name: "King OR Hand can send members to Castle Black:",
            value: "^wall @user",
          },
          {
            name:
              "King or Hand can execute a member with: (Cooldown: 12 hours)",
            value: "^execute @user",
          },
          {
            name:
              "King or Hand can send a member to the Black Cell with: (1 hour cooldown with max capacity 2 at a time)",
            value: "^jail @user",
          },
          {
            name:
              "King or Hand can set a member free from the Black Cell with:",
            value: "^free @user",
          }
        );
      receivedMessage.channel.send(embedKing);
      console.log("entered king role help menu");
    } else if (receivedMessage.member.roles.cache.has("707250754020180079")) {
      //hand
      const embedHand = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/hand.png"])
        .setThumbnail("attachment://hand.png")
        .addFields(
          {
            name: "Hand can send members to Castle Black:",
            value: "^wall @user",
          },
          {
            name: "Hand can execute a member with: (Cooldown: 12 hours)",
            value: "^execute @user",
          },
          {
            name:
              "Hand can send a member to the Black Cell with: (1 hour cooldown with max capacity 2 at a time)",
            value: "^jail @user",
          },
          {
            name: "Hand can set a member free from the Black Cell with:",
            value: "^free @user",
          }
        );
      receivedMessage.channel.send(embedHand);
      console.log("entered hand role help menu");
    } else if (receivedMessage.member.roles.cache.has("715783930581876806")) {
      //lord commander
      const embedLord = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/lordcommander.png"])
        .setThumbnail("attachment://lordcommander.png")
        .addFields(
          {
            name: "Lord Commander of the NightsWatch can list Deserters:",
            value: "^deserters",
          },
          {
            name:
              "Lord Commander of the NightsWatch can sentence Deserters to Death:",
            value: "^sentence @user",
          },
          {
            name:
              "Lord Commander of the NightsWatch can Pardon so you leave the Nights Watch without become a Deserter:",
            value: "^pardon @user",
          },
          {
            name:
              "Lord Commander of the NightsWatch can Grant you permission Beyond the Wall for Quests:",
            value: "^give_pass @user",
          }
        );
      receivedMessage.channel.send(embedLord);
      console.log("entered lord commander role help menu");
    } else if (receivedMessage.member.roles.cache.has("713895055252783175")) {
      //night king
      const embedNK = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/nightking2.png"])
        .setThumbnail("attachment://nightking2.png")
        .addFields(
          {
            name: "NIGHT KING can rise the dead with: (Cooldown: 1 hour)",
            value: "^rise @user",
          },
          {
            name:
              "NIGHT KING can turn members with an Ice Spear: (Cooldown: 12 hours)",
            value: "^spear @user",
          },
          {
            name: "NIGHT KING can select a General of the White Walkers:",
            value: "^add_general @user",
          },
          {
            name:
              "White Walkers can bite Nights Watchmen (not rangers or lord commander) with: (Cooldown: 6 hours)",
            value: "^bite @user",
          }
        );
      receivedMessage.channel.send(embedNK);
      console.log("entered night king role help menu");
    } else if (receivedMessage.member.roles.cache.has("720335392653443163")) {
      //white walker general
      const embedGen = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/whiteintheway.png"])
        .setThumbnail("attachment://whiteintheway.png")
        .addFields(
          {
            name:
              "GENERAL can turn members with an Ice Spear: (Cooldown: 12 hours)",
            value: "^spear @user",
          },
          {
            name:
              "White Walkers can bite Nights Watchmen (not rangers or lord commander) with: (Cooldown: 6 hours)",
            value: "^bite @user",
          }
        );
      receivedMessage.channel.send(embedGen);
      console.log("entered general role help menu");
    } else if (receivedMessage.member.roles.cache.has("735281180521398292")) {
      //kingsguard general
      const embedGen = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/whitecloak.png"])
        .setThumbnail("attachment://whitecloak.png")
        .addFields({
          name:
            "Kingsguard (White Cloak) can send a member to the Black Cell with: (1 hour cooldown with max capacity 2 at a time)",
          value: "^jail @user",
        });
      receivedMessage.channel.send(embedGen);
      console.log("entered kingsguard help menu");
    } else if (receivedMessage.member.roles.cache.has("728750595904897106")) {
      //first ranger
      const embedRed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Role Commands")
        .attachFiles(["./assets/firstranger.png"])
        .setThumbnail("attachment://firstranger.png")
        .addFields({
          name:
            "A First Ranger can go Beyond the Wall anytime with: (You will begin at choosing the Path, but beware, you can still die on quests!)",
          value: "^go_beyond",
        });
      receivedMessage.channel.send(embedRed);
      console.log("entered first ranger role help menu");
    } else {
      receivedMessage.channel.send(
        "You need to have a Specialized Role to check on help for or use ^rolehelpall to see All Role commands."
      );
    }
  } else if (receivedMessage.content == "^rolehelpall") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Role Commands")
      .attachFiles(["./assets/throne128.png"])
      .setThumbnail("attachment://throne128.png")
      .addFields(
        {
          name: "King can ADD or REMOVE members to the Small Council with:",
          value: "^add_small @user or ^remove_small @user",
        },
        {
          name: "King can ADD or REMOVE a Hand of the King with:",
          value: "^add_hand @user or ^remove_hand @user",
        },
        {
          name: "King can ADD or REMOVE a up to Two Kingsguard with:",
          value: "^add_guard @user or ^remove_guard @user",
        },
        {
          name: "King OR Hand can send members to Castle Black:",
          value: "^wall @user",
        },
        {
          name: "King or Hand can execute a member with: (Cooldown: 12 hours)",
          value: "^execute @user",
        },
        {
          name:
            "King or Hand can send a member to the Black Cell with: (1 hour cooldown with max capacity 2 at a time)",
          value: "^jail @user",
        },
        {
          name: "King or Hand can set a member free from the Black Cell with:",
          value: "^free @user",
        },
        {
          name: "Small Council member can leave Small Council with:",
          value: "^leave_small",
        },
        {
          name:
            "Lord Commander of the NightsWatch can sentence Deserters to Death:",
          value: "^sentence @user",
        },
        {
          name:
            "Lord Commander of the NightsWatch can Pardon so you leave the Nights Watch without become a Deserter:",
          value: "^pardon @user",
        },
        {
          name:
            "Lord Commander of the NightsWatch can Grant you permission Beyond the Wall for Quests:",
          value: "^give_pass @user",
        },
        {
          name:
            "A Red Priestess can revive a a member with: (Cooldown: 1 hour)",
          value: "^revive @user",
        },
        {
          name: "A Red Priestess can kill with a Shadow: (Cooldown: 1 hour)",
          value: "^shadow @user",
        },
        {
          name: "A Red Priestess can gift up to 2 Amulets while Priestess:",
          value: "^give_amulet @user",
        },
        {
          name: "NIGHT KING can rise the dead with: (Cooldown: 1 hour)",
          value: "^rise @user",
        },
        {
          name:
            "NIGHT KING AND GENERAL can turn members with an Ice Spear: (Cooldown: 12 hours)",
          value: "^spear @user",
        },
        {
          name: "NIGHT KING can select a General of the White Walkers:",
          value: "^add_general @user",
        },
        {
          name:
            "White Walkers can bite Nights Watchmen (not rangers or lord commander) with: (Cooldown: 6 hours)",
          value: "^bite @user",
        }
      );
    receivedMessage.channel.send(embed);
    console.log("entered role help menu");
  }

  //-------------------------------------------------------------------------
  // HELP MENU - STORE
  //-------------------------------------------------------------------------
  if (receivedMessage.content == "^store") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Store Menu")
      .attachFiles(["./assets/chest.png"])
      .setThumbnail("attachment://chest.png")
      .addFields(
        {
          name: "Use ^trade to see Merchant Inventory of Items to Buy and Sell",
          value: "^trade",
        },
        {
          name:
            "Use ^blacksmith to see Weapons you can buy at the Blacksmith channel",
          value: "^blacksmith",
        },
        {
          name: "Buy a Revive for 50 Coins: (1 hour cooldown to buy again)",
          value: "^buy_revive",
        }
      );
    receivedMessage.channel.send(embed);
    console.log("entered store menu");
  }

  //-------------------------------------------------------------------------
  // HELP MENU - COMBAT
  //-------------------------------------------------------------------------
  if (receivedMessage.content == "^combathelp") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Combat Commands")
      .attachFiles(["./assets/newstronghouse.png"])
      .setThumbnail("attachment://newstronghouse.png")
      .addFields(
        {
          name: "Combat Detailed Info",
          value: "^combatinfo",
        },
        {
          name:
            "Give away your Valyrian Dagger to any member: (Helps White Walkers survive White Walker Bites at the Wall and Quests Beyond the Wall.",
          value: "^give_dagger @user",
        },
        {
          name:
            "Give away your Chainmail Armor to any member: (Helps Melee and Quests)",
          value: "^give_armor @user",
        },
        {
          name:
            "Give away your Dragonglass to any member: (Helps Nights Watch kill White Walkers)",
          value: "^give_dragonglass @user",
        },
        {
          name:
            "DEADLY: Challenge a member to Trial by Combat (Anyone can be killed that is living and not a Red Priestess - 30 coins for Winner, Death for Loser. You can also loot 20-50 coins randomly from the slain user.):",
          value: "^trialbycombat @user",
        },
        {
          name:
            "FRIENDLY: Challenge a member to Duel (Must be within Combat Channel - 20 coins for Winner, 20 lost for Loser):",
          value: "^duel @user",
        }
      );
    receivedMessage.channel.send(embed);
    console.log("entered combat menu");
  }

  //-------------------------------------------------------------------------
  // HELP MENU - COUNTS
  //-------------------------------------------------------------------------
  if (receivedMessage.content == "^counthelp") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Leaderboard Commands")
      .attachFiles(["./assets/count.png"])
      .setThumbnail("attachment://count.png")
      .addFields(
        {
          name: "Count members in a specific role:",
          value: "^count-name (name = lannister, stark, etc)",
        },
        { name: "List of All Houses and member count:", value: "^count" },
        {
          name: "List Top Leaderboard of following items:",
          value:
            "^topcoins, ^topxp, ^topquests, ^topkills, ^topdeaths, ^topwins, ^toploss, ^topescapes, ^topwightkills",
        }
      );
    receivedMessage.channel.send(embed);
    console.log("entered count help menu");
  }

  //-------------------------------------------------------------------------
  // HELP MENU - COIN SYSTEM
  //-------------------------------------------------------------------------
  if (receivedMessage.content == "^coinhelp") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Coin System Help")
      .attachFiles(["./assets/coinbag.png"])
      .setThumbnail("attachment://coinbag.png")
      .addFields(
        { name: "List the # of Coins you have:", value: "^coins" },
        {
          name: "Transfer X Coins to any person mentioned:",
          value: "^pay x @user",
        }
      );
    receivedMessage.channel.send(embed);
    console.log("entered coin help menu");
  }

  //-------------------------------------------------------------------------
  // Assign a role to a member - ^add ^remove etc...
  //-------------------------------------------------------------------------

  //turn dead - NIGHT KING
  if (receivedMessage.content.startsWith("^turn")) {
    console.log("entered");
    //MUST HAVE NIGHT KING ROLE
    if (receivedMessage.member.roles.cache.has("713895055252783175")) {
      //night king
      let member = receivedMessage.mentions.members.first();
      console.log("entered2");
      let role = receivedMessage.guild.roles.cache.find(
        (r) => r.name === "The Dead"
      );
      console.log("role " + role);
      let pentosrole = member.roles.cache.find(
        (r) => r.name === "PENTOS SLAVE"
      );

      if (member.user.presence.status !== "offline") {
        if (pentosrole == "709925162069262358") {
          if (
            member.roles.cache.find((r) => r.name === "House Greyjoy") ||
            member.roles.cache.find((r) => r.name === "House Stark") ||
            member.roles.cache.find((r) => r.name === "House Baratheon") ||
            member.roles.cache.find((r) => r.name === "House Tyrell") ||
            member.roles.cache.find((r) => r.name === "House Tully") ||
            member.roles.cache.find((r) => r.name === "House Targaryen") ||
            member.roles.cache.find((r) => r.name === "House Arryn") ||
            member.roles.cache.find((r) => r.name === "House Lannister") ||
            member.roles.cache.find((r) => r.name === "NightsWatch")
          ) {
            console.log(
              "Night King cannot turn since member has a house as well"
            );
          } else {
            //remove all roles except everyone and Old Gods and White Walkers and Night King
            member.roles.cache.forEach((role) => {
              console.log("each role " + role.name);
              if (
                role != "707028782522826782" && //everyone
                role != "707032148493991947" && //old gods
                role != "713895055252783175" && //night king
                role != "713901799324778587" && //white walkers
                role != "712005922578366494" //mod
              ) {
                member.roles.remove(role).catch(console.error);
              }
            });

            console.log("member " + member);
            member.roles.add(role).catch(console.error);
            console.log("you gave " + member + " role " + role);
            receivedMessage.channel.send(
              "The Night King has turned " +
                member.user.username +
                " into a The Dead. Slaves are most vulnerable."
            );
          }
        } else {
          receivedMessage.channel.send("Only Pentos Slaves can be turned! 💀");
        }
      } else {
        receivedMessage.channel.send("User must be online.");
      }
    } else {
      console.log("you do not have permission!!!");
      receivedMessage.channel.send(
        "Only the Night King can turn people into White Walkers!"
      );
    }
  }

  //-------------------------------------------------------------------------
  // GET ALL ROLE MEMBER COUNTS - ^count-all
  //-------------------------------------------------------------------------
  if (receivedMessage.content === "^count") {
    var countall_name = [];
    var countall_size = [];
    receivedMessage.guild.roles.cache.forEach((role) => {
      // console.log(role.name, role.id);
      let roleID = role.id;
      let membersWithRole = receivedMessage.guild.roles.cache.get(roleID)
        .members;
      let roleName = role.name;
      let roleSize = membersWithRole.size;
      // console.log("rolename " + roleName + " Count " + roleSize);

      if (
        roleName == "House Lannister" ||
        roleName == "House Stark" ||
        roleName == "House Tully" ||
        roleName == "House Arryn" ||
        roleName == "House Baratheon" ||
        roleName == "House Tyrell" ||
        roleName == "House Targaryen" ||
        roleName == "House Greyjoy" ||
        roleName == "NightsWatch" ||
        roleName == "White Walkers" ||
        roleName == "The Dead" ||
        roleName == "Deserter"
      ) {
        countall_name.push(roleName);
        countall_size.push(roleSize);
        console.log("Count All " + roleName + " size " + roleSize);
      }
    });
    // console.log("countall " + countall_name[0]);
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("List of all Houses + Other Roles")
      .attachFiles(["./assets/throne128.png"])
      .setThumbnail("attachment://throne128.png")
      .addFields(
        {
          name: "Name:",
          value: countall_name[0] + " -Count: " + countall_size[0],
        },
        {
          name: "Name:",
          value: countall_name[1] + " -Count: " + countall_size[1],
        },
        {
          name: "Name:",
          value: countall_name[2] + " -Count: " + countall_size[2],
        },
        {
          name: "Name:",
          value: countall_name[3] + " -Count: " + countall_size[3],
        },
        {
          name: "Name:",
          value: countall_name[4] + " -Count: " + countall_size[4],
        },
        {
          name: "Name:",
          value: countall_name[5] + " -Count: " + countall_size[5],
        },
        {
          name: "Name:",
          value: countall_name[6] + " -Count: " + countall_size[6],
        },
        {
          name: "Name:",
          value: countall_name[7] + " -Count: " + countall_size[7],
        },
        {
          name: "Name:",
          value: countall_name[8] + " -Count: " + countall_size[8],
        },
        {
          name: "Name:",
          value: countall_name[9] + " -Count: " + countall_size[9],
        },
        {
          name: "Name:",
          value: countall_name[10] + " -Count: " + countall_size[10],
        },
        {
          name: "Name:",
          value: countall_name[11] + " -Count: " + countall_size[11],
        }
      );
    receivedMessage.channel.send(embed);
  }

  //-------------------------------------------------------------------------
  // GET ALL ROLE MEMBER COUNTS PER HOUSE CALLED - ^roles (not listed in Help)
  //-------------------------------------------------------------------------
  if (receivedMessage.content === "^roles") {
    // let roleID = "707069333494431854";
    // let membersWithRole = receivedMessage.guild.roles.cache.map((role) => {
    //   return role.name;
    // });
    // console.log(membersWithRole);
    // let embed = new Discord.MessageEmbed({
    //   title: `Users with the ${roleID} role`,
    //   description: membersWithRole.join("\n"),
    //   color: 0xffff,
    // });
    // receivedMessage.channel.send(embed);
    // const embed = new Discord.MessageEmbed()
    //   .setColor("#0099ff")
    //   .setTitle("Banner Role Call")
    //   .attachFiles(["./assets/house_stark.png"])
    //   .setThumbnail("attachment://house_stark.png")
    //   .addFields(
    //     { name: "House Name:", value: `${roleName}` },
    //     { name: "House Motto:", value: "Winter Is Coming." },
    //     { name: "Number of Banners:", value: `${membersWithRole.size}` }
    //   );
    // receivedMessage.channel.send(embed);
    // console.log("entered banner role call stark");
  }
  //------------------------------

  //-------------------------------------------------------------------------
  // GET ROLE MEMBER COUNTS PER HOUSE CALLED - ^count-housename
  //-------------------------------------------------------------------------

  if (receivedMessage.content === "^count-lannister") {
    let roleID = "707069479833698326";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_lannister.png"])
      .setThumbnail("attachment://house_lannister.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "A Lannister Always Pays His Debts." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-stark") {
    let roleID = "707069333494431854";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);
    console.log(">>>>>TEST " + membersWithRole);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_stark.png"])
      .setThumbnail("attachment://house_stark.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "Winter Is Coming." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call stark");
  }

  if (receivedMessage.content === "^count-targaryen") {
    let roleID = "707073920515309639";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_targaryen.png"])
      .setThumbnail("attachment://house_targaryen.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "Fire and Blood." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-arryn") {
    let roleID = "707073800474198078";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_arryn.png"])
      .setThumbnail("attachment://house_arryn.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "As High As Honor." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-tyrell") {
    let roleID = "707073467283144704";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_tyrell.png"])
      .setThumbnail("attachment://house_tyrell.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "Growing Strong." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-baratheon") {
    let roleID = "707073882321846355";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_baratheon.png"])
      .setThumbnail("attachment://house_baratheon.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "Ours Is The Fury." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-tully") {
    let roleID = "707073997933772811";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_tully.png"])
      .setThumbnail("attachment://house_tully.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "Family, Duty, Honor." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-greyjoy") {
    let roleID = "708351845994725418";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Banner Role Call")
      .attachFiles(["./assets/house_greyjoy.png"])
      .setThumbnail("attachment://house_greyjoy.png")
      .addFields(
        { name: "House Name:", value: `${roleName}` },
        { name: "House Motto:", value: "What Is Dead May Never Die." },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }

  if (receivedMessage.content === "^count-nightswatch") {
    let roleID = "707074053881724989";
    let membersWithRole = receivedMessage.guild.roles.cache.get(roleID).members;
    let roleName = receivedMessage.guild.roles.cache.get(roleID).name;
    console.log(`Got ${membersWithRole.size} members role ${roleName}.`);

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Guardians of the Wall Role Call")
      .attachFiles(["./assets/nights_watch.png"])
      .setThumbnail("attachment://nights_watch.png")
      .addFields(
        { name: "Name:", value: `${roleName}` },
        {
          name: "Pledge:",
          value:
            "I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness.",
        },
        { name: "Number of Banners:", value: `${membersWithRole.size}` }
      );
    receivedMessage.channel.send(embed);
    console.log("entered banner role call lannister");
  }
});

