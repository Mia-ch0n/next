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
    const users = await User.find().populate("posts").exec();
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}