const Discord = require("discord.js");

module.exports = {
  name: "combatinfo",
  description: "says combatinfo!",
  execute(message, args) {
    //combatinfo
    let embed = new Discord.MessageEmbed()
      .setTitle("Detailed Combat Info")
      .setColor("BLUE")
      .setTimestamp()
      .attachFiles(["./assets/trial.png"])
      .setThumbnail("attachment://trial.png")
      .addFields(
        {
          name: "Type: Melee (FRIENDLY DUEL)",
          value: "*Typing ^melee @user is a FRIENDLY way to duel another member. Roles are not lost.*\n***Requirements***: Must be in the combat channel, and living.\n***Rewards***:\nWinners gain both 20 coins and 2 Swordsman XP\nLosers lose both 20 coins and 1 Swordsman XP\n***Bonus points added to Chance***:\nValyrian Dagger + .10\nChainmail Armor + .20\nShield + .10\nLongsword + .20",
        },
        {
          name: "Type: Trial By Combat (DEADLY DUEL)",
          value: "*Typing ^trialbycombat @user is a DEADLY way to duel another member. Either can Die and lose roles (except pets)*\n***Requirements***: Must be in the combat channel, and living.\n***Bonuses***: 50/50 Chance of Winning. Items do not increase bonus currently. Will change in the future.",
        }
      );
    return message.channel.send(embed);
  },
};
