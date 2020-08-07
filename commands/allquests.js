const Discord = require("discord.js");

module.exports = {
  name: "allquests",
  description: "says allquests!",
  execute(message, args) {
    //allquests
    let embed = new Discord.MessageEmbed()
      .setTitle("List of Available Quests")
      .setColor("BLUE")
      .setTimestamp()
      .attachFiles(["./assets/quests.png"])
      .setThumbnail("attachment://quests.png")
      .addFields(
        {
          name: "Name: Valyrian Dagger Quest (30 mins - 1 hour Interval in Westeros Channel)",
          value: "Quiz to pickup a Valaryian Dagger. Helps against White Walker Bites at the Nights Watch and for the Beyond the Wall Quest.",
        },
        {
          name: "Name: Beyond the Wall Quest (30 mins - 1 hour Intervals in Nights Watch Channel)",
          value: "Must be a Nights Watchmen. Multiple paths beyond the wall where you have random chances mixed with bonus chances according to the weapons you carry to go the route of Frostfangs or Fist of Men. You can become a Nights Watch Ranger, First Ranger, get items you cannot buy in Westeros and win 100 coins for completing the Quest.",
        },
        {
          name: "Name: Iron Coin Quest (1-3 hours interval in Westeros Channel)",
          value: "Jaqen offers you a chance to have an Iron Coin. Will allow you passage to Braavos in future Quest.",
        },
        {
          name: "Name: Red Priestess Quest (30 mins to 1 hour interval in Westeros Channel ONLY when there is no Red Priestess)",
          value: "Pray to the Lord of Light and see if he grants you the dark arts.",
        }

      );
    return message.channel.send(embed);
  },
};
