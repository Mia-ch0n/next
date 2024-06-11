import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}



export async function GET() {
  try {
    const users = await User.find().populate({
      path: 'posts',
      populate: {
        path: 'comments',
        populate: {
          path: 'likes',
          model: 'User'
        }
      }
    }).exec();

    const usersWithPoints = users.map(user => {
      let points = 0;

      // Add points for each post
      user.posts.forEach(post => {
        points += 1;

        // Add points for each comment
        post.comments.forEach(comment => {
          points += 2;

          // Ensure likes is defined and is an array
          if (Array.isArray(comment.likes)) {
            // Add points for each like on the comment
            points += comment.likes.length * 3;
          }
        });
      });

      return { ...user.toObject(), points };
    });

    return NextResponse.json({ users: usersWithPoints }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
