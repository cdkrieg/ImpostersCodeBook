const { Post, validatePost } = require("../models/post");
// const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();



// POST a Post
// http://localhost:3007/api/post
router.post("/", async (req, res) => {
  try {
    const {error} = validatePost(req.body);
    if (error) return res.status(400).send(error);
    let newPost = await new Post(req.body);
    await newPost.save();
    return res.status(201).send(newPost)
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all users
// router.get("/", [auth], async (req, res) => {
//   try {
//     console.log(req.user);
//     const users = await User.find();
//     return res.send(users);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// DELETE a single user from the database
// router.delete("/:userId", [auth, admin], async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user)
//       return res
//         .status(400)
//         .send(`User with id ${req.params.userId} does not exist!`);
//     await user.remove();
//     return res.send(user);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router;
