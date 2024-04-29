const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
  useNewUrlParser: true,        // Use new URL parser
  useUnifiedTopology: true      // Use new server discovery and monitoring engine
});
const passportLocalMongoose = require('passport-local-mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username:String,
  name: String,
  email:String,
  password:String,
  profileImage:String,
  contact:Number,
  bords: {
    type:Array,
    default:[],
  },
posts:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
  }
]
});
userSchema.plugin(passportLocalMongoose);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
