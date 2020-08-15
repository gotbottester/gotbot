const Discord = require("discord.js");
var cooldownjail = new Set();
var cdseconds = 21600;

module.exports = {
  name: "jail",
  description: "says jail!",
  execute(message, args) {
    //JAIL - KING or HAND

    if (cooldownjail.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 6 hour cooldown on sending people to the Black Cell."
      );
    }

    console.log("entered jail command");
    //MUST HAVE KINGSGUARD ROLE
    if (
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
        let wightrole = member.roles.cache.find(
          (r) => r.id === "713901799324778587"
        );
        let nightrole = member.roles.cache.find(
          (r) => r.id === "713895055252783175"
        );
        let essosrole = member.roles.cache.find(
          (r) => r.id === "714598666857349132"
        );
        let nightswatch = member.roles.cache.find(
          (r) => r.id === "707074053881724989"
        );
        let deadrole = member.roles.cache.find(
          (r) => r.id === "708346509367836702"
        );
        let Bots = member.roles.cache.find(
          (r) => r.id === "715061597944545312"
        );
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let melirole = member.roles.cache.find(
          (r) => r.id === "713409866764517517"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.id === "708021014977708033"
        );
        let handrole = member.roles.cache.find(
          (r) => r.id === "707250754020180079"
        );
        let oldgodrole = member.roles.cache.find(
          (r) => r.id === "707032148493991947"
        );
        let skinchangerrole = member.roles.cache.find(
          (r) => r.id === "729182524185509929"
        );

        console.log("black cell size " + membersWithRole.size);
        if (!member.roles.cache.has("722932439743463524")) {
          if (!member.roles.cache.has("742098398169268304")) {
            if (membersWithRole.size < 2) {
              if (
                !wightrole &&
                !nightrole &&
                !essosrole &&
                !nightswatch &&
                !deadrole &&
                !Bots &&
                !smallrole &&
                !melirole &&
                !kingrole &&
                !handrole &&
                !oldgodrole &&
                !skinchangerrole
              ) {
                //remove all roles except everyone and Old Gods and White Walkers and Night King
                member.roles.cache.forEach((role) => {
                  console.log("each role " + role.name);
                  if (
                    role != "707028782522826782" && //everyone
                    role != "707032148493991947" && //old gods
                    role != "724761294246248469" && //dragonglass
                    role != "726588449263583339" && //iron coin
                    role != "729097386982375435" && //greensight
                    role != "729097440082526279" && //skinchanger
                    role != "729097281370062881" && //weirwoodbow
                    role != "729097195722244176" && //obsidian lance
                    role != "732050744466997340" && //direwolf
                    role != "734148371308216332" && //direwolf ghost
                    role != "734148516800233502" && //shadowcat
                    role != "734267092924104735" && //oldtongue
                    role != "734150773327396886" && //wargtrained
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
                member.roles.add(role).catch(console.error);
                cooldownjail.add(message.author.id);
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
                  .setImage("attachment://jailed.png");
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
