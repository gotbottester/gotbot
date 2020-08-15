const Money = require("../../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_beyondwall_start",
  description: "says quest_beyondwall_start!",
  execute(message, args) {
    //quest_beyondwall_start
    console.log("entered quest_beyondwall_start command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["👍"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 360000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          //message to whispers showing the quest is on
          var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
          // var chan = message.guild.channels.cache.get("714201504583516211"); //test
          var chan_questbeyondwall = message.guild.channels.cache.get("727677918142136431"); //quest beyond wall
          var chan_questbeyondwall2 = message.guild.channels.cache.get("728718626344927252"); //quest beyond wall
          var chan_questbeyondwall3 = message.guild.channels.cache.get("728738536534048869"); //quest beyond wall
          let embed0 = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " has gone Beyond the Wall on a Quest. Send him your Prayers."
            )
            .setDescription(
              "Lord Commander of the Nights Watch can grant Nights Watch Members permission to go Beyond the Wall, or you can wait for it to appear in the Nights Watch Channel. Chances of running into Wights are great so beware. In each part of the quest you will have a 1 in 3 chance of gaining 30 coins. There are two badges to be gained Beyond the Wall: Ranger and First Ranger. The Ranger badges will be required for bigger quests Beyond the Wall."
            )
            .setColor("WHITE")
            .setTimestamp()
            .attachFiles(["./assets/wall.png"])
            .setThumbnail("attachment://wall.png");
          chan.send(embed0);
          //-------end of message to whispers
          var ranger = 0;
          var firstranger = 0;
          //if ranger skip
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "727748751522922499" // ranger
            ) {
              ranger = 1;
              console.log("found a ranger! skip first part of quest");
              let embed1 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " is a already a proven Ranger, he knows the path straight to Crasters without bumping into Wights."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/ranger.png"])
                .setThumbnail("attachment://ranger.png");
              chan.send(embed1);
              message.reply(embed1);
            } else if (
              role == "728750595904897106" // first ranger
            ) {
              firstranger = 1;
              console.log(
                "found a First ranger! skip first and second part of quest"
              );
              let embed2 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " is a dying breed of First Rangers. He knows his way past the Haunted Forest and doesn't need to rest at Crasters Keep."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/firstranger.png"])
                .setThumbnail("attachment://firstranger.png");
              chan.send(embed2);
            }
          });
          if (firstranger == 1) {
            member.roles.add("728725245149839420");
            member.send(
              "Find your Quest Beyond the Wall here ->>> <#728738536534048869>"
            );
            chan_questbeyondwall3.send(
              "**You must now decide a path. Towards the Fist of the First Men or towards Frostfangs?**\n React with 1️⃣ to go towards the Fist of the First Men\n React with 2️⃣ to go towards Frostfangs\n React with 3️⃣ to Quit Quest"
            ); 
            setTimeout(function () {
              console.log("--------quest timeout START entered----------");
              member.roles.remove("728738536534048869");
              // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Path question and was booted from the Quest.");
            }, 120 * 1000);
          } else if (ranger == 1) {
            member.roles.add("728720420273913857");
            member.send(
              "Find your Quest Beyond the Wall here ->>> <#728718626344927252>"
            );
            chan_questbeyondwall2.send(
              "**You made it to the edge of the Haunted Forest, and spot Crasters Keep ahead. You need much needed food, rest and first aid after fighting the Wight.**\n React with 1️⃣ to ask Craster for Permission to stay the night\n React with 2️⃣ kill Craster and burn his House down then move on\n React with 3️⃣ to Quit Quest"
            ); 
            setTimeout(function () {
              console.log("--------quest timeout START entered----------");
              member.roles.remove("728720420273913857");
              // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Craster question and was booted from the Quest.");
            }, 120 * 1000);
          } else {
            member.roles.add("727677376191791105");
            member.send(
              "Find your Quest Beyond the Wall here ->>> <#727677918142136431>"
            );
            chan_questbeyondwall.send(
              "**As you travel through the Haunted Forest, a Wight appears and attacks you!**\n React with 1️⃣ to fight the Wight head on\n React with 2️⃣ to run for cover and get the Wight by surprise\n React with 3️⃣ retreat back to Castle Black fast\n React with 4️⃣ to Quit Quest"
            );
            setTimeout(function () {
              console.log("--------quest timeout START entered----------");
              member.roles.remove("727677376191791105");
              // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Wight question and was booted from the Quest.");
            }, 120 * 1000);
          }
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send("You did not get through the Gate fast enough.");
        }
        
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("Nobody went Beyond the Wall this time.");
        message.delete({ timeout: 15000 });
      });
  },
};
