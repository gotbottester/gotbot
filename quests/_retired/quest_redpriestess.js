const Money = require("../models/profile.js");

module.exports = {
  name: "quest_redpriestess",
  description: "says quest_redpriestess!",
  execute(message, args) {
    //quest_redpriestess
    console.log("entered quest_redpriestess command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      if (!member.roles.cache.has("726588449263583339")) {
        if (
          !member.roles.cache.has("713901799324778587") &&
          !member.roles.cache.has("708346509367836702") &&
          !member.roles.cache.has("718167982106345592") &&
          !member.roles.cache.has("714598666857349132") && //essos
          !member.roles.cache.has("712353382660309033") && //small council
          !member.roles.cache.has("707250754020180079") && //hand
          !member.roles.cache.has("735281180521398292") && //kingsguard
          !member.roles.cache.has("708021014977708033") && //king
          !member.roles.cache.has("707074053881724989") //nightswatch
        ) {
          return ["👍"].includes(reaction.emoji.name);
        } else {
          message.reply(
            "Cannot be Dead, Essos Exiles, Nightswatch, Small Council, Hand, Kingsguard, or King to pray to the Lord of Light!"
          );
        }
      } else {
        message.reply("You already are a Red Priestess.");
      }
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          var chan = message.guild.channels.cache.get("736095446409281597"); //lord of light
          member.roles.add("736100797972086837"); //quest redpriestess role
          member.send(
            "Go Pray to the Lord of Light in the Channel HERE ->>> <#736095446409281597>."
          );
          chan.send(
            "Light your flame among us, R'hllor. Show us the truth or falseness of this man. Strike him down if he is guilty, and give strength to his sword if he is true. Lord of Light, give us wisdom.:\n React with 1️⃣ Lord of Light, defend us\n React with 2️⃣ Lord of Light, shine your face upon us\n React with 3️⃣ For the night is dark and full of terrors"
          );
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send("Nobody was quick enough to pray to the Lord of Light.");
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("736100797972086837");
        }, 60 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("Nobody was quick enough to pray to the Lord of Light");
        message.delete({ timeout: 15000 });
      });
  },
};
