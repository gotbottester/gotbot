//**You travel through the Frostfangs and are surrounded by a group of cannibal Thenns.**\n React with 1️⃣ to strike first and kill them all\n React with 2️⃣ to give them a Valyarian Dagger to allow you to pass in peace\n React with 3️⃣ to Quit Quest

const Money = require("../models/profile.js");
const Discord = require("discord.js");
const wincoins = 30;
const questfinishedcoins = 100;

module.exports = {
  name: "quest_beyondwall_frostfangs",
  description: "says quest_beyondwall_frostfangs!",
  execute(message, args) {
    //quest_beyondwall_frostfangs
    console.log("entered quest_beyondwall_frostfangs command");
    var member;
    var coinchance = Math.floor(Math.random() * 10);

    console.log("see beyond wall frostfangs options question");
    const filter = (reaction, user) => {
      member = reaction.message.guild.member(user);
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name);
    };
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        var chan = message.guild.channels.cache.get("707102776215208008"); //whispers
        // var chan = message.guild.channels.cache.get("714201504583516211"); //test
        if (reaction.emoji.name === "1️⃣") {
          //1 in 3 chance when attacking you die
          message.reply(member.user.username + " reacted with 1️⃣");
          console.log("REACTED CORRECTLY");
          let chance;
          let chance2;
          //if first ranger, you kill thenns easy, if not, then chance 1 in 3
          if (member.roles.cache.has("728750595904897106")) {
            chance = 0;
          } else {
            chance = Math.floor(Math.random() * 3);
          }
          console.log("chance " + chance);
          switch (chance) {
            case 0:
            case 2:
              chance2 = 1;
              message.channel.send(
                member.user.username +
                  " struck the Thenns first and were able to take them all out."
              );

              //give coins only to member
              Money.findOne(
                {
                  userID: member.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  if (coinchance < 3) {
                    money.coins = money.coins + wincoins;
                    member.send(
                      "You looted " + wincoins + " coins from the Thenns stash!"
                    );
                  }
                  money.kills = money.kills + 1;
                  money.save().catch((err) => console.log(err));
                }
              );

              //have firstranger?
              if (
                !member.roles.cache.has("728750595904897106") //firstranger
              ) {
                member.roles.add("728750595904897106"); //first ranger role
                member.send(
                  "You killed the Thenns and have been promoted to First Ranger! You continue on your Quest..."
                );
                let embed = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " encountered a group of Cannibal Thenns at the Frostfangs and killed them all! He is now a First Ranger of the Watch! He continues on his Quest..."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/firstranger.png"])
                  .setThumbnail("attachment://firstranger.png");
                chan.send(embed);
                message.reply(embed);
              } else {
                member.send(
                  "You killed the Thenns! You continue on your Quest..."
                );
                let embed = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " encountered a group of Cannibal Thenns at the Frostfangs and killed them all! He continues on his Quest..."
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/killthenns.png"])
                  .setThumbnail("attachment://killthenns.png");
                chan.send(embed);
                message.reply(embed);
              }
              //---------------------------------------------------
              //tracks
              //see if you have obsidian, skinchange, weirwood bow
              //---------------------------------------------------
              //FIND IF THEY HAVE ANY ITEMS ALREADY TO FLAG
              var obsidian = 0;
              if (member.roles.cache.has("729097195722244176")) {
                obsidian = 1;
                console.log("has obsidian");
              }
              //have greensight?
              var greensight = 0;
              if (member.roles.cache.has("729097386982375435")) {
                greensight = 1;
                console.log("has greensight");
              }
              //have weirwoodbow?
              var weirwoodbow = 0;
              if (member.roles.cache.has("729097281370062881")) {
                weirwoodbow = 1;
                console.log("has weirwood");
              }
              //have skinchange?
              var skinchange = 0;
              if (member.roles.cache.has("729097440082526279")) {
                skinchange = 1;
                console.log("has skinchange");
              }
              //have direwolf ghost?
              var alreadyhaveghost = 0;
              if (member.roles.cache.has("734148371308216332")) {
                alreadyhaveghost = 1;
                console.log("has ghost");
              }
              //have warg training?
              var alreadyhavewarg = 0;
              if (member.roles.cache.has("734150773327396886")) {
                alreadyhavewarg = 1;
                console.log("has warg");
              }
              //have shadowcat already?
              var alreadyshadowcat = 0;
              if (member.roles.cache.has("734148516800233502")) {
                alreadyshadowcat = 1;
                console.log("has shadowcat");
              }
              //end of current item flagging
              if (obsidian || greensight || weirwoodbow || skinchange) {
                console.log("entered if has any of the 4 items statement");
                //go to direwolf
                //show wolf ahead and message user about it
                setTimeout(function () {
                  member.send(
                    "You continued past the dead Thenns but spots something ahead..."
                  );
                  let embedA_1 = new Discord.MessageEmbed()
                    .setTitle(
                      member.user.username +
                        " continued past the dead Thenns but spots something ahead..."
                    )
                    .setDescription(
                      "The First Ranger spots a large Direwolf ahead, staring directly at him. It is too late to move. He pulls out whatever weapon he has to get ready."
                    )
                    .setColor("WHITE")
                    .setTimestamp()
                    .attachFiles(["./assets/wolfahead.png"])
                    .setThumbnail("attachment://wolfahead.png");
                  chan.send(embedA_1);
                  message.reply(embedA_1);
                  message.channel.send(
                    "The First Ranger spots a large Direwolf ahead, staring directly at him. It is too late to move. He pulls out whatever weapon he has to get ready."
                  );
                }, 15 * 1000);

                setTimeout(function () {
                  console.log("entered go to direwolf");
                  if (weirwoodbow) {
                    if (!alreadyhaveghost) {
                      //dont already have dire wolf ghost
                      member.send(
                        "You were attacked by a Dire Wolf! However you used your Weirwood Bow to kill it as it ran towards you. As you stood over the dead Dire Wolf he heard a small squirm nearby. You looked ahead and sees a small movement, aimed your bow, but wait... its just a Dire wolf pup. You must have killed its Mother as it defended it. The Ranger decides to raise the pup."
                      );
                      member.roles.add("734148371308216332"); //get role for Direwolf ghost
                      let embedA = new Discord.MessageEmbed()
                        .setTitle(
                          member.user.username +
                            " was attacked by a Dire Wolf! However he used this Weirwood Bow to kill it as it ran towards him."
                        )
                        .setDescription(
                          "As he stood over the dead Dire Wolf he heard a small squirm nearby. He looks ahead and sees a small movement, aims his bow, but wait... its just a Dire wolf pup. You must have killed its Mother as it defended it. The Ranger decides to raise the pup, throws him in his bag and continues on..."
                        )
                        .setColor("WHITE")
                        .setTimestamp()
                        .attachFiles(["./assets/ghostpup.png"])
                        .setThumbnail("attachment://ghostpup.png");
                      chan.send(embedA);
                      message.reply(embedA);
                      message.channel.send(
                        "You Continue on your Quest Beyond the Wall, with pup stored away safely in your sling bag. After a few miles you run into a Freefolk...lets see what he has to say..."
                      );
                    } else {
                      //already have ghost wolf
                      //markershould
                      member.send(
                        "Your Pet Dire Wolf scared that wild Dire Wolf off, and in the distance you see a man..."
                      );
                      //already have dire wolf ghost
                      let embedE1 = new Discord.MessageEmbed()
                        .setTitle(
                          member.user.username +
                            " Dire Wolf pet scared that wild Dire Wolf off, and in the distance you see a man.."
                        )
                        .setDescription(
                          "There are rumors of a Warg inhabiting these parts..."
                        )
                        .setColor("WHITE")
                        .setTimestamp()
                        .attachFiles(["./assets/standreadywithwolf.png"])
                        .setThumbnail("attachment://standreadywithwolf.png");
                      chan.send(embedE1);
                      message.reply(embedE1);
                    }
                    setTimeout(function () {
                      let chancewarg = Math.floor(Math.random() * 2);
                      if (chancewarg == 0 && !alreadyhavewarg) {
                        //give quest complete coins only to member
                        Money.findOne(
                          {
                            userID: member.id,
                            guildID: message.guild.id,
                          },
                          (err, money) => {
                            if (err) console.log(err);
                            money.coins = money.coins + questfinishedcoins;
                            member.send(
                              "You Completed the Quest and were awarded " +
                                questfinishedcoins
                            );
                            money.save().catch((err) => console.log(err));
                          }
                        );
                        member.send(
                          "You came across a Freefolk named Varamyr, a Warg. Varamyr has decided to help the Ranger learn the art of Warging."
                        );
                        //dont have warg training yet
                        member.roles.add("734150773327396886"); //get role Warning Trained
                        let embedE = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " came across a Freefolk named Varamyr, a Warg. Varamyr has decided to help the Ranger learn the art of Warging."
                          )
                          .setDescription(
                            "Now that you are trained in Warging, you have a better chance of getting Greensight (Visibility to ALL Channels) from the Three Eyed Raven...The Ranger returns to Castle Black."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/warglearn.png"])
                          .setImage("attachment://warglearn.png")
                          .addField(
                            "Quest Completion: ",
                            `${questfinishedcoins} + Coins`
                          );
                        chan.send(embedE);
                        message.reply(embedE);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                      } else if (chancewarg == 0 && alreadyhavewarg) {
                        member.send(
                          "You came across a Freefolk named Varamyr, a Warg. Varamyr has already taught you the ways however and sends you back to Castle Black."
                        );
                        //already have warg training
                        let embedE1 = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " came across a Freefolk named Varamyr, a Warg. Varamyr has already taught you the ways however and sends you back to Castle Black."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/wargnotlearn.png"])
                          .setImage("attachment://wargnotlearn.png");
                        chan.send(embedE1);
                        message.reply(embedE1);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                      } else {
                        member.send(
                          "You came across a Freefolk named Varamyr, a Warg. Varamyr has decided you are not ready to learn Warging."
                        );
                        //chance not ready for warg training
                        let embedF = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " came across a Freefolk named Varamyr, a Warg. Varamyr has decided you are not ready to learn Warging."
                          )
                          .setDescription(
                            "Varamyr might decide otherwise on your next encounter, but today was not your day. The Ranger returns to Castle Black."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/wargnotlearn.png"])
                          .setImage("attachment://wargnotlearn.png");
                        chan.send(embedF);
                        message.reply(embedF);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                      }
                    }, 30 * 1000);
                  } else {
                    let chancewolf = Math.floor(Math.random() * 2);
                    switch (chancewolf) {
                      case 0:
                        member.send(
                          "You were able to back the Dire Wolf down with your aggressive stance. Maybe you need a more silent way of killing it..."
                        );
                        let embedW = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " was able to back the Dire Wolf down with his aggresive stance."
                          )
                          .setDescription(
                            "Maybe this Ranger needs a different weapon that can kill a Wolf easier..."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/wolfruns.png"])
                          .setThumbnail("attachment://wolfruns.png");
                        chan.send(embedW);
                        message.reply(embedW);
                        message.channel.send(
                          "You were able to back the Dire Wolf down with your aggressive stance. Maybe you need a more silent way of killing it..."
                        );
                        setTimeout(function () {
                          let embedW1 = new Discord.MessageEmbed()
                            .setTitle(
                              member.user.username +
                                " finds nothing after scaring off the Dire Wolf."
                            )
                            .setDescription(
                              "There is nothing ahead however... and he returns to Castle Black."
                            )
                            .setColor("WHITE")
                            .setTimestamp()
                            .attachFiles(["./assets/returnedtocastleblack.png"])
                            .setThumbnail(
                              "attachment://returnedtocastleblack.png"
                            );
                          chan.send(embedW1);
                          message.reply(embedW1);
                          message.channel.send(
                            "You were able to back the Dire Wolf down with your aggressive stance. Maybe you need a more silent way of killing it..."
                          );
                        }, 15 * 1000);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                        break;
                      case 1:
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
                        member.roles
                          .add("708346509367836702")
                          .catch(console.error); //dead role
                        member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        member.send("You were killed by a Dire Wolf!");
                        message.channel.send(
                          member.user.username + " was killed by a Dire Wolf!"
                        );
                        //give death to member
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
                            money.deaths = money.deaths + 1;
                            money.save().catch((err) => console.log(err));
                          }
                        );
                        member.send(
                          "You were attacked by a Dire Wolf! The Wolf ran towards him and he was killed."
                        );
                        let embedB = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " was attacked by a Dire Wolf! The Wolf ran towards him and he was killed."
                          )
                          .setDescription(
                            "You should always use a Bow against Wild Animals. It gives you the upper hand..."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/direwolfattack.png"])
                          .setThumbnail("attachment://direwolfattack.png");
                        chan.send(embedB);
                        message.reply(embedB);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                        break;
                    }
                  }
                }, 30 * 1000);
              } else {
                console.log("entered ELSE has any of the 4 items statement");
                //go to shadowcat
                //show shadowcat ahead and message user about it
                setTimeout(function () {
                  member.send(
                    "You continued past the dead Thenns but spots something ahead..."
                  );
                  let embedA_2 = new Discord.MessageEmbed()
                    .setTitle(
                      member.user.username +
                        " continued past the dead Thenns but spots something ahead..."
                    )
                    .setDescription(
                      "The First Ranger spots a large Shadowcat ahead, staring directly at him. It is too late to move. He pulls out whatever weapon he has to get ready."
                    )
                    .setColor("WHITE")
                    .setTimestamp()
                    .attachFiles(["./assets/shadowcatahead.png"])
                    .setThumbnail("attachment://shadowcatahead.png");
                  chan.send(embedA_2);
                  message.reply(embedA_2);
                  message.channel.send(
                    "The First Ranger spots a large Shadowcat ahead, staring directly at him. It is too late to move. He pulls out whatever weapon he has to get ready."
                  );
                }, 15 * 1000);

                setTimeout(function () {
                  console.log("entered go to shadowcat");
                  let chanceshadowcat = Math.floor(Math.random() * 2);
                  if (chanceshadowcat == 0 && !alreadyshadowcat) {
                    member.send(
                      "You were attacked by a Shadowcat, However the Ranger was able to kill the large cat beyond all odds."
                    );
                    //must not have shadowcat
                    member.roles.add("734148516800233502"); //get role for shadowcat
                    let embedC = new Discord.MessageEmbed()
                      .setTitle(
                        member.user.username +
                          " was attacked by a Shadowcat, However the Ranger was able to kill the large cat beyond all odds."
                      )
                      .setDescription(
                        "As he stood over the dead Shadowcat, he heard a small screeching meow sound nearby. He looks ahead and sees a small movement, aims his bow, but wait... its just a Shadowcat kitten. You must have killed its Mother as it defended it. The Ranger decides to raise the kitten."
                      )
                      .setColor("WHITE")
                      .setTimestamp()
                      .attachFiles(["./assets/shadowcatkit.png"])
                      .setThumbnail("attachment://shadowcatkit.png");
                    chan.send(embedC);
                    message.reply(embedC);
                    message.channel.send(
                      "You Continue on your Quest Beyond the Wall, with kitten stored away safely in your sling bag. After a few miles you run into a Freefolk...lets see what he has to say..."
                    );
                    setTimeout(function () {
                      let chancewarg1 = Math.floor(Math.random() * 2);
                      if (chancewarg1 == 0) {
                        member.send(
                          "You came across a Freefolk named Varamyr, a Warg. Varamyr has decided to help the Ranger learn the art of Warging."
                        );
                        member.roles.add("734150773327396886"); //get role Warning Trained
                        let embedG = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " came across a Freefolk named Varamyr, a Warg. Varamyr has decided to help the Ranger learn the art of Warging."
                          )
                          .setDescription(
                            "Now that you are trained in Warging, you have a better chance of getting Greensight from the Three Eyed Raven...The Ranger returns to Castle Black."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/warglearn.png"])
                          .setThumbnail("attachment://warglearn.png")
                          .addField(
                            "Quest Completion: ",
                            `${questfinishedcoins} + Coins`
                          );
                        chan.send(embedG);
                        message.reply(embedG);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                      } else {
                        member.send(
                          "You came across a Freefolk named Varamyr, a Warg. Varamyr has decided you are not ready to learn Warging."
                        );
                        let embedH = new Discord.MessageEmbed()
                          .setTitle(
                            member.user.username +
                              " came across a Freefolk named Varamyr, a Warg. Varamyr has decided you are not ready to learn Warging."
                          )
                          .setDescription(
                            "Varamyr might decide otherwise on your next encounter, but today was not your day. The Ranger returns to Castle Black."
                          )
                          .setColor("WHITE")
                          .setTimestamp()
                          .attachFiles(["./assets/wargnotlearn.png"])
                          .setThumbnail("attachment://wargnotlearn.png");
                        chan.send(embedH);
                        message.reply(embedH);
                        setTimeout(function () {
                          member.roles.remove("728729459263406080"); //remove quest beyond wall role
                        }, 15 * 1000);
                      }
                    }, 30 * 1000);
                  } else if (alreadyshadowcat) {
                    member.send(
                      "Your pet Shadowcat scared off the weak wild Shadowcat. You went on a bit but found nothing any further and returned to Castle Black."
                    );
                    //already has shadowcat
                    let embedE2 = new Discord.MessageEmbed()
                      .setTitle(
                        member.user.username +
                          "'s pet Shadowcat scared off the weak wild Shadowcat. He went on a bit but found nothing any further and returned to Castle Black."
                      )
                      .setDescription(
                        "Perhaps he needs to find another way through...maybe an item from the Cave of the Three Eyed Raven might help?"
                      )
                      .setColor("WHITE")
                      .setTimestamp()
                      .attachFiles(["./assets/returnedtocastleblack.png"])
                      .setThumbnail("attachment://returnedtocastleblack.png");
                    chan.send(embedE2);
                    message.reply(embedE2);
                    member.roles.remove("728729459263406080"); //remove quest beyond wall role
                  } else {
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
                    member.roles.add("708346509367836702").catch(console.error); //dead role
                    member.roles.remove("728729459263406080"); //remove quest beyond wall role
                    member.send("You killed by a Shadowcat!");
                    message.channel.send(
                      member.user.username + " was killed by a Shadowcat!"
                    );
                    //give death to member
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
                        money.deaths = money.deaths + 1;
                        money.save().catch((err) => console.log(err));
                      }
                    );
                    member.send(
                      "You were attacked by a Shadow Cat! It ran towards him and tore him to pieces!"
                    );
                    let embedD = new Discord.MessageEmbed()
                      .setTitle(
                        member.user.username +
                          " was attacked by a Shadow Cat! It ran towards him and tore him to pieces!"
                      )
                      .setDescription(
                        "You should always use a Bow against Wild Animals. It gives you the upper hand..."
                      )
                      .setColor("WHITE")
                      .setTimestamp()
                      .attachFiles(["./assets/shadowcatattack.png"])
                      .setThumbnail("attachment://shadowcatattack.png");
                    chan.send(embedD);
                    message.reply(embedD);
                    member.roles.remove("728729459263406080"); //remove quest beyond wall role
                  }
                }, 30 * 1000);
              }
              break;
            case 1:
              chance2 = 0; //chance thenn kills u
              break;
          }
          if (chance2 == 0) {
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
            member.roles.add("708346509367836702").catch(console.error); //dead role
            member.roles.remove("728729459263406080"); //remove quest beyond wall role
            member.send(
              "You were murdered and eaten by the Thenns for dinner!"
            );
            message.channel.send(
              member.user.username +
                " was murdered and eaten by the Thenns for dinner!"
            );
            //give death to member
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
                money.deaths = money.deaths + 1;
                money.save().catch((err) => console.log(err));
              }
            );
            member.send(
              "You encountered a group of Cannibal Thenns at Frostfangs and was killed and eaten."
            );
            let embed3 = new Discord.MessageEmbed()
              .setTitle(
                member.user.username +
                  " encountered a group of Cannibal Thenns at Frostfangs and was killed and eaten."
              )
              .setDescription(
                "Next time you might be wise to offer them a gift..."
              )
              .setColor("WHITE")
              .setTimestamp()
              .attachFiles(["./assets/thennseat.png"])
              .setThumbnail("attachment://thennseat.png");
            chan.send(embed3);
            message.reply(embed3);
            member.roles.remove("728729459263406080"); //remove quest beyond wall role
          }
        } else if (reaction.emoji.name === "2️⃣") {
          //must have dagger to give or dies instantly
          message.reply(member.user.username + " reacted with 2️⃣");
          console.log("REACTED CORRECTLY");
          var dagger = 0;
          //have dagger?
          member.roles.cache.forEach((role) => {
            console.log("each role " + role.name);
            if (
              role == "719083010091253770" //dagger
            ) {
              dagger = 1;
            }
          });
          switch (dagger) {
            case 0:
              chance2 = 1;
              message.channel.send(
                member.user.username +
                  " does not have a Valyrian Dagger to give! The Thenn killed you!"
              );
              //give death to member
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
                  money.deaths = money.deaths + 1;
                  money.save().catch((err) => console.log(err));
                }
              );
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
              member.roles.add("708346509367836702").catch(console.error); //dead role
              member.roles.remove("728729459263406080"); //remove quest beyond wall role

              member.send(
                "You offered a Valyrian Dagger to the Thenns but did not have one! They killed you!"
              );
              let embed4 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " offered a Valyrian Dagger to the Thenns to pass in peace but did not have a Dagger with him! He was killed and eaten!"
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/thennseat.png"])
                .setThumbnail("attachment://thennseat.png");
              chan.send(embed4);
              message.reply(embed4);
              break;
            case 1:
              chance2 = 1;
              message.channel.send(
                member.user.username +
                  " gifted a Valyrian Dagger to the Thenn Leader. He accepted and allowed the Ranger to pass in peace this one time. He decides to return home regardless for the roads ahead are treacherous."
              );
              // member.roles.remove("728729459263406080"); //remove quest beyond wall role
              member.roles.remove("719083010091253770"); //remove valyrian dagger
              member.send(
                "You gave the Thenns your Valyrian Dagger and they let you pass in peace, however the roads are treacherous ahead, you should return home. Should you decide to move on, Continue on your Quest."
              );
              //give coins only to member
              Money.findOne(
                {
                  userID: member.id,
                  guildID: message.guild.id,
                },
                (err, money) => {
                  if (err) console.log(err);
                  money.coins = money.coins + 20;
                  member.send(
                    "The Thenns offered you 20 coins in exchange for the Dagger!"
                  );
                  money.save().catch((err) => console.log(err));
                }
              );
              let embed5 = new Discord.MessageEmbed()
                .setTitle(
                  member.user.username +
                    " encountered a group of Thenns and gifted them his Valyrian Dagger for peace. They accepted and gave him 20 coin. He continues on his Quest through a frozen wasteland."
                )
                .setColor("WHITE")
                .setTimestamp()
                .attachFiles(["./assets/thennsgift.png"])
                .setThumbnail("attachment://thennsgift.png");
              chan.send(embed5);
              message.reply(embed5);
              //surrounded
              //send next quest message
              setTimeout(function () {
                let embed5_1 = new Discord.MessageEmbed()
                  .setTitle(
                    member.user.username +
                      " continued past the Valley of the Freefolk when he is all of the sudden surrounded by a group of Wights!"
                  )
                  .setColor("WHITE")
                  .setTimestamp()
                  .attachFiles(["./assets/surroundedmsg.png"])
                  .setThumbnail("attachment://surroundedmsg.png");
                chan.send(embed5_1);
                message.reply(embed5_1);
              }, 10 * 1000);
              setTimeout(function () {
                message.channel.send(
                  "**As you continue to a frozen wasteland, you are all of the sudden surrounded by a group of Wights.**\n React with 1️⃣ to fight the group head on\n React with 2️⃣ to strike a couple down and run back to Castle Black"
                );
              }, 20 * 1000);

              break;
          }
        } else if (reaction.emoji.name === "3️⃣") {
          //return to castle black quit quest
          member.roles.remove("728729459263406080"); //remove quest beyond wall role
          member.send("You quit the Quest and returned back to Castle Black");
          let embed10 = new Discord.MessageEmbed()
            .setTitle(
              member.user.username +
                " has quit his Quest Beyond the wall and returned to Castle Black."
            )
            .setDescription("Was he afraid to continue...")
            .setColor("WHITE")
            .setTimestamp()
            .attachFiles(["./assets/returnedtocastleblack.png"])
            .setThumbnail("attachment://returnedtocastleblack.png");
          chan.send(embed10);
          message.reply(embed10);
        } else {
          console.log("REACTED INCORRECTLY");
          message.delete({ timeout: 3000 });
          member.send("You did not react with the right emoji!");
        }
        setTimeout(function () {
          console.log("--------quest timeout FROSTFANGS entered----------");
          member.roles.remove("728729459263406080");
          // chan.send(
          //   member.user.username +
          //     " took longer than 1 minute to answer the Thenns question and was booted from the Quest."
          // );
        }, 360 * 1000);
      })
      .catch((collected) => {
        console.log(
          `question beyond wall wight After a minute, only ${collected.size} out of 4 reacted.`
        );
        message.reply("You didn't react in time with an answer.");
        message.delete({ timeout: 10000 });
      });
  },
};
