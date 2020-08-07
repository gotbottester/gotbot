const Money = require("../models/profile.js");
var question2_ans;

module.exports = {
  name: "quest_blackcell3",
  description: "says quest_blackcell3!",
  execute(message, args) {
    //quest_blackcell3
    console.log("entered quest_blackcell3 command");
    var member;
    console.log("see varys options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    var question = Math.floor(Math.random() * 3);
    console.log("question 2 " + question);
    //**Varys:** Take the next path:\n React with 1️⃣ Walk Varys down the left Hall\n React with 2️⃣ Walk Varys down the right Hall\n React with 3️⃣ Let Varys go and get into the tunnels
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
              message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Kill Varys and run out as Guards are distracted\n React with 2️⃣ Have Varys cause a scene while you sneak out"); //send it to whatever channel the bot has permissions to send on
              console.log("sent from blackcell 3");
            }, 5 * 1000);
        } else if (question == 1 && reaction.emoji.name === "2️⃣") {
            message.reply(member.user.username + " reacted with 2️⃣");
            console.log("REACTED CORRECTLY");
            // message.delete({ timeout: 3000 });
            message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
            setTimeout(function () {
              message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Walk Varys down the left Hall\n React with 2️⃣ Walk Varys down the right Hall"); //send it to whatever channel the bot has permissions to send on
              console.log("sent from blackcell 3");
            }, 5 * 1000);
        } else if (question == 2 && reaction.emoji.name === "3️⃣") {
            message.reply(member.user.username + " reacted with 3️⃣");
            console.log("REACTED CORRECTLY");
            // message.delete({ timeout: 3000 });
            message.channel.send("Good choice, just wait x minutes and you will receive further instructions on how to get out.")
            setTimeout(function () {
              message.channel.send("**Varys:** Take the next path:\n React with 1️⃣ Run through the tunnels fast to find a way out\n React with 2️⃣ Creep through the tunnels to find a way out"); //send it to whatever channel the bot has permissions to send on
              console.log("sent from blackcell 3");
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
