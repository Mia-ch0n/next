import Comment from '../../../models/Comment';
import Post from '../../../models/Post';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    //creation comment
    let comment = await Comment.create(body);
   
    // get comment id
    // retrieve lel post find by id
    const postDoc = await Post.findOne({_id:comment.post})
    // update llpost comment list = [123,564,98]
    postDoc.comments = [...postDoc.comments,comment._id]
    postDoc.save()
    return NextResponse.json({ message: 'Comment Created',body: comment }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error creating comment', error: err }, { status: 500 });
  }
}
export async function GET() {
  try {
    const comment = await Comment.find().sort({ _id: -1 }).populate('author').populate('like').exec();
    return NextResponse.json({ comment }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error fetching comments', error: err }, { status: 500 });
  }
}
export async function PATCH(req) {
  try {
    const { commentId, userId, like } = await req.json();

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    if (like) {


      // has like
      if (comment.like.includes(userId)) {
        comment.like = comment.like.filter((id) => {
        return id?.toString() !== userId
        })
      } else {
        comment.like.push(userId);
        comment.dislike = comment.dislike.filter((id) => id?.toString() !== userId); 
      }
    } else {
      console.log("userId: ",userId);
      if (comment.dislike.includes(userId)) {
        comment.dislike = comment.dislike.filter((id) => id.toString() !== userId);
      } else {
        comment.dislike.push(userId);
        comment.like = comment.like.filter((id) => id.toString() !== userId); 
      }
    }

    await comment.save();

    return NextResponse.json({ message: 'Comment updated', comment }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error updating comment', error: err }, { status: 500 });
  }
}

