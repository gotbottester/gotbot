var flag = 0;

module.exports = {
  name: "melee_bets",
  description: "says melee_bets!",
  execute(message, args) {
    //melee_bets - tourney of the hand
    console.log("entered melee_bets command");
    var member2 = message.mentions.members.first();
    var challenger = message.member;
    if (message.channel == "714201504583516211") {
      if (member2 == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else {
        message.reply(
          "You have sent a Melee Challenge to " +
            member2.user.username +
            ". Winner receives 20 coin. Loser loses 20 coin."
        );
        message.mentions.members
          .first()
          .send(
            "You received a Friendly Melee challenge in the Tourney of the Hand. Winner gets 20 coins and Loser loses 20 coins. If you wish to accept, react with 👍 on ^melee line in the Channel here ->>> <#724846778209533973>."
          );

        console.log("saw melee message");
        const filter = (reaction, user) => {
          challenger = message.member; //get person who challenged
          // member2 = message.mentions.members.first(); //get person mentioned in challenge
          console.log(
            "member 1 " +
              challenger.user.username +
              " member 2 " +
              member2.user.id +
              " reactor " +
              user.id
          );
          if (member2.id == user.id) {
            return ["👍"].includes(reaction.emoji.name);
          } else {
            message.reply("Only the mentioned user can accept the Challenge.");
          }
        };
        message
          .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
          .then((collected1) => {
            const reaction = collected1.first();
            if (reaction.emoji.name === "👍") {
              message.reply("Accepted Tourney of the Hand Challenge");
              flag = 1;
            } else {
              message.reply("You must react with 👍 to accept the Duel");
            }
            test(flag);
          })
          .catch((collected1) => {
            console.log(
              `After a minute, only ${collected1.size} out of reacted.`
            );
            message.reply(
              member2.user.username + " did not accept your challenge!"
            );
          });
      }

      function test(parm1) {
        console.log("flag " + parm1);
        if (parm1 == 1) {
          console.log("entered FLAG IF");
          message.reply("test bet");
          const filter = (reaction, user) => {
            challenger = message.member; //get person who challenged
            // member2 = message.mentions.members.first(); //get person mentioned in challenge
            console.log(
              "member 1 " +
                challenger.user.username +
                " member 2 " +
                member2.user.id +
                " reactor " +
                user.id
            );
            return ["👍"].includes(reaction.emoji.name);
          };
          message
            .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
            .then((collected1) => {
              const reaction = collected1.first();
              if (reaction.emoji.name === "👍") {
                message.reply("Accepted bet");
                flag = 1;
              } else {
                message.reply("You must react with 👍 to accept the bet");
              }
              test(flag);
            })
            .catch((collected1) => {
              console.log(
                `After a minute, only ${collected1.size} out of reacted.`
              );
              message.reply(
                member2.user.username + " did not accept your bet!"
              );
            });
        }
      }
    } else {
      message.reply(
        "You must be in the Tourney of the Hand Channel in order to use ^melee. Channel Here <#724846778209533973>"
      );
    }
  },
};
