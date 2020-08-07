var cooldowndracarus = new Set();
var cdseconds = 3600;

module.exports = {
  name: "dracarus",
  description: "says dracarus!",
  execute(message, args) {
    //DRACARUS - TAGARYEN KING

    if (cooldowndracarus.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 1 hour cooldown on Dragon Fire");
    }

    console.log("entered dracarus command");
    //MUST HAVE KING AND BE HOUSE TARGARYEN
    if (
      message.member.roles.cache.has("708021014977708033") &&
      message.member.roles.cache.has("707073920515309639")
    ) {
      //king and targaryen
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
          (r) => r.name === "Burned Ones"
        );
        console.log("role " + role);
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let nightrole = member.roles.cache.find((r) => r.name === "Night King");
        let essosrole = member.roles.cache.find(
          (r) => r.name === "Essos Exile"
        );
        let deadrole = member.roles.cache.find((r) => r.name === "The Dead");
        let Bots = member.roles.cache.find((r) => r.name === "Bots");
        let oldgodrole = member.roles.cache.find(
          (r) => r.id === "707032148493991947"
        );

        if (member.roles.cache.size > 1) {
          // if (!member.roles.has("726618751797166145")) {
          //   //braavos traveler quest
            if (
              // wightrole != "713901799324778587" && //white walkers
              nightrole != "713895055252783175" && //night king
              // essosrole != "714598666857349132" && //essos
              deadrole != "708346509367836702" && //the dead
              Bots != "715061597944545312" &&
              oldgodrole != "707032148493991947" //old gods
            ) {
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
                  role != "734148516800233502" //shadowcat
                ) {
                  member.roles.remove(role).catch(console.error);
                }
              });

              //add Burned Ones role
              console.log("member " + member);
              member.roles.add(role).catch(console.error);
              cooldowndracarus.add(message.author.id);
              console.log("you gave " + member + " role " + role);
              message.channel.send(
                "The Targaryen King has executed " +
                  member.user.username +
                  " by Dragon Fire! Burned ones cannot be turned to White Walkers. 🐉 🔥🔥🔥"
              );
              setTimeout(() => {
                cooldowndracarus.delete(message.author.id);
                console.log(
                  "Cooldown dragonfire finished for " + message.author.id
                );
                message.author.send(
                  "Dracarus cooldown ended. You may burn another anytime."
                );
              }, cdseconds * 1000);
            } else {
              message.channel.send(
                "White Walkers, Night King, Essos Exiles, The Dead CANNOT be burned."
              );
            }
          // } else {
          //   message.channel.send(
          //     "User is on a Quest, cannot be killed during Quest."
          //   );
          // }
        } else {
          message.channel.send("User must have at least one role.");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the Targaryen King can kill by Dragon fire!");
    }
  },
};
