module.exports = {
  name: "free",
  description: "says free!",
  execute(message, args) {
    //Free - KING or HAND

    console.log("entered free command");
    //MUST HAVE KING OR HAND ROLE
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
        let role = message.guild.roles.cache.find(
          (r) => r.id === "722932439743463524"
        ); //black cell
        let blackcellrole = member.roles.cache.find(
          (r) => r.id === "722932439743463524"
        );

        if (blackcellrole) {
          //add Black Cell role
          console.log("member " + member);
          member.roles.remove(role).catch(console.error);
          if (member.roles.cache.has("725406142670569502")) {
            member.roles.remove("725406142670569502").catch(console.error); //remove quest black cell in case he has it
          }
          console.log("you gave " + member + " role " + role);
          message.channel.send(
            "The King or Hand of King has released " +
              member.user.username +
              " from the Black Cell. 🔓"
          );
          //send message dm to person freed
          member.send(
            "You have been set free from the Black Cell. You may chat in Westeros again."
          );
        } else {
          message.channel.send("That member is not in the Black Cell.");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the King or Hand can free someone from the Black Cell!"
      );
    }
  },
};
