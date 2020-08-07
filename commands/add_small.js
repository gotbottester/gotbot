const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "add_small",
  description: "says add_small!",
  execute(message, args) {
    //ADD SMALL - KING
    if (message.member.roles.cache.has("708021014977708033")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered add_small command");
        const chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        let role = message.guild.roles.cache.find(
          (r) => r.name === "Small Council"
        );
        let membersWithRole = role.members;
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
        let kingsguard = member.roles.cache.find(
          (r) => r.id === "735281180521398292"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );

        if (membersWithRole.size < 7) {
          if (
            wightrole != "713901799324778587" && //white walkers
            nightrole != "713895055252783175" && //night king
            essosrole != "714598666857349132" && //essos
            nightswatch != "707074053881724989" && //nightswatch
            deadrole != "708346509367836702" &&
            Bots != "715061597944545312" &&
            !kingsguard &&
            !melirole
          ) {
            if (member.roles.cache.size > 1) {
              console.log("member " + member);
              member.roles.add(role).catch(console.error);
              console.log("you gave " + member + " role " + role);
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} has been promoted as a member of the Small Council!`
                )
                .setDescription(
                  "Members of the Small Council cannot be Executed and have access to private quarters to discuss issues for the King."
                )
                .setColor("GOLD")
                .attachFiles(["./assets/small.png"])
                .setThumbnail("attachment://small.png");
              chan.send(embed);
            } else {
              message.channel.send("Must have at least 1 role");
            }
          } else {
            message.channel.send(
              "Cannot promote the Nights Watch, Dead or Exiles to Small Council!"
            );
          }
        } else {
          message.channel.send("Only 7 max allowed in Small Council!");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the King can add members from the Small Council!"
      );
    }
  },
};
