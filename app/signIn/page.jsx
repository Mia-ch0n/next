import SignIn from "@/components/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  // if (session) {
  //   if (session.user.role === "admin") { 
  //     redirect("/AdminDash");
  //   } else {
  //     redirect("/feed");
  //   }
  // }
  return <SignIn />;
}
