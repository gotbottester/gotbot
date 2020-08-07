module.exports = {
  name: "add_general",
  description: "says add_general!",
  execute(message, args) {
    //ADD GENERAL WHITE WALKER - NIGHT KING OF WESTEROS (takover)

    if (message.member.roles.cache.has("716878672820306003")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered add_general command");
        let role = message.guild.roles.cache.find(
          (r) => r.name === "General of White Walkers"
        );
        console.log("role " + role);
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );

        if (wightrole == "713901799324778587") {
          if (role.members.size == 0) {
            //only allow 1 general
            console.log("member " + member);
            member.roles.add(role).catch(console.error);
            console.log("you gave " + member + " role " + role);
            message.channel.send(
              "The Night King has selected " +
                member.user.username +
                " as his General!"
            );
          } else {
            console.log("only one general can be added");
            message.channel.send(
              "Only One General can be appointed."
            );
          }
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the Night King of Westeros can select a General of White Walkers!"
      );
    }
  },
};
