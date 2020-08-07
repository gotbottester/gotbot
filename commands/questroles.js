const Discord = require("discord.js");

module.exports = {
  name: "questroles",
  description: "says questroles!",
  execute(message, args) {
    //questroles
    let embed = new Discord.MessageEmbed()
      .setTitle("Achievable Quest Roles + Info")
      .setColor("BLUE")
      .setTimestamp()
      .attachFiles(["./assets/questroles.png"])
      .setThumbnail("attachment://questroles.png")
      .addFields(
        {
          name: "Name: Valyrian Dagger (Quiz)",
          value: "*Valyrian Dagger Quiz Quest*: Found in Whispers of Westeros Channel.\n***Requirements***: Have at least one role and not be dead.\n***Use***: Helps against White Walker Bites at the Nights Watch. Helps in certain quests that require fighting Wights and White Walkers.",
        },
        {
          name: "Name: Obsidian Lance (Hard)",
          value: "*Beyond the Wall Quest*: Found in the cave of the three eyed raven when the Children of the Forest appear.\n***Requirements***: First Ranger + Dragonglass required.\n***Use***: Activate with ^lance and has 1 hour cooldown. Kills White Walkers and General of White Walkers.",
        },
        {
          name: "Name: Weirwood Bow (Hard)",
          value: "*Beyond the Wall Quest*: Found in the cave of the three eyed raven when the Children of the Forest appear.\n***Requirements***: First Ranger required.\n***Use***: Useful to kill wild animals Beyond the Wall and achieve special rewards.",
        },
        {
          name: "Name: Greensight (Hardest)",
          value: "*Beyond the Wall Quest*: Found in the cave of the three eyed raven when the Three Eyed Raven appears.\n***Requirements***: First Ranger and need Warg Trained Role found past Frostfangs path.\n***Use***: Activate with ^greensight command for 30 minutes of seeing all hidden channels including Small Council so you can see plots coming.",
        },
        {
          name: "Name: Skinchanger (Medium)",
          value: "*Beyond the Wall Quest*: Found in the cave of the three eyed raven when the Three Eyed Raven appears.\n***Requirements***: Not be First Ranger.\n***Use***: Activate with ^skinchange for 30 minutes. While activated you cannot be killed by Executions, Shadow, Spear, Bite or Jailed. Also used to achieve other items in other Quests. Does not help being immune from dying in Quests.",
        },
        {
          name: "Name: Pet Dire Wolf - Ghost (Hard)",
          value: "*Beyond the Wall Quest*: Found past the Frostfangs.\n***Requirements***: Must kill Thenns when confronted and have at least 1 role from the Cave of the Three Eyed Raven.\n***Use***: Type ^pet_wolfghost to see it grow. Will be valuable in Quests.",
        },
        {
          name: "Name: Pet Shadow Cat (Hardest)",
          value: "*Beyond the Wall Quest*: Found past the Frostfangs.\n***Requirements***: Must kill Thenns when confronted.\n***Use***: Type ^pet_shadowcat to see it grow. Will be valuable in Quests.",
        },
        {
          name: "Name: Warg Training (Hardest)",
          value: "*Beyond the Wall Quest*: Found past the Frostfangs.\n***Requirements***: Must Strike down the Thenns at Frostfangs.\n***Use***: Useful to get Greensight at the Cave of the Three Eyed Raven.",
        },
        {
          name: "Name: Old Tongue (Hard)",
          value: "*Beyond the Wall Quest*: Found past the Frostfangs.\n***Requirements***: After giving Valyrian Dagger to Thenns.\n***Use***: Will be useful for hidden items in the Cave of the Three Eyed Raven and future quests in Essos/Shadowlands.",
        },
        {
          name: "Name: Iron Coin (Chance)",
          value: "*Iron Coin Quiz Quest*: Found in Whispers of Westeros Channel.\n***Requirements***: Have at least one role and not be dead.\n***Use***: Can be sold for 100 coin at the Merchant or used to take you to Braavos by Boat when that Quest is published...",
        }

      );
    return message.channel.send(embed);
  },
};
