const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "add_guard",
  description: "says add_guard!",
  execute(message, args) {
    //ADD guard - KING
    if (message.member.roles.cache.has("708021014977708033")) {
      const chan = message.guild.channels.cache.get("707102776215208008"); //whispers
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered add_hand command");
        let role = message.guild.roles.cache.find(
          //kingsguard
          (r) => r.id === "735281180521398292"
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
        let handrole = member.roles.cache.find(
          (r) => r.id === "707250754020180079"
        );
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );

        if (
          wightrole != "713901799324778587" && //white walkers
          nightrole != "713895055252783175" && //night king
          essosrole != "714598666857349132" && //essos
          nightswatch != "707074053881724989" && //nightswatch
          deadrole != "708346509367836702" &&
          Bots != "715061597944545312" &&
          kingrole != "708021014977708033" &&
          !handrole &&
          !smallrole
        ) {
          if (member.roles.cache.size > 1) {
            if (role.members.size < 2) {
              //only allow 2 kingsguard
              member.roles.add(role).catch(console.error);
              let embed = new Discord.MessageEmbed()
                .setTitle(
                  `${member.user.username} has been promoted to a Kingsguard by the King!`
                )
                .setDescription(
                  "The Kingsguard can Jail just like the King and Hand, but not execute."
                )
                .setColor("GOLD")
                .attachFiles(["./assets/whitecloak.png"])
                .setThumbnail("attachment://whitecloak.png");
              chan.send(embed);
            } else {
              console.log("only two Kingsguard can be added");
            }
          } else {
            message.channel.send("Must have at least 1 role");
          }
        } else {
          message.channel.send(
            "Cannot promote the Nights Watch, Dead or Exiles as Kingsguard!"
          );
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King can select a Kingsguard!");
    }
  },
};
