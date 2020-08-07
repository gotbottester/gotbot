const Discord = require("discord.js");
const Money = require("../models/profile.js");


module.exports = {
  name: "pay",
  description: "says pay!",
  execute(message, args) {
    var coinstopay = 0;
    console.log("args " + args[1]);
    coinstopay = parseInt(args[1]);
    if (isNaN(coinstopay)) {
        message.reply("Sorry that is not a valid payment command. Must be in the format ^pay number @user");
    } else if (coinstopay == null) {
      message.reply("Sorry you did not enter a payment number");
    } else if (coinstopay <= 0) {
      message.reply("Sorry you cannot enter a value lower than 1");
    } else {
      console.log("pay away");
      var member = message.mentions.members.first();
      if (member == null) {
        message.reply("Sorry that is not a valid payment command. Must be in the format ^pay number @user");
        return;
      } else if (member.id != message.author.id) {
        Money.findOne(
          {
            userID: message.member.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.coins < coinstopay) {
              message.reply("You need to have at least "+coinstopay+" coins.");
              return;
            } else {
              Money.findOne(
                {
                  userID: member.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins + coinstopay;
                  money.save().catch((err) => console.log(err));
                  var total_coins = Math.floor(money.coins);
                  let embed = new Discord.MessageEmbed()
                    // .setTitle("Coins")
                    .setColor("GOLD")
                    .setTimestamp()
                    .attachFiles(["./assets/coins.png"])
                    .setThumbnail("attachment://coins.png")
                    .setAuthor(
                      `${message.member.user.username}` +
                        ` has payed ${coinstopay} coins to ` +
                        `${member.user.username}`
                    )
                    .addField(`${member.user.username} now has:`, `Total Coins ${total_coins}`);
                  // embed.addField("Total Coins", money.coins, true);
                  return message.channel.send(embed);
                }
              );
              Money.findOne(
                {
                  userID: message.member.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins - coinstopay;
                  money.save().catch((err) => console.log(err));
                  console.log("removed "+coinstopay+" from " + message.member.user.username);
                }
              );
            }
          }
        );
      } else if (member.id == message.author.id) {
        console.log("YOU CANNOT PAY YOURSELF COINS!");
        message.reply("You cannot pay yourself coins! Cheater!");
      }
    }
  },
};
