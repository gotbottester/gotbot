var cooldowngivepass = new Set();
var cdseconds = 1800;

module.exports = {
  name: "give_pass",
  description: "says give_pass!",
  execute(message, args) {
    //give_pass - LORD COMMANDER
    console.log("entered give_pass command");
    var chan_questbeyondwall = message.guild.channels.cache.get(
      "727677918142136431"
    ); //quest beyond wall
    if (cooldowngivepass.has(message.author.id)) {
      message.delete();
      console.log("STILL COOLDOWN");
      return message.reply(
        "There is a 30 minute cooldown on giving a pass Beyond the Wall."
      );
    }
    //MUST HAVE LORD COMMANDER ROLE
    if (message.member.roles.cache.has("715783930581876806")) {
      //lord commander
      let member = message.mentions.members.first();
      if (member == null) {
        console.log("NO @MEMBER FOUND");
        message.reply(
          "you need to specify a member after the command: @membername"
        );
        return;
      } else if (member.roles.cache.has("715783930581876806")) {
        message.reply("You cannot give yourself a Wall Pass.");
        return;
      } else {
        let questbeyondwallrole = member.guild.roles.cache.find(
          (r) => r.id === "727677376191791105"
        );
        let nightswatchrole = member.roles.cache.find(
          (r) => r.id === "707074053881724989"
        ); //nights watch
        let membersWithRole = questbeyondwallrole.members;

        if (nightswatchrole) {
          if (membersWithRole.size < 1) {
            member.roles.add(questbeyondwallrole).catch(console.error);
            message.channel.send(
              "The Lord Commander of the NightsWatch has given " +
                member.user.username +
                " permission to go Beyond the Wall. Goodluck on your Journey. Beyond the Wall is Dangerous, try not to die."
            );
            chan_questbeyondwall.send(
              "**As you travel through the Haunted Forest, a Wight appears and attacks you!**\n React with 1️⃣ to fight the Wight head on\n React with 2️⃣ to run for cover and get the Wight by surprise\n React with 3️⃣ retreat back to Castle Black fast\n React with 4️⃣ to Quit Quest"
            );
            setTimeout(function () {
              console.log("--------quest timeout START entered----------");
              member.roles.remove("727677376191791105");
              // chan.send(member.user.username + " took longer than 1 minute to answer the Start/Wight question and was booted from the Quest.");
            }, 120 * 1000);
            cooldowngivepass.add(message.author.id);
            setTimeout(() => {
              cooldowngivepass.delete(message.author.id);
              console.log("Cooldown give pass finished " + message.author.id);
              message.author.send(
                "Give Pass cooldown ended. You may send another beyond the wall anytime."
              );
            }, cdseconds * 1000);
          } else {
            message.channel.send(
              "Only 1 max allowed Beyond the Wall at a time!"
            );
          }
        } else {
          message.channel.send(
            "Only those within the Nights Watch can travel Beyond the Wall."
          );
        }
      }
    } else {
      console.log("you do not have permission!!!");
      message.channel.send(
        "Only the Lord Commander of the NightsWatch can give access Beyond the Wall!"
      );
    }
  },
};
