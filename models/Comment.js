import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: false,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
