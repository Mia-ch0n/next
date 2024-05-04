'use client'
import { useEffect, useState } from "react";

export default async function Page() {
  const [session,setSession] = useState()



  if (session?.user?.role === "admin") {
    return <p>You are an admin, welcome!</p>;
  }

  return <p>You are not authorized to view this page!</p>;

}