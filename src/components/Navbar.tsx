'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image'

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const { data: session } = useSession();
  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 py-0", className)}
    >
        <Menu setActive={setActive}>
            <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home">
            
            </MenuItem>
            </Link>
            <MenuItem
            setActive={setActive} active={active} item="Our Courses"
            >
               <div className="flex flex-col space-y-4 text-sm">
               <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/courses">
              Basic Music Theory
            </HoveredLink>
            <HoveredLink href="/courses">
              Advanced Composition
            </HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">
              Music Production
            </HoveredLink>
               </div>
            </MenuItem>
            <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
            
            </MenuItem>
            </Link>
            {session ? (
            <div className="flex items-center gap-4 ml-4">
                {/* <span className="text-white text-sm">{session.user?.image}</span> */}
                <span>
                  {session.user?.image && (
                            <Image
                              src={session.user.image}
                              alt="Avatar"
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full mb-4"
                              priority
                            />
                          )}
                </span>
                <button
                    onClick={() => signOut()}
                    className="text-teal-400 relative -translate-y-2 hover:underline text-sm font-medium"
                >
                    Sign out
                </button>
            </div>
            ) : (
            <button
                onClick={() => signIn(undefined, { callbackUrl: "/" })}
                className="text-teal-400 hover:underline text-sm font-medium"
            >
                Sign in
            </button>
            )}
        </Menu>
    </div>
  )
}

export default Navbar