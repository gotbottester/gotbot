// const Money = require("../models/profile.js");
// const Discord = require("discord.js");
// var buyprice = 40;

// module.exports = {
//   name: "buy_map_beyond",
//   description: "says buy_map_beyond!",
//   execute(message, args) {
//     //buy map beyond the wall - anyone that has map beyond the wall
//     var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
//     if (message.channel == "729521244642476154") {
//       if (
//         !message.member.roles.cache.has("730941252744511520") //map beyond
//       ) {
//         let member = message.member;

//         console.log("entered buy map beyond command");
//         let role = message.guild.roles.cache.find(
//           (r) => r.id === "730941252744511520"
//         );
//         //   console.log("role " + role);
//         //   console.log("member " + member);
//         // console.log("you gave " + member + " role " + role);
//         message.member.roles.add(role).catch(console.error); //add map beyond
//         message.channel.send(
//           message.member.user.username +
//             " has bought a Map for the Beyond the Wall Quest from the Wandering Merchant"
//         );
//         Money.findOne(
//           {
//             userID: message.member.id,
//             guildID: message.guild.id,
//           },
//           (err, money) => {
//             if (err) console.log(err);
//             money.coins = money.coins - buyprice;
//             money.save().catch((err) => console.log(err));
//             let embed = new Discord.MessageEmbed()
//               .setTitle(
//                 `${member.user.username} Bought a Map for the Beyond the Wall Quest from the Wandering Merchant for ${buyprice} coins.`
//               )
//               .setDescription("This Map will give you detailed tips on paths and items you need to complete all outcomes of the Quest.")
//               .setColor("GREEN")
//               .attachFiles(["./assets/merchant.png"])
//               .setThumbnail("attachment://merchant.png");
//               chan.send(embed);
//           }
//         );
//       } else {
//         console.log("You already have a Map, cannot have carry more.");
//         message.channel.send("You already have a Map, cannot have carry more.");
//       }
//     } else {
//       message.reply(
//         "You must be in the Merchant's Wagon Channel to buy/sell items."
//       );
//     }
//   },
// };



// // name: "trade",
// // description: "says trade!",
// // execute(message, args) {
// //   //trade
// //   let embed = new Discord.MessageEmbed()
// //     .setTitle("Wandering Merchant Trade Inventory")
// //     .setColor("GREEN")
// //     .setTimestamp()
// //     .attachFiles(["./assets/merchant.png"])
// //     .setThumbnail("attachment://merchant.png")
// //     .addFields(
// //       {
// //         name: "Sell Valyrian Dagger for 10 coins",
// //         value: "^sell_dagger",
// //       },
// //       {
// //         name: "Buy Valyrian Dagger for 20 coins",
// //         value: "^buy_dagger",
// //       },
// //       {
// //         name: "Sell Iron Coin for 100 coins",
// //         value: "^sell_ironcoin",
// //       }
// //     );
// //   return message.channel.send(embed);