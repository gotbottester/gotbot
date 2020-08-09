const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  givedeath: function (member) {
    //remove all roles except ones noted below
    console.log("Entered givedeath");
    Money.findOne(
      {
        userID: member.id,
        guildID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        money.deaths = money.deaths + 1;
        money.save().catch((err) => console.log(err));
      }
    );
    console.log("Finished givedeath");
  },
};
