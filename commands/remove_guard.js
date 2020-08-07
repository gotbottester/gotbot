module.exports = {
    name: "remove_guard",
    description: "says remove_guard!",
    execute(message, args) {
      //REMOVE guard - KING
      if (
        message.member.roles.cache.has("708021014977708033")
      ) {
        let member = message.mentions.members.first();
        if (member == null) {
          console.log("NO @MEMBER FOUND");
          message.reply(
            "you need to specify a member after the command: @membername"
          );
          return;
        } else {
          console.log("entered remove_guard command");
          let role = message.guild.roles.cache.find(
            (r) => r.id === "735281180521398292"
          );
          console.log("role " + role);
  
          console.log("member " + member);
          member.roles.remove(role).catch(console.error);
          console.log("you removed " + member + " role " + role);
          message.channel.send(
            "The King has removed " + member.user.username + " as his Kingsguard!"
          );
        }
      } else {
        console.log("you do not have permission!!!");
        message.channel.send("Only the King can remove a Hand of the King!");
      }
    },
  };
  