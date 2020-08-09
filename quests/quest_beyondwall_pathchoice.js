const Discord = require("discord.js");

module.exports = {
  name: "quest_beyondwall_pathchoice",
  description: "says quest_beyondwall_pathchoice!",
  execute(message, args) {
    //quest_beyondwall_pathchoice
    console.log("entered quest_beyondwall_pathchoice command");
    var member;

    console.log("see beyond wall pathchoice options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var chan = message.guild.channels.cache.get("714201504583516211"); //test
        var chan_questfrost = message.guild.channels.cache.get(
          "728742532099604560"
        ); //
        var chan_questfist = message.guild.channels.cache.get(
          "728742583790075904"
        ); //
        if (reaction.emoji.name === "1️⃣") {
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          message.channel.send(
            member.user.username +
              " chose the path towards The Fist of the First Men."
          );
          member.roles.remove("728725245149839420"); //remove quest beyond wall3 role
          member.roles.add("728742102275457076"); //quest4 role
          member.send(
            "You chose the path towards the Fist of the First Men. Continue on your Quest. -->>> <#728742583790075904>"
          );
          chan_questfist.send(
            "**You arrive at the First of the First Men to find a Giant at the top of the Hill. He spots you, it is too late to run.**\n React with 1️⃣ to offer some jerky from your bag of food\n React with 2️⃣ to give him your Chainmail Armor to allow you to pass in peace\n React with 3️⃣ to Quit Quest"
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " has survived the Haunted Forest and is now heading towards the Fist of the First Men."
            )
            .setDescription("There is a Cave to be expolored in this direction...")
            .setColor("WHITE")
            .setTimestamp()
            .attachFiles(["./assets/fistoffirstmen.png"])
            .setThumbnail("attachment://fistoffirstmen.png");
          chan.send(embed);
          setTimeout(function () {
            console.log("--------quest timeout PATH CHOICE----------");
            member.roles.remove("728742102275457076");
            // chan.send(member.user.username + " took longer than 1 minute to answer the Path Choice question and was booted from the Quest.");
          }, 120 * 1000);

        } else if (reaction.emoji.name === "2️⃣") {
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          message.channel.send(
            member.user.username + " chose the path towards Frostfangs."
          );
          member.roles.remove("728725245149839420"); //remove quest beyond wall3 role
          member.roles.add("728729459263406080"); //quest4 role
          member.send(
            "You chose the path towards Frost Fangs. Continue on your Quest. -->>> <#728742532099604560>"
          );
          chan_questfrost.send(
            "**You travel through the Frostfangs and are surrounded by a group of cannibal Thenns.**\n React with 1️⃣ to strike first and kill them all\n React with 2️⃣ to give them a Valyarian Dagger to allow you to pass in peace\n React with 3️⃣ to Quit Quest"
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " has survived the Haunted Forest and is now heading towards Frostfangs."
            )
            .setDescription("There are rumors of Freefolk hanging about, hopefully not Thenns. Though sometimes they can be bought if you have the right equipment...")
            .setColor("WHITE")
            .setTimestamp()
            .attachFiles(["./assets/frostfangs.png"])
            .setThumbnail("attachment://frostfangs.png");
          chan.send(embed);
          setTimeout(function () {
            console.log("--------quest timeout PATH CHOICE----------");
            member.roles.remove("728729459263406080");
            // chan.send(member.user.username + " took longer than 1 minute to answer the Path Choice question and was booted from the Quest.");
          }, 120 * 1000);

        } else if (reaction.emoji.name === "3️⃣") {
          //return to castle black quit quest
          member.roles.remove("728725245149839420"); //remove quest beyond wall role
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
