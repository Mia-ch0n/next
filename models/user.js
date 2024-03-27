import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
   
    match: [/\S+@\S+\.\S+/, 'Invalid email address'],
  },
  password:{
    type:String,
    required:[true,"Must provide a password"],
  },
},
{
  timestamps:true
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
