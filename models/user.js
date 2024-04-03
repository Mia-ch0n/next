import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
},
email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
},
password: {
   type: String,
   required: [true, "Please provide a password"],
   minlength: 8,
},
isVerified: {
   type: Boolean,
   default: false,
},
isAdmin: {
    type: Boolean,
    default: false,
},
forgotPasswordToken: String,
forgotPasswordTokenExpiry: Date,
verifyToken: String,
verifyTokenExpiry: Date,
},
{ timestamps: true },
);

const User = models.User || mongoose.model("User", userSchema);
export default User;