const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  name: "quest_merchant",
  description: "says quest_merchant!",
  execute(message, args) {
    //quest_merchant
    console.log("entered quest_merchant command");
    var member;
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      if (!member.roles.cache.has("729899598465859604")) {
        if (
          !member.roles.cache.has("713901799324778587") &&
          !member.roles.cache.has("708346509367836702") &&
          !member.roles.cache.has("718167982106345592") &&
          !member.roles.cache.has("714598666857349132") //essos
        ) {
          return ["👍"].includes(reaction.emoji.name);
        } else {
          message.reply(
            "Cannot be Dead or in Essos to trade with the Wandering Merchant!"
          );
        }
      } else {
        message.reply("You are already in the Wandering Merchant's Wagon!");
      }
    };
    message
      .awaitReactions(filter, { max: 1, time: 360000, errors: ["time"] })
      // .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === "👍") {
          message.reply(member.user.username + " reacted with 👍");
          console.log("REACTED CORRECTLY");
          member.roles.add("729899598465859604");
          member.send(
            "Enter the Merchant's Wagon to buy and sell items here ->>> <#729521244642476154>. Use the ^trade command in that Channel to pull up items you can buy and sell with instructions. Hurry, the Wagon will only stay around for 5 minutes!"
          );
          var chan = message.guild.channels.cache.get("729521244642476154"); //merchant channel
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
                  "Sell Iron Coin for 100 coins (Needed to take you to Braavos in the near future)",
                value: "^sell_ironcoin",
              },
              {
                name: "Sell Valyrian Dagger for 10 coins",
                value: "^sell_dagger",
              },
              {
                name: "Buy Valyrian Dagger for 20 coins (Useful in Quests)",
                value: "^buy_dagger",
              },
              {
                name: "Sell Chainmail Armor for 20 coins",
                value: "^sell_armor",
              },
              {
                name:
                  "Buy Chainmail Armor for 30 coins (Useful in Quests and Melee Battles)",
                value: "^buy_armor",
              },
              {
                name:
                  "Buy Dragonglass for 50 coins (Kills White Walkers only and useful for Quest Beyond the Wall)",
                value: "^buy_dragonglass",
              },
              {
                name:
                  "Buy a Dire Wolf Pup for 500 coins (Useful in Quests in the near future)",
                value: "^buy_wolf",
              }
            );
          chan.send(embed);
          setTimeout(function () {
            member.roles.remove("729899598465859604");
            member.send(
              "The Wandering Merchant has left Westeros but will return every 1-2 hours."
            );
          }, 120 * 1000);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 15000 });
          message.channel.send(
            "Nobody was quick enough to get inside the Wandering Merchant's Creepy Wagon."
          );
        }
        setTimeout(function () {
          console.log("--------quest timeout entered----------");
          member.roles.remove("729899598465859604");
        }, 360 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question 1 After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply(
          "Nobody was quick enough to get inside the Wandering Merchant's Creepy Wagon."
        );
        member.roles.remove("729899598465859604"); //remove instore merchant role
        message.delete({ timeout: 15000 });
      });
  },
};
