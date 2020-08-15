const Discord = require("discord.js");
const Money = require("../models/profile.js");
const helper_functions = require("../helper_functions/rolesremover");
var cooldownexecute = new Set();
var cdseconds = 86400;

module.exports = {
  name: "execute",
  description: "says execute!",
  execute(message, args) {
    //EXECUTE - KING or HAND
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (cooldownexecute.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 24 hour cooldown on executions.");
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
        let role = message.guild.roles.cache.find(
          (r) => r.id === "708346509367836702"
        );
        let wightrole = member.roles.cache.find(
          (r) => r.id === "713901799324778587"
        );
        let nightrole = member.roles.cache.find(
          (r) => r.id === "713895055252783175"
        );
        let essosrole = member.roles.cache.find(
          (r) => r.id === "714598666857349132"
        );
        let nightswatch = member.roles.cache.find(
          (r) => r.id === "707074053881724989"
        );
        let deadrole = member.roles.cache.find(
          (r) => r.id === "708346509367836702"
        );
        let Bots = member.roles.cache.find(
          (r) => r.id === "715061597944545312"
        );
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.id === "708021014977708033"
        );
        let handrole = member.roles.cache.find(
          (r) => r.id === "707250754020180079"
        );
        let oldgodrole = member.roles.cache.find(
          (r) => r.id === "707032148493991947"
        );
        let skinchangerrole = member.roles.cache.find(
          (r) => r.id === "729182524185509929"
        );

        if (!member.roles.cache.has("742098398169268304")) { //limbo
          if (
            !wightrole &&
            !nightrole &&
            !essosrole &&
            !nightswatch &&
            !deadrole &&
            !Bots &&
            !smallrole &&
            !melirole &&
            !kingrole &&
            !handrole &&
            !oldgodrole &&
            !skinchangerrole
          ) {
            //remove all roles
            helper_functions.RolesRemover(member);
            //add The Dead role
            member.roles.add(role).catch(console.error);
            cooldownexecute.add(message.author.id);
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
