import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const postSchema = new Schema({
  title: String,
  description: String,
  createdBy: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  upvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
