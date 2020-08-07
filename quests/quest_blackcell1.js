const Money = require("../models/profile.js");
var question2_ans;

module.exports = {
  name: "quest_blackcell1",
  description: "says quest_blackcell1!",
  execute(message, args) {
    //quest_blackcell1
    console.log("entered quest_blackcell1 command");
    var member;
    console.log("see varys options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    var question = Math.floor(Math.random() * 3);
    console.log("question 2 " + question);
    message
      .awaitReactions(filter, { max: 1})
      .then((collected) => {
        const reaction = collected.first();
        if (question == 0 && reaction.emoji.name === "1️⃣") {
            message.reply(member.user.username + " reacted with 1️⃣");
            console.log("REACTED CORRECTLY");
            // message.delete({ timeout: 3000 });
            message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
            setTimeout(function () {
              message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Go left in the Tunnel\n React with 2️⃣ Go right in the Tunnel"); //send it to whatever channel the bot has permissions to send on
              console.log("sent from blackcell1");
            }, 5 * 1000);
        } else if (question == 1 && reaction.emoji.name === "2️⃣") {
            message.reply(member.user.username + " reacted with 2️⃣");
            console.log("REACTED CORRECTLY");
            // message.delete({ timeout: 3000 });
            message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
            setTimeout(function () {
              message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Go left in the Hall\n React with 2️⃣ Go right in the Hall"); //send it to whatever channel the bot has permissions to send on
              console.log("sent from blackcell1");
            }, 5 * 1000);
        } else if (question == 2 && reaction.emoji.name === "3️⃣") {
            message.reply(member.user.username + " reacted with 3️⃣");
            console.log("REACTED CORRECTLY");
            // message.delete({ timeout: 3000 });
            message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
            setTimeout(function () {
              message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Go right in the Hall\n React with 2️⃣ Go left in the Hall"); //send it to whatever channel the bot has permissions to send on
              console.log("sent from blackcell1");
            }, 5 * 1000);
        } else {
          console.log("REACTED INCORRECTLY");
          // message.delete({ timeout: 3000 });
          message.channel.send("The Guards found you and preventing your escape. Just hope Varys returns...");
        }
      })
      .catch((collected) => {
        console.log(
          `question 2 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("question 2 you didn't react in time with an answer.");
        // member.roles.remove("725406142670569502");
        message.delete({ timeout: 10000 });
      });
  },
};
