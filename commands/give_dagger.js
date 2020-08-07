const Money = require("../models/profile.js");

module.exports = {
  name: "give_dagger",
  description: "says give_dagger!",
  execute(message, args) {
    //GIVE DAGGER - anyone that has dagger
    if (
      message.member.roles.cache.has("719083010091253770") //dagger
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered give dagger command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "719083010091253770"
        );
        console.log("role " + role);

        let Bots = member.roles.cache.find((r) => r.name === "Bots");

        if (Bots != "715061597944545312") {
          console.log("member " + member);
          member.roles.add(role).catch(console.error); //give dagger to mentioned member
          message.member.roles.remove(role).catch(console.error); //remove dagger from self
          console.log("you gave " + member + " role " + role);
          message.channel.send(
            message.member.user.username +
              " has given his Valyrian Dagger to " +
              member.user.username
          );
          //mentioned
          Money.findOne(
            {
              userID: member.id,
              guildID: member.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.items.push("Valyrian Dagger");
              money.save().catch((err) => console.log(err));
            }
          );
          //author
          Money.findOne(
            {
              userID: message.member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.items.pull("Valyrian Dagger");
              money.save().catch((err) => console.log(err));
            }
          );
        }
      }
    } else {
      console.log("You must have a Valyrian Dagger to give!");
      message.channel.send("You must have a Valyrian Dagger to give!");
    }
  },
};
