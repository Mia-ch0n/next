import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    fullName: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
       
    },
  
    profilePic: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

},
    { timestamps: true },
);

const User = models.User || mongoose.model("User", userSchema);
export default User;