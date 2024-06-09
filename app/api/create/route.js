import bcrypt from 'bcryptjs'; 

import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, fullName, job } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    let isAdmin = false;
    let category = '';

    if (job.toLowerCase().includes("manager")) {
      isAdmin = true;
      category = job.replace(" manager", "").trim();
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      job,
      isAdmin,
      category,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
