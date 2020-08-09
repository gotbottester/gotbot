const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  givekill: function (member) {
    //remove all roles except ones noted below
    console.log("Entered givekill");
    Money.findOne(
      {
        userID: member.id,
        guildID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        money.kills = money.kills + 1;
        money.save().catch((err) => console.log(err));
      }
    );
    console.log("Finished givekill");
  },
};
