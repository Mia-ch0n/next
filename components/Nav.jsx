"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signUp } from "next-auth/react"; 
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/mobelite.jpg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Mobistack</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
        <button type="button" onClick={() => signIn()} className="outline_btnn">
        Sign In
      </button>
      

          <button type="button" onClick={() => signUp()} className="outline_btn">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        
      </div>
    </nav>
  );
};

export default Nav;
