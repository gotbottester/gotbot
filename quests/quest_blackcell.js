const Money = require("../models/profile.js");

module.exports = {
  name: "quest_blackcell",
  description: "says quest_blackcell!",
  execute(message, args) {
    //quest_blackcell
    console.log("entered quest_blackcell command");
    var member;
    console.log("see varys options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1})
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "1️⃣") {
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
          setTimeout(function () {
            message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Take the stairs down to the tunnels\n React with 2️⃣ Take the left way through the Hall\n React with 3️⃣ Take the right way through the Hall"); //send it to whatever channel the bot has permissions to send on
            console.log("sent black cell quest 2 message");
          }, 5 * 1000);
        } else if (reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
          setTimeout(function () {
            message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Play dead as they open cell\n React with 2️⃣ Grab guard and his dagger as a hostage\n React with 3️⃣ Knock Guard out and lock him in cell"); //send it to whatever channel the bot has permissions to send on
            console.log("sent black cell quest 2 message");
          }, 5 * 1000);
        } else if (reaction.emoji.name === "3️⃣") {
          message.reply(member.user.username + " reacted with 3️⃣");
          console.log("REACTED CORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
          setTimeout(function () {
            message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Walk Varys down the left Hall\n React with 2️⃣ Walk Varys down the right Hall\n React with 3️⃣ Let Varys go and get into the tunnels"); //send it to whatever channel the bot has permissions to send on
            console.log("sent black cell quest 2 message");
          }, 5 * 1000);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 10000 });
          message.channel.send("The Guards found you and preventing your escape. Just hope Varys returns...");
        }
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("question 1 you didn't react in time with an answer.");
        // member.roles.remove("725406142670569502");
        message.delete({ timeout: 10000 });
      });
  },
};
