const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "questmerchantman",
  description: "says questmerchantman!",
  execute(channel, args) {
    //quest_merchant
    console.log("entered questmerchantman command " + args);
    var member = args;
    member.roles.add("729899598465859604");
    var chan = channel; //merchant channel
    chan.send(
      member.user.username + " was the first to enter the creepy wagon."
    );
    let embed = new Discord.MessageEmbed()
      .setTitle(
        "Welcome Westerosi! Please see my inventory below and use the commands to buy or sell here. I am sure we can strike a deal that works for both of us."
      )
      .setColor("GREEN")
      .setTimestamp()
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
    chan.send(embed);
    setTimeout(function () {
      member.roles.remove("729899598465859604");
      member.send(
        "The Wandering Merchant has left Westeros but will return every 1-2 hours."
      );
    }, 180 * 1000);
  },
};
