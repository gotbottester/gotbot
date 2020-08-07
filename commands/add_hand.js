const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "add_hand",
  description: "says add_hand!",
  execute(message, args) {
    //ADD HAND - KING
    if (message.member.roles.cache.has("708021014977708033")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        const chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        console.log("entered add_hand command");
        let role = message.guild.roles.cache.find(
          (r) => r.name === "Hand of the King"
        );
        console.log("role " + role);

        let Bots = member.roles.cache.find((r) => r.name === "Bots");
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let nightrole = member.roles.cache.find((r) => r.name === "Night King");
        let essosrole = member.roles.cache.find(
          (r) => r.name === "Essos Exile"
        );
        let nightswatch = member.roles.cache.find(
          (r) => r.name === "NightsWatch"
        );
        let deadrole = member.roles.cache.find((r) => r.name === "The Dead");
        let kingrole = member.roles.cache.find(
          (r) => r.name === "King of Westeros"
        );
        let kingsguard = member.roles.cache.find(
          (r) => r.id === "735281180521398292"
        );

        if (
          wightrole != "713901799324778587" && //white walkers
          nightrole != "713895055252783175" && //night king
          essosrole != "714598666857349132" && //essos
          nightswatch != "707074053881724989" && //nightswatch
          deadrole != "708346509367836702" &&
          Bots != "715061597944545312" &&
          kingrole != "708021014977708033" &&
          !kingsguard
        ) {
          if (role.members.size == 0) {
            //only allow 1 hand
            if (member.roles.cache.size > 1) {
              console.log("member " + member);
              member.roles.add(role).catch(console.error);
              console.log("you gave " + member + " role " + role);
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} has been promoted as Hand of the King!`
                )
                .setDescription(
                  "The Hand of the King can Execute and Jail just like the King himself."
                )
                .setColor("GOLD")
                .attachFiles(["./assets/hand.png"])
                .setThumbnail("attachment://hand.png");
              chan.send(embed);
            } else {
              message.channel.send("Must have at least 1 role");
            }
          } else {
            message.channel.send("Only 1 hand can be added");
          }
        } else {
          message.channel.send(
            "Cannot promote the Nights Watch, Dead or Exiles to Hand!"
          );
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King can select a Hand of the King!");
    }
  },
};
