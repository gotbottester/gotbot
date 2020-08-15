const Money = require("../models/profile.js");

module.exports = {
  name: "quest_dagger",
  description: "says quest_dagger!",
  execute(message, args) {
    //quest_ironcoin
    var member;
    console.log("saw gotbot valy quest message");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      if (member.roles.cache.has("719083010091253770")) {
        message.reply("You already have the Valryian Dagger role.");
      } else if (
        member.roles.cache.has("713901799324778587") ||
        member.roles.cache.has("708346509367836702") ||
        member.roles.cache.has("714598666857349132")
      ) {
        message.reply(
          "White Walkers, Dead and Essos Exiles cannot go on Quests in Westeros!"
        );
      } else if (!member.roles.cache.size > 1) {
        message.reply("You must have at least one role to accept Quests.");
      } else {
        return ["👍"].includes(reaction.emoji.name);
      }
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected1) => {
        const reaction = collected1.first();
        if (reaction.emoji.name === "👍") {
          message.reply(
            member.user.username + " Accepted Valyrian Dagger Quest."
          );
          member.send(
            "Go to this channel to fulfill your Quest: <#721263752015511613> (You only have 30 seconds to answer the Question!)"
          );
          member.roles.add("721211126582476832");
          var chan = message.guild.channels.cache.get("721263752015511613");
          let question = Math.floor(Math.random() * 5);
          console.log("question " + question);
          switch (question) {
            case 0:
              chan.send(
                "Maester: What is the name of the Valyrian Steel sword carried by Eddard Stark? (You have 30 seconds to answer)\n React with 1️⃣ Heartsbane\n React with 2️⃣ Longclaw\n React with 3️⃣ Oathkeeper\n React with 4️⃣ Ice"
              );
              break;
            case 1:
              chan.send(
                "Maester: Which of the following is not a Valyrian Sword? (You have 30 seconds to answer)\n React with 1️⃣ Blackfyre\n React with 2️⃣ Brightroar\n React with 3️⃣ Dark Sister\n React with 4️⃣ Oath Maker"
              );
              break;
            case 2:
              chan.send(
                "Maester: Where else can you find Valyrian Steel? (You have 30 seconds to answer)\n React with 1️⃣ Faceless Chain Armor\n React with 2️⃣ Maester Chain Links\n React with 3️⃣ The Crown\n React with 4️⃣ Gendry's Workshop"
              );
              break;
            case 3:
              chan.send(
                "Maester: Who gave Arya a Valyrian Dagger? (You have 30 seconds to answer)\n React with 1️⃣ Jon Snow\n React with 2️⃣ Little Finger\n React with 3️⃣ Bran\n React with 4️⃣ The Hound"
              );
              break;
            case 4:
              chan.send(
                "Maester: Where is Valyrian Steel from? (You have 30 seconds to answer)\n React with 1️⃣ Valyrian City\n React with 2️⃣ Essos\n React with 3️⃣ Valyrian Freehold\n React with 4️⃣ Pentos"
              );
              break;
          }
          // message.delete({ timeout: 3000 });
        } else {
          message.reply(
            "You must react with 👍 to accept the Quest and not have Valyrian Steel already"
          );
          // message.delete({ timeout: 3000 });
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("721211126582476832");
        }, 60 * 1000);
      })
      .catch((collected1) => {
        console.log(`After a minute, only ${collected1.size} out of reacted.`);
        message.reply(
          "Nobody reacted in time with an answer to grab the Valyrian Dagger."
        );
        message.delete({ timeout: 3000 });
      });
  },
};
