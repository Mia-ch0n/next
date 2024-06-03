import User from "../../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import path from "path";
import { writeFile } from "fs/promises";
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

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { fullName, email, currentPassword, newPassword, profilePic } = await req.json();

    const updatedData = { fullName, email, profilePic };

    if (currentPassword && newPassword) {
      const user = await User.findById(id);
      if (!user) {
        console.error("User not found");
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        console.error("Current password is incorrect");
        return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
      }

      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } else {
      console.error("User not found during update");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error editing user:", err);
    return NextResponse.json({ message: "Error editing user", error: err.message }, { status: 500 });
  }

}
export const POST = async (req, { params }) => {
  const formData = await req.formData();
  const { id } = params;

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const filePath = path.join(process.cwd(), "public/uploads/" + filename);

  try {
    await writeFile(filePath, buffer);

    // Update the user's profile picture in the database
    const imageUrl = `/uploads/${filename}`;
    const updatedUser = await User.findByIdAndUpdate(id, { profilePic: imageUrl }, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      return NextResponse.json({ user: updatedUser, message: "Success", status: 201 });
    } else {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ message: "Failed", error: error.message, status: 500 });
  }
};