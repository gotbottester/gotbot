const Discord = require("discord.js");

module.exports = {
  name: "leaders",
  description: "says leaders!",
  execute(message, args) {
    //leaders
    count = 0;
    //find king
    var king = "Not Appointed";
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("708021014977708033")) {
        king = membs;
      }
    });
    //find hand
    var hand = "Not Appointed";
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("707250754020180079")) {
        hand = membs;
      }
    });
    //find lordlannie
    var lordlannister = "Not Appointed";
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("742482004557299714")) {
        lordlannister = membs;
      }
    });

    //find lordstark
    var lordstark = "Not Appointed";
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("707069333494431854")) {
        lordstark = membs;
      }
    });
    //find lordtyrell
    var lordtyrell = "Not Appointed";;
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("742482492606513183")) {
        lordtyrell = membs;
      }
    });
    //find lordbara
    var lordbara = "Not Appointed";;
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("742482806118285323")) {
        lordbara = membs;
      }
    });
    //find lordvale
    var lordvale = "Not Appointed";;
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("742482606658158624")) {
        lordvale = membs;
      }
    });
    //find lord tully
    var lordtully = "Not Appointed";;
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("743633283790798888")) {
        lordtully = membs;
      }
    });
    //find lord commander
    var lordcommander = "Not Elected";;
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("715783930581876806")) {
        lordcommander = membs;
      }
    });
    //find red priestess
    var redpriestess = "Not Chosen";;
    message.guild.members.cache.each((membs) => {
      if (membs.roles.cache.has("713409866764517517")) {
        redpriestess = membs;
      }
    });

    let embed = new Discord.MessageEmbed()
      .setTitle("Current Leaders in Westeros")
      .setColor("GOLD")
      .attachFiles(["./assets/throne128.png"])
      .setThumbnail("attachment://throne128.png")
      .addFields(
        {
          name: "King of Westeros:",
          value: `${king}`,
        },
        {
          name: "Hand of the King",
          value: `${hand}`,
        }
      );

      embed.addField("Lord Paramount of the West", `${lordlannister}`);

      embed.addField("Warden of the North", `${lordstark}`);

      embed.addField("Lord Paramount of the South", `${lordtyrell}`);

      embed.addField("Lord Paramount of the Stormlands", `${lordbara}`);

      embed.addField("Lord Protector of the Vale", `${lordvale}`);

      embed.addField("Lord Paramount of the Trident", `${lordtully}`);

      embed.addField("Lord Commander of the Night's Watch", `${lordcommander}`);

      embed.addField("Red Priestess", `${redpriestess}`);

    return message.channel.send(embed);

  },
};
