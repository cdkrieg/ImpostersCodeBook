const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// const { binary } = require("joi");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  isAdmin: { type: Boolean, required: true },
  aboutMe: { type: String, minLength: 4, maxLength: 1024, default: "     " },
  friendsList: { type: Array, default: [] },
  pendingFriends: { type: Array, default: [] },
  friendRequests: { type: Array, default: [] },
  projects: { type: Array, default: [] },
  codingLanguages: { type: Array, default: [] },
  dateAdded: { type: Date, default: Date.now() },
  image: { type: String, default: "" },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      aboutMe: this.aboutMe,
      friendsList: this.friendsList,
      pendingFriends: this.pendingFriends,
      projects: this.projects,
      codingLanguages: this.codingLanguages,
      dateAdded: this.dateAdded,
      image: this.image,
    },
    process.env.JWT_SECRET
  );
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.bool().required(),
    image: Joi.string(),
    aboutMe:Joi.string().min(4).max(1024),
    
  });
  return schema.validate(user);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
