const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "add_heir",
  description: "says add_heir!",
  execute(message, args) {
    //ADD HEIR - KING
    if (
      message.member.roles.cache.has("708021014977708033")
    ) {
      //king
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered add_heir command");
        let role = message.guild.roles.cache.find(
          (r) => r.name === "Heir to the Throne"
        );
        console.log("role " + role);
        console.log("member " + member);
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

        if (
          wightrole != "713901799324778587" && //white walkers
          nightrole != "713895055252783175" && //night king
          essosrole != "714598666857349132" && //essos
          nightswatch != "707074053881724989" && //nightswatch
          deadrole != "708346509367836702" &&
          Bots != "715061597944545312" &&
          kingrole != "708021014977708033"
        ) {
          if (role.members.size == 0) {
            //only allow 1 heir
            member.roles.add(role).catch(console.error);
            console.log("you gave " + member + " role " + role);
            message.channel.send(
              "The King has selected " +
                member.user.username +
                " as his Heir to the Throne!"
            );
          } else {
            console.log("only one heir can be added");
          }
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King can select a Heir to the Throne!");
    }
  },
};
