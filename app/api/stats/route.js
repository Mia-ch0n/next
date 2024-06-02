import User from "../../../models/User";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await User.find().exec();

    // Iterate over users to count posts and comments
    const userStats = await Promise.all(
      users.map(async (user) => {
        const postsCount = await Post.countDocuments({ author: user._id });
        const commentsCount = await Comment.countDocuments({ author: user._id });

        return {
          id: user._id,
          name: user.name,
          job: user.job,
          email: user.email,
          postsCount,
          commentsCount,
        };
      })
    );

    return NextResponse.json(userStats, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
