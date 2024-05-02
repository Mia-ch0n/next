import Comment from '../../../models/Comment';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { text, author, postId } = await req.json();
    const comment = await Comment.create({ text, author, postId });
    return NextResponse.json({ message: 'Comment Created', comment }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error creating comment', error: err }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { postId } = req.query;
    const comments = await Comment.find({ postId });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error fetching comments', error: err }, { status: 500 });
  }
}
