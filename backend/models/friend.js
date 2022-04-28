const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
  friendsList: {type: Array},
  pendingFriends: {type: Array},
  friendRequests: {type: Array},
  userId: {type: String},
});

const Friend = mongoose.models.Friend || mongoose.model("Friend", friendSchema);
module.exports.Friend = Friend;
module.exports.friendSchema = friendSchema;
