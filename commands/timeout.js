var cooldowntimeout = new Set();
var cdseconds_timeout = 3600;

module.exports = {
  name: "timeout",
  description: "says timeout!",
  execute(message, args) {
    //SEND TO THE HOUSE OF SHAME TIMEOUT - MOD
    //MUST HAVE OLD GODS OR MODERATOR ROLE

    if (
      message.member.roles.cache.has("730319761908563970") //moderators lvl2
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered timeout command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "708368299066523660"
        ); //house of shame role
        console.log("role " + role);

        let Bots = member.roles.cache.find(
          (r) => r.name === "715061597944545312"
        );
        let modrole = member.roles.cache.find(
          (r) => r.id === "712005922578366494"
        );
        let oldgodsrole = member.roles.cache.find(
          (r) => r.id === "707032148493991947"
        );

        if (!modrole && !Bots && !oldgodsrole) {
          //remove all roles except everyone and Old Gods and White Walkers and Night King
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role != "707028782522826782" && //everyone
              role != "707032148493991947" && //old gods
              role != "712005922578366494" && //mod
              role != "730319761908563970" && //mod2
              role != "707094276458414143" && //lords of westeros
              role != "732050744466997340" && //direwolf
              role != "734148371308216332" && //direwolfghost
              role != "734148516800233502" && //shadowcat
              role != "739206804310982751" && //amulet
              role != "741145157885493251" //broadsword
            ) {
              member.roles.remove(role).catch(console.error);
            }
          });

          member.roles.add(role).catch(console.error);
          console.log("you gave " + member + " role " + role);
          message.channel.send(
            member.user.username +
              " has been sent to the House of Shame by a Moderator for a Timeout. 1 hour!"
          );
          setTimeout(() => {
            cooldowntimeout.delete(message.author.id);
            console.log("Cooldown execute finished " + message.author.id);
            message.author.send(
              "Timeout cooldown ended. " +
                member.user.username +
                " has been released from the House of Shame."
            );
            member.send(
              "Timeout cooldown ended. You have been released from the House of Shame."
            );
            member.roles.remove(role).catch(console.error);
          }, cdseconds_timeout * 1000);
        } else {
          message.channel.send("Cannot give another Mod or Old God a Timeout.");
        }
      }
    } else {
      console.log("you do not have Moderator permission!!!");
      message.channel.send("Only a Moderator can give timeouts.");
    }
  },
};
