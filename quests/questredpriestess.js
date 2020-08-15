const Money = require("../models/profile.js");

module.exports = {
  name: "questredpriestess",
  description: "says questredpriestess!",
  execute(channel, args) {
    //questredpriestess
    console.log("entered questredpriestess command");
    var member = args;
    var chan = channel; //redpriestess
    member.roles.add("736100797972086837"); //quest redpriestess role
    member.send(
      "Go Pray to the Lord of Light in the Channel HERE ->>> <#736095446409281597>."
    );
    chan.send(
      "Light your flame among us, R'hllor. Show us the truth or falseness of this man. Strike him down if he is guilty, and give strength to his sword if he is true. Lord of Light, give us wisdom.:\n React with 1️⃣ Lord of Light, defend us\n React with 2️⃣ Lord of Light, shine your face upon us\n React with 3️⃣ For the night is dark and full of terrors"
    );
    setTimeout(function () {
      console.log("--------quest timeout entered----------");
      member.roles.remove("736100797972086837");
    }, 60 * 1000);
  },
};
