const { User } = require("../models/user");
// const admin = require("../middleware/admin");
const express = require("express");
const { object } = require("joi");
const router = express.Router();




// POST a Friend
// http://localhost:3007/api/friends
router.put("/", async (req, res) => {
 try {
     const friends = await User.updateOne({_id: req.body._id}, {$addToSet: {friendsList: req.body.friendsList}}) 
     if (friends) return res.status(201).send(`Friend with ID of ${req.body.friendsList} added`) 
     return res.status(400).send(`Error adding friend`)
} catch (error) {
  return res.status(500).send(`Internal Server Error: ${error}`);
}
});

//Remove a friend
// http://localhost:3007/api/friends
router.put("/remove", async (req, res) => {
    try {
        const friend = User.findByIdAndUpdate({_id: req.body._id}, {$pull: {friendsList: req.body.friendsList}});
        if (friend) return res.status(201).send(`Friend with ID of ${req.body.friendsList} removed`) 
        return res.status(400).send(`Error adding friend`)
   } catch (error) {
     return res.status(500).send(`Internal Server Error: ${error}`);
   }
   });

// Get all current friends
// http://localhost:3007/api/friends
router.get("/current", async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body._id});
    const friends = user.friendsList
    if (friends.length===0) return res.status(400).send(`No friends to show!`);
    return res.send(friends);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all pending friends
// http://localhost:3007/api/friends
router.get("/pending", async (req, res) => {
    try {
      const user = await User.findOne({_id: req.body._id});
      const friends = user.pendingFriends
      if (friends.length===0) return res.status(400).send(`No pending friends to show!`);
      return res.send(friends);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });

// Get all friend request
// http://localhost:3007/api/friends
router.get("/requests", async (req, res) => {
    try {
      const user = await User.findOne({_id: req.body._id});
      const friends = user.friendRequests
      if (friends.length===0) return res.status(400).send(`No friend requests to show!`);
      return res.send(friends);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });

// DELETE a single comment from the database
// http://localhost:3007/api/:postId
// router.delete("/:postId", async (req, res) => {
//     // need to add postId to the post.js postSchema?
//     // need both auth and admin?
//   try {
//     const post = await Post.findById(req.params.postId);
//     if (!post)
//       return res
//         .status(400)
//         .send(`Post with id ${req.params.postId} does not exist!`);
//     await post.remove();
//     return res.send(post);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router;