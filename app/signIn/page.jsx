import SignIn from "@/components/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/feed");
  return (
      <SignIn/> 
  );
}
