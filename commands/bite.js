const Money = require("../models/profile.js");
const Discord = require("discord.js");
var cooldownbite = new Set();
var cdseconds = 7200;
var chance = 0;

module.exports = {
  name: "bite",
  description: "says bite!",
  execute(message, args) {
    //BITE - WHITE WALKERS
    var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
    if (cooldownbite.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply("There is a 2 hr cooldown on biting.");
    }
    console.log("entered bite command");
    //MUST HAVE WHITE WALKER ROLE
    if (message.member.roles.cache.has("713901799324778587")) {
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        let member1 = message.member;
        let role = message.guild.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        console.log("role " + role);
        let wightrole = member.roles.cache.find(
          (r) => r.name === "White Walkers"
        );
        let nightrole = member.roles.cache.find((r) => r.name === "Night King");
        let nightKINGrole = member.roles.cache.find(
          (r) => r.name === "Night King of Westeros"
        );
        let kingrole = member.roles.cache.find(
          (r) => r.name === "King of Westeros"
        );
        let Bots = member.roles.cache.find((r) => r.name === "Bots");
        let smallrole = member.roles.cache.find(
          (r) => r.id === "712353382660309033"
        );
        let protectrole = member.roles.cache.find(
          (r) => r.id === "729891478565945436"
        );
        let lordcommanderrole = member.roles.cache.find(
          (r) => r.id === "715783930581876806"
        );
        let nightswatch = member.roles.cache.find(
          (r) => r.id === "707074053881724989"
        );
        let rangerrole = member.roles.cache.find(
          //first ranger
          (r) => r.id === "728750595904897106"
        );

        // if (member.user.presence.status !== "offline") {

        if (
          nightswatch == "707074053881724989" &&
          !lordcommanderrole &&
          !rangerrole &&
          !protectrole
        ) {
          console.log("entered bite if");
          let question = Math.floor(Math.random() * 3);
          if (!member.roles.cache.has("724761294246248469")) {
            //not have dragonglass
            if (member.roles.cache.has("719083010091253770")) {
              console.log("Night watch has valyrian dagger ");
              console.log("question " + question);
              switch (question) {
                case 0:
                case 2:
                  chance = 1;
                  message.channel.send(
                    member.user.username +
                      " used his Valyrian Dagger 🗡 against the White Walker and survived the Bite. The White Walker has been freed from the Night King's spell."
                  );
                  member1.roles.remove("713901799324778587"); //white walker freed from role
                  //give kill to member
                  Money.findOne(
                    {
                      userID: member1.id,
                      guildID: message.guild.id,
                    },
                    (err, money) => {
                      if (err) console.log(err);
                      money.kills = money.kills + 1;
                      money.save().catch((err) => console.log(err));
                    }
                  );
                  break;
                case 1:
                  chance = 0; //chance nights watch died so go to next steps to remove roles and kill, but he keeps dagger
                  break;
              }
            } else {
              chance = 0;
            }
          } else {
            //has dragonglass 1 in 3 chance ur dead
            switch (question) {
              case 0:
              case 2:
              case 1:
                chance = 1;
                message.channel.send(
                  member1.user.username +
                    " attacked the Nights Watchmen however he had Dragonglass and instantly killed the White Walker. The White Walker is now Dead."
                );
                member1.roles.remove("713901799324778587"); //white walker freed from role
                member1.roles.add("708346509367836702"); //white walker freed from role
                //give kill to member
                Money.findOne(
                  {
                    userID: member1.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.kills = money.kills + 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                //give death to mentioned member
                Money.findOne(
                  {
                    userID: member.id,
                    guildID: message.guild.id,
                  },
                  (err, money) => {
                    if (err) console.log(err);
                    money.deaths = money.deaths + 1;
                    money.save().catch((err) => console.log(err));
                  }
                );
                break;
            }
          }
          if (chance == 0) {
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
                role != "708346509367836702" //amulet
              ) {
                member.roles.remove(role).catch(console.error);
              }
            });
            console.log("member " + member);
            member.roles.add(role).catch(console.error);
            cooldownbite.add(message.author.id);
            console.log("you gave " + member + " role " + role);
            message.channel.send(
              member.user.username +
                " was bitten by a White Walker at the Wall and turned into a White Walker! ☠"
            );
            member.send(
              "A White Walker bit you and you turned into a White Walker."
            );
            let embed = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " was bitten by a White Walker at the Wall and turned into a White Walker!"
              )
              .setDescription(
                "Nights Watch need Valyrian Daggers to increase chances on killing White Walkers. You can also buy Dragon Glass in the ^store."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/turnedwight.png"])
              .setThumbnail("attachment://turnedwight.png");
            chan.send(embed);
            //give kill to author
            Money.findOne(
              {
                userID: message.author.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.wightkills = money.wightkills + 1;
                money.save().catch((err) => console.log(err));
              }
            );
            //give death to mentioned member
            Money.findOne(
              {
                userID: member.id,
                guildID: message.guild.id,
              },
              (err, money) => {
                if (err) console.log(err);
                money.deaths = money.deaths + 1;
                money.save().catch((err) => console.log(err));
              }
            );
            setTimeout(() => {
              cooldownbite.delete(message.author.id);
              console.log("Cooldown bite finished " + message.author.id);
              message.author.send(
                "Bite cooldown ended. You may Bite another anytime."
              );
            }, cdseconds * 1000);
          }
        } else {
          message.channel.send(
            "White Walkers can only bite regular Nights Watch and Rangers (Not First Rangers or Lord Commander)."
          );
        }
        // } else {
        //   message.channel.send("User must be online.");
        // }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send("Only White Walkers can bite the Nights Watch!");
    }
  },
};
