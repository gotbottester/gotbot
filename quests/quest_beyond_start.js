const Discord = require("discord.js");

module.exports = {
  name: "quest_beyond_start",
  description: "says quest_beyond_start!",
  execute(
    channel_w,
    channel_nw,
    chan_questbeyondwall,
    chan_questbeyondwall2,
    chan_questbeyondwall3,
    args
  ) {
    //quest_beyond_start
    console.log("entered quest_beyond_start command");
    var member = args;
    console.log("member " + member.user.username);
    console.log("ranger channel " + chan_questbeyondwall2);
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
    channel_w.send(embed0);
    //-------end of message to whispers
    var ranger = 0;
    var firstranger = 0;
    //if ranger skip
    // member.roles.cache.forEach((role) => {
      // console.log("each role " + role.name);
      if (
        member.roles.cache.has("727748751522922499") && // ranger
        !member.roles.cache.has("728750595904897106") //first ranger
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
        channel_w.send(embed1);
        channel_nw.send(embed1);
      } else if (
        member.roles.cache.has("728750595904897106") // first ranger
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
        channel_w.send(embed2);
        channel_nw.send(embed2);
      }
    // });
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
        member.roles.remove("728725245149839420");
        // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Path question and was booted from the Quest.");
      }, 120 * 1000);
    } else if (ranger == 1) {
      console.log("TEST ENTERED RANGER IF STATEMENT");
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
  },
};
