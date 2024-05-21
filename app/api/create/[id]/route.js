import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const { id } = params;
  const foundPost = await User.findOne({ _id: id });
  return NextResponse.json({ foundPost }, { status: 200 });
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req,{params}) {
  try {
    const { id } = params;
    const updatedUserData = await req.json();

    const updatedUser = await User.findByIdAndUpdate({_id: id}, updatedUserData, {
      new: true,
      runValidators: true,
    });
    if (updatedUser) {
      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error editing user:", err);
    return NextResponse.json(
      { message: "Error editing user", error: err },
      { status: 500 }
    );
  }
}
