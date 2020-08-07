// var cooldowntest = new Set();
// var cdseconds = 1800;

module.exports = {
  name: "test",
  description: "says test!",
  execute(message, args) {
    //test - KING or HAND

    // if (cooldowntest.has(message.author.id)) {
    //   message.delete();
    //   console.log("STILL COOLDOWN");
    //   return message.reply("There is a 30 minute cooldown on test.");
    // }

    console.log("entered test command");
    //MUST HAVE OLD GOD
    if (
      message.member.roles.cache.has("707032148493991947")
    ) {
      let member = message.mentions.members.first();
      console.log("entered2");
      let role = message.guild.roles.cache.find((r) => r.name === "The Dead");
      console.log("role " + role);
      let wightrole = member.roles.cache.find(
        (r) => r.name === "White Walkers"
      );
      console.log("status " + member.user.presence.status.PresenceStatusData);
      if (
        member.user.presence.status.data == "invisible"
      ) {
        
          console.log("FOUND USER INVISIBLE");
      } else {
        message.channel.send("User must be online (invisible counts).");
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only an old god can test!");
    }
  },
};
