const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = mongoose.Schema({
  body: { type: String, minLength: 2, maxLength: 255, required: true },
  likeStatus: { type: Boolean, default: null },
  userId: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now() },
});

const validatePost = (post) => {
  const schema = Joi.object({
    body: Joi.string().min(2).max(255).required(),
    userId: Joi.string().required(),
  });
  return schema.validate(post);
};

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports.Post = Post;
module.exports.postSchema = postSchema;
module.exports.validatePost = validatePost;
