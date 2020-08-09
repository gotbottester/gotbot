const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  RolesRemover: function (member) {
    //remove all roles except ones noted below
    console.log("Entered Roles Remover");
    member.roles.cache.forEach((role) => {
      console.log("Removed role " + role.name + " for " + member.user.username);
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
    console.log("finished rolesremover")
  },
};