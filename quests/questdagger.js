const Money = require("../models/profile.js");

module.exports = {
  name: "questdagger",
  description: "says questdagger!",
  execute(channel, args) {
    //quest_dagger
    console.log("entered questdagger command");
    var member = args;
    var chan = channel; //dagger
    channel.send(member.user.username + " Accepted Valyrian Dagger Quest.");
    member.send(
      "Go to this channel to fulfill your Quest: <#721263752015511613> (You only have 30 seconds to answer the Question!)"
    );
    member.roles.add("721211126582476832");
    let question = Math.floor(Math.random() * 5);
    switch (question) {
      case 0:
        chan.send(
          "Maester: What is the name of the Valyrian Steel sword carried by Eddard Stark? (You have 30 seconds to answer)\n React with 1️⃣ Heartsbane\n React with 2️⃣ Longclaw\n React with 3️⃣ Oathkeeper\n React with 4️⃣ Ice"
        );
        break;
      case 1:
        chan.send(
          "Maester: Which of the following is not a Valyrian Sword? (You have 30 seconds to answer)\n React with 1️⃣ Blackfyre\n React with 2️⃣ Brightroar\n React with 3️⃣ Dark Sister\n React with 4️⃣ Oath Maker"
        );
        break;
      case 2:
        chan.send(
          "Maester: Where else can you find Valyrian Steel? (You have 30 seconds to answer)\n React with 1️⃣ Faceless Chain Armor\n React with 2️⃣ Maester Chain Links\n React with 3️⃣ The Crown\n React with 4️⃣ Gendry's Workshop"
        );
        break;
      case 3:
        chan.send(
          "Maester: Who gave Arya a Valyrian Dagger? (You have 30 seconds to answer)\n React with 1️⃣ Jon Snow\n React with 2️⃣ Little Finger\n React with 3️⃣ Bran\n React with 4️⃣ The Hound"
        );
        break;
      case 4:
        chan.send(
          "Maester: Where is Valyrian Steel from? (You have 30 seconds to answer)\n React with 1️⃣ Valyrian City\n React with 2️⃣ Essos\n React with 3️⃣ Valyrian Freehold\n React with 4️⃣ Pentos"
        );
        break;
    }
    setTimeout(function () {
      console.log("--------quest timeout entered----------");
      member.roles.remove("721211126582476832");
    }, 70 * 1000);
  },
};
