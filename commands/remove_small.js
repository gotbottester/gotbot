module.exports = {
  name: "remove_small",
  description: "says remove_small!",
  execute(message, args) {
    //REMOVE SMALL - KING
    if (
      message.member.roles.cache.has("708021014977708033") ||
      message.member.roles.cache.has("716878672820306003")
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered remove_small command");
        let role = message.guild.roles.cache.find(
          (r) => r.name === "Small Council"
        );
        console.log("role " + role);

        console.log("member " + member);
        member.roles.remove(role).catch(console.error);
        console.log("you removed " + member + " role " + role);
        message.channel.send(
          "The King has removed " +
            member.user.username +
            " from the Small Council!"
        );
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the King can remove members from the Small Council!"
      );
    }
  },
};
