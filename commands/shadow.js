const Money = require("../models/profile.js");
const Discord = require("discord.js");
const helper_functions = require("../helper_functions/rolesremover");
var cooldownshadow = new Set();
var cdseconds = 3600;

module.exports = {
  name: "shadow",
  description: "says shadow!",
  execute(message, args) {
    //SHADOW - The Red Priestess

    if (cooldownshadow.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown on making Shadows.");
    }
    console.log("entered shadow command");
    //MUST HAVE The Red Priestess ROLE
    if (message.member.roles.cache.has("713409866764517517")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        //check shadowuse numbers make sure less than 3
        Money.findOne(
          {
            userID: message.author.id,
            guildID: message.guild.id,
          },
          (err, money) => {
            if (err) console.log(err);
            if (money.shadowuse != 0) {
              var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
              let role = message.guild.roles.cache.find(
                (r) => r.id === "708346509367836702"
              );
              let wightrole = member.roles.cache.find(
                (r) => r.id === "713901799324778587"
              );
              let nightrole = member.roles.cache.find(
                (r) => r.id === "713895055252783175"
              );
              let kingrole = member.roles.cache.find(
                (r) => r.id === "708021014977708033"
              );
              let handrole = member.roles.cache.find(
                (r) => r.id === "707250754020180079"
              );
              let Bots = member.roles.cache.find(
                (r) => r.id === "715061597944545312"
              );
              let melirole = member.roles.cache.find(
                (r) => r.id === "713409866764517517"
              );
              let lordcommanderrole = member.roles.cache.find(
                (r) => r.id === "715783930581876806"
              );
              let essosrole = member.roles.cache.find(
                (r) => r.id === "714598666857349132"
              );
              let rangerrole = member.roles.cache.find(
                (r) => r.id === "728750595904897106"
              );
              let skinchangerrole = member.roles.cache.find(
                (r) => r.id === "729182524185509929"
              );

              if (
                !member.roles.cache.has("742098398169268304") //limbo
              ) {
                if (
                  !wightrole &&
                  !nightrole &&
                  !kingrole &&
                  !Bots &&
                  !handrole &&
                  !melirole &&
                  !lordcommanderrole &&
                  !rangerrole &&
                  !skinchangerrole &&
                  !essosrole
                ) {
                  //remove all roles except everyone and Old Gods and White Walkers and Night King
                  helper_functions.RolesRemover(member);
                  member.roles.add(role).catch(console.error);
                  member.roles.add("737165136040689757").catch(console.error); //add shadow marked
                  cooldownshadow.add(message.author.id);
                  member.send(
                    "The Red Priestess sent a Shadow to kill you and you can only speak in the house-of-the-dead channel now"
                  );
                  let embed = new Discord.MessageEmbed()
                    .setTitle(
                      `${member.user.username} has been shadowed by the Red Priestess ${message.member.user.username}!`
                    )
                    .setColor("BLACK")
                    .attachFiles(["./assets/shadow.png"])
                    .setImage("attachment://shadow.png");
                  chan.send(embed);
                  //give kill to author
                  Money.findOne(
                    {
                      userID: message.author.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.kills = money.kills + 1;
                      money.shadowuse = money.shadowuse - 1;
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
                  setTimeout(() => {
                    cooldownshadow.delete(message.author.id);
                    console.log(
                      "Cooldown shadow finished " + message.author.id
                    );
                    message.author.send(
                      "Shadow cooldown ended. You may Shadow another anytime."
                    );
                  }, cdseconds * 1000);
                } else {
                  message.channel.send(
                    "The Shadow cannot kill the King, Hand of King, Night King, White Walkers, Lord Commander or First Rangers Beyond the Wall nor Essos Exiles."
                  );
                }
              } else {
                message.channel.send("User cannot be Bannerless.");
              }
            } else {
              //shadows are used up message
              message.channel.send(
                "You have used up all your Shadows. You only get 3 as a Red Priestess"
              );
            }
          }
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only The Red Priestess can create Shadows!");
    }
  },
};
