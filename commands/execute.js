const Discord = require("discord.js");
const Money = require("../models/profile.js");
var cooldownexecute = new Set();
var cdseconds = 43200;

module.exports = {
  name: "execute",
  description: "says execute!",
  execute(message, args) {
    //EXECUTE - KING or HAND
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (cooldownexecute.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 12 hour cooldown on executions.");
    }

    console.log("entered execute command");
    //MUST HAVE KING OR HAND ROLE OR NIGHT KING OF WESTEROS
    if (
      message.member.roles.cache.has("708021014977708033") ||
      message.member.roles.cache.has("707250754020180079")
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered2");
        let role = message.guild.roles.cache.find((r) => r.name === "The Dead");
        console.log("role " + role);
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
        let pentosrole = member.roles.cache.find(
          (r) => r.name === "PENTOS SLAVE"
        );
        let deadrole = member.roles.cache.find((r) => r.name === "The Dead");
        let Bots = member.roles.cache.find((r) => r.name === "Bots");
        // Bots != "715061597944545312"
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.name === "King of Westeros"
        );
        let handrole = member.roles.cache.find(
          (r) => r.name === "Hand of the King"
        );
        let oldgodrole = member.roles.cache.find(
          (r) => r.id === "707032148493991947"
        );
        let skinchangerrole = member.roles.cache.find(
          (r) => r.id === "729182524185509929"
        );

        if (!member.roles.cache.has("740747121707450401")) {
          // if (!member.roles.has("726618751797166145")) {
          //   //braavos traveler quest
          if (
            wightrole != "713901799324778587" && //white walkers
            nightrole != "713895055252783175" && //night king
            essosrole != "714598666857349132" && //essos
            nightswatch != "707074053881724989" && //nightswatch
            deadrole != "708346509367836702" && //the dead
            pentosrole != "709925162069262358" && //pentos slaves
            Bots != "715061597944545312" && //bots
            !smallrole &&
            !melirole && //small council or melisandre
            kingrole != "708021014977708033" && //king
            handrole != "707250754020180079" && //hand
            !oldgodrole &&
            !skinchangerrole
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
            cooldownexecute.add(message.author.id);
            console.log("you gave " + member + " role " + role);
            message.channel.send(
              "The King or Hand of King has executed " +
                member.user.username +
                " and he has been killed! Beware, the Night King can raise the dead. 🗡"
            );
            //send message dm to person executed
            member.send(
              "You have been executed and can only speak in the house-of-the-dead channel now"
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
                money.items.forEach((entry) => {
                  money.items.pull(entry);
                });
                money.deaths = money.deaths + 1;
                money.save().catch((err) => console.log(err));
              }
            );
            let embed = new Discord.MessageEmbed()
              .setTitle(
                `${member.user.username} has been Executed by ${message.member.user.username}!`
              )
              .setColor("RED")
              .attachFiles(["./assets/executed.png"])
              .setImage("attachment://executed.png");
            chan.send(embed);

            setTimeout(() => {
              cooldownexecute.delete(message.author.id);
              console.log("Cooldown execute finished " + message.author.id);
              message.author.send(
                "Execute cooldown ended. You may execute another anytime."
              );
            }, cdseconds * 1000);
          } else {
            message.channel.send(
              "White Walkers, Essos Exiles, Night Watch, Small Council, Hand, Melisandre CANNOT be executed."
            );
          }
          // } else {
          //   message.channel.send(
          //     "User is on a Quest, cannot be killed during Quest."
          //   );
          // }
        } else {
          message.channel.send("User cannot be Bannerless.");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King or Hand can execute!");
    }
  },
};
