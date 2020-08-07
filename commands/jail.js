const Discord = require("discord.js");
var cooldownjail = new Set();
var cdseconds = 3600;

module.exports = {
  name: "jail",
  description: "says jail!",
  execute(message, args) {
    //JAIL - KING or HAND

    if (cooldownjail.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 1 hour cooldown on sending people to the Black Cell."
      );
    }

    console.log("entered jail command");
    //MUST HAVE KING OR HAND ROLE OR KINGSGUARD ROLE
    if (
      message.member.roles.cache.has("708021014977708033") ||
      message.member.roles.cache.has("707250754020180079") ||
      message.member.roles.cache.has("735281180521398292")
    ) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        console.log("entered jail command");
        let role = message.guild.roles.cache.find(
          (r) => r.id === "722932439743463524"
        ); //black cell
        let membersWithRole = role.members;
        console.log("role " + role);
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let nightrole = member.roles.cache.find((r) => r.name === "Night King");
        let essosrole = member.roles.cache.find(
          (r) => r.name === "Essos Exile"
        );
        let nightswatch = member.roles.cache.find(
          (r) => r.name === "NightsWatch"
        );
        let deadrole = member.roles.cache.find((r) => r.name === "The Dead");
        let Bots = member.roles.cache.find((r) => r.name === "Bots");
        // Bots != "715061597944545312"
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.name === "King of Westeros"
        );
        let handrole = member.roles.cache.find(
          (r) => r.name === "Hand of the King"
        );
        let oldgodrole = member.roles.cache.find(
          (r) => r.id === "707032148493991947"
        );
        let skinchangerrole = member.roles.cache.find(
          (r) => r.id === "729182524185509929"
        );
        let obsidian = member.roles.cache.find(
          (r) => r.id === "729097195722244176"
        );
        let weirwoodbow = member.roles.cache.find(
          (r) => r.id === "729097281370062881"
        );
        let greensight = member.roles.cache.find(
          (r) => r.id === "729097386982375435"
        );
        let skinchanger = member.roles.cache.find(
          (r) => r.id === "729097440082526279"
        );
        let ironcoin = member.roles.cache.find(
          (r) => r.id === "726588449263583339"
        );
        let dagger = member.roles.cache.find(
          (r) => r.id === "719083010091253770"
        );
        let armor = member.roles.cache.find(
          (r) => r.id === "726663217950097458"
        );
        let dragonglass = member.roles.cache.find(
          (r) => r.id === "724761294246248469"
        );
        let direwolf = member.roles.cache.find(
          (r) => r.id === "732050744466997340"
        );
        let direwolfghost = member.roles.cache.find(
          (r) => r.id === "734148371308216332"
        );
        let shadowcat = member.roles.cache.find(
          (r) => r.id === "734148516800233502"
        );
        let oldtongue = member.roles.cache.find(
          (r) => r.id === "734267092924104735"
        );
        let wargtrained = member.roles.cache.find(
          (r) => r.id === "734150773327396886"
        );

        console.log("black cell size " + membersWithRole.size);
        if (!member.roles.cache.has("722932439743463524")) {
          if (!member.roles.cache.has("740747121707450401")) {
            // if (!member.roles.has("726618751797166145")) {
            //   //braavos traveler quest
            if (membersWithRole.size < 2) {
              if (
                wightrole != "713901799324778587" && //white walkers
                nightrole != "713895055252783175" && //night king
                essosrole != "714598666857349132" && //essos
                nightswatch != "707074053881724989" && //nightswatch
                deadrole != "708346509367836702" && //the dead
                Bots != "715061597944545312" && //bots
                !smallrole &&
                !melirole && //small council or melisandre
                kingrole != "708021014977708033" && //king
                handrole != "707250754020180079" && //hand
                !oldgodrole &&
                !skinchangerrole
              ) {
                //remove all roles except everyone and Old Gods and White Walkers and Night King
                member.roles.cache.forEach((role) => {
                  console.log("each role " + role.name);
                  if (
                    role != "707028782522826782" && //everyone
                    role != "707032148493991947" && //old gods
                    !dragonglass &&
                    !armor &&
                    !dagger &&
                    !ironcoin &&
                    !greensight &&
                    !skinchanger &&
                    !weirwoodbow &&
                    !obsidian &&
                    !direwolf &&
                    !direwolfghost &&
                    !shadowcat &&
                    !oldtongue &&
                    !wargtrained &&
                    role != "739206804310982751" && //amulet
                    role != "741145157885493251" //broadsword
                  ) {
                    member.roles.remove(role).catch(console.error);
                  }
                });

                var chan = message.guild.channels.cache.get(
                  "707102776215208008"
                ); //whispers
                //add Black Cell role
                console.log("member " + member);
                member.roles.add(role).catch(console.error);
                cooldownjail.add(message.author.id);
                console.log("you gave " + member + " role " + role);
                message.channel.send(
                  "The King or Hand of King has sent " +
                    member.user.username +
                    " to the Black Cell. 🔒"
                );
                //send message dm to person executed
                member.send(
                  "You have been sent to the Black Cell and can only speak in the black-cell channel now"
                );
                let embed = new Discord.MessageEmbed()
                  .setTitle(
                    `${member.user.username} has been thrown in the Black Cell by ${message.member.user.username}!`
                  )
                  .setColor("BLACK")
                  .attachFiles(["./assets/jailed.png"])
                  .setThumbnail("attachment://jailed.png");
                chan.send(embed);

                setTimeout(() => {
                  cooldownjail.delete(message.author.id);
                  console.log("Cooldown execute finished " + message.author.id);
                  message.author.send(
                    "Jail cooldown ended. You may jail another anytime."
                  );
                }, cdseconds * 1000);
              } else {
                message.channel.send(
                  "White Walkers, Essos Exiles, Night Watch, Small Council, Hand, Melisandre CANNOT be sent to the Black Cell."
                );
              }
            } else {
              message.channel.send("The Black Cell is at Max Capacity.");
            }
            // } else {
            //   message.channel.send(
            //     "User is on a Quest, cannot be killed during Quest."
            //   );
            // }
          } else {
            message.channel.send("User cannot be Bannerless.");
          }
        } else {
          message.channel.send("User is already in the Black Cell");
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only the King or Hand can send to the Black Cell!");
    }
  },
};
