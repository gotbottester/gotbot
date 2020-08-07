var cooldownrise = new Set();
var cdseconds = 3600;

module.exports = {
  name: "rise",
  description: "says rise!",
  execute(message, args) {
    //RISE THE DEAD - NIGHT KING

    if (cooldownrise.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown on Rising the Dead.");
    }
    console.log("entered rise command");
    //MUST HAVE NIGHT KING ROLE
    if (message.member.roles.cache.has("713895055252783175")) {
      //night king
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered2");
        let role1 = message.guild.roles.cache.find(
          (r) => r.name === "The Dead"
        );
        let role2 = message.guild.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let deadrole = member.roles.cache.find((r) => r.name === "The Dead");
        console.log("deadrole " + deadrole);
        let burnedrole = member.roles.cache.find(
          (r) => r.name === "Burned Ones"
        );

        if (
          deadrole == "708346509367836702" &&
          burnedrole != "717194087010140212"
        ) {
          console.log("role " + role1);
          console.log("entered3");

          console.log("member " + member);
          member.roles.remove(role1).catch(console.error);
          member.roles.add(role2).catch(console.error);
          cooldownrise.add(message.author.id);
          console.log("you removed " + member + " role " + role1);
          message.channel.send(
            "The Night King has turned " +
              member.user.username +
              " into a White Walker! 💀"
          );
          setTimeout(() => {
            cooldownrise.delete(message.author.id);
            console.log("Cooldown Rise The Dead finished " + message.author.id);
            message.author.send(
              "Rise the dead cooldown ended. You may Rise another anytime."
            );
          }, cdseconds * 1000);
        } else {
          message.channel.send("Only the dead can be risen");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the Night King can raise the dead!");
    }
  },
};
