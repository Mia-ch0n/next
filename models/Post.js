import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const postSchema = new Schema({
  title: String,
  description: String,

});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
