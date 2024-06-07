import "@models/Comment";
import Post from "../../../models/Post";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";


export async function GET() {
  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .exec();

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  const formData = await req.formData();

  const file = formData.get("file");
  const title = formData.get("title");
  const description = formData.get("description");
  const author = formData.get("author");

  try {
    let imageUrl = null;
    
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
      const filePath = path.join(process.cwd(), "public/uploads/" + filename);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await Post.create({ title, description, imageUrl, author });
    return NextResponse.json({ message: "Post Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
