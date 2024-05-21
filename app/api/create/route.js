import "../../../models/User";
import User from "../../../models/User";

import { NextResponse } from "next/server";

export async function POST(req) {
  
  try {
    const { email, password, fullName, job } = await req.json();
    const user = await User.create({ email, password, fullName, job });
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
