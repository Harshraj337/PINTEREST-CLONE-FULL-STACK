const mongoose = require('mongoose');


// Define the user schema
const postSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  title: String,
  description:String,
 image:String

});

// Create the User model
const post = mongoose.model('post', postSchema);

module.exports = post;
