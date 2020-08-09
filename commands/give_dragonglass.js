const Money = require("../models/profile.js");

module.exports = {
  name: "give_dragonglass",
  description: "says give_dragonglass!",
  execute(message, args) {
    //GIVE dragonglass - anyone that has dragonglass
    if (
      message.member.roles.cache.has("724761294246248469") //dragonglass
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered give dragonglass command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "724761294246248469"
        );
        console.log("role " + role);

        let Bots = member.roles.cache.find((r) => r.name === "Bots");

        if (Bots != "715061597944545312") {
          if (!member.roles.cache.has("724761294246248469")) {
            console.log("member " + member);
            member.roles.add(role).catch(console.error); //give dagger to mentioned member
            message.member.roles.remove(role).catch(console.error); //remove dagger from self
            console.log("you gave " + member + " role " + role);
            message.channel.send(
              message.member.user.username +
                " has given his Dragon Glass to " +
                member.user.username
            );
            //mentioned
            Money.findOne(
              {
                userID: member.id,
                guildID: member.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.items.push("Dragon Glass");
                money.save().catch((err) => console.log(err));
              }
            );
            //author
            Money.findOne(
              {
                userID: message.member.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.items.pull("Dragon Glass");
                money.save().catch((err) => console.log(err));
              }
            );
          } else {
            message.channel.send("That member already has a Dragonglass!");
          }
        }
      }
    } else {
      console.log("You must have a Dragonglass to give!");
      message.channel.send("You must have a Dragonglass to give!");
    }
  },
};
