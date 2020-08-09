const Money = require("../models/profile.js");

module.exports = {
  name: "give_armor",
  description: "says give_armor!",
  execute(message, args) {
    //GIVE armor - anyone that has armor
    if (
      message.member.roles.cache.has("726663217950097458") //armor
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered give armor command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "726663217950097458"
        );
        console.log("role " + role);

        let Bots = member.roles.cache.find((r) => r.name === "Bots");

        if (Bots != "715061597944545312") {
          if (!member.roles.cache.has("726663217950097458")) {
            console.log("member " + member);
            member.roles.add(role).catch(console.error); //give armor to mentioned member
            message.member.roles.remove(role).catch(console.error); //remove armor from self
            console.log("you gave " + member + " role " + role);
            message.channel.send(
              message.member.user.username +
                " has given his Chainmail Armor to " +
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
                money.items.push("Chainmail Armor");
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
                money.items.pull("Chainmail Armor");
                money.save().catch((err) => console.log(err));
              }
            );
          } else {
            message.channel.send("That member already has a Chainmail Armor!");
          }
        }
      }
    } else {
      console.log("You must have a Chainmail Armor to give!");
      message.channel.send("You must have a Chainmail Armor to give!");
    }
  },
};
