const Discord = require("discord.js");

module.exports = {
  name: "blacksmith",
  description: "says blacksmith!",
  execute(message, args) {
    //blacksmith
    let embed = new Discord.MessageEmbed()
      .setTitle("Westeros Blacksmith Inventory")
      .setDescription("The Blacksmith is where you can get weapons that will help you against Duels. You can also sell back your weapons if you are low on coins, but for a discounted price.")
      .setColor("BLACK")
      .attachFiles(["./assets/blacksmith.png"])
      .setThumbnail("attachment://blacksmith.png")
      .addFields(
        {
          name:
            "Buy or Sell Chainmail Armor for 30 coins / Sell 20 coins (Useful in Quests and Adds .20 points to winning Duels)",
          value: "`^buy_armor`, `^sell_armor`",
        },
        {
          name:
            "Buy or Sell a Shield for 20 coins / Sell 10 coins (Adds .10 points to winning Duels)",
          value: "`^buy_shield`, `^sell_shield`",
        },
        {
          name:
            "Buy or Sell Longsword for 30 coins / Sell 20 coins (Adds .20 points to winning Duels)",
          value: "`^buy_longsword`, `^sell_longsword`",
        }
      );
    return message.channel.send(embed);
  },
};
