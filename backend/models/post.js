const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = mongoose.Schema({
  body: {type: String, minLength: 5, maxLength: 255, required: true},
  like: {type: Boolean},
  userId: {type: String},
  dateAdded: {type: Date, default: Date.now()},
});

const validatePost = (post) => {
  const schema = Joi.object({
    body: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(post);
};

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports.Post = Post;
module.exports.postSchema = postSchema;
module.exports.validatePost = validatePost;

