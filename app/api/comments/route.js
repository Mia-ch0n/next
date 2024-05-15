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
    const comment = await Comment.find().populate('author').exec();
    return NextResponse.json({ comment }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error fetching comments', error: err }, { status: 500 });
  }
}
