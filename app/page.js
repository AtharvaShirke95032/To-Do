
"use client";
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
   <div className="min-h-screen flex items-center justify-center flex-col px-4">
      <SignedIn>
        <h1 className="text-7xl font-bold mb-4">Welcome back!</h1>
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
        <div className="mt-4">
         
        </div>
      </SignedIn>

      <SignedOut>
        <h1 className="text-5xl font-bold mb-4">Welcome to KanbanTODO</h1>
        <p className="text-muted-foreground mb-6">Drag, drop, and own your tasks.</p>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}

export default page
