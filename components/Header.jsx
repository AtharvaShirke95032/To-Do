"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { addTodo, fetchTodos } from "@/lib/todoHelpers";

const Header = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 

  const handleSubmit = async () => {
    const newTodo = await addTodo(title, description);
    if (newTodo) {
      setTitle("");
      setDescription("");
       window.dispatchEvent(new Event('todosUpdated'));
      // Notify parent component about the new task
    }
  };

  return (
    <div className="container mx-auto pt-6 flex justify-between">
      <div className="text-2xl font-bold">Todo App</div>
      <SignedIn>
        <div className="flex items-center gap-4">
          {/* <Link href={"/create"}><Button variant={"default"} className="cursor-pointer">create a task</Button> </Link>  */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">New Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="title">Task Name</label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none h-24 p-2 border rounded-md focus:outline-none "
                  ></textarea>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button onClick={handleSubmit}>Add</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>Login</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Header;
