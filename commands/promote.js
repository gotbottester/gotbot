const Discord = require("discord.js");
const Money = require("../models/profile.js");

module.exports = {
  name: "promote",
  description: "says promote!",
  execute(message, args) {
    //PROMOTE HOUSE MEMBER TO LORD - KING
    console.log("entered promote command");
    const chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (message.member.roles.cache.has("708021014977708033")) {
      let author = message.member;
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (member.roles.cache.has("707073882321846355")) {
        //baratheon
        let role = message.guild.roles.cache.find(
          (r) => r.id === "742482806118285323"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("742482806118285323").catch(console.error);
          member.roles.add("742496368572235776").catch(console.error);
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Lord Paramount of the Stormlands by the King himself!`
            )
            .setDescription(
              "The Lord Paramount of the Stormlands now carries the infamous War Hammer."
            )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      } else if (member.roles.cache.has("707069479833698326")) {
        //lannister
        let role = message.guild.roles.cache.find(
          (r) => r.id === "742482004557299714"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("742482004557299714").catch(console.error);
          member.roles.add("742497869126434927").catch(console.error);
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Lord Paramount of the West by the King himself!`
            )
            .setDescription(
              "The Lord Paramount of the West now carries the Valyrian Sword Widows Wail."
            )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      } else if (member.roles.cache.has("707069333494431854")) {
        //stark
        let role = message.guild.roles.cache.find(
          (r) => r.id === "742483411079397407"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("742483411079397407").catch(console.error);
          member.roles.add("742489354911350955").catch(console.error);
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Warden of the North by the King himself!`
            )
            .setDescription(
              "The Warden of the North now carries the Valyrian Sword Ice."
            )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      } else if (member.roles.cache.has("707073467283144704")) {
        //tyrell
        let role = message.guild.roles.cache.find(
          (r) => r.id === "742482492606513183"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("742482492606513183").catch(console.error);
          member.roles.add("742494956895076564").catch(console.error);
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Lord Paramount of the South by the King himself!`
            )
            .setDescription(
              "The Lord Paramount of the South now carries the Valyrian Sword Heartsbane."
            )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      } else if (member.roles.cache.has("707073800474198078")) {
        //vale
        let role = message.guild.roles.cache.find(
          (r) => r.id === "742482606658158624"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("742482606658158624").catch(console.error);
          member.roles.add("742496809108373515").catch(console.error);
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Lord Protector of the Vale by the King himself!`
            )
            .setDescription(
              "The Lord Protector of the Vale now carries the Valyrian Sword Lady Forlorn."
            )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      } else if (member.roles.cache.has("707073997933772811")) {
        //tully
        let role = message.guild.roles.cache.find(
          (r) => r.id === "743633283790798888"
        );
        if (role.members.size == 0) {
          //only allow 1 lord
          member.roles.add("743633283790798888").catch(console.error);
          // member.roles.add("742496809108373515").catch(console.error); //tully needs a special item
          let embed = new Discord.MessageEmbed()
            .setTitle(
              `${member.user.username} has been promoted as Lord Paramount of the Trident by the King himself!`
            )
            // .setDescription(
            //   "The Lord Protector of the Vale now carries the Valyrian Sword Lady Forlorn."
            // )
            .setColor("GOLD")
            .attachFiles(["./assets/bend.png"])
            .setImage("attachment://bend.png");
          chan.send(embed);
        } else {
          message.channel.send("Only 1 Lord can be promoted per House.");
        }
      } else {
        message.channel.send(
          "That House does not have a Lord promotion available."
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King can promote a Lord");
    }
  },
};
