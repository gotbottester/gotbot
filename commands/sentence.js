const Money = require("../models/profile.js");
const Discord = require("discord.js");
const loot = 10;

module.exports = {
  name: "sentence",
  description: "says sentence!",
  execute(message, args) {
    //SENTENCE - LORD COMMANDER
    console.log("entered sentence command");
    //MUST HAVE LORD COMMANDER ROLE
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("715783930581876806")) {
      //lord commander
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered setence command");
        let role = message.guild.roles.cache.find((r) => r.name === "The Dead");
        console.log("role " + role);
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let nightrole = member.roles.cache.find((r) => r.name === "Night King");
        let deserterrole = member.roles.cache.find(
          (r) => r.name === "Deserter"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.name === "King of Westeros"
        );
        let essosrole = member.roles.cache.find(
          (r) => r.name === "Essos Exile"
        );
        let handrole = member.roles.cache.find(
          (r) => r.name === "Hand of the King"
        );
        let smallrole = member.roles.cache.find(
          (r) => r.name === "Small Council"
        );
        let guardrole = member.roles.cache.find(
          (r) => r.name === "Kingsguard - White Cloak"
        );
        let skinchange = member.roles.cache.find(
          (r) => r.id === "729097440082526279"
        );
        if (
          deserterrole == "715781455560573001" &&
          wightrole != "713901799324778587" && //white walkers
          nightrole != "713895055252783175" && //night king
          kingrole != "708021014977708033" && //king
          essosrole != "714598666857349132" && //essos
          handrole != "707250754020180079" && //hand
          smallrole != "712353382660309033" && //small
          guardrole != "735281180521398292" && //guard
          !skinchange
        ) {
          //remove all roles except everyone and Old Gods and White Walkers and Night King
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role != "707028782522826782" && //everyone
              role != "707032148493991947" && //old gods
              role != "712005922578366494" && //mod
              role != "730319761908563970" && //mod2
              role != "707094276458414143" && //lords of westeros
              role != "732050744466997340" && //direwolf
              role != "734148371308216332" && //direwolfghost
              role != "734148516800233502" && //shadowcat
              role != "739206804310982751" && //amulet
              role != "741145157885493251" //broadsword
            ) {
              member.roles.remove(role).catch(console.error);
            }
          });

          //add The Dead role
          console.log("member " + member);
          member.roles.add(role).catch(console.error);
          console.log("you gave " + member + " role " + role);
          message.channel.send(
            "The Lord Commander of the NightsWatch has sentenced " +
              member.user.username +
              " to Death!"
          );
          member.send(
            "The Lord Commander of the Nights WAtch sentenced you to death for deserting the Watch and received a loot from the member of " +
              loot +
              " coins!"
          );
          //give kill to author
          Money.findOne(
            {
              userID: message.author.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.kills = money.kills + 1;
              money.coins = money.coins + loot;
              money.save().catch((err) => console.log(err));
            }
          );
          //give death to mentioned member
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.deaths = money.deaths + 1;
              money.coins = money.coins - loot;
              money.save().catch((err) => console.log(err));
            }
          );
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been Sentenced to Death by the Lord Commander ${message.member.user.username}!`
            )
            .setColor("BLACK")
            .attachFiles(["./assets/sentenced.png"])
            .setImage("attachment://sentenced.png");
          chan.send(embed);
        } else {
          message.channel.send(
            "Only those marked with Deserters role can be sentenced to death. (Cannot be Hand, Small Council, Kingsguard, Essos Exiles)"
          );
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the Lord Commander of the NightsWatch can sentence Deserters to death!"
      );
    }
  },
};
