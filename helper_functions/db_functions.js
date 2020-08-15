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
        money.items.forEach((entry) => {
          money.items.pull(entry);
        });
        money.deaths = money.deaths + 1;
        money.save().catch((err) => console.log(err));
      }
    );
    console.log("Finished givedeath");
  },
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
  givewightkill: function (member) {
    //remove all roles except ones noted below
    console.log("Entered wightkills");
    Money.findOne(
      {
        userID: member.id,
        guildID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        money.wightkills = money.wightkills + 1;
        money.save().catch((err) => console.log(err));
      }
    );
    console.log("Finished wightkills");
  },
  givecoin: function (member, amount) {
    //remove all roles except ones noted below
    console.log("Entered givecoin");
    Money.findOne(
      {
        userID: member.id,
        guildID: member.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        money.coins = money.coins + amount;
        money.save().catch((err) => console.log(err));
      }
    );
    console.log("Finished givecoin");
  },
  removecoin: function (member, amount) {
    //remove all roles except ones noted below
    console.log("Entered removecoin");
    Money.findOne(
      {
        userID: member.id,
        guildID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        money.coins = money.coins - amount;
        money.save().catch((err) => console.log(err));
      }
    );
    console.log("Finished removecoin");
  },
};
