const Discord = require("discord.js");

module.exports = {
  name: "deserters",
  description: "says deserters!",
  execute(message, args) {
    //deserters - LORD COMMANDER
    console.log("entered deserters command");
    //MUST HAVE LORD COMMANDER ROLE
    if (message.member.roles.cache.has("715783930581876806")) {
      //lord commander
      let desertersrole = message.guild.roles.cache.find(
        (r) => r.id === "715781455560573001"
      );
      var deserters = [];
      //find all deserters and list out
      message.guild.members.cache.each((membs) => {
        if (membs.roles.cache.has(desertersrole) && !membs.roles.cache.has("713901799324778587")) {
            console.log("found deserter");
          deserters.push(membs.user.username);
        }
      });
      console.log("deserter array " + deserters[0]);
      let embed = new Discord.MessageEmbed().setTitle(
        "List of Deserters"
      );
      embed.setDescription("Deserters can be sentenced to death with ^sentence, unless they are Hand, Small Council, or Kingsguard or fleed to Essos.")
      if (deserters.length === 0) {
        embed.setColor("RED");
        embed.addField("Deserters:", "No Deserters Found");
        embed.attachFiles(["./assets/lordcommander.png"]);
        embed.setThumbnail("attachment://lordcommander.png");
      } else {
        embed.setColor("BLACK");
        embed.attachFiles(["./assets/lordcommander.png"]);
        embed.setThumbnail("attachment://lordcommander.png");
        for (i = 0; i < deserters.length; i++) {
          embed.addField(`${i + 1}. Deserter: `, `${deserters[i]}`);
        }

      }
      message.channel.send(embed);
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the Lord Commander of the NightsWatch can pull a list of Deserters."
      );
    }
  },
};
