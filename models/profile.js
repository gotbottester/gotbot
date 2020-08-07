const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  userID: String,
  username: String,
  coins: {
    type: Number,
    default: 100,
  },
  level: {
    type: Number,
    default: 0,
  },
  deaths: {
    type: Number,
    default: 0,
  },
  kills: {
    type: Number,
    default: 0,
  },
  king: {
    type: Number,
    default: 0,
  },
  nightking: {
    type: Number,
    default: 0,
  },
  quests: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
  loss: {
    type: Number,
    default: 0,
  },
  escapes: {
    type: Number,
    default: 0,
  },
  wightkills: {
    type: Number,
    default: 0,
  },
  wolfage: {
    type: Number,
    default: 0,
  },
  wolfghostage: {
    type: Number,
    default: 0,
  },
  shadowcatage: {
    type: Number,
    default: 0,
  },
  king: {
    type: Number,
    default: 0,
  },
  nightking: {
    type: Number,
    default: 0,
  },
  hand: {
    type: Number,
    default: 0,
  },
  meli: {
    type: Number,
    default: 0,
  },
  meliage: {
    type: Number,
    default: 0,
  },
  shadowuse: {
    type: Number,
    default: 0,
  },
  amuletuse: {
    type: Number,
    default: 0,
  },
  bloodmagicxp: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 0,
  },
  swordsmanxp: {
    type: Number,
    default: 0,
  },
  timestamp: { type: Date, default: Date.now },
  items: [
    {
      type: String,
    },
  ],
});

module.exports = User = mongoose.model("Profile", profileSchema);
