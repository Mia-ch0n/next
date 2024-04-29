import Post from '../../../models/Post'
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await Post.find();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const post = body.formData;
    await Post.create(post);
    return NextResponse.json({ message: "Post Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}