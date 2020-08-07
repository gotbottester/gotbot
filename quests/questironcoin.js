const Money = require("../models/profile.js");

module.exports = {
  name: "questironcoin",
  description: "says questironcoin!",
  execute(channel, args) {
    //questironcoin
    console.log("entered questironcoin command");
    var member = args;
    var chan = channel; //ironcoin
    channel.send(member.user.username + " was first to seek Jaqen");
    member.roles.add("726599861730017311");
    member.send(
      "To find Jaqen go to the Channel here ->>> <#735888376212750396> and await his arrival."
    );
    chan.send(
      "**Jaqen H'ghar**: Why do you seek a Man? A Man has duties be quick:\n React with 1️⃣ I want to kill people\n React with 2️⃣ I want to become a Faceless Man like you\n React with 3️⃣ I want to serve the Many Faced God of Death"
    );
    setTimeout(function () {
      console.log("--------quest timeout entered----------");
      member.roles.remove("726599861730017311");
    }, 60 * 1000);
  },
};
