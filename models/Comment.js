import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
