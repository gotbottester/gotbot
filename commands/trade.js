const Discord = require("discord.js");

module.exports = {
  name: "trade",
  description: "says trade!",
  execute(message, args) {
    //trade
    let embed = new Discord.MessageEmbed()
      .setTitle("Wandering Merchant Trade Inventory")
      .setDescription("The Merchant Wagon appears randomly throughout the day. Only one can go in at a time so be the first to react to it. It will open a hidden channel for you to conduct trades.")
      .setColor("GREEN")
      .attachFiles(["./assets/merchant.png"])
      .setThumbnail("attachment://merchant.png")
      .addFields(
        {
          name:
            "Sell Iron Coin for 100 coins\n(Needed to take you to Braavos in the near future)",
          value: "`^sell_ironcoin`",
        },
        {
          name: "Sell Valyrian Dagger for 10 coins",
          value: "`^sell_dagger`",
        },
        {
          name: "Buy Valyrian Dagger for 20 coins\n(Helps Nights Watch with Bites from White Walkers and useful in Quests and Adds points to winning Duel Battles)",
          value: "`^buy_dagger`",
        },
        {
          name:
            "Buy Dragonglass for 30 coins\n(Helps Nights Watch with Bites from White Walkers and useful for Quest Beyond the Wall at the Nights Watch)",
          value: "`^buy_dragonglass`",
        },
        {
          name:
            "Buy a Dire Wolf Pup for 500 coins\n(Useful in Quests in the near future)",
          value: "`^buy_wolf`",
        }
      );
    return message.channel.send(embed);
  },
};
