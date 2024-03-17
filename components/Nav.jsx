'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signUp } from "next-auth/react"; 
import { useSession } from "next-auth/react";
import Link from 'next/link';
        
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
      <div className="flex">
        <div className="flex gap-3 md:gap-5">
       
        <Link href="/signIn" className="outline_btnn">
      <button type="button">Sign In</button>
    </Link>

      
        </div>
      </div>

      
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        
      </div>
    </nav>
  );
};

export default Nav;
