const Discord = require("discord.js");

module.exports = {
  name: "trade",
  description: "says trade!",
  execute(message, args) {
    //trade
    let embed = new Discord.MessageEmbed()
      .setTitle("Wandering Merchant Trade Inventory")
      .setColor("GREEN")
      .setTimestamp()
      .attachFiles(["./assets/merchant.png"])
      .setThumbnail("attachment://merchant.png")
      .addFields(
        {
          name:
            "Sell Iron Coin for 100 coins (Needed to take you to Braavos in the near future)",
          value: "`^sell_ironcoin`",
        },
        {
          name: "Sell Valyrian Dagger for 10 coins",
          value: "`^sell_dagger`",
        },
        {
          name: "Buy Valyrian Dagger for 20 coins (Useful in Quests and Adds points to winning Melee Battles)",
          value: "`^buy_dagger`",
        },
        {
          name:
            "Buy Dragonglass for 50 coins (Kills White Walkers only and useful for Quest Beyond the Wall at the Nights Watch)",
          value: "`^buy_dragonglass`",
        },
        {
          name:
            "Buy a Dire Wolf Pup for 500 coins (Useful in Quests in the near future)",
          value: "`^buy_wolf`",
        }
      );
    return message.channel.send(embed);
  },
};
