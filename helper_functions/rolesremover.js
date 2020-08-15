const Money = require("../models/profile.js");
const Discord = require("discord.js");

module.exports = {
  RolesRemover: function (member) {
    //remove all roles except ones noted below
    console.log("Entered Roles Remover");
    member.roles.cache.forEach((role) => {
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
        console.log(
          "Removed role " + role.name + " for " + member.user.username
        );
      }
    });
    member.roles.add("742098398169268304").catch(console.error); //add limbo
    console.log("finished rolesremover");
  },

  HouseRolesRemover: function (member) {
    //remove all roles except ones noted below
    console.log("Entered House Roles Remover");
    member.roles.cache.forEach((role) => {
      if (
        role == "707069333494431854" && //stark
        role == "707069479833698326" && //lannister
        role == "707073920515309639" && //targaryen
        role == "707073997933772811" && //tully
        role == "707073467283144704" && //tyrell
        role == "708351845994725418" && //greyjoy
        role == "707073800474198078" && //arryn
        role == "707073882321846355" //baratheon
      ) {
        member.roles.remove(role).catch(console.error);
        console.log(
          "Removed role " + role.name + " for " + member.user.username
        );
      }
    });
    console.log("finished house rolesremover");
  },
};
