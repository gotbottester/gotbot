const Money = require("../models/profile.js");
const helper_functions = require("../helper_functions/rolesremover");
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
          helper_functions.RolesRemover(member);

          member.roles.add(role).catch(console.error);
          console.log("you gave " + member + " role " + role);
          message.channel.send(
            member.user.username +
              " has been sent to the House of Shame by a Moderator for a Timeout. 1 hour!"
          );
          Money.findOne(
            {
              userID: member.id,
              guildID: message.guild.id,
            },
            (err, money) => {
              if (err) console.log(err);
              money.items.forEach((entry) => {
                money.items.pull(entry);
              });
              money.timeouts = money.timeouts + 1;
              money.save().catch((err) => console.log(err));
            }
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
