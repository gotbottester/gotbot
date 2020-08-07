module.exports = {
  name: "pardon",
  description: "says pardon!",
  execute(message, args) {
    //pardon - LORD COMMANDER
    console.log("entered pardon command");
    //MUST HAVE LORD COMMANDER ROLE
    if (message.member.roles.cache.has("715783930581876806")) {
      //lord commander
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        let pardonrole = member.guild.roles.cache.find(
          (r) => r.id === "726124627440435261"
        );
        let nightswatchrole = member.roles.cache.find(
          (r) => r.id === "707074053881724989"
        ); //nights watch

        if (nightswatchrole) {
          //remove Deserter role
          // member.roles.remove(nightswatchrole).catch(console.error);
          member.roles.add(pardonrole).catch(console.error);
          message.channel.send(
            "The Lord Commander of the NightsWatch has pardoned " +
              member.user.username +
              ". They can leave the Nights Watch at any time without becoming a Deserter."
          );
        } else {
          message.channel.send(
            "Only those marked with Nights Watch Role can be pardoned."
          );
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the Lord Commander of the NightsWatch can Pardon!"
      );
    }
  },
};
