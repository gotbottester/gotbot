var cooldownkingwall = new Set();
var cdseconds = 86400;

module.exports = {
  name: "wall",
  description: "says wall!",
  execute(message, args) {
    //SEND TO THE WALL - KING or HAND

    if (cooldownkingwall.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 24 hour cooldown on sending people to the Wall."
      );
    }

    console.log("entered wall command");
    //MUST HAVE KING ROLE
    if (
      message.member.roles.cache.has("708021014977708033") ||
      message.member.roles.cache.has("707250754020180079")
    ) {
      //king or hand
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
          (r) => r.name === "NightsWatch"
        );
        console.log("role " + role);
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let nightrole = member.roles.cache.find((r) => r.name === "Night King");
        let smallcouncil = member.roles.cache.find(
          (r) => r.name === "Small Council"
        );
        let essosrole = member.roles.cache.find(
          (r) => r.name === "Essos Exile"
        );
        let pentosrole = member.roles.cache.find(
          (r) => r.name === "PENTOS SLAVE"
        );
        let Bots = member.roles.cache.find((r) => r.name === "Bots");
        let nightswatch = member.roles.cache.find(
          (r) => r.name === "NightsWatch"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.name === "King of Westeros"
        );
        let handrole = member.roles.cache.find(
          (r) => r.name === "Hand of the King"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );

        if (!member.roles.cache.has("740747121707450401")) {
          // if (!member.roles.has("726618751797166145")) {
          //   //braavos traveler quest
            if (
              wightrole != "713901799324778587" && //white walkers
              nightrole != "713895055252783175" && //night king
              smallcouncil != "712353382660309033" && //small council
              essosrole != "714598666857349132" && //essos
              pentosrole != "709925162069262358" && //pentos
              Bots != "715061597944545312" &&
              nightswatch != "707074053881724989" && //nightswatch
              kingrole != "708021014977708033" && //king
              handrole != "707250754020180079" && //hand
              !melirole
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
                  role != "734148516800233502" && //shadowcat
                  role != "739206804310982751" && //amulet
                  role != "741145157885493251" //broadsword
                ) {
                  member.roles.remove(role).catch(console.error);
                }
              });
              console.log("member " + member);
              member.roles.add(role).catch(console.error); //give NightsWatch role
              cooldownkingwall.add(message.author.id);
              console.log("you gave " + member + " role " + role);
              message.channel.send(
                member.user.username +
                  " has been sentenced to Castle Black to join the NightsWatch. Deserters will be executed. 🗻🗻🗻 "
              );
              setTimeout(() => {
                cooldownkingwall.delete(message.author.id);
                console.log("Cooldown wall finished " + message.author.id);
                message.author.send(
                  "Send to Wall cooldown ended. You may send another to the Wall anytime."
                );
              }, cdseconds * 1000);
            } else {
              message.channel.send(
                "Small Council, Night King, Essos Exiles cannot be sent to the wall!"
              );
            }
          // } else {
          //   message.channel.send(
          //     "User is on a Quest, cannot be killed during Quest."
          //   );
          // }
        } else {
          message.channel.send("User cannot be Bannerless.");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King can send someone to the wall!");
    }
  },
};